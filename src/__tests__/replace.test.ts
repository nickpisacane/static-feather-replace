import replace, {Replacement} from '../replace';

describe('replace', () => {
  it('correctly replaces replacement ranges', () => {
    const test = 'Hello, <foo>! How are you <bar> today?';
    const foo = test.indexOf('<foo>');
    const bar = test.indexOf('<bar>');
    const replacements: Replacement[] = [
      {value: 'World', start: foo, end: foo + 5},
      {value: 'doing', start: bar, end: bar + 5},
    ];

    expect(replace(test, replacements)).toBe(
      'Hello, World! How are you doing today?',
    );
  });
});
