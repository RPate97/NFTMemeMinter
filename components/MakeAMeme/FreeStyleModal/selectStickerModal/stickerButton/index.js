import {
    Button,
    Text,
    Flex,
} from "@chakra-ui/react";
import Image from "next/image";

export const StickerButton = ({sticker, selectSticker, closeStickerModal, closeSelectStickerModal}) => {
    return (
        <Button
            onClick={() => {
                selectSticker(sticker);
                closeStickerModal();
                closeSelectStickerModal();
            }}
            bg="transparent"
            border="1px solid transparent"
            _hover={{
                border: "1px",
                borderStyle: "solid",
                borderColor: "white",
                backgroundColor: "gray.700",
            }}
            borderRadius="xl"
            m={2}
            p={2}
            mb={2}
            width="fit-content"
            height="fit-height">
            <Flex flexDirection="column" maxWidth={150}>
                <Image src={sticker.src} width={150} height={170} objectFit="contain" alt={`Sticker Button ${sticker.name}`} />
                <Text textAlign="center" color="white" fontSize="md" mb={2} width={150} maxWidth={150} overflowWrap="anywhere" noOfLines={3} whiteSpace="initial">
                    {sticker.name}
                </Text>
            </Flex>
        </Button>
    )
}
