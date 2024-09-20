export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // 콘솔에 오류 스택 출력
  
    // 응답 형식 설정
    res.status(err.status || 500).json({
      success: false,
      message: err.message || '서버에 오류가 발생했습니다.',
    });
  };
  
  // 404 처리 미들웨어
  export const notFound = (req, res, next) => {
    const error = new Error('요청한 리소스를 찾을 수 없습니다.');
    error.status = 404;
    next(error);
  };