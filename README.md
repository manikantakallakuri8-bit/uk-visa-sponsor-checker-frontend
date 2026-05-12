# uk-visa-sponsor-checker
RAG-powered API to check if a UK company holds a Skilled Worker sponsorship licence - FastAPI + ChromaDB + sentence-transformers + Groq + Angular frontend

# UK Visa Sponsor Checker

A full-stack RAG (Retrieval-Augmented Generation) application that lets job seekers instantly check whether a UK company holds a valid Skilled Worker sponsorship licence - without manually searching the 141,000-row Home Office register.

# The Problem
International job seekers in the UK waste hours cross-checking companies from job boards against the government sponsor register. Company names on job posts rarely match registered names exactly - abbreviations, symbols, hyphens, and initials cause manual searches to fail silently.

# The Solution
A three-layer search pipeline:
1. **Query normalisation** — handles symbols (%, &, +), abbreviations (Ltd → Limited), and number variants (1-2 → 1 to 2) before searching
2. **Semantic search** — sentence-transformers embeddings + ChromaDB retrieve the most contextually similar sponsor records
3. **Fuzzy fallback** — RapidFuzz token matching catches character-level variations the embedding model misses

## Features
- Natural language queries - "Does Tata Consultancy sponsor Skilled Workers?"
- Handles fuzzy company names - typos, abbreviations, symbols
- Structured JSON response - sponsored status, rating, town, visa route
- Bulk check endpoint - verify multiple companies in one call
- Angular frontend with real-time search
- Zero cost to run - free embeddings, free Groq tier, free ChromaDB
Results are passed to Groq's llama-3.1-8b-instant model which generates a clear, human-readable answer with sponsorship status and location.

# Tier2RagApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.25.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.


