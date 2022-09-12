import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import App from 'dev-project-react/src/App';

test('test crossingProvider', async () => {
  window.history.pushState({}, '', '/#/slots')
  const {findByText, getByTestId, findByTestId} = render(<App/>)
  expect(await findByText(/To React Component Node/)).toBeInTheDocument()
})
