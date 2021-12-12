import { Flex, Button } from '@chakra-ui/react'
import { BorderButton } from './border';

export const BackgroundOptions = ({changeBorderThickness, borderThickness, changeBorderColor, borderColor}) => {
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
                onClick={() => {console.log("canvas")}}>
                Canvas Size
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
                onClick={() => {console.log("layout")}}>
                Meme Layout
            </Button>
            <BorderButton changeBorderThickness={changeBorderThickness} borderThickness={borderThickness} changeBorderColor={changeBorderColor} borderColor={borderColor} />
        </Flex>
    );
}