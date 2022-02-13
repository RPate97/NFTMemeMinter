import { Button, Box, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from 'next/router';

export function EmptyCollection() {
    const router = useRouter();

    function handleGoToMinter() {
        router.replace('/mint');
    }

    function handleGoToDankMarket() {
        router.replace('/mint');
    }

    return (
        <Flex flexDirection="row" justifyContent="center" alignContent="center" height="600" width="100vw" mt={10}>
            <Box width="600" height="600" borderRadius="3xl" overflow="hidden">
                <Image src="/thats-a-bummer.jpeg" alt="that's a bummer man" width="600" height="600"/>
            </Box>
            <Flex flexDirection="column" justifyContent="center" alignContent="center" alignItems="center">
                <Text color="white" fontSize="3xl" fontWeight="bold" ml="5">
                    Looks like you have no memes in your collection...
                </Text>   
                <Button
                    onClick={handleGoToMinter}
                    bg="transparent"
                    border="1px solid white"
                    _hover={{
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "white",
                        backgroundColor: "gray.700",
                    }}
                    borderRadius="xl"
                    m="0px"
                    px={3}
                    height="38px"
                    width="fit-content"
                    mt={5}
                >
                    <Text color="white" fontSize="md" fontWeight="medium">
                        Mint a Meme
                    </Text>
                </Button> 
                <Button
                    onClick={handleGoToDankMarket}
                    bg="transparent"
                    border="1px solid white"
                    _hover={{
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "white",
                        backgroundColor: "gray.700",
                    }}
                    borderRadius="xl"
                    m="0px"
                    px={3}
                    height="38px"
                    width="fit-content"
                    mt={5}
                >
                    <Text color="white" fontSize="md" fontWeight="medium">
                        Browse the DankMarket
                    </Text>
                </Button>                
            </Flex>
        </Flex>
    )
}