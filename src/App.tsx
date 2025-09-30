import { useState } from 'react';
import './App.css'
import Home from './Page02';
import SplashScreen from './SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <Home />
    </>
  );
}

export default App;
