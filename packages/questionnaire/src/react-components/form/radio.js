import React, { useState } from 'react'

/**
 *  @param {Object} props
 *  @param {import('../typedef').Option[]} props.options
 *  @param {string} props.title
 *  @param {string} props.checkedValue
 *  @param {Function} props.onChange
 *  @return React.ReactElement
 */
export default function Radio(props) {
  const optionsJsx = props.options?.map((o, index) => (
    <React.Fragment
      key={index}
    >
      <input
        type="radio"
        id={`option-${o.id}`}
        name={props.title}
        value={o.value}
        checked={props.checkedValue === o.value}
        onChange={(e => props.onChange(e.target.value))}
      />
      <label htmlFor={`option-${o.id}`}>{o.name}</label>
      <br/>
    </React.Fragment>
  ))
  return (
    <>
      <h3>{props.title}</h3>
      {optionsJsx}
    </>
  )
}
