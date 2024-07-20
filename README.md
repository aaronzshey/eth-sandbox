# eth-sandbox

```shell
npx hardhat node
npx hardhat run index.js --network localhost
```

todo:
[ ] track ownership using ipfs

- reasoning: storing owner history on-chain is gas inefficient especially for many owners

- solution: keep number of owners variable (private) on chain - store json of owners in ipfs

- if the length of json owners array doesn't match the onchain length of owners,
  perform a block search to find the owners and change the ipfs-stored data
- additionally, implement Qm-prefixed ipfs type checking - if the ipfs url is invalid or doesn't obey the type guards, rebuild the ownership array

[ ] ipfs code done: implement for minting

[ ] link to nft viewer project?
[ ] implement ipfs methods to show spawn of contractfactory

### bulletproof react structure:

slightly modified

```js
root
|
+-- app               # application layer containing:
|   |
|   +-- routes        # application routes / can also be called pages
    +-- app.tsx       # main application component
    +-- app-provider  # application provider that wraps the entire application with global providers
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # global state stores
|
+-- test              # test utilities and mocks
|
+-- types             # shared types used across the application
|
+-- utils             # shared utility functions
```
