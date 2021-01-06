import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef(({ children, toggleLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const showIfVisible = { display: visible ? '' : 'none' }
  const hideIfVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return ({
      toggleVisibility
    })
  })

  return (
    <div>
      <div style={hideIfVisible}>
        <button onClick={toggleVisibility}>{toggleLabel}</button>
      </div>
      <div style={showIfVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  toggleLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable