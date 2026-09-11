#!/bin/bash
echo "Waiting for backend dependencies..."
cd backend
while [ ! -d "node_modules/express" ]; do
  sleep 2
done
echo "Starting backend..."
node server.js &

cd ../frontend
echo "Waiting for frontend dependencies..."
while [ ! -d "node_modules/react-router-dom" ]; do
  sleep 2
done
echo "Starting frontend..."
npm start
