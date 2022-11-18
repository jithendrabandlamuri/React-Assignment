import './App.css';
import SignUp from './components/SignUp';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage';
import HomePage from './components/HomePage';
import AddArticle from './components/AddArticle';
import ViewArticle from './components/ViewArticle';
import { useState } from 'react';


function App() {
  const [data2, setData2] = useState('');
  return (
    <div className="App">
      <>
        <Routes>
          <Route path='/' element={<MainPage />}></Route>
          <Route path='/signUp' element={<SignUp />}></Route>
          <Route path='/login' element={<Login setData2={setData2}/>}></Route>
          <Route path='/HomePage' element={<HomePage data2={data2} />}></Route>
          <Route path='/AddArticle' element={<AddArticle />}></Route>
          <Route path='/ViewArticle' element={<ViewArticle />}></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
