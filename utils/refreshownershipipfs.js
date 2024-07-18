import "dotenv/config";
import pinataSDK from "@pinata/sdk";
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_KEY });

export default async function refreshOwnershipIPFS(uri, newOwner) {
  const originalOwnersRaw = await fetch(`${process.env.PINATA_GATEWAY}${uri}`);

  const originalOwnersJSON = await originalOwnersRaw.json();
  originalOwnersJSON.owners.push(newOwner);
  const response = await pinata.pinJSONToIPFS(originalOwnersJSON);

  await pinata.unpin(uri);
  return response.IpfsHash;
}
