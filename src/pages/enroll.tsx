import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import AnimatedButton from '@/components/animation/motionButton';
import AnimatedText from '@/components/animation/motionText';
import useForm from '@/components/useForm';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Enroll = () => {
  const notify = () => toast.error('Make sure to select course & duration');
  const { push } = useRouter();
  const [courses, setCourses] = useState<string[]>([]);
  const [hours, setHours] = useState<string[]>([]);
  const initialValues = {
    course: '',
    hoursCommitted: '',
  };
  const { values, handleChange } = useForm(initialValues);
  useEffect(() => {
    // axios call to fetch available courses
    setCourses(['Java']);
    setHours(['2 hours per day', ' 4 hours per day', '6 hours per day']);
  }, []);
  return (
    <Main meta={<Meta title="Enroll" description="Enroll page" />}>
      <div className="flex h-screen  flex-col items-center justify-center">
        <AnimatedText tag="h3" className="text-3xl" animate="fadeInRight">
          Please choose the course you would like to enroll in.
        </AnimatedText>
        <select
          data-testid="course-select"
          className="select-success select my-4 w-full max-w-xs"
          name="course"
          value={values.course || 'Pick a course'}
          onChange={handleChange}
        >
          <option disabled>Pick a course</option>
          {courses.map((course) => (
            <option key={course}>{course}</option>
          ))}
        </select>
        <select
          data-testid="hours-select"
          className="select-success select w-full max-w-xs"
          name="hoursCommitted"
          value={values.hoursCommitted || 'Pick hours to commit'}
          onChange={handleChange}
        >
          <option disabled>Pick hours to commit</option>
          {hours.map((hour) => (
            <option key={hour}>{hour}</option>
          ))}
        </select>
        <AnimatedButton
          animate="none"
          className="btn-primary btn mt-4 w-full max-w-sm"
          onClick={() => {
            if (Object.values(values).some((val) => val === '')) {
              notify();
            } else {
              axios
                .post(`${process.env.HOST_API_KEY}/v1/event/create`, {
                  title: values.course,
                  description: 'Java lecture',
                  type: 'Video',
                  duration: +values.hoursCommitted.match(/\d+/)[0],
                  date: new Date(),
                })
                .then(() => {
                  push('/schedule');
                })
                .catch((err) => console.error(err));
            }
          }}
        >
          Enroll
        </AnimatedButton>
      </div>
      <ToastContainer position="top-center" />
    </Main>
  );
};

export default Enroll;
