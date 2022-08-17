import * as fcl from "@onflow/fcl";

export const mintNFTs = async (name, description, media, data) => {
  const testdata = [{ key: "artist", value: "danish" }];
  data = [data];
  let resourceOwner = "0x3614f2c88992e88b";
  let recipientAddress = "0x4234f1084b6bd0ae";

  const transactionId = await fcl
    .send([
      fcl.transaction`
      import NPMContract from 0x3614f2c88992e88b

      transaction() {
          prepare(acct: AuthAccount) {
              let account = getAccount(${resourceOwner})
              let adminRef = account.getCapability(NPMContract.NFTAdminResourcePublicPath)
                  .borrow<&{NPMContract.NFTAdminResourcePublic}>()
                  ?? panic("Could not borrow public sale reference")
              adminRef.mintToken(name: ${name}, description: ${description}, media: ${media}, data: ${data}, recipientAddress: ${recipientAddress})
          }
      }`,
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.payer(fcl.authz),
      fcl.limit(9999),
    ])
    .then(fcl.decode);
  let response = await fcl.tx(transactionId).onceSealed();
  return response;
};

export const purchseNPM = async (sellerAddress, tokenID) => {
  const transactionId = await fcl
    .send([
      fcl.transaction`
      import NonFungibleToken from 0x631e88ae7f1d7c20
      import NPMContract from 0x3614f2c88992e88b
      import FungibleToken from 0x9a0766d93b6608b7
      import FlowToken from 0x7e60df042a9c0868
      import NFTMarketplace from 0x3614f2c88992e88b

      transaction(sellerAddress: Address, tokenID: UInt64){
          let collectionCap: Capability<&{NPMContract.NPMContractCollectionPublic}>

          prepare(account:AuthAccount){
              var collectionCap = account.getCapability<&{NPMContract.NPMContractCollectionPublic}>(NPMContract.CollectionPublicPath)
              if !collectionCap.check() {
                  account.save(<- NPMContract.createEmptyCollection(), to: NPMContract.CollectionStoragePath)
                  account.link<&{NPMContract.NPMContractCollectionPublic}>(NPMContract.CollectionPublicPath, target: NPMContract.CollectionStoragePath)
              }
              self.collectionCap = collectionCap
          }
          execute{
              let seller = getAccount(${sellerAddress})
              let marketplace = seller.getCapability(NFTMarketplace.SaleCollectionPublicPath)
                  .borrow<&{NFTMarketplace.SalePublic}>()
                  ?? panic("Could not borrow public sale reference")
              marketplace.purchaseNPM(tokenID: ${tokenID}, recipientCap: self.collectionCap)
          }
      }`,
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.payer(fcl.authz),
      fcl.limit(9999),
    ])
    .then(fcl.decode);
  let response = await fcl.tx(transactionId).onceSealed();
  return response;
};

export const purchseNPMWithFlow = async (
  sellerAddress,
  tokenID,
  purchaseAmount
) => {
  const transactionId = await fcl
    .send([
      fcl.transaction`
      import NonFungibleToken from 0x631e88ae7f1d7c20
      import NPMContract from 0x3614f2c88992e88b
      import FungibleToken from 0x9a0766d93b6608b7
      import FlowToken from 0x7e60df042a9c0868
      import NFTMarketplace from 0x3614f2c88992e88b

      transaction(){
          let collectionCap: Capability<&{NPMContract.NPMContractCollectionPublic}>
          let vaultCap: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
          let temporaryVault: @FungibleToken.Vault
          prepare(account:AuthAccount){
              var collectionCap = account.getCapability<&{NPMContract.NPMContractCollectionPublic}>(NPMContract.CollectionPublicPath)
              if !collectionCap.check() {
                  account.save(<- NPMContract.createEmptyCollection(), to: NPMContract.CollectionStoragePath)
                  account.link<&{NPMContract.NPMContractCollectionPublic}>(NPMContract.CollectionPublicPath, target: NPMContract.CollectionStoragePath)
              }
              self.collectionCap = collectionCap
              self.vaultCap = account.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
              let vaultRef = account.borrow<&FlowToken.Vault{FungibleToken.Provider}>(from: /storage/flowTokenVault) 
                              ?? panic("Could not borrow owner''s Vault reference")
              self.temporaryVault <- vaultRef.withdraw(amount: ${purchaseAmount})
              }
          execute{
              let seller = getAccount(${sellerAddress})
              let marketplace = seller.getCapability(NFTMarketplace.SaleCollectionPublicPath)
                  .borrow<&{NFTMarketplace.SalePublic}>()
                  ?? panic("Could not borrow public sale reference")
              marketplace.purchaseNPMWithFlow(tokenID: ${tokenID}, recipientCap: self.collectionCap, buyTokens: <- self.temporaryVault)
          }
      }`,
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.payer(fcl.authz),
      fcl.limit(9999),
    ])
    .then(fcl.decode);
  let response = await fcl.tx(transactionId).onceSealed();
  return response;
};

