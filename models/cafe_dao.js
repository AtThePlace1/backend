const myDataSource = require('./init');

const getAllCafes = async () => {
  return await myDataSource.query(`
    SELECT * FROM cafes
    LEFT JOIN cafe_images ON cafes.id = cafe_images.cafe_id`);
}

const getCafeById = async (id) => {
  return await myDataSource.query(`
    SELECT * FROM cafes
    LEFT JOIN cafe_images ON cafes.id = cafe_images.cafe_id
    WHERE cafes.id = ?`, [id])
}

const getCafesByPreferences = async ({ pet, decaf, groupSeat, terrace }) => {
  const cafes = await myDataSource.query(`
    SELECT cafes.id,cafes.cafe_name,cafes.opening_hours,cafes.location_address,cafes.latitude,cafes.longitude,cafes.contact_number,cafes.sns_account,
    cafe_images.image_main, cafe_images.image_menu
    FROM cafes
    LEFT JOIN cafe_options ON cafes.id = cafe_options.cafe_id
    LEFT JOIN cafe_images ON cafes.id = cafe_images.cafe_id
    WHERE cafe_options.pet = ? 
    AND cafe_options.decaf = ?
    AND cafe_options.group_seat = ?
    AND cafe_options.terrace = ?`, [pet, decaf, groupSeat, terrace])
  return cafes;
}

module.exports = { getAllCafes, getCafeById, getCafesByPreferences }