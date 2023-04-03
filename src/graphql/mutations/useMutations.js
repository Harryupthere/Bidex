import { gql } from "@apollo/client";

export const UserUpdate = gql`
  mutation Mutation(
    $userId: String
    $displayName: String
    $username: String
    $avatarUrl: String
    $aboutDetails: String
    $twitterUrl: String
    $bgImage: String
    $facebookUrl: String
    $instagramUrl: String
  ) {
    updateUser(
      userId: $userId
      displayName: $displayName
      username: $username
      avatar_url: $avatarUrl
      about_details: $aboutDetails
      twitterUrl: $twitterUrl
      bg_image: $bgImage
      facebookUrl: $facebookUrl
      instagramUrl: $instagramUrl
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
    }
  }
`;
