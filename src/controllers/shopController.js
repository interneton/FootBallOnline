import { getPackInfoOne,purch,getCash,makePack,getPlayersByRank } from "../services/shopService.js";

// 게임 내 캐시 구매
export const purchaseCash = async (req, res, next) => {
  const { userId } = req.user;
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
  const { cardId } = req.body;

  try {
    let currentCash = await getCash(userId);
    let pack = await getPackInfoOne(cardId);

    if(!pack) throw new Error("해당하는 팩은 없습니다.");
    if(currentCash - pack.price < 0) throw new Error("캐쉬가 모자릅니다.");

    let probability = Math.floor(Math.random() * 100);
    let player;

    //확률 
    if (probability < pack.sspb) player = "S";
    else if (probability < pack.sspb + pack.apb)player = "A";
    else if (probability < pack.sspb + pack.apb + pack.bpb) player = "B";
    else if (probability < pack.sspb + pack.apb + pack.bpb + pack.cpb) player = "C";
    else player = "F";
    
    let rankPlay = await getPlayersByRank(player);
    if (rankPlay.length === 0) throw new Error("해당 랭크의 선수가 없습니다.");

    const randomIndex = Math.floor(Math.random() * rankPlay.length);
    const selectedPlayer = rankPlay[randomIndex];

    await createUserPlayer(userId, selectedPlayer.soccerPlayerId);
    await purch(userId, currentCash - pack.price);

    res.status(200).json({ message: "선수 뽑기 완료", player });
  } catch (error) {
    next(error); 
  }
};


//팩 만들기
export const makePackcontroller = async (req,res,next)=>{
  const { packname, sspb, apb, bpb, cpb, fpb, price } = req.body;
  try {
    if (isNaN(sspb) || isNaN(apb) || isNaN(bpb) || isNaN(cpb) || isNaN(fpb) || isNaN(price)) throw new Error("확률에 정확한 숫자를 적으십시오.");
    
    const allprobability = sspb+apb+bpb+cpb+fpb;

    if(Number(allprobability)!==100)throw new Error("확률이 맞지 않습니다.");

    const packdata = makePack(packname,sspb,apb,bpb,cpb,fpb,price);

    return res.status(201).json({message:"팩 생성 완료",packdata})
  }
  catch(error){
    next(error)
  }
}