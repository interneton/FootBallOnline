
---

# 온라인 축구 게임 API 라우터 구조

이 문서는 온라인 축구 게임 프로젝트에서 API 라우터를 어떻게 구성할지 설명합니다. 해당 API는 사용자 인증, 선수 관리, 게임 로직, 상점 기능 등을 포함합니다.

## 목차
1. [API 기능 개요](#api-기능-개요)
2. [제안하는 라우터 구조](#제안하는-라우터-구조)
3. [라우터별 설명](#라우터별-설명)
    - [인증 라우터 (Auth Router)](#인증-라우터-auth-router)
    - [선수 라우터 (Player Router)](#선수-라우터-player-router)
    - [게임 라우터 (Game Router)](#게임-라우터-game-router)
    - [상점 라우터 (Shop Router)](#상점-라우터-shop-router)

---

## 1. API 기능 개요

이 프로젝트는 여러 주요 기능을 포함하며, 이를 기능별로 논리적으로 그룹화하여 라우터를 구성할 수 있습니다. 포함된 API는 다음과 같습니다

- **사용자 인증**: 로그인 및 회원가입
- **선수 관리**: 선수 장착, 장착 해제, 모든 선수 능력치 조회, 선수 강화
- **게임 로직**: 게임 시작 및 유저 랭킹 조회
- **상점**: 게임 내 캐시 구매, 캐시 잔액 조회, 선수 뽑기 (가챠 시스템)

---

## 2. 제안하는 라우터 구조

다음과 같이 각 기능을 담당하는 라우터로 API를 묶을 수 있습니다

1. **인증 라우터 (Auth Router)**: 로그인 및 회원가입 기능을 처리합니다.
2. **선수 라우터 (Player Router)**: 선수 관련 기능(장착, 장착 해제, 능력치 조회, 강화)을 관리합니다.
3. **게임 라우터 (Game Router)**: 게임 플레이 및 랭킹 조회 기능을 처리합니다.
4. **상점 라우터 (Shop Router)**: 캐시 구매, 캐시 잔액 조회, 선수 뽑기 기능을 처리합니다.

### 예시 라우터 구조 (`app.js`)

```javascript
import express from 'express';
import authRouter from './routes/authRouter.js';
import playerRouter from './routes/playerRouter.js';
import gameRouter from './routes/gameRouter.js';
import shopRouter from './routes/shopRouter.js'; // 상점 라우터 (선수 뽑기 기능 포함)

const app = express();
app.use(express.json());

app.use('/auth', authRouter);       // 로그인 및 회원가입 처리
app.use('/players', playerRouter);  // 선수 관련 기능 처리
app.use('/game', gameRouter);       // 게임 플레이 및 랭킹 기능 처리
app.use('/shop', shopRouter);       // 캐시 및 선수 뽑기 처리

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

---

## 3. 라우터별 설명

### 인증 라우터 (Auth Router)

이 라우터는 사용자 인증을 담당하며, 로그인 및 회원가입 기능을 처리합니다.

- **POST** `/auth/login`: 사용자 로그인 처리
- **POST** `/auth/signup`: 새로운 사용자 회원가입 처리

```javascript
import { Router } from 'express';
import { login, signup } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);

export default router;
```

### 선수 라우터 (Player Router)

선수 관련 모든 기능을 처리하는 라우터입니다. 선수 장착, 장착 해제, 능력치 조회 및 강화 기능을 포함합니다.

- **POST** `/players/equip`: 사용자의 팀에 선수를 장착
- **POST** `/players/unequip`: 사용자의 팀에서 선수를 장착 해제
- **GET** `/players/stats`: 모든 선수의 능력치 조회
- **POST** `/players/upgrade`: 선수 능력치 강화

```javascript
import { Router } from 'express';
import { equipPlayer, unequipPlayer, getAllPlayerStats, upgradePlayer } from '../controllers/playerController.js';

const router = Router();

router.post('/equip', equipPlayer);
router.post('/unequip', unequipPlayer);
router.get('/stats', getAllPlayerStats);
router.post('/upgrade', upgradePlayer);

export default router;
```

### 게임 라우터 (Game Router)

게임 플레이 및 유저 랭킹 조회와 같은 게임 관련 기능을 처리합니다.

- **POST** `/game/play`: 새로운 게임을 시작
- **GET** `/game/ranking`: 현재 유저 랭킹 조회

```javascript
import { Router } from 'express';
import { playGame, getRanking } from '../controllers/gameController.js';

const router = Router();

router.post('/play', playGame);
router.get('/ranking', getRanking);

export default router;
```

### 상점 라우터 (Shop Router)

상점에서 캐시 구매, 캐시 잔액 조회, 선수 뽑기 (가챠) 기능을 처리합니다. 선수 뽑기 기능은 가챠 시스템으로 구현됩니다.

- **POST** `/shop/purchase`: 게임 내 캐시 구매
- **GET** `/shop/getCashAmount`: 현재 캐시 잔액 조회
- **POST** `/shop/draw`: 선수 뽑기 (가챠 시스템)

```javascript
import { Router } from 'express';
import { purchaseCash, getCashAmount, drawPlayer } from '../controllers/shopController.js';

const router = Router();

router.post('/purchase', purchaseCash);
router.get('/getCashAmount', getCashAmount);
router.post('/draw', drawPlayer);  // 선수 뽑기 기능 추가

export default router;
```

---