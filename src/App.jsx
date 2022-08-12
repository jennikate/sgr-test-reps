import { Link } from 'react-router-dom';
import './assets/main.scss';

const App = () => {
  return (
    <>
      <header className="header">
        I am the header
      </header>
      <main className="main">
        <Link to='/reputation'>Matteo&apos;s Rep List</Link>
        <br />
        <Link to='/sunnyglade-ratters'>Ratter&apos;s</Link>
      </main>
    </>
  );
};

export default App;