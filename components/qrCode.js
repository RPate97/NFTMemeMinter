import React, { useEffect, useRef } from "react";

export default function QRCode({handle, memeIndex, style}) {
    const ref = useRef(null);

    let qrCode;
    if (typeof window !== "undefined") {
        const QRCodeStyling = require("qr-code-styling");
        qrCode = new QRCodeStyling({
            width: 200,
            height: 200,
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
        const newUrl = `${process.env.NEXT_PUBLIC_DANKMINTER_DOMAIN}/api/meme/${handle}/${memeIndex}`;
        qrCode.update({
            data: newUrl
        });
    }, []);

    return <div style={{...style, overflow: "hidden", width: 200, height: 200 }} ref={ref} />;
}

