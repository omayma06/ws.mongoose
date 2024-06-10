require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

// Connect to MongoDB Atlas database using the URI from .env file
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is a required string
  age: Number, // Age is a number (optional)
  favoriteFoods: [String] // favoriteFoods is an array of strings
});

// Define the Person Model
const Person = mongoose.model('Person', personSchema);

// Create a record of a model
const createRecord = (name, age, favoriteFoods, callback) => {
  const person = new Person({ name, age, favoriteFoods });
  person.save((err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

// Create many records with model.create()
const createManyRecords = (arrayOfPeople, callback) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

// Use model.find() to search the database
const findPeopleByName = (name, callback) => {
  Person.find({ name }, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

// Use model.findOne() to return a single matching document
const findOnePersonByFood = (food, callback) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

// Use model.findById() to search the database by _id
const findPersonById = (personId, callback) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

// Perform classic updates by running find, edit, then save
const findEditThenSave = (personId, foodToAdd, callback) => {
  Person.findById(personId, (err, person) => {
    if (err) {
      callback(err);
    } else {
      person.favoriteFoods.push(foodToAdd);
      person.save((err, updatedPerson) => {
        if (err) {
          callback(err);
        } else {
          callback(null, updatedPerson);
        }
      });
    }
  });
};

// Perform new updates on a document using model.findOneAndUpdate()
const findAndUpdate = (personName, newAge, callback) => {
  Person.findOneAndUpdate({ name: personName }, { age: newAge }, { new: true }, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

// Delete one document using model.findByIdAndRemove
const removeById = (personId, callback) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

// Delete many documents with model.remove()
const removeManyPeople = (name, callback) => {
  Person.remove({ name }, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

// Chain search query helpers to narrow search results
const chainQueryHelpers = (callback) => {
  Person.find({ favoriteFoods: 'burritos' })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
};

// Export all functions to be used externally
module.exports = {
  createRecord,
  createManyRecords,
  findPeopleByName,
  findOnePersonByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  chainQueryHelpers
};
