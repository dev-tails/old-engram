import React from "react";
import { List } from "../components/List";

type Room = {
  _id: string;
  title: string;
  link?: string;
}

type RoomsListPageProps = {};

export const RoomsListPage: React.FC<RoomsListPageProps> = (props) => {
  const items: Room[] = [
    {
      _id: "611f1cca1def03484db6db32",
      title: "XYZ Digital",
      link: `/rooms/611f1cca1def03484db6db32`
    },
  ];

  return (
    <div className="rooms-list-page container">
      <List items={items} />
    </div>
  );
};
