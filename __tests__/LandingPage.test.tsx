import { render, screen, fireEvent } from '@testing-library/react';
import { QuizProvider } from '@/context/QuizContext';
import LandingPage from '@/components/LandingPage';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('LandingPage', () => {
  it('renders the form with all required fields', () => {
    render(
      <QuizProvider>
        <LandingPage />
      </QuizProvider>
    );

    expect(screen.getByText('The Quizzer')).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cognome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/età/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/argomento/i)).toBeInTheDocument();
  });

  it('shows validation error when age is under 18', () => {
    render(
      <QuizProvider>
        <LandingPage />
      </QuizProvider>
    );

    const firstNameInput = screen.getByLabelText(/nome/i);
    const lastNameInput = screen.getByLabelText(/cognome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const ageInput = screen.getByLabelText(/età/i);
    const topicSelect = screen.getByLabelText(/argomento/i);
    const submitButton = screen.getByRole('button', { name: /inizia il quiz/i });

    fireEvent.change(firstNameInput, { target: { value: 'Mario' } });
    fireEvent.change(lastNameInput, { target: { value: 'Rossi' } });
    fireEvent.change(emailInput, { target: { value: 'mario@example.com' } });
    fireEvent.change(ageInput, { target: { value: '17' } });
    fireEvent.change(topicSelect, { target: { value: 'informatica' } });

    fireEvent.click(submitButton);

    expect(screen.getByText(/devi avere almeno 18 anni/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', () => {
    render(
      <QuizProvider>
        <LandingPage />
      </QuizProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /inizia il quiz/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/inserisci un indirizzo email valido/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', () => {
    render(
      <QuizProvider>
        <LandingPage />
      </QuizProvider>
    );

    const submitButton = screen.getByRole('button', { name: /inizia il quiz/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/il nome è obbligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/il cognome è obbligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/l'email è obbligatoria/i)).toBeInTheDocument();
    expect(screen.getByText(/l'età è obbligatoria/i)).toBeInTheDocument();
    expect(screen.getByText(/seleziona un argomento/i)).toBeInTheDocument();
  });
});
