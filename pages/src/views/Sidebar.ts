import { Div } from '../../../ui/components/Div';

export type SidebarProps = {
  items: SidebarItem[];
};

export function Sidebar(props: SidebarProps) {
  const el = Div();

  function addItemsAndContent(items: SidebarItem[], depth: number = 0) {
    if (!items || items.length === 0) {
      return;
    }

    for (const item of items) {
      el.append(SidebarItem({ item, depth }));
      addItemsAndContent(item.content, depth + 1);
    }
  }

  addItemsAndContent(props.items);

  return el;
}

type SidebarItem = {
  title: string;
  content?: SidebarItem[];
};

type SidebarItemProps = {
  item: SidebarItem;
  depth: number;
};

export function SidebarItem(props: SidebarItemProps) {
  const el = Div({
    styles: {
      display: "flex",
      alignItems: "center",
      marginLeft: `${8 * props.depth}px`,
    },
  });

  const dropdownArrow = Div({
    innerText: ">",
  });
  el.append(dropdownArrow);

  const text = Div({
    innerText: props.item.title,
  });
  el.append(text);

  return el;
}
