const {
    EnigmaUtils, SigningCosmWasmClient, Secp256k1Pen, pubkeyToAddress, encodeSecp256k1Pubkey
} = require("secretjs");

require('dotenv').config();

const main = async () => {

    const mnemonic = process.env.MNEMONIC;
    const httpUrl = process.env.SECRET_REST_URL;
    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
    const accAddress = pubkeyToAddress(pubkey, 'secret');


    // 1. Initialise client
    const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
    const fees = {
        send: {
            amount: [{ amount: "80000", denom: "uscrt" }],
            gas: "100000",
        },
    }
    const client = new SigningCosmWasmClient(
        httpUrl,
        accAddress,
        (signBytes) => signingPen.sign(signBytes),
        txEncryptionSeed, fees
    );

    // 2. Send tokens
    const rcpt = accAddress; // Set recipient to sender for testing, or generate another account as you did previously.

    // Send 1 SCRT / 1000000 uscrt
    const sent = await client.sendTokens(rcpt, [{amount: "1000000", denom: "uscrt"}]);

    // 3. Query the tx result
    const query = {id: sent.transactionHash};
    const tx = await client.searchTx(query);
    console.log('Transaction: ', tx);
}

main().then(resp => {
    console.log(resp);
}).catch(err => {
    console.log(err);
})
