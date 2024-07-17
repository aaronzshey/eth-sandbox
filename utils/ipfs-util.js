import { createHelia } from "helia";
import { json } from "@helia/json";
import "dotenv/config";
import pinataSDK from "@pinata/sdk";
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_KEY });
const helia = await createHelia();

const j = json(helia);

async function main() {
  const myImmutableAddress = await j.add({ hello: "world" });

  console.log(await j.get(myImmutableAddress));
  console.log(myImmutableAddress);

  const response = await pinata.pinJSONToIPFS({ hello: "world" });
  console.log("unpinning: ", response.IpfsHash);
  await pinata.unpin(response.IpfsHash);
  console.log("unpinned");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//next up: https://docs.pinata.cloud/ipfs-101/what-is-ipfs-pinning
