import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from "@chakra-ui/react";
import { AppColors } from "styles/styles";

export const BorderModal = ({isOpen, onClose, changeBorderStyle, borderThickness, borderColor}) => {

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
                    <Text color="white" fontFamily="space_monoregular" fontSize="lg">Border Styling</Text>
                    <Text color="white" fontFamily="space_monoregular" fontSize="sm">Border Styling is purely cosmetic, changing it does not count as creating a unique meme.</Text>
                </ModalHeader>
                <ModalCloseButton
                    color="white"
                    fontSize="sm"
                    _hover={{
                        color: "whiteAlpha.700",
                    }}
                />
                <ModalBody py={1} px={4} m={0} alignContent="center">
                    <Text color="white" fontFamily="space_monoregular" fontSize="lg">Border Thickness</Text>
                    <Slider aria-label="slider-ex-4" mt={1} value={borderThickness} width={200} min={0} max={10} onChange={(val) => changeBorderStyle(borderColor, val)}>
                        <SliderTrack bg="blue.100">
                            <SliderFilledTrack bg="blue" />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </ModalBody>
            </ModalContent>
        </Modal>  
    );
}