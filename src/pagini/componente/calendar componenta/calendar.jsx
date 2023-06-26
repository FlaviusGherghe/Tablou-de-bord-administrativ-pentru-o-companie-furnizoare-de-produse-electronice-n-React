import { useState } from "react";
import FullCalendar from "@fullcalendar/react"
import { formatDate } from '@fullcalendar/core'
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import {Box, List, ListItem, ListItemText, Typography, useTheme} from "@mui/material";
import { typography } from "@mui/system";
import allLocales from '@fullcalendar/core/locales-all'
import roLocale from '@fullcalendar/core/locales/ro'
import "./calendar.scss"



const CalendarComponenta = () => {
  const [EvenimenteCurente, setEvenimenteCurente] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Introdu un titlul pentru eveniment");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if(title) {
      calendarApi.addEvent({id: `${selected.dateStr}-${title}`,
    title,
    start: selected.startStr,
    end: selected.endStr,
    allDay: selected.allDay
    });
  };
};
  const handleEvenimentClick = (selected) => {
    if (window.confirm(`Esti sigur ca vrei sa stergi evenimentul '${selected.event.title}'`)) {
      selected.event.remove();
    }
  };

  return ( 
  <Box margin="20px">
  <Box display="flex" justifyContent="space-between">
    {/*CALENDAR SIDEBAR */}
    <Box flex="1 1 20%"  padding="15px" borderRadius="4px">
      <Typography variant="h5">Evenimente</Typography>
      <List>{EvenimenteCurente.map((event) => (
      <ListItem key={event.id} sx={{ margin: "10px 0", borderRadius:"2px",}} >
      <ListItemText primary={event.title} secondary={
      <Typography>{formatDate(event.start, 
        {
        year:"numeric",
        month:"short",
        day:"numeric",
       
      })}
      </Typography>
      }
      />
      </ListItem>
      ))}
      </List>
    </Box>

    {/* CALENDAR */}
    <Box flex="1 1 100%" marginLeft="15px">
      <FullCalendar 
       locale={roLocale}
      height="75vh" 
      plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin,listPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
      }}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleDateClick}
      eventClick={handleEvenimentClick}
      eventsSet={(events) => setEvenimenteCurente(events)}
      initialEvents={[
        {id:"1234", title: "Eveniment", date:"2023-02-04"},
        {id:"4321", title: "Intalnire", date:"2023-02-24"},
      ]}
      />
      </Box> 
  </Box>
  </Box>
  );
  };
  



export default CalendarComponenta;
