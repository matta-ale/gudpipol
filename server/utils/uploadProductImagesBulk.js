const xlsx = require('xlsx');
const { ProductImage } = require('../models');

const uploadProductImagesBulk = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Parse the Excel file
    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    // Delete all existing images in the database
    await ProductImage.destroy({ where: {} });

    const images = [];

    // Add new images from the Excel file
    for (const row of rows) {
      const { productId, url } = row;

      if (productId && url) {
        const image = await ProductImage.create({ productId, url });
        images.push(image);
      }
    }

    res.status(201).json({
      message: 'All images deleted and bulk images added successfully',
      images,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to process the file' });
  }
};

module.exports = uploadProductImagesBulk;
