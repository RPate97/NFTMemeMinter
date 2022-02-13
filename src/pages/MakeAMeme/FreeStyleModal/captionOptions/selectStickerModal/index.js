import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,
} from "@chakra-ui/react";
import { AppColors } from "styles/styles";
import { StickerModal } from "./stickerModal";

export const SelectStickerModal = ({ isOpen, onClose, selectSticker }) => {
    return (
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
                    Sticker Collections
                </ModalHeader>
                <ModalCloseButton
                    color="white"
                    fontSize="sm"
                    _hover={{
                        color: "whiteAlpha.700",
                    }}
                />
                <ModalBody p={0} m={0} alignContent="center">
                <Flex flexDirection="row" justifyContent="center" mb={14} mt={7}>
                    <StickerModal selectSticker={selectSticker} stickerType="flag" closeSelectStickerModal={onClose}/>
                    <StickerModal selectSticker={selectSticker} stickerType="logo" closeSelectStickerModal={onClose}/>
                    <StickerModal selectSticker={selectSticker} stickerType="meme" closeSelectStickerModal={onClose}/>
                </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>  
    )
}