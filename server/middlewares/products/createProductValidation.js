const createProductValidation = (req, res, next) => {
    const {name, price,description,isDestacado,collectionId } = req.body;
  
    if (!name) return res.status(404).json({ error: 'Missing name' });
    if (!price) return res.status(404).json({ error: 'Missing price' });
    if (!description) return res.status(404).json({ error: 'Missing description' });
    if (isDestacado === undefined) return res.status(404).json({ error: 'Missing isDestacado' });
    if (!collectionId) return res.status(404).json({ error: 'Missing collectionId' });
    
    next();
    };
  
    module.exports = createProductValidation;