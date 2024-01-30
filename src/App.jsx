import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { LoginRegister } from "./pages/LoginRegister"
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/Firebase"
import { ProtectedRoute } from "./config/Protector"
import { QuickRef } from "./pages/QuickRef";
import { Dashboard } from "./backend/pages/Dashboard"
import { Magic } from "./pages/library/magic";

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <p>Carregando...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<div>Oxi, acho que tu se perdesse visse!</div>} />
        <Route index path="/" element={<Home />} />
        <Route index path="/magias/:id" element={<Magic />} />
        <Route path="/referencias" element={<QuickRef />} />
        <Route path="/login" element={<LoginRegister user={user} />} />
        <Route path="/plataforma" element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
