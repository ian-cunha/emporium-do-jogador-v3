import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { LoginRegister } from "./pages/LoginRegister"
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/Firebase"
import { QuickRef } from "./pages/QuickRef";

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
        <Route index path="/" element={<Home />} />
        <Route path="/referencias" element={<QuickRef />} />
        <Route path="/login" element={<LoginRegister user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
