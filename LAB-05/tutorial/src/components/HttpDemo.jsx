import React, { useState } from 'react';
import { Globe, ArrowRight, Loader2, Server, Laptop, CheckCircle, RefreshCw, Code, Mail, User, ShieldCheck } from 'lucide-react';

export default function HttpDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0); // 0: Idle, 1: Request sent, 2: Server processing, 3: Response received

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    setActiveStep(1); // Client sending request

    try {
      // Delay slightly for visual demonstration of step progression
      await new Promise(res => setTimeout(res, 600));
      setActiveStep(2); // Server processing

      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      await new Promise(res => setTimeout(res, 600));
      const json = await response.json();

      setData(json);
      setActiveStep(3); // Response received
    } catch (err) {
      setError(err.message || 'Failed to fetch user data');
      setActiveStep(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="http-demo" className="section-padding bg-light-accent">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Globe size={14} /> Tutorial 1 Concept
          </div>
          <h2 className="section-title">
            HTTP Request–Response <span className="gradient-text">Cycle Demo</span>
          </h2>
          <p className="section-subtitle">
            Demonstrating asynchronous client-server communication using JavaScript Fetch API to retrieve live JSON data from an external REST API endpoint.
          </p>
        </div>

        {/* Top Control Bar & Action Button */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          border: '1px solid var(--slate-200)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-500)', textTransform: 'uppercase' }}>
              Target REST API Endpoint
            </div>
            <code style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              color: 'var(--primary-700)',
              backgroundColor: 'var(--primary-50)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-block',
              marginTop: '0.25rem',
              border: '1px solid var(--primary-200)'
            }}>
              GET https://jsonplaceholder.typicode.com/users/1
            </code>
          </div>

          <button
            onClick={handleFetchData}
            disabled={loading}
            className="btn btn-primary"
            style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending HTTP GET Request...
              </>
            ) : (
              <>
                <RefreshCw size={18} />
                Send Request
              </>
            )}
          </button>
        </div>

        {/* Visual Diagram of HTTP Request-Response Cycle */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          border: '1px solid var(--slate-200)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2.5rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--slate-900)', textAlign: 'center' }}>
            HTTP Request-Response Lifecycle Flow
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            position: 'relative'
          }}>
            {/* Step 1: Client Request */}
            <div style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${activeStep === 1 ? 'var(--primary-600)' : 'var(--slate-200)'}`,
              backgroundColor: activeStep === 1 ? 'var(--primary-50)' : 'var(--slate-50)',
              transition: 'all var(--transition-normal)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-100)', color: 'var(--primary-800)' }}>
                  STEP 1
                </span>
                <Laptop size={24} color={activeStep === 1 ? 'var(--primary-600)' : 'var(--slate-500)'} />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                1. Client Request
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)' }}>
                Browser sends an HTTP GET request with headers and parameters via JavaScript `fetch()`.
              </p>
            </div>

            {/* Step 2: Server Processing */}
            <div style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${activeStep === 2 ? 'var(--primary-600)' : 'var(--slate-200)'}`,
              backgroundColor: activeStep === 2 ? 'var(--primary-50)' : 'var(--slate-50)',
              transition: 'all var(--transition-normal)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-100)', color: 'var(--primary-800)' }}>
                  STEP 2
                </span>
                <Server size={24} color={activeStep === 2 ? 'var(--primary-600)' : 'var(--slate-500)'} />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                2. Server Processing
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)' }}>
                JSONPlaceholder server receives request, validates URI, queries database, and formats payload.
              </p>
            </div>

            {/* Step 3: Server Response */}
            <div style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${activeStep === 3 ? 'var(--success-500)' : 'var(--slate-200)'}`,
              backgroundColor: activeStep === 3 ? '#ecfdf5' : 'var(--slate-50)',
              transition: 'all var(--transition-normal)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', backgroundColor: activeStep === 3 ? '#d1fae5' : 'var(--slate-200)', color: activeStep === 3 ? '#065f46' : 'var(--slate-700)' }}>
                  STEP 3
                </span>
                <ShieldCheck size={24} color={activeStep === 3 ? 'var(--success-500)' : 'var(--slate-500)'} />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                3. Server Response
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)' }}>
                Server responds with HTTP status code 200 OK along with JSON formatted user data payload.
              </p>
            </div>
          </div>
        </div>

        {/* API Response Display Area */}
        {loading && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2rem',
            textAlign: 'center',
            border: '1px dashed var(--primary-300)'
          }}>
            <Loader2 size={36} className="animate-spin" color="var(--primary-600)" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-800)' }}>
              Executing HTTP GET Request...
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)' }}>Fetching data from jsonplaceholder.typicode.com</p>
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: 'var(--error-50)',
            border: '1px solid #fca5a5',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            color: '#b91c1c',
            fontSize: '0.95rem'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {data && !loading && (
          <div className="portal-card" style={{ borderLeft: '6px solid var(--primary-600)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--success-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  &bull; HTTP 200 OK Response
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  Fetched User Profile Details
                </h3>
              </div>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', backgroundColor: 'var(--slate-100)', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                Response Format: Application/JSON
              </span>
            </div>

            {/* Displaying mandatory required fields: Name, Username, Email, Website */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem'
            }}>
              <div style={dataItemBoxStyle}>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Full Name
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)', marginTop: '0.2rem' }}>
                  {data.name}
                </div>
              </div>

              <div style={dataItemBoxStyle}>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Username
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-700)', marginTop: '0.2rem' }}>
                  @{data.username}
                </div>
              </div>

              <div style={dataItemBoxStyle}>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Email Address
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--slate-800)', marginTop: '0.2rem' }}>
                  {data.email}
                </div>
              </div>

              <div style={dataItemBoxStyle}>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Website
                </div>
                <a href={`https://${data.website}`} target="_blank" rel="noreferrer" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-600)', marginTop: '0.2rem', textDecoration: 'none' }}>
                  {data.website}
                </a>
              </div>
            </div>

            {/* Raw JSON viewer toggle details */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--slate-200)' }}>
              <details>
                <summary style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: 700, color: 'var(--slate-600)' }}>
                  View Raw JSON Payload
                </summary>
                <pre style={{
                  backgroundColor: 'var(--slate-900)',
                  color: '#38bdf8',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  marginTop: '0.75rem',
                  overflowX: 'auto',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {JSON.stringify(data, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const dataItemBoxStyle = {
  backgroundColor: 'var(--slate-50)',
  padding: '1rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--slate-200)'
};
