const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
	let errors = {};

	if (err.code === 11000) {
		const key = Object.keys(err.keyValue)[0];
		errors[key] = `Uneseni ${key} je iskorišten.`;
	}
	if (err.message.includes('User validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

//          days hours mins secs
const maxAge = 1 * 1 * 15 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, 'loginsecret', {
		expiresIn: maxAge,
	});
};

// login routes
const prijava_get = (req, res) => {
	res.render('auth/login', { title: 'Prijava' });
};
const prijava_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);
		res.status(200).json({ user: user._id });
	} catch (err) {
		res.status(400).json({});
	}
};

// register routes
const registracija_get = (req, res) => {
	res.render('auth/register', { title: 'Registracija' });
};
const registracija_post = async (req, res) => {
	const { name, lastName, email, phoneNumber, password, birthDate } = req.body;

	try {
		const user = await User.create({
			name,
			lastName,
			email,
			phoneNumber,
			password,
			birthDate,
		});

		const token = createToken(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(201).json({ user: user._id });
	} catch (err) {
		console.log(err);
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports = {
	prijava_get,
	prijava_post,
	registracija_get,
	registracija_post,
};
