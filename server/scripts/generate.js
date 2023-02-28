const secp = require('ethereum-cryptography/secp256k1')
const { toHex, hexToBytes } = require('ethereum-cryptography/utils')

const privateKey = secp.utils.randomPrivateKey()
const publicKey = secp.getPublicKey(privateKey)

console.log(`private key: ${toHex(privateKey)}`)
console.log(`public key: ${toHex(publicKey)}`)

console.log(
    `public key of 80589e3ce5479306a088ebf2387cfd73e1bc9e656a8aaae9e742c8972a7de45b is: ${toHex(
        secp.getPublicKey(
            '80589e3ce5479306a088ebf2387cfd73e1bc9e656a8aaae9e742c8972a7de45b'
        )
    )}`
)
