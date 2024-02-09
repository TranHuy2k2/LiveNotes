import AppProvider from "./providers/AppProvider";
import AuthProvider from "./providers/AuthProvider";
import "./App.css";
function App({ children }) {
  return (
    <AuthProvider>
      <AppProvider>{children}</AppProvider>
    </AuthProvider>
  );
}

export default App;
