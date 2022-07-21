import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink';

export const INFURAID = "795fff49a454480d945bde511a2b712c";
export const CHAINID = 1

export const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        appName: "My Awesome App", // Required
        infuraId: INFURAID, // Required
        rpc: "", // Optional if `infuraId` is provided; otherwise it's required
        chainId: CHAINID, // Optional. It defaults to 1 if not provided
  
      },
      qrcodeModalOptions: {
          mobileLinks: [
              "metamask",
              "trust",
              "argent",
              "rainbow",
              "imtoken",
              "pillar",
          ]
      }
  },
    injected: {
      display: {
        name: 'Metamask',
        description: 'Connect with the provider in your Browser',
      },
      package: null,
    },
    walletlink: {
      package: WalletLink, // Required
      options: {
        infuraId: INFURAID, // Required unless you provide a JSON RPC url; see `rpc` below
        appName: "My Awesome App", // Required
        rpc: "", // Optional if `infuraId` is provided; otherwise it's required
        chainId: CHAINID, // Optional. It defaults to 1 if not provided
  
      },
    },
  }