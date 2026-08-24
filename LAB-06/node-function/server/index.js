const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- 1. ARITHMETIC ALGORITHMS ---
function calculateFactorial(n) {
  if (n < 0) return { error: 'Factorial undefined for negative numbers.' };
  if (n === 0 || n === 1) return { result: 1 };
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return { result };
}

function calculateFibonacci(n) {
  if (n < 0) return { error: 'Fibonacci undefined for negative numbers.' };
  if (n === 0) return { result: 0 };
  if (n === 1) return { result: 1 };
  let a = 0, b = 1, temp;
  for(let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return { result: b };
}

function isPrime(n) {
  if (n <= 1) return { result: false };
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return { result: false };
  }
  return { result: true };
}

function calculateSquareRoot(n) {
  if (n < 0) return { error: 'Square root of negative number is complex.' };
  return { result: Math.sqrt(n) };
}

app.get('/api/math', (req, res) => {
  const number = parseFloat(req.query.number);
  const operation = req.query.operation || 'factorial';

  if (isNaN(number)) return res.status(400).json({ error: 'Valid number required.' });

  let output;
  switch (operation) {
    case 'factorial':
      output = calculateFactorial(number);
      break;
    case 'fibonacci':
      output = calculateFibonacci(number);
      break;
    case 'prime':
      output = isPrime(number);
      break;
    case 'sqrt':
      output = calculateSquareRoot(number);
      break;
    default:
      return res.status(400).json({ error: 'Unknown operation.' });
  }

  if (output.error) return res.status(400).json({ error: output.error });
  res.json({ number, operation, result: output.result });
});


// --- 2. DATA STRUCTURES: STACK (FILO) & QUEUE (FIFO) ---

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Stack Implementation: First In Last Out (FILO) / Last In First Out (LIFO)
class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }
  
  push(val) {
    const newNode = new Node(val);
    if (!this.top) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.size++;
  }
  
  pop() {
    if (!this.top) return null;
    const temp = this.top;
    this.top = this.top.next;
    this.size--;
    return temp.value;
  }

  toArray() {
    const arr = [];
    let curr = this.top;
    while(curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
}

// Queue Implementation: First In First Out (FIFO)
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  
  enqueue(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.size++;
  }
  
  dequeue() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }

  toArray() {
    const arr = [];
    let curr = this.first;
    while(curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
}

// Global instances for the app
const appStack = new Stack();
const appQueue = new Queue();

// Endpoints for Data Structures
app.get('/api/structures', (req, res) => {
  res.json({
    stack: appStack.toArray(),
    queue: appQueue.toArray()
  });
});

app.post('/api/structures/add', (req, res) => {
  const { item } = req.body;
  if (!item) return res.status(400).json({ error: 'Item is required' });
  
  appStack.push(item);
  appQueue.enqueue(item);
  
  res.json({
    message: 'Added to both',
    stack: appStack.toArray(),
    queue: appQueue.toArray()
  });
});

app.post('/api/structures/pop', (req, res) => {
  const popped = appStack.pop();
  res.json({
    poppedItem: popped,
    stack: appStack.toArray()
  });
});

app.post('/api/structures/dequeue', (req, res) => {
  const dequeued = appQueue.dequeue();
  res.json({
    dequeuedItem: dequeued,
    queue: appQueue.toArray()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
