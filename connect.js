// Load environment variables
require("dotenv").config();
// Load SecretJS components
const { CosmWasmClient } = require("secretjs"); async function main() {
  // Create connection to DataHub Secret Network node
  const client = new CosmWasmClient(process.env.SECRET_REST_URL);
  // Query chain ID
  const chainId = await client.getChainId();
  // Query chain height
  const height = await client.getHeight(); console.log("ChainId:", chainId); console.log("Block height:", height);
}
main();
