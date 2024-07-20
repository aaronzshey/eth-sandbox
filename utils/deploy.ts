import { mine } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "ethers";
import hardhat from "hardhat";
import * as contract from "../artifacts/contracts/MyNFT.sol/MyNFT.json";

//right now, all of these values are hardcoded
//in the future, I'll make this function more interactive
export default async function deployContract(): Promise<string> {
  const myAddress = "0x06b0ED5338e36623b859081B0692F7dE33aF67E5";
  //ethers is a valid property of hardhat, but typescript doesn't load
  //the hardhat runtime, so it doesn't see it.  if something's going wrong
  //uncomment the line below
  // @ts-ignore
  const impersonatedSigner = await hardhat.ethers.getImpersonatedSigner(
    myAddress
  );

  const myContractFactory = new ethers.ContractFactory(
    contract.abi,
    contract.bytecode,
    impersonatedSigner
  );

  const contractFactoryTxn = await myContractFactory.deploy(myAddress);
  await contractFactoryTxn.waitForDeployment();
  const factoryAddress = await contractFactoryTxn.getAddress();
  await mine();
  return factoryAddress;
}
