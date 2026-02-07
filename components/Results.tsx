"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";

export default function Risultati() {
  const router = useRouter();
  const { userData, quizResult, resetQuiz } = useQuiz();

  // Se mancano dati (refresh/link diretto), torna alla home
  useEffect(() => {
    if (!userData || !quizResult) {
      router.push("/");
    }
  }, [userData, quizResult, router]);

  // Reset completo e ripartenza da zero
  const handleNewQuiz = () => {
    resetQuiz();
    router.push("/");
  };

  if (!userData || !quizResult) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-500";
    return "text-rose-600";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Eccellente!";
    if (score >= 80) return "Molto bene!";
    if (score >= 70) return "Buon lavoro!";
    if (score >= 60) return "Discreto!";
    return "Continua a studiare!";
  };

  return (
    // Sfondo gradiente coerente con Landing e Quiz (Blu Chiaro -> Scuro)
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-sky-400 via-blue-600 to-blue-900">
      <div className="max-w-4xl w-full space-y-8">
        {/* Card Punteggio (Glassmorphism) */}
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20 text-center relative overflow-hidden">
          {/* Decorazione di sfondo sfumata (Blu Ocean Theme) */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-600 to-sky-500"></div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
            Risultati del Quiz
          </h1>
          <p className="text-gray-500 text-lg mb-8 font-medium">
            {userData.firstName} {userData.lastName}
          </p>

          <div className="flex flex-col items-center justify-center mb-8">
            <div
              className={`text-8xl font-black tracking-tighter drop-shadow-sm mb-2 transition-all duration-500 ${getScoreColor(quizResult.score)}`}
            >
              {quizResult.score}%
            </div>
            <p className="text-2xl font-bold text-gray-700 bg-gray-100 px-6 py-2 rounded-full">
              {getScoreMessage(quizResult.score)}
            </p>
          </div>

          {/* Grid Statistiche */}
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex flex-col items-center transition-transform hover:scale-105">
              <span className="text-4xl font-bold text-emerald-600 mb-1">
                {quizResult.correctAnswers}
              </span>
              <span className="text-sm font-semibold text-emerald-800 uppercase tracking-wide">
                Corrette
              </span>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-5 flex flex-col items-center transition-transform hover:scale-105">
              <span className="text-4xl font-bold text-rose-600 mb-1">
                {quizResult.totalQuestions - quizResult.correctAnswers}
              </span>
              <span className="text-sm font-semibold text-rose-800 uppercase tracking-wide">
                Errate
              </span>
            </div>
          </div>

          {/* Barra progresso punteggio */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                quizResult.score >= 80
                  ? "bg-emerald-500"
                  : quizResult.score >= 60
                    ? "bg-amber-500"
                    : "bg-rose-500"
              }`}
              style={{ width: `${quizResult.score}%` }}
            />
          </div>
        </div>

        {/* Sezione Dettaglio Risposte */}
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">
            Dettaglio delle risposte
          </h2>

          <div className="space-y-6">
            {quizResult.details.map((detail, index) => (
              <div
                key={detail.questionId}
                className={`border-2 rounded-xl p-6 transition-all duration-300 ${
                  detail.isCorrect
                    ? "border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50"
                    : "border-rose-200 bg-rose-50/50 hover:bg-rose-50"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-bold text-gray-800 flex-1 leading-snug">
                    <span className="inline-block mr-2 text-gray-400">
                      #{index + 1}
                    </span>
                    {detail.question}
                  </h3>

                  {/* Icona Stato Risposta */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                      detail.isCorrect
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {detail.isCorrect ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>

                <div className="space-y-4 text-sm md:text-base">
                  <div className="bg-white/60 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Le tue risposte
                    </p>
                    {detail.userAnswers.length > 0 ? (
                      <ul className="space-y-1">
                        {detail.userAnswers.map((answer, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-800 font-medium"
                          >
                            <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
                            {answer}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">
                        Nessuna risposta fornita
                      </p>
                    )}
                  </div>

                  {!detail.isCorrect && (
                    <div className="bg-white/80 rounded-lg p-3 border border-emerald-100 shadow-sm">
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                        Risposte corrette
                      </p>
                      <ul className="space-y-1">
                        {detail.correctAnswers.map((answer, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-emerald-800 font-bold"
                          >
                            <svg
                              className="w-4 h-4 mr-2 text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            {answer}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottone per ricominciare */}
        <div className="text-center pb-8">
          <button
            onClick={handleNewQuiz}
            className="bg-gradient-to-r from-blue-700 to-sky-500 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg 
            hover:shadow-blue-500/40 hover:-translate-y-1 transform transition-all duration-300
            focus:ring-4 focus:ring-blue-300 outline-none active:scale-95"
          >
            Fai un altro quiz
          </button>
        </div>
      </div>
    </div>
  );
}
