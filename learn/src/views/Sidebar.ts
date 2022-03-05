import { Div } from "../../../ui/components/Div";

type SidebarItem = {
  title: string;
  content?: SidebarItem[];
};

type SidebarProps = {
  items: SidebarItem[];
};

export function Sidebar(props: SidebarProps) {
  const el = Div();

  for (const item of props.items) {
    el.append(SidebarItem({ item }));

    if (item?.content) {
      for (const subItem of item?.content) {
        el.append(SidebarItem({ item: subItem, indent: 1 }));
      }
    }
  }

  return el;
}

type SidebarItemProps = {
  item: SidebarItem;
  indent?: number;
};

function SidebarItem(props: SidebarItemProps) {
  const el = Div();

  const indent = props.indent || 0;
  const textEl = Div({
    styles: {
      marginLeft: `${8 * indent}px`,
    },
  });

  textEl.innerText = props.item.title;
  el.append(textEl);

  return el;
}
