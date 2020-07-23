const axios = require('axios').default;

const getUserInfoFromToken = async (token) => {
    try {
        const { data } = await axios({
            url: 'https://graph.facebook.com/me',
            method: 'get',
            params: {
                fields: ['email', 'name'].join(','),
                access_token: token,
            },
        });
        return data;
    } catch (err) {
        const error = new Error();
        error.statusCode = 401;
        error.data = "Authorization Error";
        throw error;
    }
};

exports.getUserInfoFromToken = getUserInfoFromToken;