import AppProvider from "./providers/AppProvider";
import AuthProvider from "./providers/AuthProvider";

function App({ children }) {
  return (
    <AuthProvider>
      <AppProvider>{children}</AppProvider>
    </AuthProvider>
  );
}

export default App;
