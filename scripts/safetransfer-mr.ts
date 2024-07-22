import { setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { Contract } from "ethers";
import deployContract from "../utils/deploy";
import mintNFT from "../utils/mint";
import transfer from "../utils/transfer";
import hardhat from "hardhat";

const to = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
const toAgain = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const myAddress= "0x06b0ED5338e36623b859081B0692F7dE33aF67E5";
async function main() {
  await setBalance(myAddress, 82500000000000000);
  const factoryAddress: string = await deployContract();
  const nft: Contract = await mintNFT(factoryAddress);

  console.log("transferring...");

  await transfer(nft, to);
  await transfer(nft, toAgain);
  console.log(await nft.ownerOf(0));
  console.log(await nft.getListOfOwners());
  /*
  await nft.safeTransferAndRecordOwner(myAddress, to, 0, "ipfs://deadlnk");
  console.log(await nft.getListOfOwners());

  //@ts-ignore
  const newImpersonatedSigner = await hardhat.ethers.getImpersonatedSigner(to);

  await nft.connect(newImpersonatedSigner).safeTransferAndRecordOwner(to, toAgain, 0, "ipfs://anewlink");
  console.log(await nft.getListOfOwners());
  */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
