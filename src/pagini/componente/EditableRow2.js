import React from 'react'

const EditableRow2 = ({editFormData, handleEditFormChange, handleCancelClick}) => {
  return (
    <tr>
        <td>
            <input type = "text" required="required" placeholder='Introdu id' name = "id" value={editFormData.id} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <input type = "text" required="required" placeholder='ex user/utilizator2.png ' name = "Icon" value={editFormData.Icon} onChange={handleEditFormChange}></input>
        </td>
        <td>
        <input type = "text" required="required" placeholder='Introdu nume' name = "nume" value={editFormData.nume} onChange={handleEditFormChange}></input>
        </td>
        <td>
        <input type = "text" required="required" placeholder='Introdu prenume' name = "prenume" value={editFormData.prenume} onChange={handleEditFormChange}></input>
        </td>
        <td>
        <input type = "text" required="required" placeholder='Introdu adresa' name = "adresa" value={editFormData.adresa} onChange={handleEditFormChange}></input>
        </td>
        <td>
        <input type = "text" required="required" placeholder='Introdu telefon' name = "telefon" value={editFormData.telefon} onChange={handleEditFormChange}></input>
        </td>
        <td>
        <input type = "text" required="required" placeholder='Introdu email' name = "email" value={editFormData.email} onChange={handleEditFormChange}></input>
        </td>
        <td>
            <button type="submit">Salveaza</button>
            <button type="button" onClick={handleCancelClick}>Inchide</button>
        </td>
    </tr>
  )
}

export default EditableRow2