const {hashGenerator} = require("./hashGenerator");

const initialDifficulty = 10;
const mineRate = 10000;

const genesisBlockData = {
    timeStamp: Date.now(),
    nonce: "",
    difficulty: initialDifficulty,
    data: ["Bishal Saha", "Mewoooo..."],
    prevHash: "",
    hash: hashGenerator(
        this.timeStamp, 
        this.nonce, 
        this.difficulty, 
        this.data, 
        this.prevHash
    ),
}

module.exports = {genesisBlockData, mineRate};
