import { Outlet } from "react-router-dom";
import NavBar from "./components/layout/navbar";

export default function Layout() {
  return (
    <div style={{ width: "100vw" }}>
      <header style={{ width: "100%" }} id="navbar">
        <NavBar />
      </header>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
