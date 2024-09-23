import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // User 데이터 생성
  for (let i = 0; i < 50; i++) {
    await prisma.user.create({
      data: {
        account: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.person.fullName(),
        cashAmount: faker.number.int({ min: 1000, max: 5000 }), // 수정된 부분
        teamName: faker.company.name(),
        score: faker.number.int({ min: 1000, max: 2000 }), // 수정된 부분
      },
    });
  }

  // SoccerPlayer 데이터 생성
  for (let i = 0; i < 50; i++) {
    await prisma.soccerPlayer.create({
      data: {
        name: faker.person.fullName(),
        speed: faker.number.int({ min: 50, max: 100 }), // 수정된 부분
        goalDecision: faker.number.int({ min: 50, max: 100 }), // 수정된 부분
        shootPower: faker.number.int({ min: 50, max: 100 }), // 수정된 부분
        defense: faker.number.int({ min: 50, max: 100 }), // 수정된 부분
        stamina: faker.number.int({ min: 50, max: 100 }), // 수정된 부분
        rank: faker.helpers.arrayElement(['S', 'A', 'B', 'C', 'D']),
      },
    });
  }

  // 다른 모델에 대한 데이터 생성도 유사하게 추가
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
