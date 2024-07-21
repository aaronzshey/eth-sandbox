import { setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { Contract } from "ethers";
import deployContract from "../utils/deploy";
import mintNFT from "../utils/mint";
//import transfer from "../utils/transfer";

const to = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
const myAddress= "0x06b0ED5338e36623b859081B0692F7dE33aF67E5"
async function main() {
  await setBalance(myAddress, 82500000000000000);
  const factoryAddress: string = await deployContract();
  const nft: Contract = await mintNFT(factoryAddress);

  const poundsig: number = await nft.getNumOfOwners();
  console.log(poundsig);

  const n: string = "anewlink";
  await nft.safeTransferAndRecordOwner(myAddress, to, 0, n);

  console.log(await nft.getListOfOwners())

  const poundsign: number = await nft.getNumOfOwners();
  console.log(poundsign);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
