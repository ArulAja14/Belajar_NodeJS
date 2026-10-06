const logger = (req, res, next) => {

    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Waktu:", new Date());
    console.log("Logger aktif");    

    next();
};

module.exports = logger;