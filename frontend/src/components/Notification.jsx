const Notification = ({ message, type, setMessage }) => {
  if (message === null) {
    return null
  }

  setTimeout(() => {
    setMessage(null)
  }, 5000)

  return (
    <div className={`${type} notification`}>
      {message}
    </div>
  )
}

export default Notification
