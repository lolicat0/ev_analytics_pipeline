import Header from './components/Header';
import AssistantCard from './components/AssistantCard';
import PredictionCard from './components/PredictionCard';
import SystemInfo from './components/SystemInfo';

function App() {
  return (
    <div className="container">
      <Header />
      
      <main className="dashboard-grid">
        <AssistantCard />
        <PredictionCard />
      </main>
      
      <footer style={{ marginTop: 'auto' }}>
        <SystemInfo />
      </footer>
    </div>
  );
}

export default App;
