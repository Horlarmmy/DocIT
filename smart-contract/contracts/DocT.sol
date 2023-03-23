// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Doct is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    mapping(address => string[]) user_docs;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Doct", "DOCT") {}

    function addDoc(string memory uri) public returns (uint256) {
	    user_docs[msg.sender].push(uri);
        uint256 res = mint(msg.sender, uri);
        return res;
    }

    function sendDoc(address _receiver, uint256 tokenId) public {
        safeTransferFrom(msg.sender, _receiver, tokenId);
        string memory  docs = tokenURI(tokenId);
        user_docs[_receiver].push(docs);
    }

    function getdocuments() public view returns(string[] memory) {
        return user_docs[msg.sender];
    }

    function mint(address to, string memory uri) private returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

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

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }
}