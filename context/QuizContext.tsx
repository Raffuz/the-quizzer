"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserData, Question, UserAnswer, QuizResult } from "@/types/quiz";

// Interfaccia che definisce TUTTO ciò che il nostro Context espone ai componenti
interface QuizContextType {
  // Dati dell’utente (null finché non compila la landing page)
  userData: UserData | null;
  setUserData: (data: UserData) => void;

  // Lista delle domande del quiz (viene caricata in base al topic scelto)
  questions: Question[];
  setQuestions: (questions: Question[]) => void;

  // Risposte date dall’utente (una per domanda, di solito)
  userAnswers: UserAnswer[];
  // Permette sia di impostare un array diretto, sia di aggiornare in modo "funzionale" usando lo stato precedente
  setUserAnswers: (
    answers: UserAnswer[] | ((prev: UserAnswer[]) => UserAnswer[]),
  ) => void;

  // Indice della domanda corrente che stiamo mostrando
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;

  // Risultato finale del quiz (null finché il quiz non è terminato)
  quizResult: QuizResult | null;
  setQuizResult: (result: QuizResult) => void;

  // Funzione comoda per resettare tutto e ricominciare da capo
  resetQuiz: () => void;
}

// Creiamo il Context con valore iniziale undefined (così possiamo controllare se viene usato fuori dal Provider)
const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  // Stato: dati utente
  const [userData, setUserData] = useState<UserData | null>(null);

  // Stato: domande del quiz
  const [questions, setQuestions] = useState<Question[]>([]);

  // Stato: risposte dell’utente
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  // Stato: quale domanda stiamo mostrando (0 = prima domanda)
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Stato: risultato finale
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Resetta tutto lo stato del quiz (utile per "Ricomincia")
  const resetQuiz = () => {
    setUserData(null);
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestion(0);
    setQuizResult(null);
  };

  return (
    // Il Provider "distribuisce" i dati e le funzioni a tutti i componenti figli
    <QuizContext.Provider
      value={{
        userData,
        setUserData,
        questions,
        setQuestions,
        userAnswers,
        setUserAnswers,
        currentQuestion,
        setCurrentQuestion,
        quizResult,
        setQuizResult,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// Wrapper comodo (utile se vuoi cambiare/provider multipli in futuro senza toccare RootLayout)
export function QuizProviderWrapper({ children }: { children: ReactNode }) {
  return <QuizProvider>{children}</QuizProvider>;
}

// Hook personalizzato: così nei componenti fai solo useQuiz() invece di useContext(QuizContext)
export function useQuiz() {
  const context = useContext(QuizContext);

  // Se qualcuno usa useQuiz fuori dal Provider, lanciamo un errore chiaro
  if (context === undefined) {
    throw new Error("useQuiz deve essere usato all'interno di un QuizProvider");
  }

  return context;
}
