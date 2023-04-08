import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Index from '@/pages';

const pushMock = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('Index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('changes theme on button click', () => {
    const { getByText } = render(<Index />);

    // Assert initial theme is 'light'
    expect(getByText('light')).toHaveClass('btn-primary');

    // Click on the 'dark' theme button
    fireEvent.click(getByText('dark'));

    // Assert current theme is 'dark'
    expect(getByText('dark')).toHaveClass('btn-primary');

    // Assert sessionStorage has been updated with new theme
    // expect(sessionStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('navigates to enroll page on "Enroll page" button click', () => {
    const { getByText } = render(<Index />);

    // Click on the "Enroll page" button
    fireEvent.click(getByText('Enroll page'));

    // Assert push method of useRouter has been called with '/enroll'
    expect(pushMock).toHaveBeenCalledWith('/enroll');
  });

  it('navigates to schedule page on "Schedule" button click', () => {
    const { getByText } = render(<Index />);

    // Click on the "Schedule" button
    fireEvent.click(getByText('Schedule'));

    // Assert push method of useRouter has been called with '/schedule'
    expect(pushMock).toHaveBeenCalledWith('/schedule');
  });
});
