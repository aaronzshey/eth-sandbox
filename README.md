# eth-sandbox


```shell
npx hardhat node
npx hardhat run index.js --network localhost
```

todo:
[ ] track ownership using ipfs
    - reasoning: storing owner history on-chain is gas inefficient especially for many owners
    - solution: keep number of owners variable (private) on chain
    - store json of owners in ipfs
    - if the length of json owners array doesn't match the onchain length of owners,
      perform a block search to find the owners and change the ipfs-stored data
[ ] implement ipfs methods to show spawn of contractfactory
