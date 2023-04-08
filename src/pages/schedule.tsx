import 'react-toastify/dist/ReactToastify.css';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Schedule = () => {
  // Events data
  const events = [
    {
      title: 'Event 1',
      start: '2023-04-01T10:00:00',
      end: '2023-04-01T12:00:00',
    },
    {
      title: 'Event 2',
      start: '2023-04-05T14:00:00',
      end: '2023-04-05T16:00:00',
    },
    // Add more events as needed
  ];

  const eventContent = (arg: any) => {
    console.log('arg', arg);
    return (
      <div className="form-control w-full">
        <label className="label cursor-pointer">
          <span className="label-text">{arg.event.title}</span>
          <input
            type="checkbox"
            readOnly
            checked={
              new Date().getTime() > new Date(arg.event.endStr).getTime()
            }
            className="checkbox-warning checkbox"
          />
        </label>
      </div>
    );
  };

  return (
    <Main meta={<Meta title="Schedule" description="Schedule page" />}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev',
          center: 'title',
          end: 'next',
        }}
        events={events}
        eventContent={eventContent}
        height="100vh"
      />
    </Main>
  );
};

export default Schedule;
