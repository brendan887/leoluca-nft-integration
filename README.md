# NFT Integration Test for Room Maker

This repository uses only HTML and Javascript (without React) to interact with the user's Metamask wallet and the smart contract as required by Room Maker.

The scripts are contained in `nft.js` which are accessed via a `<script>` tag in index.html.


## RoomMaker Smart Contract

`RoomMaker.sol` contains the following functionality:

- Set mint price
- Set maximum number of mints per wallet
- Mint NFT
- Transfer NFTs
- Burn NFTs
- Get owner of token ID
- Get number of RoomMaker NFTs owned by address
- Pause and unpause transactions
- Withdraw funds in smart contract
- Transfer ownership of smart contract

The smart contract is optimized to be as gas efficient as possible.

`_baseURI()` can be updated to include the parent directory of all metadata files used for NFT minting.


## Additional Notes

For instructions on deployment, please refer to [this repository](https://github.com/brendan887/leoluca-nft-demo#nft-demo-for-leoluca).


## Architecture Diagram

https://drive.google.com/file/d/1KtxJctY9QeORk1XcLy0zAXmbDKZ2D28u/view?usp=sharing

Step (d) has not been implemented in this project.