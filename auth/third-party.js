const facebook = require("./facebook");
const google = require("./google");
const { GOOGLE, FACEBOOK } = require("../util/constants");

const getUserInfoFromToken = async (provider, token) => {
    switch (provider.toLowerCase()) {
        case GOOGLE:
            return google.getUserInfoFromToken(token);
        case FACEBOOK:
            return facebook.getUserInfoFromToken(token);
        default:
            const error = new Error('Invalid provider');
            error.statusCode = 401;
            error.data = "Invalid provider";
            throw error;
    }
}

exports.getUserInfoFromToken = getUserInfoFromToken;