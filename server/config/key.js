if(process.env.MODE_ENV === "prod") {
    //배포
    module.exports = require("./prod");
} else {
    //개발
    module.exports = require("./dev");
}