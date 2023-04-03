import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { ChainsInfo } from "../config/config-chains";
import { ROYLITIES_ADDRESS } from "../config/constant/address";
import {
  getErc1155Contract,
  getErc720Contract,
  getErc721Contract,
  getErc20Contract
} from "../utils/contractHelper";
import { getNetworkChainID } from "../utils/utility";

function useNFT(address) {
  const { account, library, chainId, active } = useWeb3React();

  getErc721Contract(ChainsInfo[97].LAZY_MINT_ADDRESS, library?.provider)
    ?.getPastEvents("allEvents", {
      fromBlock: 0,
      toBlock: "latest",
      filter: {
        event: "Transfer",
        // returnValues: {
        //   tokenId: "23",
        // },
      },
    })
    .then((events) => console.log(events));

  const mintNFT = (metadata, royaltyCut, royaltyAddress) => {
    return getErc721Contract(
      ChainsInfo[chainId].LAZY_MINT_ADDRESS,
      library.provider
    )
      .methods.directMint(account, metadata, royaltyCut, royaltyAddress)
      .send({
        from: account,
      });
  };

  const saleDataset = (network, tokenId) => {
    return getErc1155Contract(
      ChainsInfo[getNetworkChainID(network)].NFT_MARKETPLACE_ADDRESS,
      ChainsInfo[getNetworkChainID(network)].RPC_PROVIDER_URL
    )
      .methods.SaleDataset(tokenId)
      .call();
  };
  const tokenURI = (network, tokenId) => {
    return getErc721Contract(
      ChainsInfo[getNetworkChainID(network)].LAZY_MINT_ADDRESS,
      ChainsInfo[getNetworkChainID(network)].RPC_PROVIDER_URL
    )
      .methods.tokenURI(tokenId)
      .call();
  };

  const getAllBidders = (network, tokenId) => {
    return getErc1155Contract(
      ChainsInfo[getNetworkChainID(network)].NFT_MARKETPLACE_ADDRESS,
      ChainsInfo[getNetworkChainID(network)].RPC_PROVIDER_URL
    )
      .methods.getAllBidders(tokenId)
      .call();
  };

  const getTotalPrice = (price) => {
    return getErc721Contract(
      ChainsInfo[chainId].LAZY_MINT_ADDRESS,
      library.provider
    )
      .methods.getTotalPrice(new Web3().utils.toWei(price.toString(), "ether"))
      .call();
  };

  const getNFTFinalRate = (price, tokenId) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    )
      .methods.getNFTFinalRate(
        new Web3().utils.toWei(price.toString(), "ether"),
        tokenId
      )
      .call();
  };

  const getTotalNFTCount = () => {
    return getErc721Contract(
      ChainsInfo[chainId].LAZY_MINT_ADDRESS,
      library.provider
    )
      .methods.getTotalNFTCount()
      .call();
  };

  const lazyMintReedem = (account, signature) => {
    return getErc721Contract(
      ChainsInfo[chainId].LAZY_MINT_ADDRESS,
      library.provider
    ).methods.redeem(account, signature);
  };

  const nftApprove = (tokenId) => {
    return getErc721Contract(
      ChainsInfo[chainId].LAZY_MINT_ADDRESS,
      library.provider
    ).methods.setApprovalForAll(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      true
    );
  };
  const nftApproveToken = (price) => {
    return getErc720Contract(
      ChainsInfo[chainId].WRAP_TOKEN_ADDRESS,
      library.provider
    ).methods.approve(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      new Web3().utils.toWei(price, "ether")
    );
  };

  const nftApproveBDTToken = (price) => {
    return getErc20Contract(
      ChainsInfo[chainId].TOKEN_ADDRESS,
      library.provider
    ).methods.approve(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      new Web3().utils.toWei(price, "ether")
    );
  };

  const putOnSale = (tokenId, price) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.putOnSale(
      tokenId,
      new Web3().utils.toWei(price, "ether"),
      ChainsInfo[chainId].NATIVE_TOKEN_ADDRESS,
    );
  };

  const putOnSaleWithToken = (tokenId, price) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.putOnSale(
      tokenId,
      new Web3().utils.toWei(price, "ether"),
      ChainsInfo[chainId].TOKEN_ADDRESS,
    );
  };

  const getBalanceOf = () => {
    return getErc20Contract(
      ChainsInfo[chainId].TOKEN_ADDRESS,
      library.provider
    ).methods.balanceOf(
     account
    ).call();
  };

  const getDecimals = () => {
    return getErc20Contract(
      ChainsInfo[chainId].TOKEN_ADDRESS,
      library.provider
    ).methods.decimals().call();
  };



  const purchaseNFT = (tokenId) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.purchaseNFT(tokenId);
  };

  const removeFromSale = (tokenId) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.removeFromSale(tokenId);
  };

  const cancelAuction = (tokenId) => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.cancelAuction(tokenId);
  };
  const auctionDataset = (network, tokenID) => {
    return getErc1155Contract(
      ChainsInfo[getNetworkChainID(network)].NFT_MARKETPLACE_ADDRESS,
      ChainsInfo[getNetworkChainID(network)].RPC_PROVIDER_URL
    )
      .methods.AuctionDataset(tokenID)
      .call();
  };

  const putOnAuction = (tokenId, bidPrice, auctionTime) => {
    console.log(tokenId, bidPrice, auctionTime);
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.putOnAuction(
      tokenId,
      new Web3().utils.toWei(bidPrice, "ether"),
      auctionTime,
      ChainsInfo[chainId].WRAP_TOKEN_ADDRESS
    );
  };

  const placeBid = (tokenId, bidPrice) => {
    console.log(tokenId, bidPrice);
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    ).methods.bid(tokenId, new Web3().utils.toWei(bidPrice, "ether"));
  };

  // NFT purchanse logic
  const nftPurchased = (NFTOwner, network, NFTData, NFTAuction, NFTSeller) => {
    // eslint-disable-next-line no-lone-blocks
    console.log(NFTOwner, account, network, NFTData, NFTAuction, NFTSeller);

    return active
      ? NFTOwner ===
        ChainsInfo[getNetworkChainID(network)]?.NFT_MARKETPLACE_ADDRESS
        ? NFTData.isAuction
          ? NFTAuction === account
            ? "transfer_nft"
            : "place_bid"
          : NFTSeller === account
          ? "remove_sale"
          : "buy_now"
        : NFTOwner === account
        ? NFTData.isAuction
          ? "putOnAuction"
          : "putOnSale"
        : "not_listed"
      : "connect_wallet";
  };

  const nftAuctionPurchased = (
    NFTOwner,
    network,
    NFTData,
    NFTAuction,
    NFTSeller
  ) => {
    // eslint-disable-next-line no-lone-blocks
    console.log(NFTOwner, account, network, NFTData, NFTAuction, NFTSeller);
    console.log(NFTAuction === account);
    return active
      ? NFTOwner ===
        ChainsInfo[getNetworkChainID(network)]?.NFT_MARKETPLACE_ADDRESS
        ? NFTData
          ? NFTAuction === account
            ? "transfer_nft"
            : "place_bid"
          : NFTSeller === account
          ? "remove_sale"
          : "buy_now"
        : NFTOwner === account
        ? NFTData
          ? "putOnAuction"
          : "putOnSale"
        : "not_listed"
      : "connect_wallet";
  };
  const getPlatformFeeData = () => {
    return getErc1155Contract(
      ChainsInfo[chainId].NFT_MARKETPLACE_ADDRESS,
      library.provider
    )
      .methods.getPlatformFee()
      .call()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  return {
    mintNFT,
    getTotalPrice,
    nftApprove,
    putOnAuction,
    putOnSale,
    putOnSaleWithToken,
    getBalanceOf,
    getDecimals,
    nftPurchased,
    nftAuctionPurchased,
    purchaseNFT,
    removeFromSale,
    getNFTFinalRate,
    lazyMintReedem,
    cancelAuction,
    getTotalNFTCount,
    placeBid,
    auctionDataset,
    saleDataset,
    nftApproveToken,
    getAllBidders,
    tokenURI,
    getPlatformFeeData,
    nftApproveBDTToken
  };
}

export default useNFT;
