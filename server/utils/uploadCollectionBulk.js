const xlsx = require('xlsx');
const { Collection } = require('../models');

const uploadCollectionsBulk = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Parse the Excel file
    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const collections = [];

    for (const row of rows) {
      if (row.name) {
        // Check if the collection already exists in the database
        const existingCollection = await Collection.findOne({
          where: { name: row.name },
        });

        if (existingCollection) {
          // Update existing collection (if any other fields were to be updated, this is where it would be done)
          await existingCollection.update(row);
        } else {
          // Create new collection
          const collection = await Collection.create(row);
          collections.push(collection);
        }
      }
    }

    res.status(201).json({
      message: 'Bulk collections processed successfully',
      collections,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to process the file' });
  }
};

module.exports = uploadCollectionsBulk;
