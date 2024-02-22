const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library

class JwtHelper {
    public authenticateJwtToken = (token: string, secret: string) => {
        return jwt.verify(token, secret);
    }
}
export default JwtHelper;