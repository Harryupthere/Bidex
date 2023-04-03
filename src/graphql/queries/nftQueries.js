import { gql } from "@apollo/client";

const GetAll = gql`
  query nfts {
    nfts {
      _id
      name
      tokenId
      url
      chainId
      imageUrl
      network
      nftStatus
      creatorAddress
      ownerAddress
      collectionAddress
    }
  }
`;

const GetAllAuction = gql`
  query AuctionNft {
    auctionNfts {
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
    }
  }
`;

const GetActivity = gql`
  query Activity($contractAddress: String, $network: String, $tokenId: Int) {
    activity(
      contractAddress: $contractAddress
      network: $network
      tokenId: $tokenId
    ) {
      blockNumber
      address
      event
      transactionHash
      returnValues {
        from
        to
        tokenId
      }
    }
  }
`;

const FilterNfts = gql`
  query filterNfts(
    $collections: String
    $team: String
    $athlete: String
    $musician: String
    $artist: String
    $network: String
    $nftStatus: String
    $page: Int
  ) {
    filterNfts(
      collections: $collections
      team: $team
      athlete: $athlete
      musician: $musician
      artist: $artist
      network: $network
      nftStatus: $nftStatus
      page: $page
    ) {
      _id
      name
      tokenId
      url
      imageUrl
      chainId
      price
      network
      nftStatus
      collectionAddress
      creatorAddress
      ownerAddress
      isAuction
      lazyMintData
      lazyMint
      supply
      mintedNft
      availableSupply
      isMarketPlace
      isApproved
    }
  }
`;

const SearchNfts = gql`
  query Query($key: String) {
    searchNfts(key: $key) {
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
      musician
      artist
      isMarketPlace
      price
    }
  }
`;

const GetNFTbyObjectId = gql`
  query GetNFTbyObjectId($nftId: String) {
    getNFTbyObjectId(nftId: $nftId) {
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

const GetAthlete = gql`
  query GetAthlete {
    getAthlete {
      athlete
    }
  }
`;

const GetTeam = gql`
  query GetTeam {
    getTeam {
      team
    }
  }
`;
const GetCollections = gql`
  query GetCollections {
    getCollections {
      collections
    }
  }
`;

export {
  GetAll,
  GetActivity,
  FilterNfts,
  SearchNfts,
  GetAllAuction,
  GetNFTbyObjectId,
  GetCollections,
  GetTeam,
  GetAthlete,
};
