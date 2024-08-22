import React, { useState, useEffect, useRef } from 'react';
import Quagga from 'quagga';
import M from "materialize-css"
import { setHeaderNFavicon } from "./helper/Helper"

const BarcodeScanner = () => {
   const scannerRef = useRef(null);
   const [barcode, setBarcode] = useState("");
   const [format, setFormat] = useState("");
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      M.AutoInit()
      setHeaderNFavicon("Barcode Reader")
   }, [])
   useEffect(() => {
      if (scannerRef.current && loading) {
         Quagga.init({
            inputStream: {
               name: 'Live',
               type: 'LiveStream',
               target: scannerRef.current,
               constraints: {
                  facingMode: 'environment',
               },
            },
            decoder: {
               readers: [
                  'code_128_reader',   // Code 128
                  'ean_reader',        // EAN-13
                  'ean_8_reader',      // EAN-8
                  'code_39_reader',    // Code 39
                  'code_39_vin_reader',// Code 39 VIN
                  'upc_reader',        // UPC-A
                  'upc_e_reader',      // UPC-E
                  'codabar_reader',    // Codabar
                  'i2of5_reader',      // Interleaved 2 of 5
                  '2of5_reader',       // Standard 2 of 5
                  'code_93_reader',    // Code 93
               ],
            },
         }, (err) => {
            if (err) {
               console.log(err);
               return;
            }
            Quagga.start();
         });
         Quagga.onDetected(handleDetected);
      }

      return () => {
         Quagga.offDetected(handleDetected);
         Quagga.stop();
      };
   }, [loading]);

   const handleDetected = (result) => {
      setBarcode(result.codeResult.code);
      setFormat(result.codeResult.format);
      setLoading(false)
   };

   return (
      <div className="BarcodeScanner">
         <h3>Barcode Scanner</h3>
         <em>*N.B: Please check barcode number once*</em>
         {loading ? <div ref={scannerRef} className="scanner-div">
            <video className="video-stream" />
         </div> : <div className="result">
            <div className="barcode">{barcode}</div>
            <p className="barcode-format">Format: {format}</p>
            <button className="barcode-button"
               onClick={e => setLoading(true)}
            >Scan Again</button>
         </div> }
         {/* {barcode && <p>Barcode detected: {barcode}</p>}
         <div ref={scannerRef} className="scanner-div">
            <video className="video-stream" />
         </div> */}
      </div>
   );
};

export default BarcodeScanner;
