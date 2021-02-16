/* eslint-disable import/prefer-default-export */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

// package
import url from 'url';
import { Compiler, Compilation, sources, WebpackPluginInstance } from 'webpack';

// internal
import { createExtraHTML, createScript, createStylesheet } from './creator';
import { HTMLEntryPluginOptions } from './index.interface';

// scope
const { RawSource } = sources;

const defaultOptions: HTMLEntryPluginOptions = {
  filename: 'index.html',
  extraHTML: createExtraHTML,
};

export class HTMLEntryPlugin implements WebpackPluginInstance {
  // padding optional property with default options
  private readonly options: Required<HTMLEntryPluginOptions>;

  constructor(options: HTMLEntryPluginOptions = {}) {
    this.options = { ...defaultOptions, ...options } as Required<
      HTMLEntryPluginOptions
    >;
  }

  apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap('HTMLEntry', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'HTMLEntry',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          const entrypoint = compilation.entrypoints.get('main');

          if (!entrypoint) {
            throw new Error(
              // eslint-disable-next-line quotes
              `HTMLEntryPlugin can't recognize entrypoints, only support single 'main' entrypoint`
            );
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
            // extra html as qiankun microservice container
            .concat(
              typeof this.options.extraHTML === 'string'
                ? this.options.extraHTML
                : this.options.extraHTML()
            )
            .join('\n');

          compilation.emitAsset(this.options.filename, new RawSource(source));
        }
      );
    });
  }
}
