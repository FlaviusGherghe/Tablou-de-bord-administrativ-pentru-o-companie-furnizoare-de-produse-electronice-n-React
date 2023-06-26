import React from 'react'

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick}) => {
  return (
    <tr>
    <td>{contact.ID}</td>
    <td> <img  src={contact.icon} alt="" className="image" /></td>
    <td>{contact.Produs}</td>
    <td>{contact.Client}</td>
    <td>{contact.Data}</td>
    <td>{contact.Cantitate}</td>
    <td>{contact.Plata}</td>
    <td>{contact.Status}</td>
    <td><button type="button" onClick={(event)=>handleEditClick(event, contact)}>Modifica</button>
    <button type="button" onClick={() =>handleDeleteClick(contact.id)}>Sterge</button></td> 
  </tr>
  )
}

export default ReadOnlyRow