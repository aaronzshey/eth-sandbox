import { mine } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, Contract } from "ethers";
import hardhat from "hardhat";
import { initiateOwnership } from "./getOwnershipIPFS";
import * as contract from "../artifacts/contracts/MyNFT.sol/MyNFT.json";

//right now, all of these values are hardcoded
//in the future, I'll make this function more interactive
export default async function mintNFT(
  factoryAddress: string
): Promise<Contract> {
  const myAddress = "0x06b0ED5338e36623b859081B0692F7dE33aF67E5";
  const impersonatedSigner = await hardhat.ethers.getImpersonatedSigner(
    myAddress
  );

  const myNFTContract = new ethers.Contract(
    factoryAddress,
    contract.abi,
    impersonatedSigner
  );

  //from mynft.sol:
  /*
  ```solidity
  function safeMint(address to, string memory uri, string memory owner) public onlyOwner {
      uint256 tokenId = _nextTokenId++;
      _safeMint(to, tokenId);
      _setTokenURI(tokenId, uri);
      setListOfOwners(owner);
  }
  ```
  */

  let ownershipData: string = await initiateOwnership(myAddress);
  let txn = await myNFTContract.safeMint(
    myAddress,
    "ipfs://deadlink",
    ownershipData
  );

  await txn.wait();

  mine();

  console.log(`Mint successful: ${txn.hash}`);

  return myNFTContract;
}
