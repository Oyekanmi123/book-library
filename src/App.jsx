// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./components/BookDetails";



function App() {
return( 
  <Router>
    <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/book/:id" element={<BookDetails />} />
    </Routes>
  </Router>
)   
    
}

export default App
