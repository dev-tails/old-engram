export function Span(attributes: { id?: string; class?: string } = {}) {
  const span = document.createElement('span');

  for (const attribute in attributes) {
    span.setAttribute(attribute, attributes[attribute]);
  }

  return span;
}
