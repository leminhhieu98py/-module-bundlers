import Pokemon from './asset/pokemon.jpeg';
import CSVData from './data/data.csv';
import XMLData from './data/data.xml';
import TOMLData from './data/data.toml';
import YamlData from './data/data.yml';
import JSONData from './data/data.json5';

const renderImage = () => {
  const myPokemon = new Image();
  myPokemon.src = Pokemon;
  myPokemon.width = 300;
  myPokemon.classList.add('pokemon');

  document.body.appendChild(myPokemon);
};

const importAsset = () => {
  console.log('CSVData', CSVData);
  console.log('XMLData', XMLData);
  console.log('TOMLData', TOMLData);
  console.log('YamlData', YamlData);
  console.log('JSONData', JSONData);
};

export { importAsset, renderImage };
