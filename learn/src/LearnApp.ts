import { Div } from "../../ui/components/Div"
import { Sidebar } from "./views/Sidebar";

const root = document.getElementById("root");

root.append(Sidebar({
  items: [
    {
      title: "Web Development"
    },
    {
      title: "Game Development"
    }
  ]
}))