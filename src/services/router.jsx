import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthPage from "../pages/auth.jsx";
import HomePage from "../pages/home.jsx";
import Layout from "../layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="auth" element={<AuthPage />} />
    </Route>
  )
);
export default router;
