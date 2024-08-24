const Blockchain = require("./blockchain");
const blockchain = new Blockchain();

let prevTimestamp, nextBlock, nextTimestamp, timeDifference;

const times = [];

let totalTime = 0;
let number = 0;

let averageTime;

for (let i=1; i<100; i++){
    prevTimestamp = blockchain.blockchain[blockchain.blockchain.length-1].timeStamp;
    blockchain.addBlock(`Data is ${i}`);
    nextBlock = blockchain.blockchain[blockchain.blockchain.length-1];
    nextTimestamp = nextBlock.timeStamp;

    timeDifference = nextTimestamp-prevTimestamp;

    times.push(timeDifference);

    totalTime += times[i-1];
    number++;

    averageTime = totalTime/number;

    console.log(`Block number:${blockchain.blockchain[i-1].data}, Nonce:${blockchain.blockchain[i-1].nonce}, Difficulty:${blockchain.blockchain[i-1].difficulty}, Timedifference:${timeDifference}, Average:${averageTime}`);
}
