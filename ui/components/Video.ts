import { setElementStyles } from './Element';

export function Video(params?: {
  styles?: Partial<CSSStyleDeclaration>;
  srcObject?: MediaStream;
  muted?: boolean;
}) {
  const el = document.createElement('video');

  setElementStyles(el, params?.styles);

  if (params?.srcObject) {
    el.srcObject = params.srcObject;
  }

  if (params?.muted) {
    el.muted = params.muted;
  }

  return el;
}