export const setupAccount = async () => {
  const transactionId = await fcl
    .send([
      fcl.transaction`
      import NonFungibleToken from 0x631e88ae7f1d7c20
      import NPMContract from 0x3614f2c88992e88b
      import FungibleToken from 0x9a0766d93b6608b7
      import FlowToken from 0x7e60df042a9c0868
      import NFTMarketplace from 0x3614f2c88992e88b

      transaction() {
          prepare(acct: AuthAccount) {
              acct.save(<- NPMContract.createEmptyCollection(), to: NPMContract.CollectionStoragePath)
              acct.link<&{NPMContract.NPMContractCollectionPublic}>(NPMContract.CollectionPublicPath, target: NPMContract.CollectionStoragePath)
              let ownerVault = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
              acct.save(<- NFTMarketplace.createSaleCollection(ownerVault: ownerVault), to: NFTMarketplace.SaleCollectionStoragePath)
              acct.link<&{NFTMarketplace.SalePublic}>(NFTMarketplace.SaleCollectionPublicPath, target: NFTMarketplace.SaleCollectionStoragePath)
          }
      }`,
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.payer(fcl.authz),
      fcl.limit(9999),
    ])
    .then(fcl.decode);
  let response = await fcl.tx(transactionId).onceSealed();
  return response;
};

export const listNFTsForSale = async (tokenId, price) => {
  const transactionId = await fcl
    .send([
      fcl.transaction`
      import NonFungibleToken from 0x631e88ae7f1d7c20
      import NPMContract from 0x3614f2c88992e88b
      import FungibleToken from 0x9a0766d93b6608b7
      import FlowToken from 0x7e60df042a9c0868
      import NFTMarketplace from 0x3614f2c88992e88b

      transaction(){
          let collectionRef: &NPMContract.Collection
          let NFTMarketplaceSaleCollectionRef: &NFTMarketplace.SaleCollection
          prepare(account:AuthAccount){
              self.collectionRef = account.borrow<&NPMContract.Collection>(from: NPMContract.CollectionStoragePath) 
                                  ??panic("could not borrow NPMContract collection")
              self.NFTMarketplaceSaleCollectionRef = account.borrow<&NFTMarketplace.SaleCollection>(from: NFTMarketplace.SaleCollectionStoragePath)
                                                      ??panic("could not borrow NFTMarketplace collection")
              }
          execute{
              let token <-  self.collectionRef.withdraw(withdrawID: ${tokenId}) as! @NPMContract.NFT
              self.NFTMarketplaceSaleCollectionRef.listForSale(token: <-token, price: UFix64(${price}))
          }
      }`,
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.payer(fcl.authz),
      fcl.limit(9999),
    ])
    .then(fcl.decode);
  let response = await fcl.tx(transactionId).onceSealed();
  return response;
};

export const unListNFTsForSale = async (tokenId) => {
  const transactionId = await fcl
    .send([
      fcl.transaction`
      import NonFungibleToken from 0x631e88ae7f1d7c20
      import NPMContract from 0x3614f2c88992e88b
      import FungibleToken from 0x9a0766d93b6608b7
      import FlowToken from 0x7e60df042a9c0868
      import NFTMarketplace from 0x3614f2c88992e88b

      transaction(){
          let collectionRef: &NPMContract.Collection
          let NFTMarketplaceSaleCollectionRef: &NFTMarketplace.SaleCollection

          prepare(account:AuthAccount){ 
              let collectionCap = account.getCapability<&{NPMContract.NPMContractCollectionPublic}>(NPMContract.CollectionPublicPath)
              if !collectionCap.check(){
                  account.save(<- NPMContract.createEmptyCollection(), to: NPMContract.CollectionStoragePath)
                  account.link<&{NPMContract.NPMContractCollectionPublic}>(NPMContract.CollectionPublicPath, target: NPMContract.CollectionStoragePath) 
              }
              self.collectionRef = account.borrow<&NPMContract.Collection>(from: NPMContract.CollectionStoragePath) 
                                  ??panic("could not borrow NPMContract collection")
              self.NFTMarketplaceSaleCollectionRef = account.borrow<&NFTMarketplace.SaleCollection>(from: NFTMarketplace.SaleCollectionStoragePath)
                                                      ??panic("could not borrow NFTMarketplace collection")
              }
          execute{
              
              let token <- self.NFTMarketplaceSaleCollectionRef.withdraw(tokenID: ${tokenId})
              self.collectionRef.deposit(token: <- token)
          }
      }`,
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.payer(fcl.authz),
      fcl.limit(9999),
    ])
    .then(fcl.decode);
  let response = await fcl.tx(transactionId).onceSealed();
  return response;
};

