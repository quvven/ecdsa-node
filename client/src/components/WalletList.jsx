import React, { useEffect } from 'react';
import useServer from "../server";
import { useStoreSelector } from '../store';

export default function WalletList() {
    const wallets = useStoreSelector((state) => state.wallet.balances);

    const { get } = useServer("wallet/setWalletList");

    useEffect(() => {
      get("wallets");
    }, []);
    
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Wallet Address</th>
                        <th>Balance</th>
                    </tr>
                </thead>

                <tbody>
                    {wallets && Object.entries(wallets).map((item, key) => (
                        <tr key={key}>
                            <td>{item[0].substring(0, 28)}...{item[0].substring(100, item[0].length)}</td>
                            <td>{item[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
