import { getPackInfoOne, purch, getCash, makePack, getPlayersByRank, createUserPlayer, getPackInfo} from "../services/shopService.js";
import { CustomError } from '../utils/customError.js'; 

// 게임 내 캐시 구매
export const purchaseCash = async (req, res, next) => {
  const userId = req.user.userId;
  const { amount } = req.body;

  try {
    const result = await purch(userId, amount);
    res.status(200).json({ message: "캐시 구매 완료", cash: result });
  } catch (error) {
    next(error); 
  }
};

// 현재 캐시 잔액 조회
export const getCashAmount = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const cashAmount = await getCash(userId);
    res.status(200).json({ cashAmount });
  } catch (error) {
    next(error);
  }
};

// 선수 뽑기 (가챠 시스템)
export const drawPlayer = async (req, res, next) => {
  const { userId } = req.user;
  const { packId } = req.body;

  try {
    let currentCash = await getCash(userId);
    let pack = await getPackInfoOne(packId);

    if (!pack) {
      throw new CustomError("해당하는 팩이 없습니다.", 404);
    }
    if (currentCash - pack.price < 0) {
      throw new CustomError("캐쉬가 부족합니다.", 400);
    }

    let probability = Math.floor(Math.random() * 100);
    let player;

    // 확률 
    if (probability < pack.SSPB) player = "S";
    else if (probability < pack.SSPB + pack.APB) player = "A";
    else if (probability < pack.SSPB + pack.APB + pack.BPB) player = "B";
    else if (probability < pack.SSPB + pack.APB + pack.BPB + pack.CPB) player = "C";
    else player = "F";
    
    let rankPlay = await getPlayersByRank(player);
    if (rankPlay.length === 0) {
      throw new CustomError("해당 랭크의 선수가 없습니다.", 404);
    }

    const randomIndex = Math.floor(Math.random() * rankPlay.length);
    const selectedPlayer = rankPlay[randomIndex];

    await createUserPlayer(userId, selectedPlayer.soccerPlayerId);
    await purch(userId, currentCash - pack.price);

    res.status(200).json({ message: "선수 뽑기 완료", selectedPlayer });
  } catch (error) {
    next(error); 
  }
};

// 팩 만들기
export const makePackcontroller = async (req, res, next) => {
  const { packname, sspb, apb, bpb, cpb, fpb, price } = req.body;
  try {
    const allprobability = sspb + apb + bpb + cpb + fpb;
    if (allprobability !== 100) throw new Error("확률이 맞지 않습니다.");

    const packdata = await makePack(packname, sspb, apb, bpb, cpb, fpb, price);

    return res.status(201).json({ message: "팩 생성 완료", packdata });
  } catch (error) {
    next(error);
  }
};

export const getPackDetails = async (req, res, next) => {
  try {
    const packs = await getPackInfo();

    const packDetails = await Promise.all(
      packs.map(async (pack) => {
        const availablePlayers = {};

        // Fetch players for each rank
        availablePlayers['SSPB'] = await getPlayersByRank('S');
        availablePlayers['APB'] = await getPlayersByRank('A');
        availablePlayers['BPB'] = await getPlayersByRank('B');
        availablePlayers['CPB'] = await getPlayersByRank('C');
        availablePlayers['FPB'] = await getPlayersByRank('F');

        return {
          ...pack,
          availablePlayers,
        };
      })
    );

    res.status(200).json(packDetails);
  } catch (error) {
    next(error);
  }
};