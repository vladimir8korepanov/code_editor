import { render, screen } from '@testing-library/react';
import App from './app/App';

test('renders editor title', () => {
  render(<App />);
  const titleElement = screen.getByText(/online code editor/i);
  expect(titleElement).toBeInTheDocument();
});
