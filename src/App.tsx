import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IntroductionPage from './pages/IntroductionPage.tsx';
import OperationsPage from './pages/OperationsPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              className="py-2 px-4 rounded hover:bg-gray-700 focus:bg-gray-700 outline-none"
              tabIndex={0}
              aria-label="Go to introduction page"
              onKeyDown={(e) => { 
                if (e.key === 'Enter' || e.key === ' ') {
                  (e.target as HTMLElement).click(); 
                }
              }}
            >
              Introduction
            </Link>
            <Link
              to="/operations"
              className="py-2 px-4 rounded hover:bg-gray-700 focus:bg-gray-700 outline-none"
              tabIndex={0}
              aria-label="Go to operations page"
              onKeyDown={(e) => { 
                if (e.key === 'Enter' || e.key === ' ') {
                  (e.target as HTMLElement).click(); 
                }
              }}
            >
              Operations
            </Link>
          </nav>
        </aside>
        <main className="flex-1 bg-gray-50">
          <Routes>
            <Route path="/" element={<IntroductionPage />} />
            <Route path="/operations" element={<OperationsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 