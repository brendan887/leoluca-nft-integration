// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RoomMaker is ERC721, ERC721URIStorage, Pausable, Ownable, ERC721Burnable {
    /**
    Minimize variable creation and updates to reduce gas fees. Store data off-
    chain where possible. Use constants if updates do not need to be made.
    */

    uint256 public mintPrice; // Mint price of each token
    uint256 public maxPerWallet; // Max # a wallet can mint

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("RoomMaker", "RMKR") {
        mintPrice = 0.02 ether;
        maxPerWallet = 5;
    }

    function _baseURI() internal pure override returns (string memory) {
        // TODO: Set base URI
        return "";
    }

    function getCount() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function getBalance(address user) public view returns (uint256) {
        return balanceOf(user);
    }

    function getOwner(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    // Owner functions

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function setMintPrice(uint256 mintPrice_) external onlyOwner {
        mintPrice = mintPrice_;
    }

    function setMaxPerWallet(uint256 maxPerWallet_) external onlyOwner {
        maxPerWallet = maxPerWallet_;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = owner().call{ value: address(this).balance }('');
        require(success, 'Withdraw failed');
    }

    // User functions

    function mintToken(string memory metadataURI) public payable whenNotPaused returns (uint256) {
        address recipient = msg.sender;

        require(msg.value >= mintPrice, "Incorrect mint value");
        require(balanceOf(recipient) < maxPerWallet, "Maximum mints reached");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, metadataURI);

        return tokenId;
    }

    // Overrides

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}