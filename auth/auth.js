const jwt = require("jsonwebtoken")

const generatToken = (data) => {
    const token = jwt.sign(data, "Manvi")
    return token
}
const accessToken = (req, res, next) => {
    console.log(req.headers);
    const token = req.headers.cookie.split("=")[1]
    const decoded = jwt.verify(token, "Manvi")
    req.data = decoded
    next()  

}

module.exports = {generatToken, accessToken}