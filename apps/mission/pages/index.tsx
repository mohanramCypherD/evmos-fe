import dynamic from "next/dynamic";
import Head from "next/head";
import { Provider, useDispatch, useSelector } from "react-redux";
import { WagmiConfig } from "wagmi";
const Web3Modal = dynamic(() =>
  import("@web3modal/react").then((mod) => mod.Web3Modal)
);
import {
  store,
  ethereumClient,
  projectId,
  wagmiClient,
  StoreType,
  Snackbars,
  getAllSnackbars,
} from "evmos-wallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container, TermOfServices } from "ui-helpers";
import MainContainer from "../src/components/mission/MainContainer";

function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}
export default function Mission() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <>
            <Head>
              <title>Mission Control</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
              <TermOfServices />
              <Container>
                <>
                  <SnackbarsInternal />
                  <MainContainer />
                </>
              </Container>
            </main>
          </>
        </WagmiConfig>
      </QueryClientProvider>
      <Web3Modal
        projectId={projectId}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ethereumClient={ethereumClient}
      />
    </Provider>
  );
}