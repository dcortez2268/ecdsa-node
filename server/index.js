const express = require('express')
const app = express()
const cors = require('cors')
const port = 3042
const secp = require('ethereum-cryptography/secp256k1')

app.use(cors())
app.use(express.json())

const balances = {
    '049d853ba9a66b85fc6c9b3eb42153d1a88c4a7348d27ac0693d5077a31f66af8ed84ffb12b511804d2b69ef445b41053fff16b680b1271f98f9edc2774feb190f': 100,
    '0489fac3b7a39265cd6cf7d83e07fcfb41c266bf2c42784880f76e115ddf1b6f9e9eeabd4b00efd24368850c014e5af2295b73081124a6e59af25d0003e97ced6e': 100,
    '04d0a53659e4a8ef305156aa9c665a8252a80aa9eb15af6d004c22f1a4730a1575d02415deb8c1f135320d774ee1b4c03227aa9464e41d9e5a454cea0bc375952b': 100,
}

app.get('/balance/:address', (req, res) => {
    const { address } = req.params
    const balance = balances[address] || 0
    res.send({ balance })
})

app.post('/send', async (req, res) => {
    const { sender, recipient, amount, signature, msgHash } = req.body
    // resolves issue of json not supporting Uint8Array data type
    const decodedSignature = new Uint8Array(Object.values(signature))

    const isValid = secp.verify(decodedSignature, msgHash, sender)
    if (!isValid) {
        res.status(400).send({
            message: 'You can only send funds from your account!',
        })
        return
    }

    setInitialBalance(sender)
    setInitialBalance(recipient)

    if (balances[sender] < amount) {
        res.status(400).send({ message: 'Not enough funds!' })
    } else {
        balances[sender] -= amount
        balances[recipient] += amount
        res.send({ balance: balances[sender] })
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0
    }
}
