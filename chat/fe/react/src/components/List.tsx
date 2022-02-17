import React from "react";
import { Link } from "react-router-dom";
import "./List.scss";

export type ListItem = {
  _id: string;
  title: string;
  link?: string;
};

type ListProps = {
  items: ListItem[];
  onItemPressed?: (item: ListItem) => void;
};

export const List: React.FC<ListProps> = (props) => {
  return (
    <div className="list">
      {props.items.map((item) => {
        const children = (
          <div
            key={item._id}
            className="list__item"
            onClick={props.onItemPressed?.bind(this, item)}
          >
            {item.title}
          </div>
        );

        if (item.link) {
          return <Link key={item._id} to={item.link || ""}>{children}</Link>;
        } else {
          return children;
        }
      })}
    </div>
  );
};
