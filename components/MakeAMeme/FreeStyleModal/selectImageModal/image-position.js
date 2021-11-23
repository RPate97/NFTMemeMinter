import {
    Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";

export const ImagePosition = ({layoutSection, removeImage }) => {
    return (
        <>
            <Button
                position="absolute"
                top={16}
                right={0}
                onClick={removeImage}
                border="1px solid transparent"
                backgroundColor="transparent"
                _hover={{}}
                _active={{}}
                _focus={{}}
                _focusWithin={{}}
                m="0px"
                mx="5px"
                px={3}
                mt={2}
                zIndex={5}
                height="38px"
                width="fit-content">
                <CloseIcon 
                    color="white"
                    _hover={{
                        color: "whiteAlpha.700",
                    }}
                    w={6} 
                    h={6} />                                 
            </Button>  
            <Image src={layoutSection.src} alt="selected image positioning" width={layoutSection.imageWidth} height={layoutSection.imageHeight} />
        </>
    );
}
