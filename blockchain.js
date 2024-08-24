const Block = require("./block");
const {hashGenerator} = require("./hashGenerator");

class Blockchain {
    constructor() {
        this.blockchain = [Block.genesisBlock()];
    }

    addBlock(data){
        const newBlock = Block.mineBlock({
            prevBlock: this.blockchain[this.blockchain.length-1],
            data: data
        })

        this.blockchain.push(newBlock);
    }

    replaceBlockchain(blockchain) {
        if (blockchain.length<=this.blockchain.length) {
            console.error("The incomming chain is not longer.");
            return ;
        }

        if (Blockchain.isValidBlock(blockchain)){
            console.error("The incomming blockchain is not valid.");
            return;
        }

        this.blockchain = blockchain;
    }

    static isValidBlock(blockchain) {
        if (JSON.stringify(blockchain[0])!==JSON.stringify(Block.genesisBlock())) {
            return false;
        }

        for (let i=1; i<blockchain.length; i++) {
            const {timeStamp, nonce, difficulty, data, prevHash, hash} = blockchain[i];
            const lastDifficulty = blockchain[i-1].difficulty;
            const realLastHash = blockchain[i-1].hash;
            const validHash = hashGenerator(timeStamp, nonce, difficulty, data, prevHash);

            if(realLastHash!==prevHash) {
                return false;
            }

            if(validHash!==hash) {
                return false;
            }

            if(Math.abs(lastDifficulty-difficulty)>1) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;

// const blockchain = new Blockchain();

// blockchain.addBlock("Bishal Saha");
// blockchain.addBlock("Sneha Saha");

// console.log(blockchain);

// const x = Blockchain.isValidBlock(blockchain.blockchain);

// console.log(x);
