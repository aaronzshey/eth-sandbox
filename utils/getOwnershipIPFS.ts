import "dotenv/config";
import pinataSDK from "@pinata/sdk";
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_KEY });

type ownersJSON = {
  owners: string[];
};

export async function initiateOwnership(firstOwner: string): Promise<string> {
  const ownersJSON: ownersJSON = { owners: [] };
  ownersJSON.owners.push(firstOwner);
  const pinTransaction = await pinata.pinJSONToIPFS(ownersJSON);
  return pinTransaction.IpfsHash;
}

export async function refreshOwnershipIPFS(
  uri: string,
  newOwner: string
): Promise<string> {
  //get the array of original owners
  //uri: string, does not start with ipfs://, begins with "Qm...."
  const ownersRaw = await fetch(`${process.env.PINATA_GATEWAY}${uri}`);

  //convert the ReadableStream output to JSON
  const ownersJSON: ownersJSON = await ownersRaw.json();

  //add the new owner to the object
  ownersJSON.owners.push(newOwner);

  //send the new data to IPFS
  const response = await pinata.pinJSONToIPFS(ownersJSON);

  //delete the old one so I don't run out of space
  await pinata.unpin(uri);

  //return the new URI
  return response.IpfsHash;
}
