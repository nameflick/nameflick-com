import { createConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";
import "@wagmi/core";
import {
  alchemyKey,
  appName,
  infuraKey,
  supportedChains,
  lazySingleton,
} from "@0xflick/utils";

export const appProviders = [
  infuraProvider({
    apiKey: infuraKey.get(),
  }),
  alchemyProvider({
    apiKey: alchemyKey.get(),
  }),
  publicProvider(),
];

export const appChains = lazySingleton(() => {
  return configureChains(supportedChains.get(), appProviders);
});

export type TAppConnectors =
  | MetaMaskConnector
  | WalletConnectConnector
  | CoinbaseWalletConnector
  | InjectedConnector;
export const appConnectors = lazySingleton<TAppConnectors[]>(() => {
  const { chains } = appChains.get();
  return [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "dab55e435303632d6ce634a4f32a652b",
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: appName.get(),
      },
    }),
    new InjectedConnector({ chains }),
  ];
});

export function isMetamaskConnector(connector: TAppConnectors) {
  return connector.id === "metaMask";
}
export const metamaskConnector = lazySingleton(function metamaskConnector() {
  return appConnectors.get().find(isMetamaskConnector);
});
export function isWalletConnector(connector: TAppConnectors) {
  return connector.id === "walletConnect";
}
export const walletConnectConnector = lazySingleton(
  function walletConnectConnector() {
    return appConnectors.get().find(isWalletConnector);
  }
);
export function isCoinbaseWalletConnector(connector: TAppConnectors) {
  return connector.id === "coinbaseWallet";
}
export const coinbaseWalletConnector = lazySingleton(function coinbaseWallet() {
  return appConnectors.get().find(isCoinbaseWalletConnector);
});
export function isInjectedConnector(connector: TAppConnectors) {
  return connector.id === "injected";
}
export const injectedConnector = lazySingleton(function injectedConnector() {
  return appConnectors.get().find(isInjectedConnector);
});

export const wagmiClient = lazySingleton(() => {
  const { provider, webSocketProvider } = appChains.get();
  return createClient({
    connectors: appConnectors.get(),
    provider,
    webSocketProvider,
  });
});

export const wagmiClientAutoConnect = lazySingleton(() => {
  const { provider, webSocketProvider } = appChains.get();
  return createClient({
    connectors: appConnectors.get(),
    provider,
    webSocketProvider,
    autoConnect: true,
  });
});

export type WagmiConfiguredClient =
  | ReturnType<typeof wagmiClient.get>
  | ReturnType<typeof wagmiClientAutoConnect.get>;
