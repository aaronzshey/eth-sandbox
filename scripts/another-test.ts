//we have to see if refreshownership is working
import "dotenv/config";
import pinataSDK, { PinataPinResponse } from "@pinata/sdk";
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_KEY });

const mockData: string = "QmQ1gaMXYC8F2nrvPKHDk2PijDU8k1S6YG4hLHZc55oTrS";

type ownersJSON = {
  owners: string[];
};

async function main() {
  const numOfOwners: number = 3;
  const data: Response = await fetch(
    `${process.env.PINATA_GATEWAY}${mockData}`
  );

  const dj: ownersJSON = await data.json();

  //works
  console.log(dj.owners[numOfOwners - 1]);




}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
