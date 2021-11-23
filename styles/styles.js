export const AppColors = {
    primaryBackground: '#222831',
    secondaryBackground: '#30475E',
    primaryForeground: '#ffffff',
    callToAction: '#ffffff',
    secondaryCallToAction: '#FFFFC0',

    buttonBackground: '#0e0e0e',
}

export const FontSizes = {
    secondaryTitle: "1.25rem",
    text: 16,
}

export const styles = {
    main: {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        // backgroundImage: "url('sand-background.jpg')",
        // backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
        backgroundImage: "linear-gradient(to top, #09203f 0%, #537895 100%)",
        // backgroundImage: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
        // backgroundImage: "linear-gradient(109.6deg, rgba(15,2,2,1) 11.2%, rgba(36,163,190,1) 91.1% )",
        // backgroundImage: "linear-gradient( 94.3deg,  rgba(26,33,64,1) 10.9%, rgba(81,84,115,1) 87.1% )",
        // backgroundImage: "linear-gradient( 76.3deg,  rgba(44,62,78,1) 12.6%, rgba(69,103,131,1) 82.8% )",
        // backgroundImage: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100vh",
    },
    memeText: {
        fontFamily: "Impact",
        textTransform: "uppercase",
        color: "#FFF",
        WebkitTextStrokeWidth: 1,
        WebkitTextStrokeColor: "#000",
        userSelect: "none",
        textAlign: "center",
        verticalAlign: "text-top",
        margin: 0,
        marginLeft: 10,
        marginRight: 10,
    },
    watermark: {
        fontFamily: "Impact",
        fontSize: 16,
        fill: "#FFF",
        stroke: "#000",
    },
    background: {
        zIndex: 1,
        position: "absolute",
        height: "100vh",
    },
    faq: {
        zIndex: 10,
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 100,
        heading: {
            fontSize: "1.5rem",
            fontFamily: "'Montserrat', sans-serif",
            textAlign: "center",
            color: AppColors.primaryForeground,
        },
        question: {
            color: AppColors.primaryForeground,
        }
    },
    intro: {
        zIndex: 10,
        width: "100%",
        height: "75vh",
        right: 0,
        transform: "translateY(40%)",
        title: {
            color: AppColors.primaryForeground,
            fontSize: "3.1rem",
            fontFamily: "'Press Start 2P', cursive",
            textAlign: "center",
        },
        sectionTitle: {
            color: AppColors.primaryForeground,
            fontSize: "2rem",
            textAlign: "center",
            fontFamily: "'Montserrat', sans-serif"
        },
        subtitle: {
            color: AppColors.primaryForeground,
            fontSize: "1rem",
            textAlign: "center",
            fontFamily: "'Montserrat', sans-serif"
        },
        section: {
            position: "absolute",
            left: "10%",
            right: "10%",
        },
        actions: {
            margin: 0,
            marginTop: 40,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
        },
        startButton: {
            color: AppColors.callToAction,
            borderColor: AppColors.callToAction,
            marginLeft: "auto",
        },
        learnButton: {
            marginLeft: 20,
            color: AppColors.primaryForeground,
            marginRight: "auto",
        }
    },
    memePage: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "10%",
        marginRight: "10%",
        image: {
        }, 
        info: {
            width: "50%",
            height: "80%",
            marginLeft: 20,
            border: "3px solid #457B9D",
            borderRadius: 10,
            title: {
                fontSize: 18,
                marginBottom: 15,
            },
            text: {
                fontSize: 14,
                wordBreak: "break-all",
                margin: 5,
            },
            section: {
                margin: 30,
                padding: 10,
                backgroundColor: "#1D3557",
                borderRadius: 10,
            },
            infoRow: {
                display: "flex",
                flexDirection: "row",
            }
        },
    },
    walletBar: {
        logo: {
            color: "#ffffff",
            fontFamily: "pacificoregular",
            fontSize: 40,
        },
        presentedBy: {
            color: "#ffffff",
            fontFamily: "pacificoregular",
            fontSize: 16, 
        },
    }
}