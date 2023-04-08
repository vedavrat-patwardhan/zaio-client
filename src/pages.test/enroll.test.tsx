import { fireEvent, render } from '@testing-library/react';
import * as toast from 'react-toastify'; // Import the react-toastify module

import Enroll from '@/pages/enroll';

const pushMock = jest.fn();

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Mock the toast module
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
  ToastContainer: jest.fn(() => null),
}));

describe('Enroll', () => {
  it('renders the component correctly', () => {
    const { getByText, getByTestId } = render(<Enroll />);
    // Assert that the component renders correctly
    expect(
      getByText('Please choose the course you would like to enroll in.')
    ).toBeInTheDocument();
    expect(getByTestId('course-select')).toBeInTheDocument();
    expect(getByTestId('hours-select')).toBeInTheDocument();
    expect(getByText('Enroll')).toBeInTheDocument();
  });

  it('displays error toast when form is submitted with empty fields', () => {
    const { getByText } = render(<Enroll />);
    const enrollButton = getByText('Enroll');

    // Spy on the error function of the toast module
    const errorSpy = jest.spyOn(toast.toast, 'error');

    fireEvent.click(enrollButton);

    // Assert that the error toast is displayed
    expect(errorSpy).toHaveBeenCalledWith(
      'Make sure to select course & duration'
    );
  });

  it('navigates to schedule page when form is submitted with valid fields', () => {
    const { getByText, getByTestId } = render(<Enroll />);
    const enrollButton = getByText('Enroll');

    const { useRouter } = jest.requireMock('next/router');
    const pushSpy = jest.spyOn(useRouter(), 'push');

    fireEvent.change(getByTestId('course-select'), {
      target: { value: 'Java' },
    });
    fireEvent.change(getByTestId('hours-select'), {
      target: { value: '2 hours per day' },
    });
    fireEvent.click(enrollButton);

    // Assert that the push function is called with the correct arguments
    expect(pushSpy).toHaveBeenCalledWith('/schedule');
  });
});
