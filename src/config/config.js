import * as fcl from "@onflow/fcl";

fcl
  .config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  // .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app/authn")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
  .put("0xProfile", "0x3614f2c88992e88b");
