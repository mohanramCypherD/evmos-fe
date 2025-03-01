// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";

import {
  NotifyError,
  NotifySuccess,
} from "../../../common/notifications/notifications";
import {
  ReduxWalletStore,
  resetWallet,
  setWallet,
} from "../../../../wallet/redux/WalletSlice";
import { truncateAddress } from "../../style/format";
import { WALLECT_CONNECT_KEY } from "../wallet";
import {
  GetProviderFromLocalStorage,
  GetProviderWalletConnectFromLocalStorage,
  SaveProviderToLocalStorate,
  SaveProviderWalletConnectToLocalStorage,
} from "../localstorage";
import { ethToEvmos } from "@evmos/address-converter";
import { queryPubKey } from "../pubkey";
import { EVMOS_GRPC_URL } from "../networkConfig";
import type { Logger } from "ethers/lib/utils.js";
import { generatePubkeyFromSignatureWalletConnect } from "./walletconnectHelpers";
import { SNACKBAR_CONTENT_TYPES } from "../../../../notification/types";
import {
  SUCCESSFUL_WALLET_CONNECTION,
  UNSUCCESSFUL_WALLET_CONNECTION,
  useTracker,
} from "tracker";

// Ethers does not have an error type so we can use this for casting
// https://github.com/ethers-io/ethers.js/blob/main/packages/logger/src.ts/index.ts#L268
export type EthersError = Error & {
  reason: string;
  code: keyof typeof Logger.errors;
};

export function useWalletConnect(reduxStore: ReduxWalletStore) {
  const { open } = useWeb3Modal();
  const { address, connector } = useAccount();

  async function connect() {
    await open({ route: "ConnectWallet" });
    reduxStore.dispatch(
      setWallet({
        active: false,
        extensionName: WALLECT_CONNECT_KEY,
        evmosAddressEthFormat: "",
        evmosAddressCosmosFormat: "",
        evmosPubkey: null,
        osmosisPubkey: null,
        accountName: null,
      })
    );
  }

  useEffect(() => {
    if (address) {
      SaveProviderToLocalStorate(WALLECT_CONNECT_KEY);
    }
  }, [address]);

  useEffect(() => {
    if (connector) {
      SaveProviderWalletConnectToLocalStorage(connector.name);
    }
  }, [connector]);

  return { connect, address };
}

export function useActivateWalletConnect(
  store: ReduxWalletStore,
  notificationsEnabled: boolean,
  extensionName: string
) {
  const { address, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  async function generatePubKeyWalletConnect(
    account: string,
    evmosGRPCUrl = EVMOS_GRPC_URL
  ) {
    let pubkey = await queryPubKey(evmosGRPCUrl, account);
    if (pubkey === null) {
      pubkey = await generatePubkeyFromSignatureWalletConnect(account);
    }
    return pubkey;
  }

  const { handlePreClickAction: trackSuccessfulWalletConnection } = useTracker(
    SUCCESSFUL_WALLET_CONNECTION
  );

  const { handlePreClickAction: trackUnsuccessfulWalletConnection } =
    useTracker(UNSUCCESSFUL_WALLET_CONNECTION);

  useEffect(() => {
    async function execute() {
      if (!isDisconnected && extensionName !== WALLECT_CONNECT_KEY) {
        disconnect();
      }

      if (address) {
        const pubkey = await generatePubKeyWalletConnect(address);

        if (pubkey === null) {
          store.dispatch(resetWallet());
          NotifyError(
            {
              type: SNACKBAR_CONTENT_TYPES.TEXT,
              title: "WalletConnect Error",
              text: "You must sign the generate pubkey message to use the dashboard",
            },
            store,
            notificationsEnabled
          );

          trackUnsuccessfulWalletConnection({
            message:
              "You must sign the generate pubkey message to use the dashboard",
            provider: GetProviderFromLocalStorage(),
            walletSelected: GetProviderWalletConnectFromLocalStorage() ?? "",
          });
        }

        store.dispatch(
          setWallet({
            active: true,
            extensionName: WALLECT_CONNECT_KEY,
            evmosAddressEthFormat: address,
            evmosAddressCosmosFormat: ethToEvmos(address),
            evmosPubkey: pubkey,
            osmosisPubkey: null,
            accountName: null,
          })
        );

        NotifySuccess(
          {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: "Connected with WalletConnect",
            text: "Using wallet " + truncateAddress(address),
          },
          store,
          notificationsEnabled
        );

        trackSuccessfulWalletConnection({
          provider: GetProviderFromLocalStorage(),
          walletSelected: GetProviderWalletConnectFromLocalStorage() ?? "",
        });
      }
    }

    // Execute the async function
    // Can not await inside a useEffect
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    execute();
  }, [
    address,
    disconnect,
    isDisconnected,
    extensionName,
    notificationsEnabled,
    store,
  ]);
}
