import { join } from 'lodash';
import './style.css';
import { importAsset, renderImage } from './assetManagement';

const renderComponent = () => {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = join(['Hello', 'webpack', 'from Otiss'], ' ');
  element.classList.add('container');

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
