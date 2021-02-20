const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
   mark: {
      type: String,
      required: [true, "Unesite marku vozila."],
   },
   model: {
      type: String,
      required: [true, "Unesite model vozila."],
   },
   body: {
      type: String,
      required: [true, "Unesite tip karoserija."],
   },
   engineVolume: {
      type: String,
      required: [true, "Unesite zapreminu motora."],
   },
   power: {
      type: String,
      required: [true, "Unesite snagu vozila."],
   },
   mileage: {
      type: String,
      required: [true, "Unesite kilometražu vozila."],
   },
   seatsNumber: {
      type: String,
      required: [true, "Unesite broj sjedala."],
   },
   doorsNumber: {
      type: String,
      required: [true, "Unesite broj vrata."],
   },
   gearboxType: {
      type: String,
      required: [true, "Unesite tip mjenjača."],
   },
   image: {
      type: [String],
      required: [true, "Unesite barem jednu fotografiju."],
   },
});

const Car = mongoose.model("car", carSchema);
module.exports = Car;
