// file = Html5QrcodePlugin.jsx
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
    let config = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin = (props) => {
    let html5QrcodeScanner;

    useEffect(() => {
        // when component mounts
        if(!html5QrcodeScanner?.getState()){
            const config = createConfig(props);
        const verbose = props.verbose === true;
        // Suceess callback is required.
        const onScanSuccess = (decodedText, decodedResult) => {
            let temp = decodedText
            html5QrcodeScanner.clear()
            props.qrCodeSuccessCallback(temp, decodedResult);
            
        };
        if (!(props.qrCodeSuccessCallback)) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(onScanSuccess, props.qrCodeErrorCallback);

        }
        
        // cleanup function when component will unmount
        return () => {
            // html5QrcodeScanner.clear().catch(error => {
            //     console.error("Failed to clear html5QrcodeScanner. ", error);
            // });
        };
    }, []);

    return (
        <div id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;