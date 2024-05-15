import { join } from 'lodash';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = join(['Hello', 'webpack', 'from Otiss'], ' ');

  return element;
}

document.body.appendChild(component());
