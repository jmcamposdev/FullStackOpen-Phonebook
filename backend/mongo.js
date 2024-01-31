const mongoose = require('mongoose')

// Validate that the correct number of arguments are provided
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

// Get the password from the command line arguments
const password = process.argv[2]

// Create the URL to connect to the database
const url = `mongodb+srv://phonebook:${password}@cluster0.off3wjd.mongodb.net/phonebook?retryWrites=true&w=majority`

// Connect to the database
mongoose.connect(url)

// Define the schema for the Person collection
const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Create the model for the Person collection
const Person = mongoose.model('Person', PersonSchema)


if (process.argv.length === 3) {
  // If only the password was provided, then print the contents of the phonebook
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  // If the name and number were provided, then add the person to the phonebook
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}