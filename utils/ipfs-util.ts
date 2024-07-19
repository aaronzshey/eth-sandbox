import refreshOwnershipIPFS from "./refreshOwnershipIPFS.js";

async function main() {
  const mockCIDfromNFT = "QmdCgu2d6oFugS1fDqRymxBdAiXTEfrsmA16pe6zhndzNP";

  let output = refreshOwnershipIPFS(mockCIDfromNFT, "0x03");

  console.log(await output);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
