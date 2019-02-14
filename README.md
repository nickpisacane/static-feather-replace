# static-feather-replace

Replace feather icons with svg in static html.

# Installation

```sh
# Global
yarn global add static-feather-replace
# OR
npm i -g static-feather-replace

# Local
yarn add -D static-feather-replace
# OR
npm -i -D static-feather-replace
```

# Usage

## CLI

```sh
feather-replace input.html >> output.html
feather-replace input.html --outFile output.html
cat input.html | feather-replace >> output.html
feather-replace input.html --data-attribute "bar" --outFile output.html
```

## Library

```ts
import staticFetherReplace from 'static-feather-replace';

staticFeatherRplace('<html></html>', {'data-added-attribute': 'foo'});
```

API is the same as `feather.replace({})` see: [feather.replace() docs](https://github.com/feathericons/feather#featherreplaceattrs)
