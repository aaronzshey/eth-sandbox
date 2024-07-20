import refreshOwnershipIPFS from "./refreshOwnershipIPFS";

import { Contract } from "ethers";

export default async function safeTransferAndRecordOwner(
  nft: Contract,
  address: string
) {
  nft.safeTransferAndRecordOwner(
    "from",
    "to",
    0,
    await refreshOwnershipIPFS(await nft.getListOfOwners(), address)
  );
}
