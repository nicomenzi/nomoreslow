import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia, Scroll } from "@thirdweb-dev/chains";
import "../styles/globals.css";
import Navbar from "../components/navbar";
import { useState } from "react";
import ChainContext from "../context/chain";
import GameProvider from "../context/game-context";


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

function MyApp({ Component, pageProps }: AppProps) {

  const [selectedChain, setSelectedChain] = useState(Sepolia);


  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
    <GameProvider>
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={ selectedChain }
      supportedChains={[Sepolia, Scroll]}

    >
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </ThirdwebProvider>
    </GameProvider>
    </ChainContext.Provider>
  );
}

export default MyApp;
