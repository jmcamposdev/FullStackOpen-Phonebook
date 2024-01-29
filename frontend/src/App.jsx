import React, { useEffect, useState } from 'react'
import Person from './components/Person'
import personService from './services/persons'

// Styles
import './normalize.css'
import './styles.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // Set persons state from server
  useEffect(() => {
    // Get All the Persons
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const [inputs, setInputs] = useState({
    name: '',
    number: '',
    filter: ''
  })

  const personsToShow = inputs.filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(inputs.filter.toLowerCase()))

  const handleInputsChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }

  const handlePersonDelete = (id) => {
    const personToDelete = persons.filter(person => person.id === id)[0]
    const confirmDelete = window.confirm(`Do you want to delete a ${personToDelete.name}`)

    if (confirmDelete) {
      personService.deletePerson(id)
        .then(deletedPerson => {
          setSuccessMessage(`${deletedPerson.name} was deleted successfully`)
        }).catch(() => {
          console.log(personToDelete)
          setErrorMessage(`${personToDelete.name} was already deleted from server`)
        })

      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const addPerson = (event) => {
    // Prevent default form submission
    event.preventDefault()

    // Prevent insert Names that already exist
    const personExists = persons.find(person => person.name.toLowerCase() === inputs.name.toLowerCase())
    if (personExists) {
      updateNumber({ ...personExists, number: inputs.number })
      return
    }
    // Prevent insert empty Names
    if (inputs.name === '') {
      window.alert('Name cannot be empty')
      return
    }

    // Create newPerson object
    const newPerson = {
      name: inputs.name,
      number: inputs.number
    }

    // Save the New Person
    personService.create(newPerson)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setSuccessMessage(`${returnedPerson.name} was added successfully`)
      })

    // Reset newName
    resetFormInputs()
  }

  const updateNumber = (personToUpdate) => {
    const confirmUpdate = window.confirm(`${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`)

    if (confirmUpdate) {
      personService.update(personToUpdate)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== personToUpdate.id ? person : personToUpdate))
          setSuccessMessage(`${updatedPerson.name} was updated successfully`)
        })

      // Reset Form
      resetFormInputs()
    }
  }

  const resetFormInputs = () => {
    // Reset newName
    setInputs({
      ...inputs, // Keep filter
      name: '',
      number: ''
    })
  }

  return (
    <>
      <div className='limiter'>
        <div className='container-table100'>
          <div className='wrap-table100'>
            <div className='table100'>
              <Notification message={errorMessage} type='notification-error' setMessage={setErrorMessage} />
              <Notification message={successMessage} type='notification-success' setMessage={setSuccessMessage} />
              <div className='form-container'>
                <div className='column1'>
                  <input type='text' placeholder='Filter Name' value={inputs.filter} onChange={handleInputsChange} name='filter' />
                </div>
              </div>
              <table>
                <thead>
                  <tr className='table100-head'>
                    <th className='column1'>Name</th>
                    <th className='column2'>Number</th>
                    <th className='column2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  personsToShow.map(person =>
                    <Person key={person.name} person={person} handlePersonDelete={handlePersonDelete} />)
                  }
                </tbody>
              </table>
              <div className='form-container'>
                <form onSubmit={addPerson}>
                  <div className='column1'>
                    <input type='text' onChange={handleInputsChange} value={inputs.name} placeholder='Name' name='name' />
                  </div>
                  <div className='column2'>
                    <input type='number' onChange={handleInputsChange} value={inputs.number} placeholder='Number' name='number' />
                  </div>
                  <div className='column2'>
                    <button className='btn-create'>Create</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
