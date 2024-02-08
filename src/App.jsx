import { useEffect, useState } from "react";
import AppContext from "./context/AppContext";

function App({ children }) {
  const [auth, setAuth] = useState(null);

  return (
    <AppContext.Provider value={{ auth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
}

export default App;
