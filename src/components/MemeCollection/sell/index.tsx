import { Link } from '@imtbl/imx-sdk';
import { NFTMeme } from "src/utils/types";
import {
    Box,
    Button,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Spacer,
    Progress,
    Divider,
    Image,
    useDisclosure,
    Input
} from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { useEffect, useState } from "react";
import { EthIcon } from "src/components/custom-icons/eth";
import useAxios from 'axios-hooks';
import loadConfig from 'next/dist/server/config';

type Props = {
    nftMeme: NFTMeme
};

export const SellButton: React.FC<Props> = ({nftMeme}) => {
    const [salePrice, setSalePrice] = useState<string>("0.01");
    const [ethPrice, setEthPrice] = useState<number | undefined>();
    const [creatorRoyalty, setCreatorRoyalty] = useState<number>(0.0005);
    const [dankMinterRoyalty, setDankMinterRoyalty] = useState<number>(0.001);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const link = new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);    
    const handleSell = () => {
        if (salePrice) {
            link.sell({
                tokenId: nftMeme.token_id,
                tokenAddress: nftMeme.token_address,
                amount: salePrice
            });            
        }
    }

    // https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD
    const [{ data, loading, error }] = useAxios({
        url: `https://min-api.cryptocompare.com/data/price`,
        params: { 
          fsym: "ETH",
          tsyms: "USD"
         },
    });

    useEffect(() => {
        if (data && !loading) {
            setEthPrice(data.USD);
        }
    }, [data, loading]);

    useEffect(() => {
        setCreatorRoyalty(parseFloat(salePrice) * 0.05);
        setDankMinterRoyalty(parseFloat(salePrice) * 0.1);
    }, [salePrice]);

    return (
        <>
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
                height="40px"
                p={0}
                onClick={onOpen}>
                <Text color="white" fontSize="md" p={4} m={0}>
                    List For Sale
                </Text>   
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent
                    background={AppColors.buttonBackground}
                    border="1px"
                    borderStyle="solid"
                    borderColor="gray.700"
                    borderRadius="3xl">
                    <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                        Sell {nftMeme.name}
                    </ModalHeader>
                    <ModalCloseButton
                    color="white"
                    fontSize="sm"
                    _hover={{
                        color: "whiteAlpha.700",
                    }}
                    />
                    <ModalBody pt={0} px={4}>
                        <Flex flexDirection="row">
                            <Input
                                value={salePrice}
                                onChange={(e) => setSalePrice(() => e.target.value)}
                                placeholder='Enter price'
                                size='md'
                                color="white"
                                mr={2}
                            />
                            <EthIcon width={40} height={40} />
                        </Flex>
                        <Flex flexDirection="column" mt={2}>
                            <Flex flexDirection="row" justifyContent="space-between">
                                <Text color="white" fontSize="md" p={0} m={0}>
                                    Sale Price:
                                </Text> 
                                <Text color="white" fontSize="md" p={0} m={0}>
                                    {salePrice} {`(~$${parseFloat(salePrice) * ethPrice})`}
                                </Text> 
                            </Flex>  
                            <Flex flexDirection="row" justifyContent="space-between">
                                <Text color="white" fontSize="md" p={0} m={0}>
                                    Creator Royalty:
                                </Text> 
                                <Text color="white" fontSize="md" p={0} m={0}>
                                    {parseFloat(creatorRoyalty.toFixed(7))} {`(~$${parseFloat(((creatorRoyalty) * ethPrice).toFixed(4))})`}
                                </Text> 
                            </Flex>
                            <Flex flexDirection="row" justifyContent="space-between">
                                <Text color="white" fontSize="md" p={0} m={0}>
                                    DankMinter Royalty (Thanks!):
                                </Text> 
                                <Text color="white" fontSize="md" p={0} m={0}>
                                    {parseFloat(dankMinterRoyalty.toFixed(7))} {`(~$${parseFloat(((dankMinterRoyalty) * ethPrice).toFixed(4))})`}
                                </Text> 
                            </Flex>
                            <Flex flexDirection="row" justifyContent="space-between">
                                <Text color="white" fontSize="md" p={0} m={0}>
                                    Total:
                                </Text> 
                                <Text color="white" fontSize="md" p={0} m={0}>
                                    {parseFloat((parseFloat(salePrice) + creatorRoyalty + dankMinterRoyalty).toFixed(7))} {`(~$${(parseFloat(((parseFloat(salePrice) + creatorRoyalty + dankMinterRoyalty) * ethPrice).toFixed(4)))})`}
                                </Text> 
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter
                        justifyContent="end"
                        background="gray.900"
                        borderBottomLeftRadius="3xl"
                        borderBottomRightRadius="3xl">
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
                            height="40px"
                            p={0}
                            onClick={handleSell}>
                            <Text color="white" fontSize="md" p={4} m={0}>
                                Complete Sale Listing
                            </Text>   
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>      
    );
}