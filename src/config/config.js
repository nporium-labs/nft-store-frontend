import * as fcl from "@onflow/fcl";

fcl
  .config()
  .put("accessNode.api", "https://https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app/authn");
