const { CosmWasmClient, Secp256k1Pen, pubkeyToAddress, encodeSecp256k1Pubkey
} = require("secretjs");
const { Bip39, Random } = require("@iov/crypto"); require('dotenv').config(); const main = async () => { const mnemonic = Bip39.encode(Random.getBytes(16)).toString(); const signingPen = await 
  Secp256k1Pen.fromMnemonic(mnemonic); const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey); const accAddress = pubkeyToAddress(pubkey, 'secret'); const client = new 
  CosmWasmClient(process.env.SECRET_REST_URL); const account = await client.getAccount(accAddress); console.log('mnemonic: ', mnemonic); console.log('address: ', accAddress); 
  console.log('account: ', account);
}
main().then(resp => { console.log(resp);
}).catch(err => {
  console.log(err)
})
