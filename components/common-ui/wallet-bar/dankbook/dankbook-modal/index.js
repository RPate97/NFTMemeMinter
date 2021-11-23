// AccountModal.tsx
import {
    Box,
    Button,
    Flex,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  } from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { useState } from "react";
import { DankBookTab } from "components/common-ui/wallet-bar/dankbook/dankbook-modal/dankbook-tab";

const dankBookTabs = [
    {
        tabTitle: "Intro",
        sections: [
            {
                title: "Welcome to DankMinter",
                subtitle: "The first meme generator built from the ground up to create collectible, tradable, and truely one of a kind NFTs of your memes.",
                content: [
                    "DankMinter is a competition to create, share, and collect the best NFT memes. It was designed to allow meme creators to capture the value of their work, and to allow collectors to buy, sell, and trade memes with real scarcity and value.",
                    "DankMinter is inspired by other meme generators, but includes lots of new functionality tailored towards NFT collecting.",
                    "From meme dynasties, remixes, and dankness backgrounds to buying, selling, trading, and collecting; it can all get a little confusing.",
                    "We've written the DankBook to answer all your questions. If anything confuses you, just open the DankBook and you'll find the answer.",
                    "Feel free to read through the DankBook now, or just come back whenever you have questions. You can open the DankBook from the top right menu or from the question mark icons throughout DankMinter."
                ]
            }
        ]
    },
    {
        tabTitle: "Minting",
        sections: [
            {
                title: "The Minting Process",
                content: [
                    "The core of DankMinter is the minting process. You can use DankMinter to create an NFT of any meme as long as that meme is unique and one-of-a-kind.",
                ],
            },
            {
                title: "Uniqueness",
                content: [
                    "We defined as unique meme as one created with a specific combination of a meme layout + layout images + text captions + stickers.",
                    "As long as your meme is made up of a unique combination of a layout, images, text captions, and stickers you will be allowed to mint it. If someone has already used that combination, DankMinter will detect it and you will not be allowed to mint your meme. We're sorry if this happens to you, but uniqueness is important to make DankMinter memes scarce, valuable, and collectible.",
                ],
            },
            {
                title: "Creating Memes",
                content: [
                    "You can mint DankMinter memes from the /mint page by either starting from scratch with a blank layout. Or by remixing someone elses meme to create your own.",
                    "When you start from scratch, we call this 'creating a dynasty' because other people can create new memes based off of your meme which will become a part of your memes dynasty.",
                    "When you remix someone elses meme, we call this 'minting within a dynasty' because your new meme will become a part of it's parents dynasty.",
                ],
            },
            {
                title: "Dynasties",
                content: [
                    "Dynasties help collectors assess the value of DankMinter memes. If you'd like to learn more about them, please visit the 'Dynasties' section.",
                ],
            }
        ],
    },
    {
        tabTitle: "Uploading Content",
        sections: [
            {
                title: "Uploading Content",
                content: [
                    "Memes can come in many shapes and sizes, and can be based off lots of different movies, tv shows, youtube videos, etc. To support all kinds of memes, we allow you to freely upload your own images to be used in DankMinter memes as long as they follow the rules listed below.",
                    "We review all newly uploaded content by hand to ensure that everything follows the rules.",
                    "These rules are designed solely to ensure that every DankMinter meme is one-of-a-kind and all content is legal. We do not believe our place is to decide what you can and cannot make with DankMinter.",
                    "To upload content to DankMinter, simply upload the images from the meme generator and it will automatically be placed into our upload queue.",
                    "You can upload both new layout images and new meme stickers this way.",
                    "When you upload fresh content to DankMinter, any related memes may take longer to be processed. As long as your image uploads follow the content rules, your memes will be minted within 1-3 days.",
                    "If your meme is rejected due to rule breaking, you will receive an email notification with information on what went wrong."
                ],
            },
            {
                title: "Ground Rules",
                content: [
                    "1. No illegal material. You know what we're talking about here, please don't make us look at horrible things.",
                    "2. No multi-image layouts. Layouts should be created using the built in layout engine. Only single image uploads will be approved.",
                    "3. No images with embedded stickers such as flags, logos, or other 'meme stuff' like Chads, Trad Girl, etc. Stickers should be uploaded seperately from images.",
                ]
            }
        ]
    },
    {
        tabTitle: "Dynasties",
        sections: [
            {
                title: "Dynasties",
                content: [
                    "DankMinter includes the concept of a 'Dynasty'. A Dynasty is a family of memes which originate from a single progenitor meme which we call the 'Dynasty Head'.",
                    "When you create a new meme from scratch with DankMinter, you are also starting a new meme dynasty with your meme as it's Dynasty Head",
                ]
            },
            {
                title: "Remixing",
                content: [
                    "Every DankMinter meme is an NFT of course, but it's also a meme template which can be remixed to create new memes.",
                    "When you remix someone elses meme, your meme's parent is the original meme. It's dynasty is inherited from it's parent.",
                    "DankMinter automatically tracks how many decendents each meme has, and builds a family tree of memes. In this way, DankMinter can track how memes evolve and change over time.",
                    "DankMinter also tracks how many members each meme Dynasty has."
                ]
            },
            {
                title: "Helping Collectors Assess Value",
                content: [
                    "We created Dynasties to help meme collectors assess the value of different memes. For example, a meme that is part of a large and popular dynasty might be more valuable than a meme from an obscure dynasty.",
                    "Likewise, the meme which is the Dynasty Head of a large dynasty which includes over a thousand member memes is probably even more valuable.",
                ],
            }
        ]
    },
    {
        tabTitle: "Voting",
        sections: [
            {
                title: "Voting",
                content: [
                    "DankMinter is also a simple social media platform for NFT memes. You can browse and vote for or against all memes on DankMinter.",
                    "Positive, negative, and overall score from voting are all includes as traits in each DankMinter NFTs metadata.",
                ]
            },
        ],
    },
    {
        tabTitle: "Dankness Backgrounds",
        sections: [
            {
                title: "Dankness Backgrounds",
                content: [
                    "DankMinter memes are assigned Dankness Backgrounds based on both the number of decendants they have, as well as their vote score.",
                    "Todo - add formula",
                ],
            },
            {
                title: "Backgrounds",
                content: [
                    "The Dankness Background are as follows, from low to high:",
                    "1. Bronze",
                    "2. Silver",
                    "3. Gold",
                    "4. Emerald",
                    "5. Diamond",
                    "6. Blood Diamond",
                    "7. Black Diamond",
                ],
            },
            {
                title: "Helping Collectors Assess Value",
                content: [
                    "Like Dynasties, Dankness Backgrounds are designed to help collectors understand the value of different memes.",
                    "Through voting and remixing memes, the DankMinter community can independently determine which memes are the best and worst.",
                ]
            }
        ]
    },
    {
        tabTitle: "Collecting",
        sections: [
            {
                title: "Collecting",
                content: [
                    "DankMinter memes are made to be collected. We've built a variety of traits into DankMinter memes to help you assess their value.",
                ],
            },
            {
                title: "Decendents",
                content: [
                    "We track the total number of decendents which have been spawned by every DankMinter meme so you can understand how influencial any DankMinter meme has been on meme culture.",
                ],
            },
            {
                title: "Vote Score",
                content: [
                    "We also track each DankMinter memes vote score from the positive and negative votes it has received from members of the DankMinter community. Vote Score can help you judge the relative quality of DankMinter NFT memes.",
                ]
            },
            {
                title: "Dankness Background",
                content: [
                    "We synthesize both the number of decendents and vote score into one metric the Dankness Tier which is used to assign each DankMinter meme a Dankness Background that updates over time.",
                ]
            }
        ],
    },
    {
        tabTitle: "NFT Metadata",
        sections: [
            {
                title: "NFT Metadata",
                content: [
                    "DankMinter NFTs all have metadata assigned to them including, names, descriptions, image, positive/negative votes, dankness background, etc. This metadata is stored on DankMinters centralized servers so that it can be updated over time.",
                    "Not all 3rd party NFT marketplaces update NFT metadata regularly, so you should always check NFT metadata on DankMinter before decided to buy one.",
                    "We hope to build methods that allow our users to freeze their NFT metadata onto decentralized IPFS or to fully decentralize our metadata storage, but we have not been able to complete that quite yet. You're patience is appreciated."
                ]
            }
        ],
    },
    {
        tabTitle: "Trading",
        sections: [
            {
                title: "Trading",
                content: [
                    "It's easy to buy and sell DankMinter NFTs. You can list your memes for sale on the built-in DankMinter marketplace, or use any other 3rd party marketplace that support ImmutableX NFTs.",
                ]
            },
            {
                title: "Gasless with ImmutableX",
                content: [
                    "DankMinter uses ImmutableX as it's NFT platform. ImmutableX allows us to provide gasless NFT minting and trading to our users so that you can make and trade DankMinter NFT memes without paying any gas fees. However, you will have to pay royalties and marketplace fees when trading which are explained below."
                ]
            },
            {
                title: "Secured By Ethereum",
                content: [
                    "ImmutableX uses ZK-Rollups to batch it's layer 2 transactions and commit them onto the Ethereum mainnet. Because of this arcitecture, your NFTs are just as secure on ImmutableX as they would be on the Ethereum mainnet itself."
                ]
            },
            {
                title: "Available Marketplaces",
                content: [
                    "Right now, there aren't very many NFT marketplaces that support ImmutableX NFTs so your options are limited, but we believe this will change in the near future. Some marketplaces you can use are listed below."
                ]
            },
            {
                title: "Available Now:",
                content: [
                    "1. DankMart - DankMinter's built-in meme marketplace",
                    "2. ImmutableX Marketplace",
                ]
            },
            {
                title: "Coming Soon:",
                content: [
                    "1. OpenSea",
                    "2. Mintable",
                ]
            },
            {
                title: "ImmutableX Open Order Book",
                content: [
                    "One of the awesome things about ImmutableX is it's open order book which allows buy and sell orders to be connected across different NFT marketplaces. This helps increase liquidity for NFT collectors.",
                    "If you wish to sell one of your DankMinter NFT memes, you can easily list it across all ImmutableX NFT marketplaces simply by listing it for sale on the DankMinter marketplace.",
                    "Repeat. You only need to list your DankMinter NFTs for sale on the DankMinter Marketplace for your NFTs to be listed for sale on ALL ImmutableX marketplaces.",
                    "Similarly, if you go to the DankMart to buy NFT memes you'll be able to find all DankMinter memes listed for sale across ALL ImmutableX NFT marketplaces.",
                ],
            },
            {
                title: "Royalties",
                content: [
                    "We offer DankMinter to you totally for free, but there is a catch. We take a 10% royalty on secondary market NFT sales. This is how we can afford to maintain DankMinter.",
                    "We believe creators also deserve a royalty. They receive a 5% royalty on any secondary market NFT sales as well (only on ImmutableX).",
                    "The total royalty is 15%. 10% for DankMinter, 5% for the NFTs creator.",
                ]
            },
            {
                title: "Other Fees",
                content: [
                    "Trading DankMinter memes may involve other fees which vary depending on the marketplace platform you use. If you trade on DankMinter, we will take no additional fees outside of DankMinters 10% royalty and the creators 5% royalty.",
                    "However, trading fees may be higher depending on whether your NFTs were purchased or sold by someone using a different ImmutableX NFT marketplace. That other marketplace may charge additional fees which we cannot control.",
                    "For a full breakdown of ImmutableX fees, please see the ImmutableX docs. https://docs.x.immutable.com/docs/fees"
                ]
            },
        ]
    },
    {
        tabTitle: "Withdrawing",
        sections: [
            {
                title: "Withdrawing",
                content: [
                    "Dankminter NFT memes are minted on ImmutableX which is a layer 2 scaling solution for Ethereum. As a result, you can at any time withdraw your NFT memes from ImmutableX onto the Ethereum mainnet. You can withdraw your memes from your collection page.",
                ]
            },
            {
                title: "Cost",
                content: [
                    "It will cost you a pretty penny to withdraw your NFTs from ImmutableX due to high ethereum gas fees, and so we don't recommend doing it. But if you wish to, it will cost you 350k gas or around $150."
                ]
            },
            {
                title: "Ethereum Marketplaces",
                content: [
                    "One reason you might consider withdrawing your memes from ImmutableX, is to sell them on marketplaces that don't support ImmutableX NFTs. If you choose to withdraw your DankMinter NFTs from ImmutableX, you will receive them on Ethereum mainnet as fully compliant ERC721 NFTs and will be able to trade them on any Ethereum compatible exchange."
                ]
            },
        ]
    },
];

