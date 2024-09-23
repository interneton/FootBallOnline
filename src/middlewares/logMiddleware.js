export const logMiddleware = (req, res, next) => {
    const startTime = Date.now(); // 요청 시작 시간 기록
  
    // 요청 정보를 로그로 기록
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} 요청 받음`);
  
    // 응답이 완료되면 로그를 기록하는 이벤트 핸들러
    res.on('finish', () => {
      const elapsedTime = Date.now() - startTime; // 응답까지 걸린 시간 계산
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} 요청 완료 - ${res.statusCode} (걸린 시간: ${elapsedTime}ms)`);
    });
  
    // 다음 미들웨어로 넘어감
    next();
  };
  