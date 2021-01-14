// car_index, car_details, car_create_get, car_create_post, car_delete

const car_index = (req, res) => {
	res.render("cars/index", { title: "Početna" });
};

const car_details = (req, res) => {
	res.render("cars/details", { title: "Rezervacija" });
};

module.exports = {
	car_index,
	car_details,
};