export const createEmptyNFTCollection = async () => {
  const transactionId = await fcl
    .send([
      fcl.transaction`
      import NonFungibleToken from 0x631e88ae7f1d7c20
      import NPMContract from 0x3614f2c88992e88b

      transaction() {
          prepare(acct: AuthAccount) {
              acct.save(<- NPMContract.createEmptyCollection(), to: NPMContract.CollectionStoragePath)
              acct.link<&{NPMContract.NPMContractCollectionPublic}>(NPMContract.CollectionPublicPath, target: NPMContract.CollectionStoragePath)
          }
      }`,
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.payer(fcl.authz),
      fcl.limit(9999),
    ])
    .then(fcl.decode);
  let response = await fcl.tx(transactionId).onceSealed();
  return response;
};

export const createEmptySaleCollection = async () => {
  const transactionId = await fcl
    .send([
      fcl.transaction`
      import FungibleToken from 0x9a0766d93b6608b7
      import FlowToken from 0x7e60df042a9c0868
      import NFTMarketplace from 0x3614f2c88992e88b

      transaction() {
          prepare(acct: AuthAccount) {
              let ownerVault = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
              acct.save(<- NFTMarketplace.createSaleCollection(ownerVault: ownerVault), to: NFTMarketplace.SaleCollectionStoragePath)
              acct.link<&{NFTMarketplace.SalePublic}>(NFTMarketplace.SaleCollectionPublicPath, target: NFTMarketplace.SaleCollectionStoragePath)
          }
      }`,
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.payer(fcl.authz),
      fcl.limit(9999),
    ])
    .then(fcl.decode);
  let response = await fcl.tx(transactionId).onceSealed();
  return response;
};

export const getAllListedNFT = async () => {
  const response = await fcl
    .send([
      fcl.script`
    import NFTMarketplace from 0x3614f2c88992e88b

    pub fun main() : {Address: {UInt64: NFTMarketplace.ListingItemPublic}} {
        return NFTMarketplace.getAllListingNMPs()
    }`,
    ])
    .then(fcl.decode);
  return response;
};

export const getAllListedNFTsByUser = async (user) => {
  const response = await fcl
    .send([
      fcl.script`
    import NFTMarketplace from 0x3614f2c88992e88b

    pub fun main() : {UInt64: NFTMarketplace.ListingItemPublic} {
        return NFTMarketplace.getAllListingNMPsByUser(user: ${user})
    }`,
    ])
    .then(fcl.decode);
  return response;
};

export const getResolverView = async (id, account) => {
  const response = await fcl
    .send([
      fcl.script`
    import NPMContract from 0x3614f2c88992e88b
    import MetadataViews from 0x631e88ae7f1d7c20
    
    pub fun main(id: UInt64, account: Address) : &AnyResource{MetadataViews.Resolver} {
        let account1 = getAccount(${account})
        let acct1Capability =  account1.getCapability(NPMContract.CollectionPublicPath)
                                .borrow<&{NPMContract.NPMContractCollectionPublic}>()
                                ??panic("could not borrow receiver reference ")
    
        return acct1Capability.borrowViewResolver(id: ${id})
    }`,
    ])
    .then(fcl.decode);
  return response;
};

export const getUserNFTs = async (account) => {
  const response = await fcl
    .send([
      fcl.script`
    import NPMContract from 0x3614f2c88992e88b

    pub fun main() : {UInt64: AnyStruct}{
        let account1 = getAccount(${account})
        let acct1Capability =  account1.getCapability(NPMContract.CollectionPublicPath)
                                .borrow<&{NPMContract.NPMContractCollectionPublic}>()
                                ??panic("could not borrow receiver reference ")

          let nftIds = acct1Capability.getIDs()

        var dict : {UInt64: AnyStruct} = {}

        for nftId in nftIds {
            let nftData = acct1Capability.borrowNFTNPMContractContract(id: nftId)
            var nftMetaData : {String:AnyStruct} = {}
            
            nftMetaData["name"] =nftData!.name;
            nftMetaData["description"] = nftData!.description;
            nftMetaData["media"] = nftData!.thumbnail;
            nftMetaData["data"] = nftData!.data;
            nftMetaData["creator"] = nftData!.author;
            nftMetaData["ownerAdress"] = account;
            dict.insert(key: nftId,nftMetaData)
        }
        return dict
    }`,
    ])
    .then(fcl.decode);
  return response;
};
