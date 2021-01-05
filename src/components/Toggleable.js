import React, { useState, useImperativeHandle } from 'react'

const Toggleable = React.forwardRef(({children, toggleLabel}, ref) => {
  const [visible, setVisible] = useState(false)

  const showIfVisible = {display: visible ? '' : 'none'}
  const hideIfVisible = {display: visible ? 'none' : ''}

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

export default Toggleable