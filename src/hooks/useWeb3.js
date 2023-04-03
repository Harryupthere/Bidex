import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Web3 from "web3";
import { ChainsInfo } from "../config/config-chains";
import { toHex } from "../utils/utility";
import useContract from "./useContract";
function useWeb3() {
  const { activate, deactivate, account, active, chainId, library } =
    useWeb3React();
  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(chainId) }],
      });
    } catch (switchError) {
      //   if (switchError.code === 4902) {
      //     try {
      //       await library.provider.request({
      //         method: "wallet_addEthereumChain",
      //         params: [networkParams[toHex(chainId)]],
      //       });
      //     } catch (error) {
      //       console.log(error);
      //     }
    }
  };

  const signCreate = async (price, uri, royaltyCut, royaltyWalletAddr) => {
    try {
      const domain = {
        name: "LazyNFT-Voucher",
        version: "1",
        chainId: chainId,
        verifyingContract: ChainsInfo[chainId].LAZY_MINT_ADDRESS,
      };

      const value = {
        creator: account,
        minPrice: new Web3().utils.toWei(price, "ether"),
        royaltyCut: royaltyCut,
        royaltyWalletAddr: royaltyWalletAddr,
        uri: uri,
      };

      const types = {
        NFTVoucher: [
          { name: "creator", type: "address" },
          { name: "minPrice", type: "uint256" },
          { name: "royaltyCut", type: "uint256" },
          { name: "royaltyWalletAddr", type: "address" },
          { name: "uri", type: "string" },
        ],
      };

      const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      let signature = await signer._signTypedData(domain, types, value);
      console.log(value, signature);
      return { value, signer: signature };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    switchNetwork,
    signCreate,
  };
}

export default useWeb3;
