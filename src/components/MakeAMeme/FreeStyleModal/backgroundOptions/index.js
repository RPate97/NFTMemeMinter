import { Flex, Button, Text } from '@chakra-ui/react'
import { BorderButton } from './border';

export const BackgroundOptions = ({changeBorderStyle, borderThickness, changeBorderColor, borderColor}) => {
    return (
        <Flex flexDirection="row" justifyContent="center">
            {/* <Button 
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
            </Button> */}
            {/* <Button 
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
            </Button> */}
            <BorderButton changeBorderStyle={changeBorderStyle} borderThickness={borderThickness} borderColor={borderColor} />
        </Flex>
    );
}