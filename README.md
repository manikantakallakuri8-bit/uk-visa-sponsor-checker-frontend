# UK Visa Sponsor Checker - Angular Frontend

A clean, responsive Angular 17+ frontend for the UK Visa Sponsor Checker - a RAG application upgraded with a ReAct AI Agent that lets job seekers instantly check whether a UK company holds a valid Skilled Worker sponsorship licence.

## The Problem

International job seekers in the UK waste hours cross-checking companies from job boards against the 141,000-row Home Office sponsor register. Company names on job posts rarely match registered names exactly - abbreviations, symbols, hyphens, and initials cause manual searches to fail silently.

## What This Frontend Does

Two tabs - one for RAG search, one for AI Agent:

### Tab 1 - Sponsor Search (RAG)
Calls 'POST /ask' on the backend. Type a company name, get an instant structured answer - sponsored status, rating, town, visa route.

'''
User types: "Does Tata Consultancy Services sponsor Skilled Workers?"
    ↓
Backend: normalise → ChromaDB semantic search → RapidFuzz fallback → Groq LLM
    ↓
Response: sponsored: true | A rating | London | Skilled Worker
'''

### Tab 2 - AI Agent
Calls 'POST /agent/query' on the backend. The ReAct agent reasons through the question using two tools - the sponsor register and live web search - then returns a comprehensive answer with full reasoning trace.

'''
User types: "I have an interview at Deloitte - can they sponsor me?"
    ↓
Agent thinks → checks register → thinks → searches web → generates answer
    ↓
Response: final answer + reasoning steps + tools used
'''

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 17+ |
| Language | TypeScript |
| HTTP | Angular HttpClient |
| State | Angular Signals |
| Styling | SCSS |
| Backend API | FastAPI on localhost:8000 |

## Quick Start

'''bash
# Install dependencies
npm install

# Start development server
ng serve

# Open browser
http://localhost:4200
'''

Make sure the FastAPI backend is running on port 8000 before starting the frontend:
'''bash
python -m uvicorn main:app --reload
'''

## Project Structure

'''
src/app/
├── app.component.ts          # Main component - search + agent logic
├── app.component.html        # Two-tab UI - Sponsor Search + AI Agent
├── app.component.scss        # Styles
├── sponsorship-api.service.ts # HTTP calls to FastAPI backend
└── models/
    └── sponsorship-ask-response.ts  # TypeScript interfaces
'''

## API Integration

### Sponsor Search - POST /ask

Request:
'''json
{
  "question": "Does Tata Consultancy Services sponsor Skilled Workers?",
  "top_k": 8
}
'''

Response displayed:
- Sponsored status (Yes/No chip)
- Status badge (Licensed / Not Found)
- Summary sentence from LLM
- Matching organisations table (name, town, route, rating)
- Data source + disclaimer

### AI Agent - POST /agent/query

Request:
'''json
{
  "question": "I have an interview at Deloitte - can they sponsor me?"
}
'''

Response displayed:
- Final answer from agent
- Tools used chips (SponsorRegisterCheck, WebSearch)
- Full reasoning steps trace
- Disclaimer

## Environment

The backend URL is hardcoded to 'http://127.0.0.1:8000' in 'sponsorship-api.service.ts'. Change this for production deployment.

CORS is handled by the FastAPI backend - allowed origins include 'http://localhost:4200'.

## Building for Production

'''bash
ng build
'''

Build artifacts go to 'dist/' directory.

## Backend Repository

The FastAPI backend (ChromaDB + sentence-transformers + Groq + RapidFuzz + ReAct Agent):
[uk-visa-sponsor-checker-backend](https://github.com/manikantakallakuri8-bit/uk-visa-sponsor-checker-backend)

## Limitations

- Backend must be running locally - no hosted API yet
- Always verify sponsorship status at [gov.uk](https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers) before making job application decisions
- Register data updates monthly - re-ingest backend data to stay current
