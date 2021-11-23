import { Flex, Button } from '@chakra-ui/react';
import { BackgroundOptions } from '../backgroundOptions';
import { CaptionOptions } from '../captionOptions';

export const OptionButtons = ({selectedOptions, setSelectedOption, addTextSection, addStickerLocation}) => {
    return (
        <Flex flexDirection="column" justifyContent="center" width="500px" mt={5}>
            {selectedOptions === 1 ? <CaptionOptions addTextSection={addTextSection} addStickerLocation={addStickerLocation} /> : <BackgroundOptions /> }
            <Flex flexDirection="row" justifyContent="center" mt={3}>
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
                    onClick={() => {setSelectedOption(0)}}>
                    Background
                </Button>
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
                    onClick={() => {setSelectedOption(1)}}>
                    Captions/Stickers
                </Button>
            </Flex>            
        </Flex>
    )
}
