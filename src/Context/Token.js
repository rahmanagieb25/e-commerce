import { createContext, useState } from "react";

export let TokenContext = createContext();

export default function TokenContextProvider(props) {
  const [isLogin, setIsLogin] = useState(null);
  return (
    <TokenContext.Provider value={{ isLogin, setIsLogin }}>
      {props.children}
    </TokenContext.Provider>
  );
}
