//a lot of things break when we switch to typescript
//let's fix them!

import { setBalance } from "@nomicfoundation/hardhat-network-helpers";

import { Contract } from "ethers";
import deployContract from "../utils/deploy";
import mintNFT from "../utils/mint";
//import transfer from "../utils/transfer";
import { readIPFSHash, refreshOwnershipIPFS } from "../utils/getOwnershipIPFS"

const to = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
const myAddress= "0x06b0ED5338e36623b859081B0692F7dE33aF67E5"
async function main() {
  await setBalance(myAddress, 82500000000000000);
  const factoryAddress: string = await deployContract();
  const nft: Contract = await mintNFT(factoryAddress);
  const hash = await nft.getListOfOwners();
  console.log(hash);
  console.log(await readIPFSHash(hash));

  const newHash = await refreshOwnershipIPFS(hash, to);
  console.log(newHash);

  await nft.setListOfOwners(newHash);

  console.log(await nft.getListOfOwners());

  /*
  nft.safeTransferAndRecordOwner(
    myAddress,
    to,
    0,
    newHash
  )


  console.log(await nft.getListOfOwners());

  nft.safeTransferAndRecordOwner(
    myAddress,
    to,

  )

  console.log(await nft.getListOfOwners());

  //send it back and forth a couple of times
  transfer(nft, to);
  transfer(nft, myAddress);
  transfer(nft, to);

  const hash = await nft.getListOfOwners();
  console.log(await readIPFSHash(hash));
  */

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
