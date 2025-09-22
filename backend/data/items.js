/*const fs = require('node:fs/promises');

async function getStoredItems() {
  const rawFileContent = await fs.readFile('items.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedItems = data.items ?? [];
  return storedItems;
}

function storeItems(items) {
  return fs.writeFile('items.json', JSON.stringify({ items: items || [] }));
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;*/
const fs = require('node:fs/promises');
const path = require('path');

const itemsFilePath = path.join(__dirname, 'items.json');

async function getStoredItems() {
  const rawFileContent = await fs.readFile(itemsFilePath, 'utf-8');
  const data = JSON.parse(rawFileContent);
  return data.items || []; // always return flat array
}

async function storeItems(items) {
  await fs.writeFile(itemsFilePath, JSON.stringify({ items: items || [] }, null, 2));
}

module.exports = { getStoredItems, storeItems };
