import { Calendar, SignIn } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import AnimatedButton from '@/components/animation/motionButton';
import AnimatedText from '@/components/animation/motionText';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const themeOptions = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ];
  const [currentTheme, setCurrentTheme] = useState('light');
  const { push } = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('theme', currentTheme);
    }
  }, []);
  return (
    <Main
      meta={<Meta title="Home" description="Zaio home page" />}
      theme={currentTheme}
    >
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex flex-wrap">
          {themeOptions.map((theme) => (
            <button
              className={`btn-info btn m-2 ${
                theme === currentTheme ? 'btn-primary' : 'btn-outline'
              }`}
              key={theme}
              onClick={() => {
                setCurrentTheme(theme);
                sessionStorage.setItem('theme', theme);
              }}
            >
              {theme}
            </button>
          ))}
        </div>
        <AnimatedText tag="h3" className="text-3xl" animate="fadeInRight">
          Welcome To
        </AnimatedText>
        <AnimatedText
          tag="h1"
          className="mb-8 text-8xl font-bold"
          animate="fadeInRight"
        >
          Zaio
        </AnimatedText>
        <AnimatedButton
          animate="none"
          className="btn-primary btn mb-4 gap-2"
          onClick={() => push('/enroll')}
        >
          Enroll page
          <SignIn size={32} />
        </AnimatedButton>
        <AnimatedButton
          animate="none"
          className="btn-primary btn gap-2"
          onClick={() => push('/schedule')}
        >
          Schedule
          <Calendar size={32} />
        </AnimatedButton>
      </div>
    </Main>
  );
};

export default Index;
