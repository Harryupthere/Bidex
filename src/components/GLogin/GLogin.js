import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Glogin = ({ isLogin, setIsLogin }) => {
  const clientId =
    "190999831621-ar4dg0eojgq8b3n2gp337dcht7rkc50l.apps.googleusercontent.com";
  const { isGoogleLogin } = useAuth();
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    console.log("success:", res);
    setIsLogin(true);
    // changeGoogleLoginModalState(true);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with Google"
      redirectUri="http://localhost:3000/redirect"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={isLogin}
    />
  );
};
export default Glogin;
