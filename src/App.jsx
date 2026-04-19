import { Header, Footer } from "./component/index";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
 useEffect(() => {
  authservice
    .getCurrentUser()
    .then((userData) => {
      if (userData) {
 
        dispatch(
          login({
            $id: userData.$id,
            name: userData.name,
            email: userData.email,
          })
        );
      } else {
        dispatch(logout());
      }
    })
    .catch((er) => {
      console.log(er);
    })
    .finally(() => setLoading(false));
}, []);

  return !loading ? (
    <div className="bg-amber-300">
      <Header />
      <h1 className="text-amber-950 text-2xl">Hello world</h1>
      <Outlet />
      <Footer />
    </div>
  ) : (
    "loading...."
  );
}

export default App;
