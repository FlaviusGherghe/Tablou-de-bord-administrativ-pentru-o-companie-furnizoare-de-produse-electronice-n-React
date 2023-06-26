import React from 'react'
import "./calendar.scss"
import Sidebar from '../componente/sidebar/Sidebar';
import Navbar from '../componente/navbar/Navbar';
import CalendarComponenta from '../componente/calendar componenta/calendar';


const Calendar = () => {
  return (
    <div className="Calendar">
        <Sidebar/>
      <div className="calendarContainer">
      <Navbar/>
      <div className="tot"><CalendarComponenta/></div>
      </div>
    </div>
  );
}

export default Calendar;
    



