import { useState, useEffect } from 'react';
import './index.css';

function App() {
  // Math State
  const [number, setNumber] = useState('');
  const [operation, setOperation] = useState('factorial');
  const [mathResult, setMathResult] = useState(null);
  const [mathError, setMathError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Structures State
  const [item, setItem] = useState('');
  const [stack, setStack] = useState([]);
  const [queue, setQueue] = useState([]);
  const [structError, setStructError] = useState(null);

  useEffect(() => {
    fetchStructures();
  }, []);

  const fetchStructures = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/structures');
      const data = await res.json();
      setStack(data.stack);
      setQueue(data.queue);
    } catch (err) {
      console.error('Failed to fetch structures:', err);
    }
  };

  const handleCalculate = async () => {
    if (number === '') return;
    setLoading(true); setMathError(null); setMathResult(null);
    try {
      const response = await fetch(`http://localhost:3001/api/math?operation=${operation}&number=${number}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');
      setMathResult(data.result);
    } catch (err) {
      setMathError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!item) return;
    setStructError(null);
    try {
      const res = await fetch('http://localhost:3001/api/structures/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStack(data.stack);
      setQueue(data.queue);
      setItem('');
    } catch (err) {
      setStructError(err.message);
    }
  };

  const handlePopStack = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/structures/pop', { method: 'POST' });
      const data = await res.json();
      setStack(data.stack);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDequeueQueue = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/structures/dequeue', { method: 'POST' });
      const data = await res.json();
      setQueue(data.queue);
    } catch (err) {
      console.error(err);
    }
  };

  const formatOperation = (op) => {
    const map = {
      factorial: 'Factorial (!)',
      fibonacci: 'Fibonacci (nth)',
      prime: 'Is Prime?',
      sqrt: 'Square Root (√)'
    };
    return map[op] || op;
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Algorithms & Data Structures</h1>
        <p>Interactive Node.js powered computational playground</p>
      </div>
      
      {/* Arithmetic Algorithms Section */}
      <div className="card">
        <h2 className="card-title">🔢 Arithmetic Algorithms</h2>
        <div className="input-group">
          <select value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="factorial">Factorial (!)</option>
            <option value="fibonacci">Fibonacci Sequence</option>
            <option value="prime">Prime Number Check</option>
            <option value="sqrt">Square Root</option>
          </select>
          <input 
            type="number" 
            value={number} 
            onChange={(e) => setNumber(e.target.value)} 
            placeholder="Enter a number"
          />
          <button onClick={handleCalculate} disabled={loading || number === ''}>
            {loading ? 'Calculating...' : 'Calculate'}
          </button>
        </div>

        {mathError && <div className="error-msg">{mathError}</div>}
        
        {mathResult !== null && (
          <div className="result-box">
            <span>{formatOperation(operation)} of {number} is</span>
            <span className="result-value">{mathResult.toString()}</span>
          </div>
        )}
      </div>

      {/* Data Structures Section */}
      <div className="card">
        <h2 className="card-title">📚 Data Structures Fundamentals</h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
          Simultaneously push elements into a Stack (FILO) and a Queue (FIFO).
        </p>
        
        <div className="input-group">
          <input 
            type="text" 
            value={item} 
            onChange={(e) => setItem(e.target.value)} 
            placeholder="Enter any value to insert"
            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
          />
          <button onClick={handleAddItem} disabled={!item}>
            Insert Element
          </button>
        </div>
        
        {structError && <div className="error-msg" style={{marginBottom: '1rem'}}>{structError}</div>}

        <div className="structures-grid">
          {/* Stack Container */}
          <div className="struct-container">
            <div className="struct-header">
              <h3>Stack <span style={{fontSize:'0.9rem', color:'#8b5cf6'}}>(FILO)</span></h3>
              <button className="btn-secondary" onClick={handlePopStack} disabled={stack.length === 0}>
                Pop (Remove Top)
              </button>
            </div>
            
            <div className="stack-list">
              {stack.length === 0 ? (
                <div className="empty-state">Stack is empty</div>
              ) : (
                stack.map((val, idx) => (
                  <div key={idx + '-' + val} className={`stack-item ${idx === 0 ? 'top' : ''}`}>
                    {val} {idx === 0 && <span style={{fontSize:'0.8rem', opacity:0.8}}>(Top)</span>}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Queue Container */}
          <div className="struct-container">
            <div className="struct-header">
              <h3>Queue <span style={{fontSize:'0.9rem', color:'#10b981'}}>(FIFO)</span></h3>
              <button className="btn-secondary" onClick={handleDequeueQueue} disabled={queue.length === 0}>
                Dequeue (Remove Front)
              </button>
            </div>
            
            <div className="queue-list">
              {queue.length === 0 ? (
                <div className="empty-state" style={{width: '100%'}}>Queue is empty</div>
              ) : (
                queue.map((val, idx) => {
                  let classes = "queue-item";
                  if (idx === 0) classes += " front";
                  else if (idx === queue.length - 1) classes += " rear";
                  
                  return (
                    <div key={idx + '-' + val} className={classes}>
                      {val} 
                      {idx === 0 && <div style={{fontSize:'0.7rem', opacity:0.8}}>Front</div>}
                      {idx === queue.length - 1 && queue.length > 1 && <div style={{fontSize:'0.7rem', opacity:0.8}}>Rear</div>}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
