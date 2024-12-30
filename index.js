const express = require("express");
const bodyParser = require("body-parser");

const Blockchain = require("./blockchain");

const blockchain = new Blockchain();

const app = express();

app.use(bodyParser.json());

app.get("/api/blockchain", (request, response)=> {
    response.json(blockchain.blockchain);
})

app.post("/api/mine", (request, response)=> {
    const {data} = request.body;
    blockchain.addBlock({data});
    response.redirect("/api/blockchain");
})

const port = 3000;

app.listen(port, ()=> {
    console.log(`Listening to port ----> ${port}`);
})

/*Nothing*/
