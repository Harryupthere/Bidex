import { gql } from "@apollo/client";

const CheckWallet = gql`
  query wallet($address: String!) {
    wallet(address: $address) {
      _id
      address
    }
  }
`;

const SignIn = gql`
  query signIn($walletAddress: String!) {
    signIn(walletAddress: $walletAddress) {
      id
      address
      user {
        displayName
      }
    }
  }
`;

const UserInfo = gql`
  query User($walletAddress: String) {
    user(walletAddress: $walletAddress) {
      _id
      address
      isPrimary
      user {
        _id
        displayName
        isVerify
        username
        avatar_url
        about_details
        bg_image
        twitterUrl
        facebookUrl
        instagramUrl
        userBadge
      }
    }
  }
`;

const GetUserNFT = gql`
  query GetNftsOfUser($creatorAddress: String) {
    getNftsOfUser(creatorAddress: $creatorAddress) {
      _id
      name
      tokenId
      url
      chainId
      network
      collectionAddress
      creatorAddress
      ownerAddress
      imageUrl
      collections
      teams
      athlete
      musician
      artist
      isMarketPlace
      price
      isAuction
      userBadge
    }
  }
`;
const GetOwnerNFT = gql`
  query GetNftsOfOwner($ownerAddress: String) {
    getNftsOfOwner(ownerAddress: $ownerAddress) {
      _id
      name
      tokenId
      url
      chainId
      network
      collectionAddress
      creatorAddress
      ownerAddress
      imageUrl
      collections
      teams
      athlete
      musician
      artist
      isMarketPlace
      price
      isAuction
      nftStatus
    }
  }
`;


const GetSingleNFT = gql`
  query Query($tokenId: String, $collectionAddress: String, $network: String) {
    getSingleNft(
      tokenId: $tokenId
      collectionAddress: $collectionAddress
      network: $network
    ) {
      _id
      name
      tokenId
      url
      chainId
      network
      collectionAddress
      creatorAddress
      lazyMint
      lazyMintData
      nftStatus
      ownerAddress
      imageUrl
      collections
      teams
      athlete
      musician
      artist
      isMarketPlace
      price
      isAuction
    }
  }
`;
export { CheckWallet, SignIn, UserInfo, GetUserNFT, GetOwnerNFT, GetSingleNFT };
