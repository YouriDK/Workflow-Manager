import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Designer from './Pages/Designer';
import History from './Pages/History';
import Home from './Pages/Home';
import Infos from './Pages/Infos';
import Node from './Pages/Node';
import Options from './Pages/Options';
import Tuto from './Pages/Tuto';
import User from './Pages/User';

const App: FC<any> = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={Home} />
        <Route path='/designer' element={Designer} />
        <Route path='/history' element={History} />
        <Route path='/infos' element={Infos} />
        <Route path='/node' element={Node} />
        <Route path='/tutorial' element={Tuto} />
        <Route path='/user' element={User} />
        <Route path='/options' element={Options} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
