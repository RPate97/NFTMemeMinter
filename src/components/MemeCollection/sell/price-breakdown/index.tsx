import {
    Flex,
    Text,
} from "@chakra-ui/react";

type Props = {
    currency: string,
    salePrice: string,
    ethPrice: number,
    creatorRoyalty: number,
    dankMinterRoyalty: number,
};

export const PriceBreakdown: React.FC<Props> = ({currency, salePrice, ethPrice, creatorRoyalty, dankMinterRoyalty}) => {
    const salePriceStr = currency === "USDC" ? "(USDC)" : `(~$${parseFloat(salePrice) * ethPrice})`;
    const creatorRoyaltyStr = currency === "USDC" ? "(USDC)" : `(~$${parseFloat(((creatorRoyalty) * ethPrice).toFixed(4))})`;
    const dankMinterRoyaltyStr = currency === "USDC" ? "(USDC)" : `(~$${parseFloat(((dankMinterRoyalty) * ethPrice).toFixed(4))})`;
    const totalStr = currency === "USDC" ? "(USDC)" : `(~$${(parseFloat(((parseFloat(salePrice) + creatorRoyalty + dankMinterRoyalty) * ethPrice).toFixed(4)))})`;

    return (
        <Flex flexDirection="column" mt={2}>
            <Flex flexDirection="row" justifyContent="space-between">
                <Text color="white" fontSize="md" p={0} m={0}>
                    Sale Price:
                </Text> 
                <Text color="white" fontSize="md" p={0} m={0}>
                    {salePrice} {salePriceStr}
                </Text> 
            </Flex>  
            <Flex flexDirection="row" justifyContent="space-between">
                <Text color="white" fontSize="md" p={0} m={0}>
                    Creator Royalty:
                </Text> 
                <Text color="white" fontSize="md" p={0} m={0}>
                    {parseFloat(creatorRoyalty.toFixed(7))} {creatorRoyaltyStr}
                </Text> 
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between">
                <Text color="white" fontSize="md" p={0} m={0}>
                    DankMinter Royalty (Thanks!):
                </Text> 
                <Text color="white" fontSize="md" p={0} m={0}>
                    {parseFloat(dankMinterRoyalty.toFixed(7))} {dankMinterRoyaltyStr}
                </Text> 
            </Flex>
            <Flex flexDirection="row" justifyContent="space-between">
                <Text color="white" fontSize="md" p={0} m={0}>
                    Total:
                </Text> 
                <Text color="white" fontSize="md" p={0} m={0}>
                    {parseFloat((parseFloat(salePrice) + creatorRoyalty + dankMinterRoyalty).toFixed(7))} {totalStr}
                </Text> 
            </Flex>
        </Flex> 
    );
}