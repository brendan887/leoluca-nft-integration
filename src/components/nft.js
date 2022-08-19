import { ethers } from "ethers";
import RoomMaker from "../artifacts/contracts/RoomMaker.sol/Roommaker.json";

// Contract address should not change after deployment to net
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Mint price should be updated here and in the smart contract
const mintPrice = "0.02";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, RoomMaker.abi, signer);

const moduleTest = document.getElementById(`btn-test`);
moduleTest.onclick = () => {
    console.log("Hello from NFT module!");
};

const connectAccount = document.getElementById(`btn-connect`);
connectAccount.onclick = async () => {
    if (window.ethereum) {
        const addr = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        console.log("Connected: ", addr);
    } else {
        alert("Please create a Metamask wallet at https://metamask.io/download.html");
    }
};

const mintNFT = document.getElementById(`btn-mint`);
mintNFT.onclick = async(metadataURI) => {
    try {
        const result = await contract.mintToken(metadataURI, {
            value: ethers.utils.parseEther(mintPrice),
        });
        console.log("Result:", result);
    } catch (err) {
        console.log("Error:", err);
    }
};

const countNFT = document.getElementById(`btn-count`);
countNFT.onclick = async() => {
    const count = await contract.getCount();
    console.log("Count: ", count);
}


// const test = () => {
//   alert("Test successful");
// };

// const connectAccount = async () => {
//   if (window.ethereum) {
//     const addr = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     console.log("Connected: ", addr);
//   } else {
//     alert(
//       "Please create a Metamask wallet at https://metamask.io/download.html"
//     );
//   }
// };

// const mintNFT = async (metadataURI) => {
//   try {
//     const result = await contract.mintToken(metadataURI, {
//       value: ethers.utils.parseEther(mintPrice),
//     });
//     console.log("Result:", result);
//   } catch (err) {
//     console.log("Error:", err);
//   }
// };

// const countNFT = async () => {
//   console.log("Getting smart contract token count");
//   const count = await contract.getCount();
//   console.log("Count: ", count);
// };

// export { test, connectAccount, mintNFT, countNFT };
