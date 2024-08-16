const xlsx = require('xlsx');
const {ProductImage} = require('../models')

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

    const images = [];

    for (const row of rows) {
      const { productId, url } = row;

      if (productId && url) {
        // Check if the image already exists in the database
        const existingImage = await ProductImage.findOne({ where: { productId, url } });

        if (!existingImage) {
          console.log('Llegó');
          const image = await ProductImage.create({ productId, url });
          console.log('Llegó2');
          images.push(image);
          console.log('Llegó3');
        }
      }
    }

    res.status(201).json({
      message: 'Bulk images added successfully',
      images,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to process the file' });
  }
};
module.exports = uploadProductImagesBulk;
