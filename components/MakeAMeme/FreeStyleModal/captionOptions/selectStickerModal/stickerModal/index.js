import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Center,
} from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { stickers } from "components/MakeAMeme/properties";
import { StickerButton } from "../stickerButton";


export const StickerModal = ({selectSticker, stickerType, closeSelectStickerModal}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    let stickerCollection;
    let buttonTitle;
    if (stickerType === 'flag') {
        stickerCollection = stickers.flags;
        buttonTitle = "Flags";
    } else if (stickerType === 'logo') {
        stickerCollection = stickers.logos;
        buttonTitle = "Logos";
    } else if (stickerType === 'meme') {
        stickerCollection = stickers.memeStuff;
        buttonTitle = "Meme Stuff";
    }

    return (
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
                ml={0}
                mr={2}
                onClick={onOpen}>
                {buttonTitle}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent
                    background={AppColors.buttonBackground}
                    backgroundSize="cover"
                    border="1px"
                    borderStyle="solid"
                    borderColor="gray.700"
                    alignContent="center"
                    borderRadius="3xl"
                    overflow="hidden">
                    <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                        Select A Sticker
                    </ModalHeader>
                    <ModalCloseButton
                        color="white"
                        fontSize="sm"
                        _hover={{
                            color: "whiteAlpha.700",
                        }}
                    />
                    <Center>
                        <ModalBody p={0} m={0} alignContent="center" width="min-content">
                            {stickerCollection.map((sticker) => (
                                <StickerButton key={sticker.stickerIdentifier} sticker={sticker} selectSticker={selectSticker} closeStickerModal={onClose} closeSelectStickerModal={closeSelectStickerModal} />
                            ))}
                        </ModalBody>
                    </Center>
                </ModalContent>
            </Modal>  
        </>
    )
}