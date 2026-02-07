"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";
import { UserAnswer } from "@/types/quiz";

export default function Quiz() {
  const router = useRouter();
  const {
    userData,
    questions,
    userAnswers,
    setUserAnswers,
    currentQuestion,
    setCurrentQuestion,
  } = useQuiz();

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  useEffect(() => {
    // Se mancano dati (refresh/link diretto), torna alla home
    if (!userData || questions.length === 0) {
      router.push("/");
      return;
    }

    // Carica le risposte già salvate per la domanda corrente (se esistono)
    const savedAnswer = userAnswers.find(
      (a) => a.questionId === questions[currentQuestion].id,
    );

    setSelectedAnswers(savedAnswer ? savedAnswer.selectedAnswers : []);
  }, [currentQuestion, userData, questions, userAnswers, router]);

  const handleAnswerToggle = (answerIndex: number) => {
    setSelectedAnswers((prev) =>
      prev.includes(answerIndex)
        ? prev.filter((i) => i !== answerIndex)
        : [...prev, answerIndex],
    );
  };

  // Salva la risposta selezionata per la domanda corrente nel context
  const saveCurrentAnswer = () => {
    const newAnswer: UserAnswer = {
      questionId: questions[currentQuestion].id,
      selectedAnswers,
    };

    setUserAnswers((prev) => {
      const filtered = prev.filter(
        (a) => a.questionId !== newAnswer.questionId,
      );
      return [...filtered, newAnswer];
    });
  };

  const handleNext = () => {
    saveCurrentAnswer();

    if (currentQuestion === questions.length - 1) {
      router.push("/summary");
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    saveCurrentAnswer();
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleQuestionNavigate = (index: number) => {
    saveCurrentAnswer();
    setCurrentQuestion(index);
  };

  if (!userData || questions.length === 0) return null;

  const question = questions[currentQuestion];

  const isAnswered = (questionIndex: number) =>
    userAnswers.some((a) => a.questionId === questions[questionIndex].id);

  const topicLabel =
    userData.topic.charAt(0).toUpperCase() + userData.topic.slice(1);

  // Calcolo percentuale progresso
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    // Sfondo gradiente coerente con la Landing Page (Blu Chiaro -> Scuro)
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-sky-400 via-blue-600 to-blue-900">
      <div className="max-w-4xl w-full space-y-6">
        {/* Intestazione + navigazione domande + progress (Effetto Glass) */}
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-6 border border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight">
              Quiz di <span className="text-blue-600">{topicLabel}</span>
            </h1>
            <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-4 py-1 rounded-full mt-2 md:mt-0">
              Domanda {currentQuestion + 1} di {questions.length}
            </span>
          </div>

          {/* Barra di navigazione domande (Numeri) */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuestionNavigate(index)}
                className={`w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center shadow-sm
                  ${
                    index === currentQuestion
                      ? "bg-blue-600 text-white shadow-blue-500/50 scale-110 ring-4 ring-blue-100"
                      : isAnswered(index)
                        ? "bg-sky-100 text-sky-700 border border-sky-200 hover:bg-sky-200"
                        : "bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-200 hover:text-gray-600"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Barra di progresso */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-sky-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>

        {/* Domanda + risposte (Effetto Glass) */}
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.answers.map((answer, index) => {
              const isSelected = selectedAnswers.includes(index);
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerToggle(index)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 group relative overflow-hidden
                    ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-center relative z-10">
                    {/* Checkbox custom */}
                    <div
                      className={`w-6 h-6 rounded flex-shrink-0 border-2 mr-4 flex items-center justify-center transition-colors duration-200
                        ${
                          isSelected
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-300 group-hover:border-blue-400"
                        }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-lg font-medium transition-colors ${isSelected ? "text-blue-900" : "text-gray-700"}`}
                    >
                      {answer.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-sm text-gray-400 mt-6 italic flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Puoi selezionare una o più risposte
          </p>
        </div>

        {/* Bottoni navigazione */}
        <div className="flex justify-between gap-6 pt-2">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 border-2
              ${
                currentQuestion === 0
                  ? "border-gray-500/30 text-gray-400 cursor-not-allowed bg-transparent"
                  : "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              }`}
          >
            ← Precedente
          </button>

          <button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-blue-700 to-sky-500 text-white text-lg font-bold py-4 rounded-xl shadow-lg 
              hover:shadow-blue-500/40 hover:-translate-y-1 transform transition-all duration-300
              focus:ring-4 focus:ring-blue-300 outline-none"
          >
            {currentQuestion === questions.length - 1
              ? "Vai al riepilogo"
              : "Successiva →"}
          </button>
        </div>
      </div>
    </div>
  );
}
