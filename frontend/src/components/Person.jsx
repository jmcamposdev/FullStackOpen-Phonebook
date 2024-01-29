const Person = ({ person, handlePersonDelete }) => {
  return (
    <tr>
      <td className='column1'>{person.name}</td>
      <td className='column2'>{person.number}</td>
      <td className='column2'>
        <button className='btn-delete' onClick={() => (handlePersonDelete(person.id))}>Delete</button>
      </td>
    </tr>
  )
}

export default Person
