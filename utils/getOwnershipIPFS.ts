import "dotenv/config";
import pinataSDK, { PinataPinResponse } from "@pinata/sdk";
import { Contract } from "ethers";
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_KEY });

type ownersJSON = {
  owners: string[];
};

export async function readIPFSHash(hash: string) {
  const data: Response = await fetch(
    `${process.env.PINATA_GATEWAY}${hash}`
  );

  return data.json();
}

export async function getPreviousOwner(nft: Contract): Promise<string> {
  const prevOwnerIndex = await nft.getNumOfOwners();
  const fetchOwners: Response = await fetch(
    `${process.env.PINATA_GATEWAY}${await nft.getListOfOwners()}`
  );

  const ownersJSON: ownersJSON = await fetchOwners.json();

  return ownersJSON.owners[prevOwnerIndex - 1];
}

export async function initiateOwnership(firstOwner: string): Promise<string> {
  const ownersJSON: ownersJSON = { owners: [] };
  ownersJSON.owners.push(firstOwner);
  const pinTransaction: PinataPinResponse = await pinata.pinJSONToIPFS(
    ownersJSON
  );
  return pinTransaction.IpfsHash;
}

export async function refreshOwnershipIPFS(
  uri: string,
  newOwner: string
): Promise<string> {
  //get the array of original owners
  //uri: string, does not start with ipfs://, begins with "Qm...."
  const ownersRaw: Response = await fetch(
    `${process.env.PINATA_GATEWAY}${uri}`
  );

  //convert the ReadableStream output to JSON
  const ownersJSON: ownersJSON = await ownersRaw.json();

  //add the new owner to the object
  ownersJSON.owners.push(newOwner);

  //send the new data to IPFS
  const response: PinataPinResponse = await pinata.pinJSONToIPFS(ownersJSON);

  //delete the old one so I don't run out of space
  await pinata.unpin(uri);

  //return the new URI
  return response.IpfsHash;
}
