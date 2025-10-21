import './App.css'
import {  SpendProvider } from './context/spellSpend';

import MainPage from './components/MainPage';
function App() {

  return (
    <SpendProvider>
     <MainPage />
    </SpendProvider>
  )
}

export default App
