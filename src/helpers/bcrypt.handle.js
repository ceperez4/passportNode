const bcryptjs = require("bcryptjs")

const encrypt = async(pass) =>{
    const passwordHash = await bcryptjs.hash(pass,10);
    return passwordHash
}

const verified = async(pass,passHash) =>{
    const isCorrect = await bcryptjs.compare(pass,passHash);
    return isCorrect; //return true/false
}


module.exports = {
    encrypt,
    verified
}