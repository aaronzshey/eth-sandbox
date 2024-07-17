import { createHelia } from 'helia'
import { json } from '@helia/json'

const helia = await createHelia()
const j = json(helia)

const myImmutableAddress = await j.add({ hello: 'world' })

console.log(await j.get(myImmutableAddress))
console.log(myImmutableAddress)

process.exit(0);

//next up: https://docs.pinata.cloud/ipfs-101/what-is-ipfs-pinning
