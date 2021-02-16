/**
 * @description - suits example
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* eslint-disable import/no-extraneous-dependencies, no-console */

// package
import path from 'path';
import webpack, { Compiler } from 'webpack';
import { fs as memfs } from 'memfs';

// Internal
import { HTMLEntryPlugin } from '../src/index';

describe('plugin test suits', () => {
  it('should complete standard workflow', (done) => {
    const configuration = {
      entry: path.resolve(__dirname, '../__tests__/__fixture__/index.js'),
      output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/',
        library: 'html_entry',
      },
      plugins: [
        new HTMLEntryPlugin({
          filename: 'index.entry.html',
        }),
      ],
    };
    const compiler = webpack(configuration as webpack.Configuration);
    const outputPath = `${configuration.output.path}/index.entry.html`;

    compiler.outputFileSystem = memfs as Compiler['outputFileSystem'];
    compiler.run((err, stats) => {
      try {
        expect(err).toBeNull();
        // ensure stats not undefined
        expect(stats).toBeTruthy();
        // use optional symbol avoid lint rules
        expect(stats?.hasErrors()).toBeFalsy();
        expect(memfs.readFileSync(outputPath, 'utf8')).toMatchSnapshot();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('should support customize extra html', (done) => {
    const configuration = {
      entry: path.resolve(__dirname, '../__tests__/__fixture__/index.js'),
      output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/',
        library: 'html_entry',
      },
      plugins: [
        new HTMLEntryPlugin({
          filename: 'index.html',
          extraHTML: '<section class="ms-container"></section>',
        }),
      ],
    };
    const compiler = webpack(configuration as webpack.Configuration);
    const outputPath = `${configuration.output.path}/index.html`;

    compiler.outputFileSystem = memfs as Compiler['outputFileSystem'];
    compiler.run((err, stats) => {
      try {
        expect(err).toBeNull();
        // ensure stats not undefined
        expect(stats).toBeTruthy();
        // use optional symbol avoid lint rules
        expect(stats?.hasErrors()).toBeFalsy();
        expect(memfs.readFileSync(outputPath, 'utf8')).toMatchSnapshot();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
