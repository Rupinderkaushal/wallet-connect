import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { providerOptions } from "../components/connect-wallet/providerOptions";

const web3Modal = new Web3Modal({
  providerOptions,
  cacheProvider: true,
});
const Home = () => {
  const [userData, setUserData] = useState({
    userAddress: "",
    chainId: "",
    provider: "",
    instance: "",
  });
  const [provider, setProvider] = useState(null);

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const connectToWallet = async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const accounts = await provider.listAccounts();
      const { chainId } = await provider.getNetwork();

      setProvider(provider);
      console.log("chainIdchainIdchainIdchainId", chainId, accounts);

      setUserData({
        userAddress: accounts,
        chainId: chainId,
        provider: provider,
        instance: instance,
      });
      console.log("isUserLoggedIn", !userLoggedIn);
      localStorage.setItem("IsUserLogin", !userLoggedIn);
    } catch (error) {
      console.log("error", error);
    }
  };

  const disconnectWallet = async () => {
    console.log("## provider###", provider);
    localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER')


    // await provider?.close()

    await web3Modal.clearCachedProvider();

      window.location.reload()
  };

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      console.log("## local wallet ###");
      connectToWallet();
    }
  }, []);

  return (
    <div>
      <button onClick={connectToWallet}>Connect Wallet</button>
      {userData.userAddress ? (
        <p>Wallet Address: {userData.userAddress}</p>
      ) : (
        <p>
          <b>Wallet addr: </b>
        </p>
      )}
      {userData.userAddress ? (
        <p>ChainID: {userData.chainId}</p>
      ) : (
        <p>
          <i>Chain Id: </i>
        </p>
      )}

      <button onClick={disconnectWallet}>Discconect Wallet</button>
    </div>
  );
};

export default Home;
