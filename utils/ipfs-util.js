import refreshOwnershipIPFS from "./refreshOwnershipIPFS.js";

const mockCIDfromNFT = "QmdCgu2d6oFugS1fDqRymxBdAiXTEfrsmA16pe6zhndzNP";

let output = refreshOwnershipIPFS(mockCIDfromNFT, "0x03");

console.log(await output);
