import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Designer from './pages/Designer';
import History from './pages/History';
import Home from './pages/Home';
import Infos from './pages/Infos';
import Node from './pages/Node';
import Options from './pages/Options';
import Tuto from './pages/Tuto';
import User from './pages/User';
import './scss/root.scss';

const App: FC<any> = (): JSX.Element => {
  console.log('APP');
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/designer' element={<Designer />} />
        <Route path='/history' element={<History />} />
        <Route path='/infos' element={<Infos />} />
        <Route path='/node' element={<Node />} />
        <Route path='/tutorial' element={<Tuto />} />
        <Route path='/user' element={<User />} />
        <Route path='/options' element={<Options />} />
      </Routes>
      <footer>
        <span>Workflow Manager Production YC Developpment</span>
      </footer>
    </BrowserRouter>
  );
};
export default App;
