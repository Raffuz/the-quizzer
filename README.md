# The Quizzer

Un'applicazione di quiz interattiva costruita con Next.js, TypeScript e Tailwind CSS.

## 🚀 Caratteristiche

- ✅ **Next.js 14** - Framework React moderno con App Router
- ✅ **TypeScript** - Type safety completa
- ✅ **Tailwind CSS** - Styling moderno e responsive
- ✅ **Jest** - Testing con Jest e React Testing Library
- ✅ **Validazione Form** - Validazione completa dei dati utente
- ✅ **Navigazione Flessibile** - Naviga tra le domande in qualsiasi direzione
- ✅ **Risposte Multiple** - Supporto per domande con risposte multiple
- ✅ **Shuffle Casuale** - Le risposte vengono mescolate ad ogni tentativo
- ✅ **Riepilogo Dettagliato** - Visualizza tutte le risposte prima dell'invio
- ✅ **Dashboard Risultati** - Visualizzazione dettagliata del punteggio

## 📋 Requisiti Implementati

### Landing Page
- Form di registrazione con campi: nome, cognome, email, età
- Selezione argomento (Informatica o Musica)
- Validazione completa di tutti i campi
- Restrizione età minima 18 anni

### Quiz
- 10 domande caricate da file JSON
- 4 possibili risposte per domanda
- Supporto per risposte multiple
- Shuffle casuale delle risposte ad ogni tentativo
- Navigazione bidirezionale (Avanti/Indietro)
- 10 pulsanti per navigazione diretta alle domande
- Indicatore visuale delle domande risposte
- Barra di progresso

### Riepilogo
- Visualizzazione di tutte le risposte fornite
- Possibilità di rivedere le domande
- Statistiche (risposte fornite vs non fornite)
- Opzione per inviare o tornare al quiz

### Dashboard Risultati
- Punteggio percentuale
- Conteggio risposte corrette/errate
- Dettaglio di ogni domanda con:
  - Risposte fornite dall'utente
  - Risposte corrette
  - Indicatore visuale (✓ o ✗)
- Pulsante "Fai un altro quiz"

## 🛠️ Installazione

1. **Clona il repository o estrai i file**

2. **Installa le dipendenze**
```bash
npm install
```

3. **Avvia il server di sviluppo**
```bash
npm run dev
```

4. **Apri il browser**
```
http://localhost:3000
```

## 🧪 Testing

Esegui i test:
```bash
npm test
```

Esegui i test in modalità watch:
```bash
npm run test:watch
```

## 📁 Struttura del Progetto

```
the-quizzer/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout principale
│   ├── page.tsx             # Landing page
│   ├── globals.css          # Stili globali
│   ├── quiz/
│   │   └── page.tsx         # Pagina quiz
│   ├── summary/
│   │   └── page.tsx         # Pagina riepilogo
│   └── results/
│       └── page.tsx         # Pagina risultati
├── components/              # Componenti React
│   ├── LandingPage.tsx     # Form di registrazione
│   ├── Quiz.tsx            # Interfaccia quiz
│   ├── Summary.tsx         # Riepilogo risposte
│   └── Results.tsx         # Dashboard risultati
├── context/                # React Context
│   └── QuizContext.tsx     # Gestione stato globale
├── data/                   # Dati statici
│   └── questions.json      # Domande del quiz
├── types/                  # TypeScript types
│   └── quiz.ts            # Tipi per il quiz
├── __tests__/             # Test files
│   ├── LandingPage.test.tsx
│   └── QuizContext.test.tsx
└── package.json           # Dipendenze e scripts
```

## 🎨 Tecnologie Utilizzate

- **Next.js 14** - Framework React
- **TypeScript** - Linguaggio tipizzato
- **Tailwind CSS** - Framework CSS utility-first
- **Jest** - Testing framework
- **React Testing Library** - Testing utilities

## 📊 Argomenti del Quiz

### Informatica
10 domande su programmazione, tecnologie web, database e concetti IT

### Musica
10 domande su compositori, strumenti musicali, teoria e storia della musica

## 🎯 Funzionalità Extra

- **Design Responsive** - Funziona su desktop, tablet e mobile
- **Animazioni Smooth** - Transizioni fluide tra le pagine
- **Feedback Visuale** - Indicatori chiari dello stato del quiz
- **Accessibilità** - Form labels e aria-labels appropriati
- **Validazione Real-time** - Errori mostrati durante la digitazione

## 📝 Note per il Colloquio Tecnico

Questo progetto dimostra:

1. **Best Practices React/Next.js**
   - Uso di App Router
   - Client Components dove necessario
   - Gestione stato con Context API
   - Code splitting automatico

2. **TypeScript**
   - Type safety completa
   - Interfacce ben definite
   - Nessun uso di `any`

3. **Tailwind CSS**
   - Utility classes
   - Custom components
   - Design system coerente
   - Responsive design

4. **Testing**
   - Unit tests per componenti
   - Context testing
   - Validation testing

5. **UX/UI**
   - Form validation completa
   - Feedback visuale chiaro
   - Navigazione intuitiva
   - Design moderno e pulito

## 🚀 Build per Produzione

```bash
npm run build
npm start
```

## 📄 Licenza

Progetto realizzato per colloquio tecnico.
