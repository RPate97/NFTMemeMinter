import { Box, Flex, Text, Link, Button, Center } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { LayoutOptions } from 'src/pages/MakeAMeme/Gallery/LayoutOptions';
import { UserProfile } from "src/utils/types";

type Props = {
    userProfile: UserProfile,
};

export const DankMinter = ({userProfile}) => {
    return (
        <Flex flexDirection="column" width="100%">
            <Flex flexDirection="row" alignItems="center" height="80px">
                <Text color="white" fontSize="4xl" ml={5} mr={3} fontFamily="space_monoregular">
                    Dank Minter
                </Text>          
                <Button
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
                    px={0}
                    height="30px">
                    <Link href='/minter' passHref>
                        <ChevronRightIcon color="white" boxSize="2em" />                                     
                    </Link>
                </Button> 
            </Flex>
            <Flex 
                flexDirection="row" 
                maxHeight="560"
                alignContent="start"   
                position="sticky"
                top="0"
                alignItems="center"
                flexWrap="nowrap"
                overflowX="scroll"
                px="2"
                gridGap="2"
                css={{
                    WebkitOverflowScrolling: "touch",
                    msOverflowStyle: "-ms-autohiding-scrollbar",
                    overscrollBehaviorX: "contain",
                }}
                pb={5} 
            >
                <LayoutOptions userProfile={userProfile} />

                {/* {props.data && props.data.length > 0 
                ? props.data.map((el: NFTMeme) => {
                    return el && el.metadata ? <CollectionMeme key={el.metadata.hash} nftMeme={el} userProfile={props.userProfile} /> : null;
                }) 
                : <EmptyCollection />
                }
                {props.data && props.data.length > 0 && <Box height="350px">
                <Flex flexDirection="column" height="100%" justifyContent="center">
                    <Button
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
                    mx={5}
                    px={0}
                    height="40px">
                        <Link href='/' passHref>
                            <Text color="white" fontSize="md" py={5} px={3} m={0}>
                                View All
                            </Text>                                      
                        </Link>
                    </Button> 
                </Flex>
                </Box>} */}
            </Flex>
        </Flex>
    );
}