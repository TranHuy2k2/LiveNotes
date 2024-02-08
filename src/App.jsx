import { useEffect, useState } from "react";
import supabase from "./services/supabase";
import AuthComponent from "./components/Auth";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return <div></div>;
}

export default App;
