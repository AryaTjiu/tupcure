const bcrypt = require("bcryptjs");

export const hashingPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(14);
        const hash = await bcrypt.hash(password,salt);
        return {status : "success", message : "", value : hash}
    } catch (err) {
        return {status : "error", message : err, value : null};
    }
}

export const compareBetweenPlainAndHashedText = async(plainText, HashedText) => {
    const isMatch = bcrypt.compareSync(plainText, HashedText);
    return isMatch;
}