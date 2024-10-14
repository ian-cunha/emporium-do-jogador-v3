import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginRegister } from "./pages/LoginRegister";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/Firebase";
import { ProtectedRoute } from "./config/Protector";
import { QuickRef } from "./pages/QuickRef";
import { Dashboard } from "./backend/pages/Dashboard";
import { Magic } from "./pages/library/magic";
import { Loading } from "./components/Globals";
import CharacterCreation from "./backend/pages/CharacterCreation";
import { QuickRefInside } from "./backend/pages/QuickRefInside";
import Settings from "./backend/pages/Settings";
import CharactersPage from "./backend/pages/CharactersPage";
import SessionManager from "./backend/pages/SessionManager";
import SessionHub from "./backend/pages/SessionHub";

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsFetching(false);
    });
    return unsubscribe;
  }, []);

  if (isFetching) {
    return (
      <Loading>
        <span className="loader" />
        <h3>Carregando...</h3>
      </Loading>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<div>Oxi, acho que tu se perdesse visse!</div>} />
        <Route index element={<Home />} />
        <Route path=":id" element={<Magic />} />
        <Route path="referencias" element={<QuickRef />} />
        <Route path="login" element={<LoginRegister user={user} />} />
        <Route 
          path="plataforma" 
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="ficha" 
          element={
            <ProtectedRoute user={user}>
              <CharacterCreation />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="referenciaplataforma" 
          element={
            <ProtectedRoute user={user}>
              <QuickRefInside />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="configuracoes" 
          element={
            <ProtectedRoute user={user}>
              <Settings />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="fichas" 
          element={
            <ProtectedRoute user={user}>
              <CharactersPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="sessao" 
          element={
            <ProtectedRoute user={user}>
              <SessionManager />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="sessao/:id" 
          element={
            <ProtectedRoute user={user}>
              <SessionHub />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;