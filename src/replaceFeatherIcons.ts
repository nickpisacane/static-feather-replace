import {JSDOM} from 'jsdom';
import {FeatherAttributes, icons} from 'feather-icons';

import replace, {Replacement} from './replace';

const getAttrs = (element: Element): FeatherAttributes =>
  [...element.attributes].reduce(
    (attrs, attr) => {
      attrs[attr.name] = attr.value;
      return attrs;
    },
    {} as FeatherAttributes,
  );

const getClassAttr = (attrs: FeatherAttributes): string[] =>
  (attrs.class ? attrs.class.toString() : '').split(' ').filter(s => !!s);

const getClassStr = (
  attrs: FeatherAttributes,
  elementAttrs: FeatherAttributes,
): string =>
  [
    ...new Set<string>([...getClassAttr(attrs), ...getClassAttr(elementAttrs)]),
  ].join(' ');

const getSVG = (
  element: Element,
  attrs: FeatherAttributes = {},
): string | null => {
  const icon = element.getAttribute('data-feather');

  if (!icon) return null;

  if (!(icon in icons)) {
    throw new Error(`Invalid feather-icon name: "${icon}"`);
  }

  const elementAttrs = getAttrs(element);
  delete elementAttrs['data-feather'];

  return icons[icon].toSvg({
    ...attrs,
    ...getAttrs(element),
    class: getClassStr(attrs, elementAttrs),
  });
};

export default (html: string, attrs?: FeatherAttributes): string => {
  const jsdom = new JSDOM(html, {
    includeNodeLocations: true,
  });

  const replacements = [
    ...jsdom.window.document.querySelectorAll('[data-feather]'),
  ]
    .map(element => {
      if (!element) return null;

      const svg = getSVG(element, attrs);
      const location = jsdom.nodeLocation(element);

      if (!svg || !location) return null;

      return {
        value: svg,
        start: location.startOffset,
        end: location.endOffset,
      } as Replacement;
    })
    .filter((r): r is Replacement => !!r);

  return replace(html, replacements);
};
