import { useState } from 'react'
import server from './server'
import getSignature from '../wallet/ledger.js'

function Transfer({ address, setBalance }) {
    const [sendAmount, setSendAmount] = useState('')
    const [recipient, setRecipient] = useState('')

    const setValue = (setter) => (evt) => setter(evt.target.value)

    async function transfer(evt) {
        evt.preventDefault()

        try {
            const { signature, msgHash } = await getSignature(sendAmount)
            const {
                data: { balance },
            } = await server.post(`send`, {
                sender: address,
                signature,
                msgHash,
                amount: parseInt(sendAmount),
                recipient,
            })
            setBalance(balance)
        } catch (ex) {
            alert(ex.response.data.message)
            console.log(ex)
        }
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={sendAmount}
                    onChange={setValue(setSendAmount)}
                ></input>
            </label>

            <label>
                Recipient
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <input type="submit" className="button" value="Transfer" />
            <div></div>
        </form>
    )
}

export default Transfer
