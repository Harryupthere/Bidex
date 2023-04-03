import { gql } from "@apollo/client";

export const transactionMutaion = gql`
  mutation SetTransactionData(
    $sellerAddress: String
    $buyerAddress: String
    $plateformWalletAddress: String
    $plateformCuts: Float
    $nftAmount: Float
  ) {
    setTransactionData(
      sellerAddress: $sellerAddress
      buyerAddress: $buyerAddress
      plateformWalletAddress: $plateformWalletAddress
      plateformCuts: $plateformCuts
      nftAmount: $nftAmount
    ) {
      sellerAddress
      buyerAddress
      plateformWalletAddress
      plateformCuts
      nftAmount
    }
  }
`;
