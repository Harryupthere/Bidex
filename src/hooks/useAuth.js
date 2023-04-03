import { useWeb3React } from "@web3-react/core";
import { injected } from "../utils/connectors";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Register } from "../graphql/mutations/nftMutations";
import { message } from "antd";
import { CheckWallet, SignIn, UserInfo } from "../graphql/queries/userQueries";
import RegisterModal from "../components/modal/RegisterModal";
import { useState } from "react";

// import { ConnectWallet } from "../Redux/actions";
export const useAuth = () => {
  const [open, setOpen] = useState(false);
  const { activate, deactivate, account, active, chainId } = useWeb3React();
  const history = useHistory();

  let [register] = useMutation(Register, {
    errorPolicy: "all",
  });

  const login = () => {
    activate(injected);
  };
  const UserRegister = (
    name,
    username,
    aboutDetails,
    twitterUrl,
    facebookUrl,
    instagramUrl
  ) => {
    register({
      variables: {
        displayName: name,
        username: username,
        aboutDetails: aboutDetails,
        twitterUrl: twitterUrl,
        facebookUrl: facebookUrl,
        instagramUrl: instagramUrl,
        walletAddress: account,
      },

      update: (cache) => {
        cache.writeQuery({
          query: UserInfo,
          data: {
            user: {
              walletAddress: account,
            },
          },
          variables: {
            walletAddress: account,
          },
        });
      },
    }).then((res) => {
      console.log(res);
      if (res.errors) {
        message.error(res.errors[0].message);
      } else {
        message.success("Wallet Create Succefully");
        changeLoginModalState(false);
        history.goBack();
        // .then(() => ConnectWallet());
      }
    });
  };

  const changeLoginModalState = (state) => {
    console.log(state);
    setOpen(state);
  };

  const logout = async () => {
    // refreshState();
    localStorage.setItem("walletConnect", JSON.stringify({ isConnect: false }));
    deactivate();
  };
  return {
    login,
    logout,
    UserRegister,
    open,
    changeLoginModalState,
  };
};

export default useAuth;
