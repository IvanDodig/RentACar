const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Unesite ime.'],
	},
	lastName: {
		type: String,
		required: [true, 'Unesite prezime.'],
	},
	email: {
		type: String,
		required: [true, 'Unesite email.'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Unesite ispravnu email adresu.'],
	},
	phoneNumber: {
		type: String,
		required: [true, 'Unesite broj telefona.'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Unesite lozinku.'],
		minlength: [6, 'Lozinka mora sadržavati barem 6 znakova.'],
	},
	birthDate: {
		type: String,
		required: [true, 'Unesite datum rođenja.'],
	},
});

// fire function before saving to db
userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error('Neispravna lozinka!');
	}
	throw Error('Neregistriran email!');
};

const User = mongoose.model('User', userSchema);
module.exports = User;