// AccountModal.tsx
export const DankBookModal = ({isOpen, onClose, preselectedSection}) => {  
    const [ tab, setTag ] = useState(preselectedSection ? preselectedSection : 0);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <ModalOverlay />
            <ModalContent
                background={AppColors.buttonBackground}
                border="1px"
                borderStyle="solid"
                borderColor="gray.700"
                borderRadius="3xl">
                <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                    The DankBook
                </ModalHeader>
                <ModalCloseButton
                color="white"
                fontSize="sm"
                _hover={{
                    color: "whiteAlpha.700",
                }}
                />
                <ModalBody pt={0} px={4} minH="80vh">
                    <Box
                        borderRadius="3xl"
                        border="1px"
                        borderStyle="solid"
                        borderColor="gray.600"
                        px={5}
                        pt={4}
                        pb={2}
                        mb={3}
                        minH="80vh"
                    >
                    <Tabs variant="enclosed" orientation="vertical" minH="80vh">
                        <TabList>
                            <Tab color="white">Intro</Tab>
                            <Tab color="white">Minting</Tab>
                            <Tab color="white">Uploading Content</Tab>
                            <Tab color="white">Dynasties</Tab>
                            <Tab color="white">Voting</Tab>
                            <Tab color="white">Dankness Backgrounds</Tab>
                            <Tab color="white">Collecting</Tab>
                            <Tab color="white">NFT Metadata</Tab>
                            <Tab color="white">Trading</Tab>
                            <Tab color="white">Withdrawing</Tab>
                        </TabList>
                        <TabPanels>
                            {dankBookTabs.map((el) => {
                                return (
                                    <TabPanel key={el.tabTitle}>
                                        <DankBookTab key={el.tabTitle} tab={el} />
                                    </TabPanel>
                                )
                            })}
                        </TabPanels>
                    </Tabs>
                    </Box>
                </ModalBody>

                <ModalFooter
                justifyContent="end"
                background="gray.900"
                borderBottomLeftRadius="3xl"
                borderBottomRightRadius="3xl"
                p={6} m  >
                </ModalFooter>
            </ModalContent>
        </Modal>
    );

}