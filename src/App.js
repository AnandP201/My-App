import Home from './components/pages/Home';
import 'rsuite/dist/rsuite.min.css';
import './styles/main.css';
import { SessionProvider } from './context/Auth';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <Main />
        <Home />
      </SessionProvider>
    </div>
  );
}

export default App;
