import prisma from '../utils/prisma/index.js';

// 사용자 캐시 차감 함수
async function minusUserCash(userId, gachaPrice) {
  const user = await prisma.user.findUnique({
    where: { userId }
  });

  if (!user || user.cashAmount < gachaPrice) {
    throw new Error('캐시가 부족합니다.');
  }

  await prisma.user.update({
    where: { userId },
    data: { cashAmount: user.cashAmount - gachaPrice }
  });
}

// 난수 생성 및 랭크 결정 함수
function randomChoiceRank() {
  const randomNum = Math.floor(Math.random() * 100) + 1;

  if (randomNum >= 1 && randomNum <= 5) {
    return 'S'; // S 랭크
  } else if (randomNum >= 6 && randomNum <= 20) {
    return 'A'; // A 랭크
  } else if (randomNum >= 21 && randomNum <= 50) {
    return 'B'; // B 랭크
  } else {
    return 'C'; // C 랭크
  }
}

// 해당 팩에서 특정 랭크의 선수 목록 가져오기
async function getPlayersPackRank(packId, rank) {
  const players = await prisma.packPlayer.findMany({
    where: {
      packId: packId,  // 팩 ID 조건
      soccerPlayer: {
        rank: rank,   // 선수의 랭크 조건
      },
    },
    include: {
      soccerPlayer: true,  // 실제 선수 정보 포함
    },
  });
  return players.map((player) => player.soccerPlayer);  // 선수 리스트 반환
}

// 선수 랜덤 선택 함수
function selectRandomPlayer(players) {
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
}

// 선택된 선수를 UserPlayer에 저장
async function saveSelectedPlayer(userId, soccerPlayerId) {
  await prisma.userPlayer.create({
    data: {
      userId,
      soccerPlayer: soccerPlayerId,
      isEquipped: false
    }
  });
}

// 가챠 시스템 실행 (단일 및 연속 가챠)
export async function drawPlayer(req, res) {
  const { userId, packId, isContinuous } = req.body; // 연속 가챠 여부 추가
  const oneGacha = 100;  // 단챠
  const tenGacha = 1000;  // 십연챠
  const gachaCount = isContinuous ? 10 : 1;  // 연속 가챠라면 10번, 아니면 1번

  try {
    // 캐시 차감
    const gachaPrice = isContinuous ? tenGacha : oneGacha;
    await minusUserCash(userId, gachaPrice);

    const results = []; // 여러 가챠 결과를 저장할 배열

    for (let i = 0; i < gachaCount; i++) {
      // 난수 생성 및 랭크 결정
      const rank = randomChoiceRank();
      console.log(`결정된 랭크: ${rank}`);

      // 해당 팩에서 특정 랭크의 선수 목록 가져오기
      const players = await getPlayersPackRank(packId, rank);

      if (players.length === 0) {
        throw new Error('해당 랭크의 선수가 없습니다.');
      }

      // 랜덤으로 선수 선택
      const selectedPlayer = selectRandomPlayer(players);
      console.log(`선택된 선수: ${selectedPlayer.name}`);

      // 선택된 선수를 유저의 UserPlayer 테이블에 추가
      await saveSelectedPlayer(userId, selectedPlayer.soccerPlayerId);

      results.push(selectedPlayer); // 결과 배열에 추가
    }

    return res.status(200).json({
      message: `가챠 ${gachaCount}회 성공!`,
      players: results
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}
