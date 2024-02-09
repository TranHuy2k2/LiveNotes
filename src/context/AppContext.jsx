import React from "react";

const AppContext = React.createContext({
  users: [],
  setUsers: () => {},
});

export default AppContext;
