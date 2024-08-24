const crypto = require("crypto");

const hashGenerator = (...inputs)=> {
    const hash = crypto.createHash("sha256");
    hash.update(inputs.sort().join(""));
    return hash.digest("hex");
}

module.exports = {hashGenerator};
