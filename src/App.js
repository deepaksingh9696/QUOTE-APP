import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { toPng } from 'html-to-image';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const qrRef = useRef();

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const downloadQR = () => {
    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qr-code.png';
        link.click();
      })
      .catch((error) => {
        console.error('Failed to generate QR code image', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={handleInputChange}
        />
        <div ref={qrRef} style={{ margin: '20px 0' }}>
          <QRCode value={text || ' '} />
        </div>
        <button onClick={downloadQR}>Download QR Code</button>
      </header>
    </div>
  );
};

export default App;
