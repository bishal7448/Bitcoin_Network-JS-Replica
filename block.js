const {genesisBlockData, mineRate} = require("./genesis");
const {hashGenerator} = require("./hashGenerator");
const hexToBinary = require("hex-to-binary");

class Block {
    constructor ({timeStamp, nonce, difficulty, data, prevHash, hash}) {
        this.timeStamp = timeStamp,
        this.nonce = nonce,
        this.difficulty = difficulty,
        this.data = data,
        this.prevHash = prevHash,
        this.hash = hash
    }

    static genesisBlock(){
        return new this (genesisBlockData);
    }

    static mineBlock({prevBlock, data}){
        let timeStamp;
        let nonce = 0;
        let difficulty = prevBlock.difficulty;
        let hash;
        const prevHash = prevBlock.hash;

        do{
            nonce++;
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty({
                originalBlock: prevBlock,
                timeStamp: timeStamp
            })
            hash = hashGenerator(timeStamp, nonce, difficulty, data, prevHash);
        }while(
            hexToBinary(hash).substring(0,difficulty) !== '0'.repeat(difficulty)
        );

        return new this ({
            timeStamp: timeStamp,
            nonce: nonce,
            difficulty: difficulty,
            data: data,
            prevHash: prevHash,
            hash: hash
        })
    }

    static adjustDifficulty({originalBlock, timeStamp}){
        const difficulty = originalBlock.difficulty;
        
        if (difficulty<1) {
            return 1;
        }
        
        const difference = timeStamp-originalBlock.timeStamp;
        
        if (difference>mineRate) {
            return difficulty-1;
        }else{
            return difficulty+1;
        }
    }
}

module.exports = Block;

// const block1 = new Block({
//     timeStamp: Date.now(),
//     nonce: "",
//     difficulty: "",
//     data: "saha.bishal7676@gmail.com",
//     prevHash: "",
//     hash: hashGenerator(
//         this.timeStamp, 
//         this.nonce, 
//         this.difficulty, 
//         this.data, 
//         this.prevHash
//     )
// })

// console.log(block1);

// const block2 = new Block({
//     timeStamp: Date.now(),
//     nonce: "",
//     difficulty: "",
//     data: "@bishal7448",
//     prevHash: block1.hash,
//     hash: hashGenerator(
//         this.timeStamp, 
//         this.nonce, 
//         this.difficulty, 
//         this.data, 
//         this.prevHash
//     )
// })

// console.log(block2);

// const block3 = Block.mineBlock({
//     prevBlock: block2,
//     data: "Sneha Saha",
// })

// console.log(block3);
