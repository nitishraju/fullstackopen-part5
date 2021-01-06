import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  let msgColor = null
  if (['Added', 'Deleted', 'Updated', 'Created blog', 'Logged In'].includes(message.split(':')[0])) {
    msgColor = 'green'
  }
  else {
    msgColor = 'red'
  }
  
  const notifStyle = {
    color: msgColor,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notifStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired
}

export default Notification