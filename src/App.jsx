import { Link } from 'react-router-dom';
import './assets/main.scss';

const App = () => {
  return (
    <>
      <Link to='/reputation'>Matteo&apos;s Rep List</Link>
      <br />
      <Link to='/sunnyglade-ratters'>Ratter&apos;s</Link>
    </>
  );
};

export default App;