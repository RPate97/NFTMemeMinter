import React, { useEffect, useRef, useState } from "react";
import Web3 from 'web3';

export default function QRCode({style, templateId, captions}) {
    const [url, setUrl] = useState("https://www.dankminter.com/");
    const ref = useRef(null);

    let qrCode;
    if (typeof window !== "undefined") {
        const QRCodeStyling = require("qr-code-styling");
        qrCode = new QRCodeStyling({
            width: 100,
            height: 100,
            margin: 0,
            qrOptions: {
                typeNumber: 0,
                mode: "Byte",
                errorCorrectionLevel: "Q"
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 0
            },
            dotsOptions: {
                type: "classy",
                color: "#6a1a4c",
                gradient: {
                    type: "radial",
                    rotation: "0",
                    colorStops: [{
                        offset: 0,
                        color: "#5578D6"
                    },
                    {
                        offset: 1,
                        color: "#354A83"
                    }]
                }
            },
            backgroundOptions: {
                color: "#000000"
            }, 
            image: "/nft.png",
            dotsOptionsHelper: {
                colorType: {
                    single: true,
                    gradient: false
                }, 
                gradient: {
                    linear: true,
                    radial: false, 
                    color1: "#6a1a4c", 
                    color2: "#6a1a4c", 
                    rotation: "0"
                }
            },
            cornersSquareOptions: {
                type: "extra-rounded",
                color: "#FFFFFF",
                gradient: {
                    type: "radial",
                    rotation: "0",
                    colorStops: [{
                        offset: 0,
                        color: "#5578D6"
                    }, 
                    {
                        offset: 1,
                        color: "#354A83"
                    }]
                }
            },
            cornersSquareOptionsHelper: {
                colorType: {
                    single: true, 
                    gradient: false
                },
                gradient: {
                    linear: true, 
                    radial: false, 
                    color1: "#FFFFFF",
                    color2: "#FFFFFF",
                    rotation: "0"
                }
            },
            cornersDotOptions: {
                type: "",
                color: "#FFFFFF",
                gradient: null
            },
            cornersDotOptionsHelper: { 
                colorType: {
                    single: true, 
                    gradient: false
                },
                gradient: {
                    linear: true,
                    radial: false,
                    color1: "#FFFFFF",
                    color2: "#FFFFFF",
                    rotation: "0"
                }
            },
            backgroundOptionsHelper: {
                colorType: {
                    single: true,
                    gradient: false
                },
                gradient: {
                    linear: true,
                    radial: false,
                    color1: "#000000",
                    color2: "#000000",
                    rotation: "0"
                }
            }
        });
    }

    useEffect(() => {
        qrCode.append(ref.current);
        var web3 = new Web3();
        var textStr = "";
        for (var i = 0; i < captions.length; i++) {
            textStr += captions[i];
        }
        const encoded = web3.eth.abi.encodeParameters(['uint256', 'string'], [templateId, textStr])
        const hash = web3.utils.sha3(encoded, {encoding: 'hex'});
        // const newUrl = "https://www.dankminter.com/" + hash.toString();
        const newUrl = "https://www.dankminter.com/pate/1235";
        qrCode.update({
            data: newUrl
        });
    }, []);

    return <div style={{...style, overflow: "hidden", width: 100, height: 100 }} ref={ref} />;
}

