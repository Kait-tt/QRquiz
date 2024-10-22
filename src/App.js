import React, { useState } from 'react';

import QRScanner from './components/QRScanner';
import Quiz from './components/Quiz';
import './components/App.css';

const App = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  const handleButtonClick = () => {
    setShowScanner(true);
  };

  const handleDataReceived = (data) => {
    try {
      // データが文字列の場合のみJSON.parseを実行
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      setScannedData(parsedData);
      console.log("scanned data:", parsedData);
    } catch (err) {
      console.error("json parse error:", err);
    }
    console.log("scanned data:", data);
    setShowScanner(false);
  };

  return (
    <div>
      <h1>QRクイズラリー</h1>
      <button onClick={handleButtonClick}>QRスキャナーを起動</button>
      {showScanner && <QRScanner onDataReceived={handleDataReceived} />}
      {scannedData && <Quiz data={scannedData} />}
    </div>
  );
};

export default App;