import Home from './components/home/Home';
import NavBar from './layout/header/Header';
import Footer from './layout/footer/Footer';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
      <>
        <NavBar/>
        <Router>
          <Routes>
            <Route path="" element={<Home />}/>
          </Routes>
        </Router>
        <Footer />
      </>
  );
}

export default App;
