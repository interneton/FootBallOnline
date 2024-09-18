이 파일은 인우가 작업하면서 있었던 일을 전달하기 위해 작성했습니다.
댓글의 형식으로 답변해주시면 제가 읽고 해당 코드를 수정하겠습니다.
시간은 24시간 기법으로 표시하며, mm.dd time 으로 작성됩니다.
문제 발견시간이 아닌 최종 수정 시간을 작성합니다.
댓글의 형식은 가독성을 위해 //(이름) : 내용 으로 작성해 주시면 감사하겠습니다.
ex - 09.14 운전을 하루죙일하니 너무 피곤했다.
     //인간 : 졸음운전조심하세요
이 모든 내용은
저는 "너는 @검열@이라 개발자(작성자)의 의도를 모르는 걸 수도 있다"(by 현직개발자 친형) 라는 조언에 수정사항을 따로 적고,
본 파일은 수정하지 않은 코드들로 이루어져있습니다.
해당 코드들은 제가 실험할때는 수정 후 인 상태로 사용하고 마무리떄는 백업파일로 돌려놓고 수정사항을 작성했습니다.
파일마다의 구분은 @@@@@@@@@@@ 과 상단의 파일명으로 구분해놓았습니다.

파일의 구조
footballonline/
├── prisma/
│   └── schema.prisma        # Prisma 스키마 파일
├── src/
│   ├── controllers/
│   │   └── shopGacha.js      # 가챠파일 추가
│   ├── routes/
│   │   └── shopRouter.js     # 상점 라우터 (가챠 기능 포함)
│   ├── utils/
│   │   └── prisma/index.js   # Prisma 클라이언트 설정
│   └── app.js                # Express 앱
├── .gitignore
├── package.json
└── yarn.lock

09.19 03:03 최종.
Holyday 작업물. 가챠기능 단챠(1뽑),10연차 구현. 


@@@@@@@@@@@@@@.prisma @@@@@@@@@@@@@@@@@@@
만들면서 느낀건데 prisma에 pack부분이 없어도 될 것 같습니다.
하지만 있었기에 사용했습니다.
간결한 코드를 위해서라면 prisma에서 pack부분을 지워도 될것같습니다.
코드 설명을 나눠서 하는거라면 pack부분이 있는게 나을 것 같습니다.

generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "postgresql" // 사용하는 DB에 맞게 설정 (mysql, sqlite 등)
  url      = env("DATABASE_URL")
}
DB는 연습하시는 계정에 맞게 입력하시면 됩니다.

mongodb://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="mongodb://myuser:mypassword@localhost:27017/mydatabase"

model UserPlayer {
  userPlayerId  Int           @id @default(autoincrement())
  userId        Int
  soccerPlayer  Int
  isEquipped    Boolean       @default(false)
  user          User          @relation(fields: [userId], references: [userId])
  soccerPlayer  SoccerPlayer  @relation(fields: [soccerPlayer], references: [soccerPlayerId])
}
모델 유저플레이어에
soccerPlayer에 대한 정의가 두번들어가서 수정해야된데요 아래는 해당내용의 에러입니다.
Field "soccerPlayer" is already defined on model "UserPlayer".
Error validating: The argument fields must refer only to scalar fields. But it is referencing the following relation fields: soccerPlayer
아래는 수정 후 코드입니다.
model UserPlayer {
  userPlayerId    Int           @id @default(autoincrement())
  userId          Int
  soccerPlayerId  Int           // 외래 soccerPlayerId 사용
  isEquipped      Boolean       @default(false)
  user            User          @relation(fields: [userId], references: [userId])
  soccerPlayer    SoccerPlayer  @relation(fields: [soccerPlayerId], references: [soccerPlayerId]) // 관계
}

model SoccerPlayer {
  soccerPlayerId  Int           @id @default(autoincrement())
  name            String
  speed           Int
  goalDecision    Int
  shootPower      Int
  defense         Int
  stamina         Int
  userPlayers     UserPlayer[]  // 양방향 설정
}
수정한 부분에 // 를 달아 뒀습니다. 
이부분은 저도 잘 몰라서 현직 개발자에게 물어봤습니다.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
package.json
"name": "FootBallOnline", // 대문자 사용 때문에 에러가 난데요. football-online으로 수정하고싶습니다.
.json파일에서 
String does not match the pattern of "^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$".
에러가 났습니다.
대문자 사용 때문에 에러가 난데요. football-online으로 수정하고 싶습니다.
@@@@@@@@@@@@@@@@@@@@@@@@@@
app.js
원래는
import shopRouter from './routes/shopRouter.js';
을 썼는데
json파일에 type = module이 안달려있길래 그냥 const 로 박아뒀습니다.
const shopRouter = require('./routes/shopRouter.js');
type = module을 추가하실 거라면 제게 한번만 말씀해 주시길 바랍니다. 해당코드에 맞춰 코드들을 수정하겠습니다.
