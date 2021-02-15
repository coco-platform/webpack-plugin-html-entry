/* eslint-disable import/prefer-default-export */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

// package
import url from 'url';
import { Compiler, Compilation, sources, WebpackPluginInstance } from 'webpack';

// scope
const { RawSource } = sources;

const createScript = (pathname: string) =>
  `<script src="${pathname}"></script>`;
const createStylesheet = (pathname: string) =>
  `<link rel="stylesheet" href="${pathname}" />`;
const createRoot = () => '<div class="root"></div>';

export class HTMLEntryPlugin implements WebpackPluginInstance {
  apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap('HTMLEntry', (compilation) => {
      compilation.hooks.processAdditionalAssets.tap(
        {
          name: 'HTMLEntry',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          const entrypoint = compilation.entrypoints.get('main');

          if (!entrypoint) {
            // eslint-disable-next-line quotes
            throw new Error(`HTMLEntryPlugin can't recognize entrypoints`);
          }

          // runtime chunk first
          // TODO - resolve complicated dependency graph
          const chunks = entrypoint.chunks.sort((a) =>
            a.hasRuntime() ? -1 : 1
          );
          const files = chunks.reduce<string[]>((acc, chunk) => {
            return [...acc, ...chunk.files];
          }, []);

          // element order:
          //   1. stylesheet
          //   2. script
          //   3. html inline
          const source = files
            .sort((a) => (a.endsWith('.css') ? -1 : 1))
            .map((filename) =>
              url.resolve(
                compiler.options.output.publicPath as string,
                filename
              )
            )
            .map((filename) => {
              switch (true) {
                case filename.endsWith('.css'):
                  return createStylesheet(filename);
                case filename.endsWith('.js'):
                  return createScript(filename);
                default:
                  // just ignore lint waning
                  return undefined;
              }
            })
            .concat(createRoot())
            .join('\n');

          compilation.emitAsset('index.html', new RawSource(source));
        }
      );
    });
  }
}
