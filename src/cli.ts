#!/usr/bin/env node

import {FeatherAttributes} from 'feather-icons';
import yargs from 'yargs';
import getStdin from 'get-stdin';
import * as fs from 'fs-extra';

import replaceFeatherIcons from './replaceFeatherIcons';

const help = `
Usage:
feather-replace <input> [...options]

Examples:
feather-replace input.html >> output.html
feather-replace input.html --outFile output.html
cat input.html | feather-replace >> output.html
feather-replace input.html --data-attribute "bar" --outFile output.html

Options:
  -h, --help          Show this message
  -o, --outFile       Specify the output file (default is stdout)
  --<attribute-name>  Provide an attribute to be added to generated SVG elements.
`;

const usage = () => {
  console.error(help);
};

const reservedFlags = new Set(['h', 'help', 'o', 'outFile']);

const main = async () => {
  const {argv} = yargs;

  if (argv.h || argv.help) {
    usage();
    return;
  }

  const inFile: string | null = argv._[0] || null;
  const outFile: string | null | unknown = argv.o || argv.outFile || null;
  const attrs: FeatherAttributes = Object.keys(argv)
    .filter(key => reservedFlags.has(key) || key === '$0' || key === '_')
    .reduce(
      (attrs, key) => {
        const value = argv[key];
        if (typeof value === 'string' || typeof value === 'number') {
          attrs[key] = value;
        }

        return attrs;
      },
      {} as FeatherAttributes,
    );

  const input = await (inFile ? fs.readFile(inFile) : getStdin());
  const html = replaceFeatherIcons(input.toString(), attrs);

  if (typeof outFile === 'string') {
    await fs.writeFile(outFile, html);
  } else {
    process.stdout.write(html);
  }
};

main().catch(err =>
  process.nextTick(() => {
    throw err;
  }),
);
