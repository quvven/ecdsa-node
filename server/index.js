const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { genWallet } = require('./utils/generator');

const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());


const wallets = [
  genWallet(),
  genWallet(),
  genWallet(),
];

const balances = {
  [wallets[0].publicKey]: 100,
  [wallets[1].publicKey]: 50,
  [wallets[2].publicKey]: 75
}

app.get("/wallets", (req, res) => {
  res.status(200).json({ balances, wallets });
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/approve", async (req, res) => {
  const { sender, recipient, amount, privateKey } = req.body;

  let message = {
    from: sender,
    to: recipient,
    amount: amount,
  };

  const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));
  const signature = await secp.sign(messageHash, privateKey, { recovered: true })

  res.send({
    signature: toHex(signature[0]),
    recoverBit: signature[1],
    messageHash: toHex(messageHash)
  });
});

app.post("/accept", (req, res) => {
  const { messageHash, signature, recoverBit, message } = req.body;

  const recoverKey = secp.recoverPublicKey(messageHash, signature, recoverBit);

  console.log("Recover Key:", toHex(recoverKey));

  const {
    from: sender,
    to: recipient,
    amount: amount,
  } = message;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (toHex(recoverKey) !== recipient) {
    res.status(400).send({ message: "Invalid signature!" });
    return;
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
