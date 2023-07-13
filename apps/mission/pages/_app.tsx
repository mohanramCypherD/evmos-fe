// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import "./globals.css";
import "evmos-wallet/styles.css";
import Script from "next/script";
import Head from "next/head";
import type { AppProps } from "next/app";

declare global {
  interface Window {
    Cypher?: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Import the CDN script */}
        <script src="https://public-dev.cypherd.io/sdk/cypher-sdk.js" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
