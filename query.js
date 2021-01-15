const {
  CosmWasmClient
} = require("secretjs");

require('dotenv').config();

const main = async () => {
  // Create connection to DataHub Secret Network node
  const client = new CosmWasmClient(process.env.SECRET_REST_URL)

  // 1. Query node info
  const nodeInfo = await client.restClient.nodeInfo();
  console.log('nodeInfo: ', nodeInfo);

  // 2. Query latest blocks
  const blocksLatest = await client.restClient.blocksLatest();
  console.log('blocksLatest: ', blocksLatest);

  // 3. Query account
  const account = await client.getAccount(process.env.ADDRESS)
  console.log('Account: ', account);
}

main().then(resp => {
  console.log(resp);
}).catch(err => {
  console.log(err);
})
