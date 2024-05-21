import 'babel-polyfill';
import { join } from 'lodash-es';
import './style.css';
import { importAsset, renderImage } from './assetManagement';

const renderComponent = () => {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = join(['Hello', 'webpack', 'from Otiss'], ' ');
  element.classList.add('container');
  element.onclick = async () => {
    const { print } = await import('./print');

    print?.();
  };

  document.body.appendChild(element);
};

const onload = () => {
  // Getting started
  renderComponent();

  // Asset management
  renderImage();
  importAsset();
};

onload();
