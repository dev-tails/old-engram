import { Div } from "../../../ui/components/Div";

type SidebarItem = {
  title: string;
};

type SidebarProps = {
  items: SidebarItem[];
};

export function Sidebar(props: SidebarProps) {
  const el = Div();

  for (const item of props.items) {
    el.append(SidebarItem({ item }));
  }

  return el;
}

type SidebarItemProps = {
  item: SidebarItem;
};

function SidebarItem(props: SidebarItemProps) {
  const el = Div();

  el.innerText = props.item.title;

  return el;
}
