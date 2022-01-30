import { Button, useDisclosure } from '@chakra-ui/react';
import { BorderModal } from './modal';

export const BorderButton = ({changeBorderStyle, borderThickness, changeBorderColor, borderColor}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                ml={5}
                onClick={onOpen}>
                Border Style
            </Button>
            <BorderModal isOpen={isOpen} onClose={onClose} changeBorderStyle={changeBorderStyle} borderThickness={borderThickness} borderColor={borderColor} />
        </>        
    );
}