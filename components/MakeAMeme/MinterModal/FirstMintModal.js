import {
    Box,
    Button,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    LinkBox, 
    LinkOverlay,
  } from "@chakra-ui/react";
import { AppColors } from "styles/styles";

export function FirstMint({changeTab}) {
    return (
        <ModalBody pt={0} px={4}>
            <Box
                borderRadius="3xl"
                border="1px"
                borderStyle="solid"
                borderColor="gray.600"
                px={5}
                pt={4}
                pb={2}
                mb={0}
            >
            <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mb={3} pl={5} pr={5}> 
                <Text color="white" textAlign="center">
                    {"Since you're new here, you'll also receive 35 TreeFiddies to get you started..."}
                </Text>   
                <Text color="white" paddingTop="10px" textAlign="center">
                    {"DankMinter isn't your typical meme generator, so we've prepared an 3 minute article to help you get the hang of it. We recommend reading it, but hey if you don't want to ¯\\_(ツ)_/¯ you to you."}
                </Text>
                {/* <Text color="white">
                    Learn about DankMinter
                </Text>  
                <Text color="white">
                    {"DankMinter is more than just an NFT meme generator. We've created an entire platform designed around creating, collecting, and trading dank NFT memes. And the best part? Every meme is 100% unique and can never be minted again." }
                </Text>   
                <Text color="white">
                    The NFTs
                </Text>
                <Text color="white">
                    Every meme minted with DankMinter is a fully compliant and tradable ERC721 NFT hosted on the Polygon blockchain. You can trade DankMinter memes on any NFT marketplace that supports Polygon NFTs, but we recommend OpenSea because of their awesome user experience and large userbase. 
                </Text>
                <Text color="white">
                    TreeFiddies
                </Text>  
                <Text color="white">
                    {"TreeFiddies are the utility token of DankMinter. TreeFiddies are a fully ERC20 compliant crypto token hosted on the Polygon blockchain."}
                </Text> 
                <Text color="white">
                    How do you get them?
                </Text>
                <Text color="white">
                    {"You can earn TreeFiddies by voting for the best and worst NFT memes, which is important because you'll need them to perform various actions within DankMinter."}
                </Text>
                <Text color="white">
                    What can you do with TreeFiddies? You can...
                </Text> 
                <UnorderedList color="white">
                    <ListItem>Mint more dank NFT memes.</ListItem>
                    <ListItem>Make sacrifices to level up your dank memes</ListItem>
                    <ListItem>Add links to your memes, showing off where your meme has gone viral online and providing social proof of your memes superior dankness.</ListItem>
                    <ListItem>🎶 Toss a Coin to Your Witcher 🎶 (send a tip to the creator of a dank meme) </ListItem>
                    <ListItem>🎶 Here Comes the Money 🎶 (send a tip to the developer of DankMinter.com)</ListItem>
                </UnorderedList>
                <Text color="white">
                    Why does DankMinter run on Polygon? Why not Ethereum?
                </Text>
                <Text color="white">
                    {"Polygon offers us very low transaction fees which makes it possible for DankMinter to you completely for free. What's cool about Polygon is we can create a bridge to Ethereum which will eventually allow you to transfer your TreeFiddies and Dank NFT memes to the Ethereum blockchain if you would prefer to keep them there."} 
                </Text> */}
            </Flex>
        </Box>
        <Flex flexDirection="column" justifyContent="space-between" alignItems="center" mt={3} mb={3} pl={5} pr={5}>
            <Button
                onClick={() => changeTab(2)}
                bg="transparent"
                border="1px solid transparent"
                _hover={{
                    border: "1px",
                    borderStyle: "solid",
                    borderColor: "white",
                    backgroundColor: "gray.700",
                }}
                borderColor="gray.700"
                borderRadius="xl"
                m="0px"
                mr="5px"
                px={3}
                mt={3}
                height="38px">
                <Text color="white" fontSize="md">
                    Learn About DankMinter
                </Text>                                  
            </Button>     
            <LinkBox>
                <LinkOverlay href="/collection">
                    <Button
                        onClick={() => this.updateBorderStyle({border: "solid 0px #ddd"})}
                        bg="transparent"
                        border="1px solid transparent"
                        _hover={{
                            border: "1px",
                            borderStyle: "solid",
                            borderColor: "white",
                            backgroundColor: "gray.700",
                        }}
                        borderColor="gray.700"
                        borderRadius="xl"
                        m="0px"
                        mr="5px"
                        px={3}
                        mt={3}
                        height="38px">
                        <Text color="white" fontSize="md">
                            Trial By Fire
                        </Text>                                  
                    </Button> 
                </LinkOverlay>             
            </LinkBox>                
        </Flex>
    </ModalBody>
    )
}
