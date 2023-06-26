import React from 'react'

const ReadOnlyRow2 = ({ utilizator, handleEditClick, handleDeleteClick}) => {
  return (
    <tr>
    <td>{ utilizator.id }</td>
    <td> <img src={ utilizator.Icon } className="image"/></td>
    <td>{ utilizator.nume}</td>
    <td>{utilizator.prenume}</td>
    <td>{ utilizator.adresa }</td>
    <td>{ utilizator.telefon }</td>
    <td>{ utilizator.email }</td>
               
    <td><button type="button" onClick={(event)=>handleEditClick(event, utilizator)}>Modifica</button>
    <button type="button" onClick={() =>handleDeleteClick(utilizator.id)}>Sterge</button></td> 
  </tr>
  )
}

export default ReadOnlyRow2