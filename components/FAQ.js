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
        answer: "Yes, DankMinter has a utility token: TreeFiddyCoin. TreeFiddies can be earned by minting memes with DankMinter. You can send them to meme creators as tips, sacrifice them to increase a memes dankness score, use them to up/downvote memes, and if you wish, you can 🎶  Toss a Coin to Your Witcher 🎶  to tip the developer.",
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
        answer: "Nothing, I'm covering all gas fees for minting NFTs using the tool. Hopefully, I don't run out of money and can keep DankMinter free forever, but I can't guarentee it. If you want to make sure this tool stays free for a long time, bid on the 10 original NFT memes I'm selling on OpenSea. All proceeds from those sales will go directly to gas fees.",
        key: 2,
    },
    {
        question: "Is this a charity project? How do you make money?",
        answer: "This is a for profit service. DankMinter makes money through royalties paid when people sell their NFT memes on marketplaces like OpenSea. Hopefully, these royalties will allow me to cover the costs of providing the service including all gas fees and make a reasonable profit. They are currently set at 15%. I'm relying on the royalties to generate enough revenue to cover gas fees, so I decided to start rather high and lower them once DankMinter is financially stable.",
        key: 4,
    },
    {
        question: "What do you mean by unique? How do you guarentee the NFTs are unique?",
        answer: "When I say unique, I mean there only exists one NFT of each individual meme. Once you've minted a meme, it's yours and can never be minted again. I define a meme as a unique combination of text and template. The smart contract uses keccak256 on the combination of the template identifier and text captions to get a unique hash for each meme. The contract rejects attempts to mint more memes with that unique hash. If this is actually interesting to you, then you should really read the whitepaper :)",
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
                    style={styles.faq.heading}
                    >
                        <Typography>{el.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={styles.faq.question}>
                        <Typography>{el.answer}</Typography>
                    </AccordionDetails>
                </Accordion>                    
            ))}
        </div>
    )
}

export default FAQ
