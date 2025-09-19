import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { TablePage } from './components/pages/TablePage';
import { IssueDetailsPage } from './components/pages/IssueDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issues" element={<TablePage />} />
          <Route path="/issues/:id" element={<IssueDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
