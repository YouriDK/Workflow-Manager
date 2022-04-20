import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Designer from './Pages/Designer';
import History from './Pages/History';
import Home from './Pages/Home';
import Infos from './Pages/Infos';
import Nodes from './Pages/Nodes';
import Options from './Pages/Options';
import Tuto from './Pages/Tuto';
import User from './Pages/User';

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
        <Route path='/node' element={<Nodes />} />
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
