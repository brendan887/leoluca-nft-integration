import { ethers } from "ethers";
import RoomMaker from "../artifacts/contracts/RoomMaker.sol/Roommaker.json";

// Contract address should not change after deployment to net
const contractAddress = "0x0c4272eE2DE9d51073995874E1908Ac7BE71a8e6";

// Mint price should be updated here and in the smart contract
const mintPrice = "0.01";

// Alchemy endpoint for fetchNFT function
const endPoint = "https://eth-goerli.g.alchemy.com/v2/grj2v0Knpbrr7Mn6lN3N6tz00uh1dd2i";

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

// API call to backend required to get metadata URI
const mintNFT = document.getElementById(`btn-mint`);
mintNFT.onclick = async() => {
    // API call to backend
    // Returns metadataURI

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
};

const fetchNFT = document.getElementById(`btn-fetch`);
fetchNFT.onclick = async() => {

    const addr = await window.ethereum.request({
        method: "eth_requestAccounts"
    });

    console.log("Fetching NFTs: ", addr[0]);

    let data;

    try {

        data = await fetch(`${endPoint}/getNFTs?owner=${addr[0]}`).then(data => data.json());

        // For getting NFTs a single contract (insert RMKR addr to filter)
        // data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())

    } catch (err) {
        console.log("Error:", err);
    }

    console.log("NFTs detected")
    
    for (let i = 0; i < data.totalCount; i++) {
        const token = data.ownedNfts[i];

        console.log(token);
        console.log("Fetched NFT", i);

        const title = token.title;
        const id = token.id.tokenId;
        const contractAddr = token.contract.address;
        const img = token.media[0].gateway; // Some NFT media may not be an image

        const tokenContainer = document.createElement( 'div' );

        const displayImg = document.createElement( 'img' );
        displayImg.src = img;
        tokenContainer.appendChild(displayImg);

        const displayTitle = document.createElement( 'h3' );
        displayTitle.textContent = title;
        tokenContainer.appendChild(displayTitle);

        const displayId = document.createElement( 'p' );
        displayId.textContent = id;
        tokenContainer.appendChild(displayId);
        
        const displayContractAddr = document.createElement( 'p' );
        displayContractAddr.textContent = contractAddr;
        tokenContainer.appendChild(displayContractAddr);

        const element = document.getElementById("user-tokens");
        element.appendChild(tokenContainer);
    }

    console.log("Done");
}