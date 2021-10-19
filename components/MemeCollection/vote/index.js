import { ethers } from "ethers";
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
    Button,
} from "@chakra-ui/react";
import { useContractFunction } from '@usedapp/core'
import abi from 'contracts/dankminter-abi.json';
import { AppColors } from "styles/styles";

export const VoteButton = ({memeId, upDown}) => {
    const CONTRACT_INTERFACE = new ethers.utils.Interface(abi);
    const MEME_ADDRESS = process.env.NEXT_PUBLIC_DANKMINTER_ADDRESS;
    const contract = new ethers.Contract(MEME_ADDRESS, CONTRACT_INTERFACE);
    const { state, send } = useContractFunction(contract, 'voteOnMeme', { transactionName: 'Vote' });

    const vote = () => {
        send(memeId, upDown);
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