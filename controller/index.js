const service = require('../service');

const get = async (req, res, next) => {
  try {
    const result = await service.getContacts();
    res.json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await service.getContactById(id)
    if (result) {
      res.json(result)
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const create = async (req, res, next) => {
  const { name, email, phone } = req.body
  try {
    const result = await service.addContact({ name, email, phone })
    res.status(201).json(result)
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, email, phone } = req.body
  try {
    const result = await service.updateContact(id, { name, email, phone })
    if (result) {
      res.json(result)
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await service.removeContact(id)
    if (result) {
      res.json(result)
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = {
  get,
  getById,
  create,
  remove,
  update
}