const colorOptions = { Marron: '#463F34', Negro: 'black' };
const getHexCode = (colorName) => colorOptions[colorName] || colorName;

module.exports = {colorOptions,getHexCode}