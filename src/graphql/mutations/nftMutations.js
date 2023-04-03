import { gql } from "@apollo/client";

const Register = gql`
  mutation SignUp(
    $displayName: String
    $username: String
    $twitterUrl: String
    $aboutDetails: String
    $facebookUrl: String
    $instagramUrl: String
    $walletAddress: String
  ) {
    signUp(
      displayName: $displayName
      username: $username
      twitterUrl: $twitterUrl
      about_details: $aboutDetails
      facebookUrl: $facebookUrl
      instagramUrl: $instagramUrl
      walletAddress: $walletAddress
    ) {
      _id
      displayName
      username
      avatar_url
      about_details
      bg_image
      twitterUrl
      facebookUrl
      instagramUrl
      isVerify
      wallets {
        _id
        address
      }
    }
  }
`;
const CreateNft = gql`
  mutation CreateNft(
    $name: String
    $tokenId: String
    $url: String
    $network: String
    $imageUrl: String
    $chainId: Int
    $nftStatus: String
    $lazyMintData: String
    $isAuction: Boolean
    $collectionAddress: String
    $collections: String
    $ownerAddress: String
    $creatorAddress: String
    $teams: String
    $athlete: String
    $musician: String
    $artist: String
    $supply: Int
    $availableSupply: Int
    $mintedNft: Int
    $price: Float
    $isMarketPlace: Boolean
    $lazyMint: String
  ) {
    createNft(
      name: $name
      tokenId: $tokenId
      url: $url
      network: $network
      imageUrl: $imageUrl
      chainId: $chainId
      nftStatus: $nftStatus
      lazyMintData: $lazyMintData
      isAuction: $isAuction
      collectionAddress: $collectionAddress
      collections: $collections
      ownerAddress: $ownerAddress
      creatorAddress: $creatorAddress
      teams: $teams
      athlete: $athlete
      musician: $musician
      artist: $artist
      supply: $supply
      availableSupply: $availableSupply
      mintedNft: $mintedNft
      price: $price
      isMarketPlace: $isMarketPlace
      lazyMint: $lazyMint
    ) {
      _id
      name
      tokenId
      url
      chainId
      network
      lazyMint
      lazyMintData
      nftStatus
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
      isAuction
      price
      supply
      mintedNft
      availableSupply
      isApproved
    }
  }
`;
const UpdateNft = gql`
  mutation Mutation(
    $collectionAddress: String
    $tokenId: String
    $isMarketPlace: Boolean
    $nftStatus: String
    $price: Float
    $ownerAddress: String
  ) {
    putOnSale(
      collectionAddress: $collectionAddress
      tokenId: $tokenId
      isMarketPlace: $isMarketPlace
      nftStatus: $nftStatus
      price: $price
      ownerAddress: $ownerAddress
    ) {
      _id
      name
      tokenId
      url
      chainId
      network
      nftStatus
      collectionAddress
      creatorAddress
      ownerAddress
      imageUrl
      collections
      teams
      athlete
      isAuction
      musician
      artist
      isMarketPlace
      price
    }
  }
`;

const LazyMint = gql`
  mutation Mutation(
    $id: String
    $tokenId: String
    $isMarketPlace: Boolean
    $nftStatus: String
    $price: Float
    $ownerAddress: String
    $lazyMintData: String
    $lazyMint: String
  ) {
    lazyMintUpdate(
      _id: $id
      tokenId: $tokenId
      isMarketPlace: $isMarketPlace
      nftStatus: $nftStatus
      price: $price
      ownerAddress: $ownerAddress
      lazyMintData: $lazyMintData
      lazyMint: $lazyMint
    ) {
      _id
      name
      tokenId
      url
      chainId
      network
      lazyMint
      lazyMintData
      nftStatus
      collectionAddress
      creatorAddress
      ownerAddress
      imageUrl
      collections
      teams
      athlete
      musician
      artist
      isAuction
      isMarketPlace
      price
    }
  }
`;

const DeleteNft = gql`
  mutation Mutation($deleteNftId: String!) {
    deleteNft(id: $deleteNftId) {
      _id
      name
      tokenId
      url
      chainId
      network
      lazyMint
      lazyMintData
      nftStatus
      collectionAddress
      creatorAddress
      ownerAddress
      imageUrl
      collections
      teams
      isAuction
      athlete
      musician
      artist
      isMarketPlace
      price
    }
  }
`;

const MintedSupply = gql`
  mutation MintedNftUpdate(
    $nftId: String
    $mintedNft: Int
    $availableSupply: Int
  ) {
    mintedNftUpdate(
      nftId: $nftId
      mintedNft: $mintedNft
      availableSupply: $availableSupply
    ) {
      _id
      name
      tokenId
      url
      chainId
      network
      lazyMint
      lazyMintData
      nftStatus
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
      isAuction
      price
      supply
      mintedNft
      availableSupply
    }
  }
`;
export { Register, CreateNft, UpdateNft, LazyMint, DeleteNft, MintedSupply };
