/**
 * @description - create html element literal
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

export function createScript(pathname: string): string {
  return `<script src="${pathname}"></script>`;
}

export function createStylesheet(pathname: string): string {
  return `<link rel="stylesheet" href="${pathname}" />`;
}

// inject extra html as qiankun container
export function createExtraHTML(): string {
  return '<div class="root"></div>';
}
