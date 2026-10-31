import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { compile } from 'svelte/compiler';
import { createServer } from 'vite';

const root = resolve('support-kb');
const server = await createServer({
  root,
  configFile: false,
  logLevel: 'error',
  plugins: [svelte({ extensions: ['.svelte', '.svx'], preprocess: [mdsvex({ extensions: ['.svx'] })] })],
  resolve: { alias: { '#lib': resolve(root, 'src/lib') } },
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { renderPage } = await server.ssrLoadModule('/src/render-entry.js');
  const { head, body } = renderPage();
  const components = [
    'src/lib/layouts/runbook.svelte',
    'src/lib/kb/CauseTable.svelte',
    'src/lib/kb/QueueTimeline.svelte',
    'src/lib/kb/RenderStamp.svelte',
  ];
  const styles = await Promise.all(components.map(async (file) => {
    const filename = resolve(root, file);
    return compile(await readFile(filename, 'utf8'), { filename, generate: 'server' }).css?.code ?? '';
  }));
  const output = `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${head}<style>${styles.join('\n')}</style></head><body>${body}</body></html>\n`;
  await mkdir(resolve(root, 'rendered'), { recursive: true });
  await writeFile(resolve(root, 'rendered/4471-review.html'), output);
  console.log('Rendered support-kb/rendered/4471-review.html');
} finally {
  await server.close();
}
