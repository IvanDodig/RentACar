// registracija_get registracija_post odjava

const prijava_get = (req, res) => {
	res.render("auth/login", { title: "Prijava" });
};

const registracija_get = (req, res) => {
	res.render("auth/register", { title: "Registracija" });
};

module.exports = {
	prijava_get,
	registracija_get,
};
