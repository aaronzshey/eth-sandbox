import {
  setBalance,
  mine,
} from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "ethers";

import hardhat from "hardhat";
import * as contract from "./artifacts/contracts/MyNFT.sol/MyNFT.json" with { type: "json" };

async function main() {
  const myAddress = "0x06b0ED5338e36623b859081B0692F7dE33aF67E5";

  await setBalance(
    "0x06b0ED5338e36623b859081B0692F7dE33aF67E5",
    9999999999999999999999999999999999999999999999999999999,
  );


  await mine();
  console.log("mined");

  const impersonatedSigner =
    await hre.ethers.getImpersonatedSigner(myAddress);

  const myContractFactory = new ethers.ContractFactory(
    contract.default.abi,
    contract.default.bytecode,
    impersonatedSigner,
  );

  const contractFactoryTxn = await myContractFactory.deploy(myAddress);
  await contractFactoryTxn.waitForDeployment();
  const factoryAddress = await contractFactoryTxn.getAddress();

  const myNFTContract = new ethers.Contract(
    factoryAddress,
    contract.default.abi,
    impersonatedSigner,
  );

  let txn = await myNFTContract.safeMint(
    impersonatedSigner.address,
    "ipfs://deadlink",
  );

  await txn.wait();
  console.log(`Mint successful: ${txn.hash}`);

  //we're going to use the factory address?
  //https://stackoverflow.com/questions/71894376
  //token id has to be saved somehow from the factory

  //@params: from, to, id
  myNFTContract.safeTransferAndRecordOwner(myAddress, "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", 0);

  const owners = await myNFTContract.getAllOwners();
  console.log(owners);


  console.log(await myNFTContract.ownerOf(0))




  await mine();
  //console.log(factoryAddress);
  await setBalance(
    "0x06b0ED5338e36623b859081B0692F7dE33aF67E5",
    65170898460000000,
  );



  await mine();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
