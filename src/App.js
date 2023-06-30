import Acasa from "./pagini/acasa/Acasa";
import Lista from "./pagini/lista/Lista";
import Register from "./pagini/register/Register";
import Profil from "./pagini/profil/Profil";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import { produseInputs, utilizatorInputs } from "./formSursa";
import "./stiluri/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Statistici from "./pagini/statistici/Statistici";
import Comenzi from "./pagini/comenzi/Comenzi";
import Produse from "./pagini/produse/Produse";
import Livrari from "./pagini/livrari/Livrari";
import Sanatate from "./pagini/sanatate/Sanatate";
import Calendar from "./pagini/calendar/Calendar";
import Contact from "./pagini/contact/Contact";
import Setari from "./pagini/setari/Setari";
import {   useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider, } from "@tanstack/react-query";
import { useEffect } from "react";
import Login from "./pagini/login/Login";
import { AuthContext } from "./context/authContext";
import Postari from "./pagini/postari/Postari";
import Add from "./pagini/postari/Add";
import Update from "./pagini/postari/Update";
import ModificaProfil from "./pagini/profil/ModificaProfil";
import ModificaTranzactii from "./pagini/componente/tabel/ModificaTranzactii";
import ModificaProduse from "./pagini/componente/tabeldate/ModificaProduse";
import ModificaComenzi from "./pagini/componente/tabeldate/ModificaComenzi";
import ModificaLivrari from "./pagini/componente/tabeldate/ModificaLivrari";


function App() {
  
  const {currentUser} = useContext(AuthContext)

  const {darkMode} = useContext(DarkModeContext)
 

  return (

    <div className={darkMode ? "app dark" : "app"} >
     
      <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Acasa/>} />
        <Route path="statistici" element={<Statistici/>}/>
        <Route path="livrari" element={<Livrari/>}/>
        <Route path="comenzi" element={<Comenzi/>}/>
        <Route path="produse" element={<Produse/>}/>
        <Route path="sanatate" element={<Sanatate/>}/>
        <Route path="calendar" element={<Calendar/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="postari" element={<Postari/>}/>
        <Route path="setari" element={<Setari/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="adaugaPostari" element={<Add/>}/>
        <Route path="modificaPostari/:id" element={<Update/>}/>
        <Route path="modificaProfil/:id" element={<ModificaProfil/>}/>
        <Route path="modificaTranzactii/:id" element={<ModificaTranzactii/>}/>
        <Route path="modificaProduse/:id" element={<ModificaProduse/>}/>
        <Route path="modificaComenzi/:id" element={<ModificaComenzi/>}/>
        <Route path="modificaLivrari/:id" element={<ModificaLivrari/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="utilizatori">
          <Route index element={<Lista/>}/>
          <Route path=":utilizatorId" element={<Profil/>}/>
          
      </Route>
      
      </Route>
    </Routes>
    </BrowserRouter>
    </div>
   
  );
}

export default App;
