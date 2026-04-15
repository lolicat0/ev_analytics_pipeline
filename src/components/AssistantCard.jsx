import { useState } from 'react';
import { askAssistant } from '../api';

const AssistantCard = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const data = await askAssistant(question);
      // Based on typical API formats, extract the answer assuming data has an 'answer', 'response', or 'body' field.
      // Adjust this based on actual API response structure if needed.
      const answer = data.answer || data.response || data.body || JSON.stringify(data, null, 2);
      
      // If the answer is still an object (like when body is a stringified JSON), parse it
      if (typeof answer === 'string' && answer.startsWith('{')) {
        try {
          const parsed = JSON.parse(answer);
          setResponse(parsed.answer || parsed.response || answer);
        } catch (e) {
          setResponse(answer);
        }
      } else {
        setResponse(answer);
      }
    } catch (err) {
      setError('Failed to get a response from the AI Assistant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="card-header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <h2 className="text-xl font-semibold">AI Assistant</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="input-group">
          <label htmlFor="question">Ask about EV charging...</label>
          <input
            id="question"
            type="text"
            placeholder="e.g. What is the best time to charge my EV?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
          <div className="flex" style={{ gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
            <span 
              onClick={() => !loading && setQuestion('What was the peak charging load last week?')}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', cursor: loading ? 'not-allowed' : 'pointer', color: 'var(--text-secondary)' }}
            >
              Peak load?
            </span>
            <span 
              onClick={() => !loading && setQuestion('Most cost-effective time to charge?')}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', cursor: loading ? 'not-allowed' : 'pointer', color: 'var(--text-secondary)' }}
            >
              Cost-effective time?
            </span>
          </div>
        </div>
        
        <button type="submit" disabled={loading || !question.trim()} className="mt-2 text-center" style={{ width: '100%' }}>
          {loading ? (
            <>
              <div className="spinner"></div>
              <span>Asking AI...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span>Ask AI</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="text-error text-sm mt-2 font-medium">
          {error}
        </div>
      )}

      {response && !error && (
        <div className="mt-4">
          <label className="mb-2 block">AI Response:</label>
          <div className="output-area fade-in">
            {typeof response === 'string' ? response.replace(/"/g, '') : JSON.stringify(response)}
          </div>
        </div>
      )}
    </section>
  );
};

export default AssistantCard;
