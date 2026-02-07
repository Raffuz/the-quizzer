"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";
import { QuizResult } from "@/types/quiz";

export default function Riepilogo() {
  const router = useRouter();
  const {
    userData,
    questions,
    userAnswers,
    setQuizResult,
    setCurrentQuestion,
  } = useQuiz();

  // Se mancano dati (refresh/link diretto), torna alla home
  useEffect(() => {
    if (!userData || questions.length === 0) router.push("/");
  }, [userData, questions, router]);

  // Calcola il risultato e vai ai risultati
  const handleSubmit = () => {
    let numeroCorrette = 0;

    const dettagli = questions.map((question) => {
      const userAnswer = userAnswers.find((a) => a.questionId === question.id);

      const testiRisposteUtente = userAnswer
        ? userAnswer.selectedAnswers.map((i) => question.answers[i].text)
        : [];

      const indiciRisposteCorrette = question.answers
        .map((answer, index) => (answer.correct ? index : -1))
        .filter((i) => i !== -1);

      const testiRisposteCorrette = indiciRisposteCorrette.map(
        (i) => question.answers[i].text,
      );

      const setSelezionate = new Set(userAnswer?.selectedAnswers || []);
      const setCorrette = new Set(indiciRisposteCorrette);

      const isCorrect =
        setSelezionate.size === setCorrette.size &&
        Array.from(setSelezionate).every((i) => setCorrette.has(i));

      if (isCorrect) numeroCorrette++;

      return {
        questionId: question.id,
        question: question.question,
        userAnswers: testiRisposteUtente,
        correctAnswers: testiRisposteCorrette,
        isCorrect,
      };
    });

    const result: QuizResult = {
      totalQuestions: questions.length,
      correctAnswers: numeroCorrette,
      score: Math.round((numeroCorrette / questions.length) * 100),
      details: dettagli,
    };

    setQuizResult(result);
    router.push("/results");
  };

  // Riapre il quiz sulla domanda selezionata
  const handleReviewQuestion = (index: number) => {
    setCurrentQuestion(index);
    router.push("/quiz");
  };

  if (!userData || questions.length === 0) return null;

  const getAnswerStatus = (questionIndex: number) => {
    const question = questions[questionIndex];
    const userAnswer = userAnswers.find((a) => a.questionId === question.id);

    if (!userAnswer || userAnswer.selectedAnswers.length === 0) {
      return "not-answered";
    }
    return "answered";
  };

  const numeroRisposteDate = userAnswers.filter(
    (a) => a.selectedAnswers.length > 0,
  ).length;

  const numeroNonRisposte = questions.length - numeroRisposteDate;

  return (
    // Container principale con sfondo gradiente (Blu Chiaro -> Scuro)
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-sky-400 via-blue-600 to-blue-900">
      <div className="max-w-4xl w-full">
        {/* Card principale con effetto Glass */}
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20">
          <div className="mb-8 border-b pb-6 border-gray-200">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
              Riepilogo delle risposte
            </h1>
            <p className="text-gray-500 text-lg">
              Controlla attentamente prima di inviare il quiz finale.
            </p>
          </div>

          {/* Griglia delle domande */}
          <div className="space-y-4 mb-8">
            {questions.map((question, index) => {
              const userAnswer = userAnswers.find(
                (a) => a.questionId === question.id,
              );
              const status = getAnswerStatus(index);
              const isAnswered = status === "answered";

              return (
                <div
                  key={question.id}
                  className={`border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-md group
                    ${
                      isAnswered
                        ? "border-gray-200 bg-white hover:border-blue-300"
                        : "border-amber-200 bg-amber-50/30 hover:border-amber-400"
                    }`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
                    <h3 className="font-bold text-gray-800 text-lg flex-1">
                      <span className="text-gray-400 mr-2">#{index + 1}</span>
                      {question.question}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold flex items-center whitespace-nowrap shadow-sm
                        ${
                          isAnswered
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                    >
                      {isAnswered ? (
                        <>
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          Risposta inserita
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            ></path>
                          </svg>
                          Non risposta
                        </>
                      )}
                    </span>
                  </div>

                  {/* Mostra le risposte date se presenti */}
                  {userAnswer && userAnswer.selectedAnswers.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Le tue risposte:
                      </p>
                      <ul className="space-y-1">
                        {userAnswer.selectedAnswers.map((answerIndex) => (
                          <li
                            key={answerIndex}
                            className="flex items-center text-gray-700 font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                            {question.answers[answerIndex].text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleReviewQuestion(index)}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center transition-colors group-hover:underline"
                    >
                      Modifica risposta
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Statistiche riepilogative */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-100">
              <p className="text-4xl font-black text-blue-600 mb-1">
                {numeroRisposteDate}
              </p>
              <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
                Domande risposte
              </p>
            </div>
            <div
              className={`rounded-xl p-5 text-center border ${
                numeroNonRisposte > 0
                  ? "bg-amber-50 border-amber-100"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <p
                className={`text-4xl font-black mb-1 ${
                  numeroNonRisposte > 0 ? "text-amber-600" : "text-gray-400"
                }`}
              >
                {numeroNonRisposte}
              </p>
              <p
                className={`text-sm font-semibold uppercase tracking-wide ${
                  numeroNonRisposte > 0 ? "text-amber-800" : "text-gray-500"
                }`}
              >
                Da rispondere
              </p>
            </div>
          </div>

          {/* Warning box se ci sono domande non risposte */}
          {numeroRisposteDate < questions.length && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-lg shadow-sm">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-amber-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700 font-medium">
                    Attenzione: hai delle domande senza risposta.
                  </p>
                  <p className="text-sm text-amber-600 mt-1">
                    Puoi inviare comunque il quiz, ma le domande vuote verranno
                    considerate errate.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pulsanti Azione */}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              onClick={() => router.push("/quiz")}
              className="md:flex-1 py-4 px-6 rounded-xl font-bold text-gray-600 border-2 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-300"
            >
              ← Torna al quiz
            </button>
            <button
              onClick={handleSubmit}
              className="md:flex-[2] bg-gradient-to-r from-blue-700 to-sky-500 text-white text-lg font-bold py-4 px-6 rounded-xl shadow-lg 
              hover:shadow-blue-500/40 hover:-translate-y-1 transform transition-all duration-300
              focus:ring-4 focus:ring-blue-300 outline-none"
            >
              Conferma e Invia Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
