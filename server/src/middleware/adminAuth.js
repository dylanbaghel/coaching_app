
import { genErrorObj } from '../utils/utils';
import User from '../models/User';

export default async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            return res.status(401).json(genErrorObj(401, 'admin/unauthorized', 'Authentication Required'));
        }

        const token = header.replace('Bearer ', '');
        const foundUser = await User.findByToken(token);

        if (!foundUser || foundUser.role !== 'admin') {
            return res.status(401).json(genErrorObj(401, 'admin/unauthorized', 'You\'re Not admin.'));
        }

        req.user = foundUser;
        next();
    } catch(err) {
        return res.status(400).json(genErrorObj(400, 'admin/internal-error', err.message));
    }
};