const createCollectionValidation = (req, res, next) => {
    const {name, description} = req.body;
  
    if (!name) return res.status(404).json({ error: 'Missing name' });
    next();
    };
  
    module.exports = createCollectionValidation;