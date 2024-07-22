import { refreshOwnershipIPFS, getPreviousOwner } from "./getOwnershipIPFS";

import { Contract } from "ethers";
import hardhat from "hardhat";

/*
from MyNFT.sol:
function safeTransferAndRecordOwner(address from, address to, uint256 tokenId, string memory ownerListInput) public {
  safeTransferFrom(from, to, tokenId);
  setListOfOwners(ownerListInput);
  _numOfOwners++;
}
*/

export default async function transfer(nft: Contract, to: string) {
  const previousOwner: string = await getPreviousOwner(nft);
  //@ts-ignore
  const impersonatedSigner = await hardhat.ethers.getImpersonatedSigner(previousOwner);
  const oldIPFSData = await nft.getListOfOwners();
  const newIPFSData = await refreshOwnershipIPFS(oldIPFSData, to);
  //right now the token id is hardcoded at 0.  future impl will allow it as a param
  //@ts-ignore
  await nft.connect(impersonatedSigner).safeTransferAndRecordOwner(
    previousOwner,
    to,
    0,
    newIPFSData
  );
}
