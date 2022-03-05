import { Button } from '../../../ui/components/Button';
import { Div } from '../../../ui/components/Div';

export type SidebarProps = {
  items: SidebarItem[];
  onClick: (item: SidebarItem) => void;
};

export function Sidebar(props: SidebarProps) {
  const el = Div();

  const addButton = Button({
    innerText: "+",
  });
  addButton.addEventListener("click", () => {
    const pageName = prompt("Page Name");
    addItemsAndContent([{ title: pageName }]);
  });
  el.append(addButton);

  function addItemsAndContent(items: SidebarItem[], depth: number = 0) {
    if (!items || items.length === 0) {
      return;
    }

    for (const item of items) {
      el.append(SidebarItem({ item, depth, onClick: props.onClick }));
      addItemsAndContent(item.content, depth + 1);
    }
  }

  addItemsAndContent(props.items);

  return el;
}

export type SidebarItem = {
  _id?: string;
  title: string;
  content?: SidebarItem[];
};

export type SidebarItemProps = {
  item: SidebarItem;
  depth: number;
  onClick: (item: SidebarItem) => void;
};

export function SidebarItem(props: SidebarItemProps) {
  const el = Div({
    styles: {
      display: "flex",
      alignItems: "center",
      marginLeft: `${8 * props.depth}px`,
    },
    onClick: () => {
      props.onClick(props.item);
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
