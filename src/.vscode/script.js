export const login = () => {
    const account = document.getElementById('account').value;
    const password = document.getElementById('password').value;

    // 로그인 요청 (백엔드 API 호출)
    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === '로그인 성공') {
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('mainScreen').classList.remove('hidden');
        } else {
            document.getElementById('loginMessage').innerText = data.message;
        }
    })
    .catch(error => console.error('Error:', error));
};

export const logout = () => {
    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
};

export const openConsole = (page) => {
    const consoleOutput = document.getElementById('consoleOutput');
    consoleOutput.innerHTML = ''; // 초기화
    document.getElementById('console').classList.remove('hidden');

    // 각 페이지에 따른 콘솔 내용 표시
    switch(page) {
        case 'shop':
            consoleOutput.innerHTML = '<h4>캐시 구매 상점</h4>';
            break;
        case 'teamManagement':
            consoleOutput.innerHTML = '<h4>팀 관리 페이지</h4>';
            break;
        case 'teamPlacement':
            consoleOutput.innerHTML = '<h4>팀 배치 페이지</h4>';
            break;
        case 'playerDrawing':
            consoleOutput.innerHTML = '<h4>선수 뽑기 페이지</h4>';
            break;
        default:
            consoleOutput.innerHTML = '잘못된 페이지입니다.';
    }
};

document.getElementById('playGameBtn').addEventListener('click', async () => {
    // 게임 API
});

document.getElementById('purchaseCashBtn').addEventListener('click', async () => {
    // 캐쉬 상점 APi를 넣어야하는디...
});

document.getElementById('drawPlayerBtn').addEventListener('click', async () => {
    // 가챠 드로우플레이어 API
});

document.getElementById('equipPlayerBtn').addEventListener('click', async () => {
    // 플레이어 장착 API
});

document.getElementById('unequipPlayerBtn').addEventListener('click', async () => {
    // 장착해제 API
});

// 랭킹과 플레이어 로드 기능
async function loadRankings() {
    // API에서 랭킹가져오는 뭐시깽이
}

async function loadPlayers() {
    // API에서 플레이어를 가져오는 뭐시꺵이
}

loadRankings();
loadPlayers();
