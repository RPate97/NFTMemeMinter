import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from '../styles/styles'

const questions = [
    {
        question: "Do you have a token?",
        answer: "There is no ERC20 token representing this project. If you like what I'm doing and wish to support me, I'm auctioning off the first 10 NFTs memes minted with this tool on OpenSea. Each and every one was meticulously hand crafted by yours truly. The proceeds from these sales will be going directly to covering the gas costs to keep the service free for everyone. You can find them here:",
        key: 5,
    },
    {
        question: "What blockchain hosts the NFTs?",
        answer: "The NFTs are minted on the Polygon Matic Blockchain. Don't worry though, they will be transferable to Ethereum soon if you wish to move them there for your peace of mind.",
        key: 0,
    },
    {
        question: "Why are you doing this?",
        answer: "NFTs solve several problems with memes. They create a way to reward people who make great memes, a better way to collect them, and an incentive to credit original creators. You'll find more information on this in the white paper.",
        key: 1,
    },
    {
        question: "How much does it cost to mint a meme as an NFT?",
        answer: "Nothing, we cover all gas costs for minting NFTs using the tool. Hopefully, I don't run out of money and can keep it free forever but I can't guarentee it due to lack of resources. If you want to make sure this tool stays free for a long time, bid on the 10 original NFT memes I'm selling on OpenSea.",
        key: 2,
    },
    {
        question: "Is this a charity project? How do you make money?",
        answer: "This is a for profit service. It makes money through royalties paid when people sell their NFT memes on marketplaces like OpenSea. Hopefully, these royalties will allow me to cover the costs of providing the service including all gas fees and make a reasonable profit. They are currently set at 10% and that is as high as they will ever be. However, we may lower them in the future to encourage a vibrant collector community.",
        key: 4,
    },
    {
        question: "What do you mean unique? How do you guarentee the NFTs are unique? ",
        answer: "When I say unique, I mean there only exists one NFT of each individual meme. Once you've minted a meme, it's yours and can never be minted again. I define a meme as a unique combination of text and a template. The smart contract uses keccak256 on the combination of the template and text to get a unique hash for each meme. The contract then rejects attempts to mint more memes with that unique hash. If this is actually interesting to you, then you should really read the whitepaper ;)",
        key: 6,
    },
    {
        question: "Can I transfer, sell, and trade the NFTs?",
        answer: "Yes, the NFTs are fully compliant with ERC721. You can trade them on any exchange that supports Polygon Matic NFTs.",
        key: 7,
    },
    {
        question: "Can I move the NFTs to Ethereum?",
        answer: "In the future, you will be able to transfer them to the Ethereum mainnet. We're currently working on making a transfer bridge available but it's not ready at this time.",
        key: 8,
    },
    {
        question: "Can I upload my own meme templates?",
        answer: "Yes, but the template must be unique. You can find the 'Create a Template' option on the 'Mint a Meme' page of this website.",
        key: 9,
    },
    {
        question: "Why doesn't NFT Meme Minter support gifs?",
        answer: "I needed to draw the line somewhere in terms of what to build into the first version of this application. I hope to add support for gifs soon, but still need to develop software to ensure the gifs are unique.",
        key: 10,
    },
    {
        question: "Is this service a decentralized application?",
        answer: "Yes and no. I consider this service to be a semi-decentralized application. It uses the Polygon Matic Blockchain to mint and track NFTs, but keeping the NFTs unique requires a trusted and centralized front end application. Feel free to read the white paper for more information on this topic.",
        key: 11,
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    background: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
}));

export const FAQ = () => {
    const classes = useStyles();
    return (
        <div style={styles.faq}>
            <h1 style={styles.faq.heading}>Frequently Asked Questions</h1>
            {questions.map((el) => (
                <Accordion className={classes.background} key={el.key}>
                    <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>{el.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{el.answer}</Typography>
                    </AccordionDetails>
                </Accordion>                    
            ))}
        </div>
    )
}

export default FAQ
