require('dotenv').config();
const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const fileUpload=require('express-fileupload');
app.use(express.static(__dirname));
app.use(express.json());
const path=require('path');
const ethers=require('ethers');
var port=3000;
const API_URL=process.env.API_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS=process.env.CONTRACT_ADDRESS;
const {abi}=require("./artifacts/contracts/voting.sol/voting.json");
const provider=new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractInstance=new ethers.Contract(CONTRACT_ADDRESS,abi,signer);
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/addCandidate",async(req,res)=>{
    var vote=req.body.vote;
    console.log(vote);
    async function storeDataInBlockchain(){
        console.log("Adding the candidate in voting contract...");
        const tx=await contractInstance.addCandidate(vote);
        await tx.wait();
    }
    const bool=await contractInstance.getVotingStatus();
    if(bool==true){
        await storeDataInBlockchain(vote);
        res.send("The candidate has been registered in the smart contract");
    }
    else{
        res.send("Voting is finished");
    }
})

app.listen(port,function(){
    console.log("App is listening on port 3000");
})