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

    function addDoc(string memory uri) public {
	    user_docs[msg.sender].push(uri);
        mint(msg.sender, uri);
    }

    function getdocuments() public view returns(string[] memory) {
        return user_docs[msg.sender];
    }

    function mint(address to, string memory uri) private {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
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
}