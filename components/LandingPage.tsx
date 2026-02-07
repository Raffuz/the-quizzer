"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";
import { Question } from "@/types/quiz";
import questionsData from "@/data/questions.json";

export default function LandingPage() {
  const router = useRouter();
  const { setUserData, setQuestions } = useQuiz();

  // Stato del form: dati inseriti dall’utente
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    topic: "" as "informatica" | "musica" | "calcio",
  });

  // Stato degli errori: messaggi mostrati sotto i campi non validi
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    topic: "",
  });

  // Validazione del form: controlla campi obbligatori + formato email + età minima
  const validateForm = (): boolean => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      topic: "",
    };

    let isValid = true;

    // Validazione nome
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Il nome è obbligatorio";
      isValid = false;
    }

    // Validazione cognome
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Il cognome è obbligatorio";
      isValid = false;
    }

    // Validazione email (obbligatoria + formato)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Inserisci un indirizzo email valido";
      isValid = false;
    }

    // Validazione età (obbligatoria + numero valido + >= 18)
    const age = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = "L'età è obbligatoria";
      isValid = false;
    } else if (isNaN(age) || age < 0) {
      newErrors.age = "Inserisci un'età valida";
      isValid = false;
    } else if (age < 18) {
      newErrors.age = "Devi avere almeno 18 anni per partecipare";
      isValid = false;
    }

    // Validazione argomento
    if (!formData.topic) {
      newErrors.topic = "Seleziona un argomento";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit: salva dati utente + carica domande per topic + mescola risposte + vai alla pagina quiz
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Salva i dati dell’utente nello stato globale (context)
      setUserData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        age: parseInt(formData.age),
        topic: formData.topic as "informatica" | "musica",
      });

      // Carica le domande in base all'argomento selezionato
      const topicQuestions =
        questionsData[formData.topic as "informatica" | "musica"];

      // Mescola le risposte per ogni domanda (ordine casuale)
      const shuffledQuestions = topicQuestions.map((q: Question) => ({
        ...q,
        answers: [...q.answers].sort(() => Math.random() - 0.5),
      }));

      // Salva le domande nello stato globale (context) e vai alla pagina /quiz
      setQuestions(shuffledQuestions);
      router.push("/quiz");
    }
  };

  // Gestione cambiamento campi: aggiorna lo stato e azzera l’errore del campo modificato
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Aggiorna i dati del form
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Se c’era un errore su quel campo, lo rimuove appena l’utente modifica il valore
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    // Container principale con sfondo gradiente BLU CHIARO e SCURO
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-sky-400 via-blue-600 to-blue-900">
      {/* Card con effetto Glassmorphism (sfocatura) */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-white/20 transform transition-all duration-500 hover:shadow-blue-500/20">
        {/* Header della Card: Gradiente Blu Scuro -> Blu Chiaro */}
        <div className="bg-gradient-to-r from-blue-800 to-sky-600 p-8 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
            The Quizzer
          </h1>
          <p className="text-blue-50 text-lg font-light">
            Metti alla prova le tue conoscenze
          </p>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Griglia per Nome e Cognome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-600 mb-2 transition-colors group-focus-within:text-blue-600"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 border-2 outline-none transition-all duration-300
                    ${
                      errors.firstName
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500 focus:bg-white focus:shadow-md"
                    }`}
                  placeholder="Il tuo nome"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs font-medium text-red-500 animate-pulse">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="group">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-600 mb-2 transition-colors group-focus-within:text-blue-600"
                >
                  Cognome
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 border-2 outline-none transition-all duration-300
                    ${
                      errors.lastName
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500 focus:bg-white focus:shadow-md"
                    }`}
                  placeholder="Il tuo cognome"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs font-medium text-red-500 animate-pulse">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600 mb-2 transition-colors group-focus-within:text-blue-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border-2 outline-none transition-all duration-300
                  ${
                    errors.email
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:bg-white focus:shadow-md"
                  }`}
                placeholder="esempio@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs font-medium text-red-500 animate-pulse">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label
                  htmlFor="age"
                  className="block text-sm font-semibold text-gray-600 mb-2 transition-colors group-focus-within:text-blue-600"
                >
                  Età
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 border-2 outline-none transition-all duration-300
                    ${
                      errors.age
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500 focus:bg-white focus:shadow-md"
                    }`}
                  placeholder="Es. 25"
                  min="0"
                />
                {errors.age && (
                  <p className="mt-1 text-xs font-medium text-red-500 animate-pulse">
                    {errors.age}
                  </p>
                )}
              </div>

              <div className="group">
                <label
                  htmlFor="topic"
                  className="block text-sm font-semibold text-gray-600 mb-2 transition-colors group-focus-within:text-blue-600"
                >
                  Argomento
                </label>
                <div className="relative">
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border-2 outline-none appearance-none transition-all duration-300 cursor-pointer
                      ${
                        errors.topic
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500 focus:bg-white focus:shadow-md"
                      }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="informatica">Informatica</option>
                    <option value="musica">Musica</option>
                    <option value="calcio">Calcio</option>
                  </select>
                  {/* Freccetta custom per la select */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {errors.topic && (
                  <p className="mt-1 text-xs font-medium text-red-500 animate-pulse">
                    {errors.topic}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 to-sky-500 text-white text-lg font-bold py-4 rounded-xl shadow-lg 
                hover:shadow-blue-500/40 hover:-translate-y-1 transform transition-all duration-300
                focus:ring-4 focus:ring-blue-300 outline-none active:scale-95"
              >
                Inizia il quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
