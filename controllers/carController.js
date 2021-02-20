// car_index, car_details, car_create_get, car_create_post, car_delete
const Car = require("../models/Car");

const handleErrors = (err) => {
   let errors = {};

   // validation errors
   if (err.message.includes("Car validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
         errors[properties.path] = properties.message;
      });
   }

   return errors;
};

const car_index = (req, res) => {
   res.render("cars/index", { title: "Početna" });
};

const car_details = (req, res) => {
   res.render("cars/details", { title: "Rezervacija" });
};

const car_create = (req, res) => {
   res.render("cars/create", { title: "Create" });
};

const car_create_post = async (req, res) => {
   console.log(req.body);
   const {
      mark,
      model,
      body,
      engineVolume,
      power,
      mileage,
      seatsNumber,
      doorsNumber,
      gearboxType,
      image,
   } = req.body;

   try {
      const car = await Car.create({
         mark,
         model,
         body,
         engineVolume,
         power,
         mileage,
         seatsNumber,
         doorsNumber,
         gearboxType,
         image,
      });

      res.status(201).json({ car: car._id });
   } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
      res.status(400).json({ errors });
   }
};

module.exports = {
   car_index,
   car_details,
   car_create,
   car_create_post,
};
