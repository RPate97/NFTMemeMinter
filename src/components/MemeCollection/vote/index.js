import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
    Button,
} from "@chakra-ui/react";
import { AppColors } from "styles/styles";

export const VoteButton = ({memeId, upDown}) => {
    const vote = () => {
        console.log("vote");
    }   
   
    return (
        <div>
            {!upDown ? (<Button
                onClick={vote}
                bg={AppColors.buttonBackground}
                border="1px solid transparent"
                _hover={{
                    border: "1px",
                    borderStyle: "solid",
                    borderColor: "white",
                    backgroundColor: "gray.700",
                }}
                borderRadius="xl"
                m="0px"
                p={0}
                height="38px">
                <ChevronDownIcon color="red" boxSize={10} _hover={{
                    color: "black"
                }}/>
            </Button>) :
            (<Button
                onClick={vote}
                bg={AppColors.buttonBackground}
                border="1px solid transparent"
                _hover={{
                    border: "1px",
                    borderStyle: "solid",
                    borderColor: "white",
                    backgroundColor: "green.700",
                }}
                borderRadius="xl"
                m="0px"
                ml="5px"
                p={0}
                height="38px">
                <ChevronUpIcon color="green" boxSize={10} _hover={{
                    color: "black"
                }}/>
            </Button>)}            
        </div>
    );
};