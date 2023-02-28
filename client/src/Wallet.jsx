import server from './server'
import * as secp from 'ethereum-cryptography/secp256k1'
import { toHex, h } from 'ethereum-cryptography/utils'

function Wallet({
    address,
    setAddress,
    balance,
    setBalance,
    signature,
    setSignature,
}) {
    async function onChange(evt) {
        const address = evt.target.value
        setAddress(address)

        if (address) {
            const {
                data: { balance },
            } = await server.get(`balance/${address}`)
            setBalance(balance)
        } else {
            setBalance(0)
        }
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>

            <label>
                Your account number:
                <input
                    placeholder="Please enter your public adress"
                    value={address}
                    onChange={onChange}
                ></input>
            </label>

            <div>Address: {address.slice(0, 10)}...</div>

            <div className="balance">Balance: {balance}</div>
        </div>
    )
}

export default Wallet
