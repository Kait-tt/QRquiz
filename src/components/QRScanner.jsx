// QRScanner.jsx
import React, { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const QRScanner = ({ onDataReceived }) => {
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    if (videoRef.current) {
      codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          try {
            const parsedData = JSON.parse(result.getText()); // QRコードのテキストをJSONとしてパース
            onDataReceived(parsedData.question); // パースしたデータを親コンポーネントに渡す
            codeReader.reset(); // スキャンを停止
          } catch (error) {
            console.error('QRデータのパースに失敗しました:', error);
          }
        }
        if (err && !(err instanceof Error)) {
          console.error(err);
        }
      });
    }
    return () => {
      codeReader.reset(); // コンポーネントがアンマウントされたときにスキャンを停止
    };
  }, [videoRef, onDataReceived]);

  return (
    <div>
      <h2>QRコードをスキャンしてください</h2>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }}></video>
    </div>
  );
};

export default QRScanner;
