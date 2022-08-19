const hre = require("hardhat");

async function main () {
    const RoomMaker = await hre.ethers.getContractFactory("RoomMaker");
    const roommaker = await RoomMaker.deploy();
    await roommaker.deployed();

    console.log("RoomMaker deployed to:", roommaker.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
