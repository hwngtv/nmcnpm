// Import các hàm render và screen từ thư viện testing-library/react
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // Render the App component
  render(<App />);
  
  // Find the element containing the text "learn react" (case-insensitive) and store it in the linkElement variable
  const linkElement = screen.getByText(/learn react/i);
  
  
  // Use expect to check whether the found element (linkElement) is present in the DOM. If it is, the test will pass; otherwise, it will fail.
  expect(linkElement).toBeInTheDocument();
});
