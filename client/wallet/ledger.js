import * as secp from 'ethereum-cryptography/secp256k1'
import { keccak256 } from 'ethereum-cryptography/keccak'
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils'

let privateKey =
    '226d7f33b2ba254a934395f2f5ee530fba77ce7d5884d5c540f663b13d5c1427'

export default async function getSignature(msg) {
    let msgHash = toHex(keccak256(utf8ToBytes(msg)))
    const signature = await secp.sign(msgHash, privateKey)
    return { signature, msgHash }
}
