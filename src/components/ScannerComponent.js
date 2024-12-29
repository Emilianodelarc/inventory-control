import React, { useEffect, useRef } from "react";
import Quagga from "quagga";

const ScannerComponent = ({ onScan }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Configuración de QuaggaJS
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: videoRef.current, // Elemento donde se mostrará el video
          constraints: {
            width: 640, // Resolución del video
            height: 480,
            facingMode: "environment",
            focusMode: "continuous", 
          },
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader"], // Tipos de códigos de barras
        },
      },
      (err) => {
        if (err) {
          console.error("Error inicializando Quagga:", err);
          return;
        }
        Quagga.start(); // Inicia el escaneo
      }
    );

    // Manejo del evento cuando se detecta un código de barras
    Quagga.onDetected((result) => {
      console.log("Código escaneado:", result.codeResult.code);
      
      if (result && result.codeResult && result.codeResult.code) {
        onScan(result.codeResult.code); // Devuelve el código escaneado
      }
    });

    // Limpia al desmontar el componente
    return () => {
      Quagga.stop();
    };
  }, [onScan]);

  return (
    <div>
      <h2>Escáner de Códigos de Barras</h2>
      <div
        ref={videoRef}
        style={{
          width: "640px",
          height: "480px",
          border: "1px solid #ccc",
        }}
      ></div>
    </div>
  );
};

export default ScannerComponent;
