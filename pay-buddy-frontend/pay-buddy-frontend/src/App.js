import Home from './pages/home/Home';
import NavBar from './pages/navBar/NavBar';
import Footer from './pages/footer/Footer';
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
