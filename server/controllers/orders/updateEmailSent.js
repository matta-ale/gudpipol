const  {updateEmailSentHandler} = require('../../handlers');

const updateEmailSent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedOrder = await updateEmailSentHandler(id);
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = updateEmailSent;
