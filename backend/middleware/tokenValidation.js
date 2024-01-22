const jwt = require('jsonwebtoken')

function tokenVerification(req, res, next) {
//pobranie tokenu z nagłówka:
let token = req.headers["x-access-token"];
if (!token) {
res.status(403).send({ message: "No token provided!" });
}
//jeśli przesłano token - weryfikacja jego poprawności:
jwt.verify(token, "haslo123", (err, decodeduser) => {
if (err) {
console.log("Token niepoprawny!")
res.status(401).send({ message: "Unauthorized!" });
}
console.log("Token poprawny!")
req.user = decodeduser
next()
})
}
module.exports = tokenVerification