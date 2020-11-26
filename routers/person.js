const express = require("express");
const router = express.Router();
let Person = require("../model/Person");


//Create and Save a Record of a Model:
router.post("/addPerson", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const favoriteFoods = req.body.favoriteFoods;

  const newPerson = new Person({ name, age, favoriteFoods });

  newPerson
    .save()
    .then((newPerson) => res.json(newPerson))
    .catch((err) => res.status(400).json("Error: " + err));
});
// Use model.find() to Search Your Database

router.get("/all", (req, res) => {
  Person.find()
    .then((Persons) => {
      res.send(Persons);
    })
    .catch((err) => console.log(err));
});
//Create Many Records with model.create()
var arrayOfPeople = [
  { name: "amira", age: 24, favoriteFoods: ["lazania"] },
  { name: "asma", age: 27, favoriteFoods: ["makrouna"] },
  { name: "adem", age: 49, favoriteFoods: ["tajine", "couscous"] },
];

router.post("/addPersons", (req, res) => {
  Person.create(arrayOfPeople)
    .then((Person) => res.json(Person))
    .catch((err) => res.status(400).json("Error: " + err));
});
// find person by his favorite food
router.get("/person/food/:food", (req, res, next) => {
  Person.findOne({ favoriteFoods: req.params.food })
    .then((Persons) => {
      res.send(Persons);
    })
    .catch((err) => console.log(err));
});

//5-Use model.find() to Search Your Database(By name)
router.get("/persons/:name", function (req, res) {
  Person.find({
    name: req.params.name,
  }).exec(function (err, persons) {
    if (err) {
      res.send("error occured");
    } else {
      console.log(persons);
      res.json(persons);
    }
  });
});

//Use model.findById() to Search Your Database By _id
router.get("/:id", (req, res) => {
  const { _id } = req.params;
  Person.findById({
    _id: req.params.id,
  })
    .then((Persons) => {
      res.send(Persons);
    })
    .catch((err) => console.log(err));
});

//Perform Classic Updates by Running Find, Edit, then Save

router.get("/person/:id/:foodToadd", function (req, res) {
  Person.findById(req.params.id).exec(function (err, persons) {
    if (err) {
      res.send("error occured");
    } else {
      persons.favoriteFoods.push(req.params.foodToadd);
      res.json(persons);
    }
    persons
      .save()
      .then((Person) => res.json(Person))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

//Perform New Updates on a Document Using model.findOneAndUpdate()
router.put("/editPerson/:name", (req, res) => {
  Person.findOneAndUpdate(
    { name: req.params.name },
    { $set: { age: 20 } },
    { new: true }
  )

    .then((Persons) => {
      res.send(Persons);
    })
    .catch((err) => console.log(err));
});

// Delete One Document Using model.findOneAndDelete
router.delete("/deletePerson/:id", (req, res) => {
  Person.findOneAndDelete({
    _id: req.params.id,
  })
    .then((Persons) => {
      res.send("deleted");
    })
    .catch((err) => console.log(err));
});

//MongoDB and Mongoose - Delete Many Documents with model.remove()

router.delete("/remove", (req, res) => {
  Person.remove(
    {
      name: "marry",
    },
    (err, personsRemoved) => {
      if (err) {
        res.send("error deleting");
      } else {
        console.log("successfully deleted");
        res.send(personsRemoved);
      }
    }
  );
});
//Chain Search Query Helpers to Narrow Search Results

router.get("/searchPerson/:food", (req, res) => {
  Person.find({ favoriteFoods: req.params.food })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      err ? res.status(400).send(err) : res.send(data);
      console.log(data);
    });
});

module.exports = router;
