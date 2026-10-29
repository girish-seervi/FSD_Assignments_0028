import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock IntersectionObserver for tests
beforeAll(() => {
  window.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {
      this.callback([{ isIntersecting: true }]);
    }
    unobserve() {}
    disconnect() {}
  };

  // Mock window.scrollTo
  window.scrollTo = jest.fn();
});

test('renders department header and branding', () => {
  render(<App />);
  const departmentTitles = screen.getAllByText(/Department of/i);
  expect(departmentTitles.length).toBeGreaterThan(0);

  const computerApplications = screen.getAllByText(/Computer Applications/i);
  expect(computerApplications.length).toBeGreaterThan(0);
});

test('renders main navigation links', () => {
  render(<App />);
  expect(screen.getAllByRole('link', { name: /About/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Faculty/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Programs/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Placements/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /Contact/i }).length).toBeGreaterThan(0);
});

test('renders faculty directory and filters by search term', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search faculty by name or research area/i);
  expect(searchInput).toBeInTheDocument();

  // Initially Dr. Thenmozhi and Dr. Mahadev Kalyanrao Patil are rendered
  expect(screen.getByText(/Dr. Thenmozhi/i)).toBeInTheDocument();
  expect(screen.getByText(/Dr. Mahadev Kalyanrao Patil/i)).toBeInTheDocument();

  // Search for Mahadev
  fireEvent.change(searchInput, { target: { value: 'Mahadev' } });
  expect(screen.getByText(/Dr. Mahadev Kalyanrao Patil/i)).toBeInTheDocument();
  expect(screen.queryByText(/Dr. Thenmozhi/i)).not.toBeInTheDocument();

  // Clear search
  fireEvent.change(searchInput, { target: { value: '' } });
  expect(screen.getByText(/Dr. Thenmozhi/i)).toBeInTheDocument();
});

test('filters faculty by designation', () => {
  render(<App />);
  const designationSelect = screen.getByDisplayValue(/All Designations/i);
  expect(designationSelect).toBeInTheDocument();

  // Filter by Associate Professor
  fireEvent.change(designationSelect, { target: { value: 'Associate Professor' } });
  expect(screen.getByText(/Dr. Mahadev Kalyanrao Patil/i)).toBeInTheDocument();
  expect(screen.queryByText(/Dr. Thenmozhi/i)).not.toBeInTheDocument();
});

test('submits contact form and displays confirmation message', async () => {
  render(<App />);
  const nameInput = screen.getByPlaceholderText(/Your Name/i);
  const emailInput = screen.getByPlaceholderText(/Your Email/i);
  const submitButton = screen.getByRole('button', { name: /Send Message/i });

  fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
  fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
  fireEvent.click(submitButton);

  // Expect confirmation message to appear
  await waitFor(() => {
    expect(screen.getByText(/Thank You, Jane Doe!/i)).toBeInTheDocument();
    expect(screen.getByText(/successfully submitted/i)).toBeInTheDocument();
  });
});
