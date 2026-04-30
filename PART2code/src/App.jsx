import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import appStore from "./utils/appStore";
import { addUser } from "./utils/userSlice";
import { BASE_URL } from "./utils/constants";

import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";

function AppWrapper() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });

        dispatch(addUser(res.data));
      } catch (err) {
        console.log("Not logged in");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={appStore}>
      <AppWrapper />
    </Provider>
  );
}

export default App;
