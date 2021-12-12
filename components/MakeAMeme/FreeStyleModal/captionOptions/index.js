import { Flex, Button, useDisclosure } from '@chakra-ui/react'
import { SelectStickerModal } from './selectStickerModal';

export const CaptionOptions = ({addTextSection, addStickerLocation}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex flexDirection="row" justifyContent="center">
            <Button 
                color="white"
                bg="transparent"
                border="1px solid white"
                _hover={{
                    border: "1px",
                    borderStyle: "solid",
                    borderColor: "white",
                    backgroundColor: "gray.700",
                }}
                borderRadius="xl"
                marginBottom={0}
                ml={0}
                onClick={addTextSection}>
                + Text
            </Button>
            <>
                <Button 
                    color="white"
                    bg="transparent"
                    border="1px solid white"
                    _hover={{
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "white",
                        backgroundColor: "gray.700",
                    }}
                    borderRadius="xl"
                    marginBottom={0}
                    ml={5}
                    onClick={onOpen}>
                    + Sticker
                </Button>
                <SelectStickerModal isOpen={isOpen} onClose={onClose} selectSticker={addStickerLocation} />
            </>
        </Flex>
    );
}