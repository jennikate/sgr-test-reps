import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { GuildProvider } from './Context/guildContext';
import App from './App';
import CharacterReputation from './Pages/CharactersRep';
import GuildList from './Pages/GuildList';

const root = createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
    <GuildProvider>
      <header className="header">
        I am the header
      </header>
      <main className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/sunnyglade-ratters" element={<GuildList />} />
            <Route path="/reputation" element={<CharacterReputation />} />
          </Routes>
        </BrowserRouter>
      </main>
    </GuildProvider>
  </>,

  // </React.StrictMode>,
);