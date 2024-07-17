// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    // this should be a list of owners, with 0 being the first and higher
    // numbers being more recent owners
    address[] public listOfOwners;


    function getOwnerByIndex(uint256 i) public view returns (address) {
      return listOfOwners[i];
    }

    function getAllOwners() public view returns (address[] memory) {
      return listOfOwners;
    }

    function addOwner(address o) public {
      listOfOwners.push(o);
    }

    constructor(
        address initialOwner
    ) ERC721("MyNFT", "NFT") Ownable(initialOwner) {}

    // https://ethereum.stackexchange.com/questions/115280
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        addOwner(to);
    }

    function safeTransferAndRecordOwner(address from, address to, uint256 tokenId) public {
      safeTransferFrom(from, to, tokenId);
      addOwner(to);
    }


    /*
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    */

    /*
    This function modifies safeTransferFrom to also write to an array of

    */

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
