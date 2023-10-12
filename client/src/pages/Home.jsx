import React, { useState } from 'react';
import Wallet from "../components/Wallet";
import Transfer from "../components/Transfer";

export default function Home() {
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState("");

    const [signature, setSignature] = useState("");
    const [recoverBit, setRecoverBit] = useState("");
    const [msgHash, setMsgHash] = useState("");
    const [message, setMessage] = useState({});

    return (
        <>
            {JSON.stringify(message)}
            <Wallet
                balance={balance}
                setBalance={setBalance}
                address={address} setAddress={setAddress}
                signature={signature}
                recoverBit={recoverBit}
                msgHash={msgHash}
                msg={message}
            />
            <Transfer
                address={address} setAddress={setAddress}
                setSignature={setSignature}
                setRecoverBit={setRecoverBit}
                setMsgHash={setMsgHash}
                setMessage={setMessage}
            />
        </>
    )
}
