import { useState, useEffect } from "react";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Text, Flex } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import abi from 'contracts/dankminter-abi.json';

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
    const [value, setValue] = useState(valueStart);
    useEffect(() => {
      setValue(valueEnd);
    }, [valueEnd]);
  
    return children(value);
};  

export const PlayerDankness = ({account}) => {
    const CONTRACT_INTERFACE = new ethers.utils.Interface(abi);
    const MEME_ADDRESS = process.env.NEXT_PUBLIC_DANKMINTER_ADDRESS;

    function convertDanknessToTier(bigDankness) {
        console.log("big dankness");
        console.log(bigDankness);
        if (bigDankness.gte(0) && bigDankness.lt(10)) {
            return 1;
        } else if (bigDankness.gte(10) && bigDankness.lt(100)) {
            return 2;
        } else if (bigDankness.gte(100) && bigDankness.lt(300)) {
            return 3;
        } else if (bigDankness.gte(300) && bigDankness.lt(1000)) {
            return 4;
        } else if (bigDankness.gte(1000) && bigDankness.lt(5000)) {
            return 5;
        } else if (bigDankness.gte(5000)) {
            return 6;
        }
    }

    function useUserDankness() {
        try {
            let dankness = useContractCall({
                abi: CONTRACT_INTERFACE, 
                address: MEME_ADDRESS, 
                method: "getUsersDankness", 
                args: [account]
            });
            console.log("dankness:");
            console.log(dankness);
            if (dankness[0] === undefined) {
                return convertDanknessToTier(0);
            } else {
                return convertDanknessToTier(dankness[0]);            
            }
        } catch (e) {
            console.error(e);
        }
    }
  
    let playerDankness = useUserDankness();

    return (
        <ProgressProvider valueStart={0} valueEnd={playerDankness ?? 1}>
            {(value) => {
                let tier;
                switch (playerDankness) {
                    case 1:
                        tier = "Normie";
                        break;
                    case 2:
                        tier = "9Gag User";
                        break;
                    case 3:
                        tier = "Reddit User";
                        break;
                    case 4:
                        tier = "Shitposter";
                        break;
                    case 5:
                        tier = "Dank Memer";
                        break;
                    case 6:
                        tier = "Two Time Back-to-Back 2016-2017 Champion of the Memes";
                        break;
                    case 7:
                        tier = "Literally Harambe";
                        break;
                    default:
                        tier = "";
                        break;
                }
                return (
                    <Flex flexDir="row" alignItems="center" height={70} mr={3} mt={8}>
                        <Flex flexDir="column">
                            <Text fontSize="16" color="white" mr={3} fontWeight="bold">
                                Shitposter Tier: {playerDankness?.toString()}
                            </Text>  
                            <Text fontSize="16" color="white" mr={3} fontWeight="bold">
                                {tier}
                            </Text>                            
                        </Flex>
                        <div style={{width: 70, height: 70}}>
                            <CircularProgressbarWithChildren value={playerDankness ?? 1} minValue={0} maxValue={7}>
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <Text fontSize="16" color="white">
                                    {playerDankness?.toString()}
                                </Text>
                            </CircularProgressbarWithChildren>                                   
                        </div>
                    </Flex>                      
                )
            }}  
        </ProgressProvider>
    );
}