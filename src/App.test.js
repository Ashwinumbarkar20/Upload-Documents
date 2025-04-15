import {render,screen} from '@testing-library/react'
const App=require('../src/App')
test('Check app is there or not?', () => {
  render(<App/>);
  const text=screen.getByText(/Vite+React/i);
   expect(text).toBeInTheDocument();
})
