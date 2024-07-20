//a lot of things break when we switch to typescript
//let's fix them!

import contract from "./artifacts/contracts/MyNFT.sol/MyNFT.json";
import hardhat, { ethers } from "hardhat";

console.log(contract.abi);

async function main() {
  const myAddress = "0x06b0ED5338e36623b859081B0692F7dE33aF67E5";

  const impersonatedSigner = await hardhat.ethers.getImpersonatedSigner(
    myAddress
  );
  console.log(impersonatedSigner);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
