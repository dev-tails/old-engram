import { Sidebar } from "./views/Sidebar";

const root = document.getElementById("root");

root.append(Sidebar({
  items: [
    {
      title: "Web Development",
      content: [
        {
          title: "How to Build Your First HTML Page"
        },
        {
          title: "Adding Interactivity to HTML With JavaScript"
        }
      ]
    },
    {
      title: "Game Development"
    }
  ]
}))