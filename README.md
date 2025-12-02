# AI Enterprise Support Desk

A multi-agent system built with Google’s Agent Developer Kit (ADK) and Gemini 2.5 Flash to automate internal support ticket handling for IT, HR, and Software requests.

---

## What It Does

- Classifies support tickets (IT / HR / Software)
- Retrieves grounded documentation using a custom knowledge-base search tool
- Generates a helpful final answer with a confidence score
- Uses a supervisor agent to approve, retry, or escalate
- Evaluates automation rate, confidence levels, and accuracy across all tickets

---

## Architecture (4 Agents)

1. **Classifier Agent**  
   Predicts category with strict JSON output and retry on malformed JSON.

2. **Retrieval Agent**  
   Calls the custom `search_knowledge_base` FunctionTool exactly once to fetch relevant KB snippets.

3. **Response Agent**  
   Produces the final answer + confidence using snippets and ticket text.

4. **Supervisor Agent**  
   Decides: `APPROVE`, `RETRY_RETRIEVAL`, or `ESCALATE`.  
   Implements retry loop for low-quality answers.

---

## Folder Structure

```
├── agent_system.ipynb # Main implementation
├── config.py # API key loader
├── data/
│ └── tickets.json
├── knowledge_base/
│ ├── kb_it.txt
│ ├── kb_hr.txt
│ └── kb_software.txt
├── tools/
│ └── search_knowledge_base.js 
└── README.md
```
---

## Custom Tool (Python)

`search_knowledge_base(category, query)`  
- Performs keyword search in the appropriate KB file  
- Returns up to 10 matched lines  
- Ensures retrieval grounding  

Used by Retrieval Agent through ADK's `FunctionTool`.

---

## Running the System

1. Install dependencies:
   ```bash
   pip install google-adk google-genai pandas nest_asyncio
2. Create `config.py`:
   GOOGLE_API_KEY = "your_key_here"

3. Run the notebook:
   agent_system.ipynb

## Evaluation Metrics

The notebook calculates:

- **Automation rate**
- **Escalation rate**
- **Retry count**
- **Average confidence**
- **Classification accuracy** (if labels available)

---

## Future Improvements

- Semantic search instead of keyword matching  
- More categories (Finance, Payroll, Security)  
- Deployment via Agent Engine / Cloud Run  
- UI dashboard for support teams  






