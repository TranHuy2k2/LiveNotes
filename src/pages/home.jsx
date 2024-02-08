import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function HomePage() {
  const { auth, setAuth } = useContext(AppContext);
  return <div></div>;
}
