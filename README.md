# Ridiculous Personality Audit

A lightweight static quiz app built with `HTML`, `CSS`, and `JavaScript`. Version 2 turns the concept into a one-question-at-a-time comedy quiz with absurd prompts, free-text answers, and OpenRouter-powered personality classification.

## Files

- `index.html` contains the app layout
- `styles.css` contains the visual design
- `app.js` contains the one-question flow, funny personas, and OpenRouter request

## Setup

1. Open `index.html` in your browser.
2. Replace the placeholder API key in the sidebar, or edit `DEFAULT_API_KEY` in `app.js`.
3. Answer the absurd prompts and submit the quiz to get an AI-generated result.

## Important note

This is a fully static frontend. That means any OpenRouter API key used here is visible in the browser. For local experiments, that can be acceptable. For real deployment, move the API call to a backend proxy so your key stays private.

## Fallback behavior

If OpenRouter is unavailable, the app falls back to a lightweight keyword-based local classifier so the experience still works during testing.
