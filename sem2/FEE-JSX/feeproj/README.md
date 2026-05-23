# FlashMind

FlashMind is a light themed, frontend-only flashcard study app for active recall. It helps students create subject-wise decks, generate flashcards from a topic or pasted notes, study with animated feedback, and track progress locally in the browser.

The app is built with plain HTML, CSS, and JavaScript. There is no required backend for the core project.

## Features

- Create, edit, delete, search, and sort flashcard decks.
- Add, edit, and delete cards inside each deck.
- Generate flashcards from a topic or source text using Groq Llama 3.1.
- Continue working without an API key through the offline fallback generator.
- Study with a tactile 3D flashcard flip flow.
- Show `Got it!` feedback for correct answers.
- Show `You'll get it next time` feedback with an explanation option for wrong answers.
- Auto-adjust long flashcard text so card content stays usable.
- Track total cards, deck count, average mastery, study sessions, and review history.
- Export, import, and clear local study data.
- Toggle the notebook grid texture in settings.

## Tech Stack

| Area | Technology |
| --- | --- |
| Structure | HTML5 |
| Styling | CSS3 |
| Logic | JavaScript ES6+ |
| Storage | Browser localStorage |
| AI Provider | Groq Llama 3.1 |
| Charts | Chart.js CDN |
| Fonts | Google Fonts |

## Project Structure

```text
.
├── index.html
├── css/
│   ├── main.css
│   ├── components.css
│   └── views.css
├── js/
│   ├── store.js
│   ├── ui.js
│   └── app.js
├── .env
├── vercel.json
└── .vercelignore
```

## Run Locally

Open `index.html` directly in a browser.

For a local static server, you can also run:

```bash
npx serve .
```

Then open the local URL shown in the terminal.

## Groq Llama 3.1 Setup

The AI generator uses these default settings:

```env
GROQ_API_KEY=
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
GROQ_MODEL=llama-3.1-8b-instant
```

In the app, open the minimized `Groq Llama 3.1 Settings` panel and paste a Groq API key to generate flashcards with Llama. If no key is provided, FlashMind uses the built-in offline generator.

Important: because this is a browser-only frontend, a real Groq API key cannot be hidden securely in production. For a public deployment, use a small backend or serverless proxy and keep the key in Vercel environment variables.

## Vercel Deployment

This repo includes final static deployment files for Vercel:

- `vercel.json` configures clean URLs and security headers.
- `.vercelignore` keeps local docs, source archives, screenshots, and environment files out of deployment uploads.

Deploy steps:

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Use `Other` as the framework preset.
4. Leave the build command empty.
5. Use `.` as the project root/output for the static site.
6. Add `GROQ_API_KEY`, `GROQ_API_URL`, and `GROQ_MODEL` in Vercel only if you later add a serverless proxy.

## Data Storage

FlashMind stores all app data in the browser using this localStorage key:

```text
flashmind_data_v1
```

Data stays on the same browser/device unless exported and imported manually.

## Known Limitations

- The static frontend cannot securely hide Groq API keys.
- The `.env` file is a project placeholder and is not read directly by browser JavaScript.
- The offline generator is only a simple fallback and is less capable than Groq.
- A backend or Vercel serverless proxy is recommended for production AI usage.

## Team

Group 5:

- Tanish Singla
- Aditya Patyal
- Dhruv Pathak
