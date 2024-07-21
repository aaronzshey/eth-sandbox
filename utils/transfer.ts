import { refreshOwnershipIPFS, getPreviousOwner } from "./getOwnershipIPFS";

import { Contract } from "ethers";

/*
from MyNFT.sol:
function safeTransferAndRecordOwner(address from, address to, uint256 tokenId, string memory ownerListInput) public {
  safeTransferFrom(from, to, tokenId);
  setListOfOwners(ownerListInput);
  _numOfOwners++;
}
*/

export default async function transfer(nft: Contract, address: string) {
  //right now the token id is hardcoded at 0.  future impl will allow it as a param
  await nft.safeTransferAndRecordOwner(
    await getPreviousOwner(nft),
    address,
    0,
    await refreshOwnershipIPFS(await nft.getListOfOwners(), address)
  );
}
