import { useState } from "react";
import useServer from "../server";
import { useStoreSelector } from "../store";

function Transfer({ 
    address, setAddress,
    setRecoverBit, setSignature, setMsgHash, setMessage
  }) {
  const wallets = useStoreSelector((state) => state.wallet.list);

  const { post: sendApprove } = useServer();

  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      sendApprove("approve", {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        privateKey: wallets.filter(item=>item.publicKey === recipient)[0].privateKey
      }).then(({signature, recoverBit, messageHash}) => {
        console.log({signature, recoverBit, messageHash});

        setSignature(signature);
        setRecoverBit(recoverBit);
        setMsgHash(messageHash);
        setMessage({
          from: address,
          to: recipient,
          amount: parseInt(sendAmount),
        });

        setSendAmount("");
      });
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  const handleRecipiendChange = (e) => {
    const val = e.target.value;

    setAddress(val);
    setRecipient(val);
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
        <select onChange={handleRecipiendChange}>
          <option value="" selected disabled> - Please Select - </option>
          {wallets && wallets.map((item, key) => (
            <option value={item.publicKey} key={key}>{
              item.publicKey.substring(0, 14)}...{item.publicKey.substring(116, item.publicKey.length)
            }</option>
          ))}
        </select>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
