const logger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Listen to the response finish event
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const color = statusCode >= 500 ? '\x1b[31m' : statusCode >= 400 ? '\x1b[33m' : '\x1b[32m';
    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl || req.url} ${color}${statusCode}\x1b[0m (${duration}ms)`
    );
  });

  next();
};

module.exports = logger;
