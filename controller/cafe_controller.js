const cafeService = require('../services/cafe_service')

const getAllCafes = async (req, res) => {

  try {
    const cafes = await cafeService.getAllCafes();
    res.status(200).json({ message: 'All cafes retrieved successfully', cafes })

  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' })
  }
}

const getCafeById = async (req, res) => {
  const { id } = req.params;

  try {
    const cafe = await cafeService.getCafeById(id);
    if (!cafe) { return res.status(404).json({ message: 'Cafe not found' }) }
    res.status(200).json({ message: 'Cafes retrieved successfully', cafe })
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' })
  }
}

const getPreferences = async (req, res, next) => {
  const { pet = 0, decaf = 0, groupSeat = 0, terrace = 0 } = req.query;

  const preferences = {
    pet: Number(pet),
    decaf: Number(decaf),
    terrace: Number(terrace),
    groupSeat: Number(groupSeat),
  };

  try {
    const cafes = await cafeService.filterCafesByPreferences(preferences);
    if (!cafes || cafes.length === 0) {
      const error = new Error('no cafes match your preferences.');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ cafes })
  } catch (error) {
    console.log(error)
    next(error);
  }
}

module.exports = { getAllCafes, getCafeById, getPreferences };