import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { getMe } from "../UsersApi";

type HomePageProps = {};

export const HomePage: React.FC<HomePageProps> = (props) => {
  const history = useHistory();
  useEffect(() => {
    async function getUser() {
      try {
        await getMe();
        history.push("/notes");
      } catch (err) {
        history.push("/login");
      }
    }

    getUser();
  });

  return null;
};
