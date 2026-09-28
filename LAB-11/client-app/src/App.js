import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBarComponent from './components/navBarComponent';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/data');
      const result = await response.json();
      setData(result.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData("Error fetching data from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <NavBarComponent />

      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Header as="h5">Feed / Connection Test</Card.Header>
              <Card.Body>
                <Card.Title>Response from Server:</Card.Title>
                <Card.Text>
                  {loading ? 'Loading...' : (data || 'No data yet')}
                </Card.Text>
                <Button variant="primary" onClick={fetchData} disabled={loading}>
                  Refresh Feed
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
