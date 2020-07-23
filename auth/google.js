const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

const getUserInfoFromToken = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token
        });
        const payload = ticket.getPayload();
        return payload;
    } catch (err) {
        const error = new Error();
        error.statusCode = 401;
        error.data = "Authorization Error";
        throw error;
    }
}

exports.getUserInfoFromToken = getUserInfoFromToken;