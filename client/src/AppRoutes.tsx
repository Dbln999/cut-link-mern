import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LinksPage from "./pages/LinksPage";
import AuthPage from "./pages/AuthPage";
import { useAppSelector } from "./store/hooks";

const AppRoutes = () => {
  const token = useAppSelector((state) => state.token.token);
  return token !== undefined ? (
    <Routes>
      <Route path="/links" element={<LinksPage></LinksPage>}></Route>
      <Route path="*" element={<Navigate to={"/links"}></Navigate>}></Route>
    </Routes>
  ) : (
    <Routes>
      <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
      <Route path="*" element={<Navigate to={"/auth"}></Navigate>}></Route>
    </Routes>
  );
};

export default AppRoutes;
