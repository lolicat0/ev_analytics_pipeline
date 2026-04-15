import { useState } from 'react';
import { predictUsage } from '../api';

const PredictionCard = () => {
  const [energy, setEnergy] = useState('');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!energy || !duration) return;

    setLoading(true);
    setError('');
    
    try {
      const data = await predictUsage(energy, duration);
      
      // Handle potentially nested response body depending on API configuration
      let predictionData = data;
      if (data.body && typeof data.body === 'string') {
        try {
          predictionData = JSON.parse(data.body);
        } catch (e) {
          // Keep as is if not parseable
        }
      }

      // Automatically map the current backend mock response to the structured format for the UI demo
      if (!predictionData.usage_level && predictionData.answer) {
        predictionData = {
          usage_level: Number(energy) > 50 ? 'High' : Number(energy) > 20 ? 'Moderate' : 'Low',
          revenue_estimate: (Number(energy) * 0.25).toFixed(2), // Mock $0.25 per kWh
          insights: predictionData.answer
        };
      }

      setResult(predictionData);
    } catch (err) {
      setError('Failed to fetch prediction. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="card-header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
        <h2 className="text-xl font-semibold">Prediction System</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="input-group mt-2">
          <label htmlFor="energy">Energy (kWh)</label>
          <input
            id="energy"
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 50"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="input-group mt-2 mb-2">
          <label htmlFor="duration">Duration (minutes)</label>
          <input
            id="duration"
            type="number"
            min="0"
            placeholder="e.g. 120"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading || !energy || !duration} className="btn-accent w-full mt-2">
          {loading ? (
            <>
              <div className="spinner"></div>
              <span>Predicting...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
              <span>Predict</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="text-error text-sm mt-2 font-medium">
          {error}
        </div>
      )}

      {result && !error && (
        <div className="mt-4 fade-in">
          <label className="mb-2 block">Prediction Results:</label>
          <div className="output-area">
            {result.usage_level || result.usageLevel ? (
              <div className="result-metric">
                <span className="font-medium text-secondary">Usage Level</span>
                <span className="font-bold text-primary-color">{result.usage_level || result.usageLevel}</span>
              </div>
            ) : null}
            
            {result.revenue_estimate || result.revenueEstimate ? (
              <div className="result-metric">
                <span className="font-medium text-secondary">Revenue Estimate</span>
                <span className="font-bold text-accent">${result.revenue_estimate || result.revenueEstimate}</span>
              </div>
            ) : null}
            
            {result.insights ? (
              <div className="result-metric" style={{ flexDirection: 'column', gap: '0.5rem', borderBottom: 'none' }}>
                <span className="font-medium text-secondary">Insights</span>
                <span className="text-sm">{result.insights}</span>
              </div>
            ) : null}
            
            {/* Fallback if response structure is entirely different */}
            {(!result.usage_level && !result.usageLevel && !result.revenue_estimate && !result.revenueEstimate && !result.insights) && (
               <pre className="text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PredictionCard;
