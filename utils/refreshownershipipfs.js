import "dotenv/config";
import pinataSDK from "@pinata/sdk";
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_KEY });

export async function refreshOwnershipIPFS(uri, newOwner) {
  const originalOwnersRaw = await fetch(`${process.env.PINATA_GATEWAY}${uri}`);

  const originalOwnersJSON = await originalOwnersRaw.json();
  let newOwners = originalOwnersJSON.owners.push(newOwner);

  const response = await pinata.pinJSONToIPFS(newOwners);

  await pinata.unpin(uri);
  return response.IpfsHash;
}
