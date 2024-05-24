const hre=require("hardhat");
async function main(){
    const Voting=await hre.ethers.getContractFactory("voting");
    const Voting_=await Voting.deploy(["Komal","Rohan","Manoj"],120);
    await Voting_.deployed();
    console.log(`Contract address :${Voting_.address}`);

}

main().catch((error)=>{
    console.log(error);
    process.exitCode=1;
});