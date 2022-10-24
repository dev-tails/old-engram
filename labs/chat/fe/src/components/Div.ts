export function Div(attributes: { id?: string; class?: string } = {}) {
  const div = document.createElement("div");

  for (const attribute in attributes) {
    div.setAttribute(attribute, attributes[attribute]);
  }

  return div;
}