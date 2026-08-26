const xlsx = require('xlsx');
const { Product } = require('../models');

const parseBoolean = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  return ['true', '1', 'yes', 'si', 'sí'].includes(String(value).trim().toLowerCase());
};

const uploadProductsBulk = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Parse the Excel file
    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const products = [];

    for (const row of rows) {
      if (row.id && row.name && row.price !== undefined) {
        // Check if the product already exists in the database
        const existingProduct = await Product.findOne({
          where: { id: row.id },
        });
        console.log(row.collectionId);
        const collectionId = parseInt(row.collectionId, 10);
        row.collectionId = collectionId;

        if (row.isDestacado !== undefined) {
          row.isDestacado = parseBoolean(row.isDestacado);
        }
        if (row.isFreeShipping !== undefined) {
          row.isFreeShipping = parseBoolean(row.isFreeShipping);
        }

        if (existingProduct) {
          // Update existing product
          await existingProduct.update(row);
        } else {
          // Create new product
          const product = await Product.create(row);
          products.push(product);
        }
      }
    }

    res.status(201).json({
      message: 'Bulk products processed successfully',
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = uploadProductsBulk;
