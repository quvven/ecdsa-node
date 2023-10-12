import { useEffect } from "react";
import useServer from "../server";
import { useStoreSelector } from "../store";

function Wallet({
    address, setAddress,
    balance, setBalance,
    signature, recoverBit, msgHash, msg
  }) {
  const wallets = useStoreSelector((state) => state.wallet.list);

  const { post: sendAccept } = useServer();
  const { get: getWallet } = useServer();
  const { get: getWalletList } = useServer("wallet/setWalletList");

  useEffect(() => {
    getWalletList("wallets");
  }, []);

  useEffect(() => {
    if (address) {
      getWallet(`balance/${address}`).then(({balance}) => setBalance(balance));
    } else {
      setBalance(0);
    }
  }, [address]);
  
  async function onChange(evt) {
    const value = evt.target.value;

    setAddress(value);
  }

  const onAccept = () => {
    sendAccept("accept", {
      messageHash: msgHash,
      signature,
      recoverBit,
      message: msg
      });
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <select onChange={onChange}>
          <option value="" selected disabled> - Please Select - </option>
          {wallets && wallets.map((item, key) => (
            <option value={item.publicKey} key={key}>{
              item.publicKey.substring(0, 14)}...{item.publicKey.substring(116, item.publicKey.length)
            }</option>
          ))}
        </select>
      </label>

      <div className="balance">Balance: {balance}</div>
      <hr />
      <input type="button" className="button" value="Accept" onClick={onAccept} />
    </div>
  );
}

export default Wallet;
