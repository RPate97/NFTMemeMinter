import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { Dropzone } from "components/common-ui/dropzone";
import { useState } from "react";
import { AppColors } from "styles/styles";
import { ImagePosition } from "./image-position";

export const SelectLayoutImage = ({ isOpen, onClose, layoutSection, addLayoutImage, removeLayoutImage, layoutIndex }) => {
    function changeImage(files) {
        var reader = new FileReader();
        reader.onload = (e) => {
            var img = new Image();    
            img.onload = () => {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL("image/png");
                var height = (500 / (img.width / img.height));
                addLayoutImage(layoutIndex, dataURL, layoutIndex, img.width, img.height);          
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(files[0]);
    }

    function removeImage() {
        removeLayoutImage(layoutIndex);
    }

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
                    Select or Upload An Image
                </ModalHeader>
                <ModalCloseButton
                    color="white"
                    fontSize="sm"
                    _hover={{
                        color: "whiteAlpha.700",
                    }}
                />
                <ModalBody p={0} m={0} alignContent="center">
                    {layoutSection.src && layoutSection.src !== "" ?                                            
                        <ImagePosition layoutSection={layoutSection} removeImage={removeImage} /> : <Dropzone changeImage={changeImage}/>}
                </ModalBody>
            </ModalContent>
        </Modal>  
    )
}
