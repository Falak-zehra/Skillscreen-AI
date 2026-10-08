import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import AssessmentFlow from './components/assessment/AssessmentFlow';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'assessment'
  const [activeTrack, setActiveTrack] = useState('frontend');

  const handleStartScreening = (trackId = 'frontend') => {
    setActiveTrack(typeof trackId === 'string' ? trackId : 'frontend');
    setView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAssessment = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onStartScreening={() => handleStartScreening('frontend')}
        isAssessing={view === 'assessment'}
        onExitAssessment={handleExitAssessment}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {view === 'landing' ? (
          <>
            <Hero onStartScreening={() => handleStartScreening('frontend')} />
            <Features onSelectDomain={(trackId) => handleStartScreening(trackId)} />
          </>
        ) : (
          <AssessmentFlow
            initialDomainId={activeTrack}
            onExit={handleExitAssessment}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
