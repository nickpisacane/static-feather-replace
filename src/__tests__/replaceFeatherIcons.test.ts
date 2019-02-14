import replaceFeatherIcons from '../replaceFeatherIcons';

const simpleTest = [
  `<!doctype html>
<html>
<head>
  <title>Simple Test</title>
</head>
<body>
  <i data-feather="github"></i>
</body>
</html>`,

  `<!doctype html>
<html>
<head>
  <title>Simple Test</title>
</head>
<body>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github" data-feather="github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
</body>
</html>`,
];

const complexTest = [
  `<!doctype html>
<html>
<head>
  <title>Complex Test</title>
</head>
<body>
  <div class="foo">
    <i data-feather="github"></i>
  </div>
  <div class="bar">
    <div class="bang">
      <!-- i'm a comment -->
      <i data-feather="heart" class="my-icon" data-foo="bar"></i>
    </div>
  </div>
</body>
</html>`,
  `<!doctype html>
<html>
<head>
  <title>Complex Test</title>
</head>
<body>
  <div class="foo">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github" data-number="42" data-string="some-string" data-feather="github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
  </div>
  <div class="bar">
    <div class="bang">
      <!-- i'm a comment -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart my-icon" data-number="42" data-string="some-string" data-feather="heart" data-foo="bar"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
    </div>
  </div>
</body>
</html>`,
];

describe('replaceFeatherIcons', () => {
  it('replaces simple icon elements with svg', () => {
    const [input, expected] = simpleTest;
    const html = replaceFeatherIcons(input);
    expect(html).toBe(expected);
  });

  it('replaces complex stuff', () => {
    const [input, expected] = complexTest;
    const html = replaceFeatherIcons(input, {
      'data-number': 42,
      'data-string': 'some-string',
    });
    expect(html).toBe(expected);
  });
});
