import 'react-toastify/dist/ReactToastify.css';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

interface EventI {
  title: string;
  description: string;
  type: string;
  duration: number;
  start: string;
  end: string;
}

const Schedule = () => {
  // Events data
  const [events, setEvents] = useState<EventI[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const fullCalendarRef = useRef<FullCalendar>(null);
  useEffect(() => {
    console.log('month', currentMonth);
    axios
      .get(`${process.env.HOST_API_KEY}/v1/event/${currentMonth}`)
      .then((response) => {
        setEvents(response.data.data);
      })
      .catch((err) => console.error(err));
  }, [currentMonth]);

  const eventContent = (arg: any) => {
    return (
      <div className="form-control w-full">
        <label
          className="label  cursor-pointer  hover:bg-black hover:text-white"
          key={arg.event.title + arg.event.startStr}
        >
          <span className="label-text w-5/6 truncate text-inherit">
            {arg.event.title}
          </span>
          <input
            type="checkbox"
            readOnly
            checked={
              new Date().getTime() > new Date(arg.event.startStr).getTime()
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
        ref={fullCalendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'customPrev',
          center: 'title',
          end: 'customNext',
        }}
        customButtons={{
          customPrev: {
            text: 'Prev',
            click() {
              fullCalendarRef.current?.getApi().prev();
              if (currentMonth !== 1) {
                setCurrentMonth((prevMonth) => prevMonth - 1);
              } else {
                setCurrentMonth(12);
              }
            },
          },
          customNext: {
            text: 'Next',
            click() {
              fullCalendarRef.current?.getApi().next();
              if (currentMonth !== 12) {
                setCurrentMonth((prevMonth) => prevMonth + 1);
              } else {
                setCurrentMonth(1);
              }
            },
          },
        }}
        dayMaxEvents={4}
        events={events}
        eventContent={eventContent}
        height="100vh"
      />
    </Main>
  );
};

export default Schedule;
