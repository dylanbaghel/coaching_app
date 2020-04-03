import jwt_decode from 'jwt-decode';

const decodeToken = (token) => {
    try {
        return jwt_decode(token);
    } catch(err) {
        console.log(err);
    }
};

export default decodeToken;