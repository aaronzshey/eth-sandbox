// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;


    uint256 private _numOfOwners;

    string public listOfOwners;


    function incNumOfOwners() private {
      _numOfOwners++;
    }

    function getNumOfOwners() public view returns (uint256) {
      return _numOfOwners;
    }

    function setListOfOwners(string memory uri) public {
      listOfOwners = uri;
    }

    function getListOfOwners() public view returns (string memory) {
      return listOfOwners;
    }

    constructor(
        address initialOwner
    ) ERC721("MyNFT", "NFT") Ownable(initialOwner) {}

    // https://ethereum.stackexchange.com/questions/115280
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        setListOfOwners(uri);
    }

    function safeTransferAndRecordOwner(address from, address to, uint256 tokenId, string memory uri) public {
      safeTransferFrom(from, to, tokenId);
      setListOfOwners(uri);
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
