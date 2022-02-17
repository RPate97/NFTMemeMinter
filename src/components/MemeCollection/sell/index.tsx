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
    useDisclosure,
    Input,
    useToast,
    Spinner,
    Select
} from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { useEffect, useState } from "react";
import { EthIcon } from "src/components/custom-icons/eth";
import useAxios, { RefetchOptions } from 'axios-hooks';
import loadConfig from 'next/dist/server/config';
import { USDCIcon } from 'components/custom-icons/usdc';
import { PriceBreakdown } from './price-breakdown';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

type Props = {
    nftMeme: NFTMeme,
    refetch: (config?: AxiosRequestConfig<any>, options?: RefetchOptions) => AxiosPromise<any>
};

export const SellButton: React.FC<Props> = ({nftMeme, refetch}) => {
    const [currency, setCurrency] = useState<string>("ETH");
    const [mutating, setMutating] = useState<boolean>(false);
    const [salePrice, setSalePrice] = useState<string>("0.01");
    const [ethPrice, setEthPrice] = useState<number | undefined>();
    const [creatorRoyalty, setCreatorRoyalty] = useState<number>(0.0005);
    const [dankMinterRoyalty, setDankMinterRoyalty] = useState<number>(0.001);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const link = new Link(process.env.NEXT_PUBLIC_LINK_ADDRESS);    
    const isInputValid = salePrice && parseFloat(salePrice) > 0 && currency !== "";

    const handleSell = async () => {
        if (isInputValid) {
            try {
                setMutating(true);
                const res = await link.sell({
                    tokenId: nftMeme.token_id,
                    tokenAddress: nftMeme.token_address,
                    amount: salePrice,
                    currencyAddress: currency === "USDC" ? process.env.NEXT_PUBLIC_USDC_ADDRESS : undefined,
                });
                toast({
                    position: 'bottom-left',
                    render: () => (
                      <Box color='white' p={3} bg='green.500' borderRadius="md" boxShadow="md">
                        Sale listed!
                      </Box>
                    ),
                });
                setTimeout(async () => {
                    await refetch(null, {
                        useCache: false,
                    });
                    setMutating(false);
                    onClose();
                }, 3000);
            } catch (e) {
                toast({
                    position: 'bottom-left',
                    render: () => (
                    <Box color='white' p={3} bg='blue.500' borderRadius="md" boxShadow="md">
                        Cancelled Sale Listing
                    </Box>
                    ),
                });
                setMutating(false);
            }         
        } else {
            toast({
                position: 'bottom-left',
                render: () => (
                <Box color='white' p={3} bg='red.100' borderRadius="md" boxShadow="md">
                    You must select a currency along with a price greater than 0
                </Box>
                ),
            });
            setMutating(false);
        }
    }

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

    useEffect(() => {
        if (currency === "USDC") {
            setSalePrice("1");
        } else {
            setSalePrice("0.01");
        }
    }, [currency]);

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
                        <Select 
                            borderColor={currency === '' ? "red.500" : "white"}
                            placeholder='Select Currency' 
                            value={currency} 
                            color="white" 
                            mb={3} 
                            _hover={{
                                borderColor: currency === '' ? "red.500" : "white"
                            }}
                            focusBorderColor={currency === '' ? "red.500" : "white"}
                            onChange={(e) => setCurrency(e.target.value)}>
                            <option value='ETH'>ETH</option>
                            <option value='USDC'>USDC</option>
                        </Select>
                        <Flex flexDirection="row">
                            <Input
                                value={salePrice}
                                onChange={(e) => setSalePrice(() => e.target.value)}
                                placeholder='Enter price'
                                size='md'
                                color="white"
                                mr={2}
                            />
                            {currency === "USDC" ? <USDCIcon width={40} height={40}/> : <EthIcon width={40} height={40}/>}
                        </Flex>
                        <PriceBreakdown
                            currency={currency}
                            salePrice={salePrice}
                            ethPrice={ethPrice}
                            creatorRoyalty={creatorRoyalty}
                            dankMinterRoyalty={dankMinterRoyalty}
                        />
                    </ModalBody>
                    <ModalFooter
                        justifyContent="end"
                        background="gray.900"
                        borderBottomLeftRadius="3xl"
                        borderBottomRightRadius="3xl">
                        <Flex flexDirection="row" alignItems="center">
                            {mutating && <Spinner color="white" mr={2} />}
                            <Button
                                disabled={mutating || !isInputValid}
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
                                <Text color={!mutating ? "white" : "gray.400"} fontSize="md" p={4} m={0}>
                                    Complete Sale Listing
                                </Text>   
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>      
    );
}