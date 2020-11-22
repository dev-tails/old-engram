import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getMe } from "../UsersApi";

type HomePageProps = {};

export const HomePage: React.FC<HomePageProps> = (props) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      try {
        const me = await getMe();
        setUser(me);
        history.push("/notes");
      } catch (err) {
        history.push("/login");
      }
    }

    getUser();
  });

  return null;
};
