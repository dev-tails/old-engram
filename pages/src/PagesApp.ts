import { Sidebar } from './views/Sidebar';

const root = document.getElementById("root");

root.append(
  Sidebar({
    items: [
      {
        title: "Web Development",
        content: [
          {
            title: "How to Build Your First HTML Page"
          },
          {
            title: "Adding Interactivity to HTML With JavaScript"
          },
          {
            title: "Sprucing up HTML With Cascading Style Sheets (CSS)"
          }
        ]
      },
      {
        title: "Software Management",
      },
      {
        title: "Game Development",
      },
    ],
  })
);
