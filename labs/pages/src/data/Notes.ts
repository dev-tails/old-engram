export const notesById = {
  "1": {
    _id: "1",
    type: "page",
    body: "Web Development",
    content: ["2"]
  },
  "2": {
    _id: "2",
    parent: "1",
    type: "page",
    body: "How to Build Your First HTML Page",
    content: [
      "3"
    ]
  },
  "3": {
    _id: "2",
    parent: "2",
    type: "text",
    body: `# Pre-Requisites
    How to Setup Your Development Environment
    
    # Intro to HTML
    HTML stands for HyperText Markup Language. If you have never used it before you should read about the HTML Basics.
    
    # Creating Your First HTML Document
    Open VS Code
    Select File > Open Folder
    Create a new folder called code in your home directory
    Create another new folder inside the code folder called html-intro`
  }
}