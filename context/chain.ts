import { createContext } from "react";
import { Sepolia } from "@thirdweb-dev/chains";

const ChainContext = createContext({
  selectedChain: Sepolia,
  setSelectedChain: (chain: any) => {},
});


export default ChainContext;