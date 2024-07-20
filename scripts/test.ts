//a lot of things break when we switch to typescript
//let's fix them!

import { setBalance } from "@nomicfoundation/hardhat-network-helpers";

import { Contract } from "ethers";
import deployContract from "../utils/deploy";
import mintNFT from "../utils/mint";

async function main() {
  await setBalance(
    "0x06b0ED5338e36623b859081B0692F7dE33aF67E5",
    9999999999999999999999999999999999999999999999999999999
  );
  const factoryAddress: string = await deployContract();
  const nft: Contract = await mintNFT(factoryAddress);

  console.log(await nft.getListOfOwners());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
