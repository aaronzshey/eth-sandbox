import { setBalance, mine } from "@nomicfoundation/hardhat-network-helpers";

async function main() {
  await setBalance(
    "0x06b0ED5338e36623b859081B0692F7dE33aF67E5",
    999999999999999999999999999999999999999999999999999999999999,
  );

  await mine();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
