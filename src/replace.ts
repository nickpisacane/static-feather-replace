export interface Replacement {
  value: string;
  start: number;
  end: number;
}

export default (source: string, replacements: Replacement[]): string => {
  let start: number = 0;
  const parts: string[] = [];

  replacements.forEach(replacement => {
    parts.push(source.slice(start, replacement.start));
    parts.push(replacement.value);
    start = replacement.end;
  });

  parts.push(source.slice(start));

  return parts.join('');
};
