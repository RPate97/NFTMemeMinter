import React from 'react';
import * as htmlToImage from 'html-to-image';
import { AppColors } from "styles/styles";
import {
    Flex,
    Text,
} from "@chakra-ui/react";
import { layouts } from "src/utils/properties";
import { LayoutButton } from './layoutButton';

export const LayoutOptions = ({userProfile}) => {
    return (
        <Flex flexDirection="column">
            <Text color="white" fontSize="3xl" ml={5} mb={0} fontFamily="space_monoregular">
                Create a $TICKER
            </Text>
            <Flex         
                alignContent="start"   
                position="sticky"
                top="0"
                alignItems="center"
                flexWrap="nowrap"
                overflowX="scroll"
                px="2"
                gridGap="2"
                css={{
                    WebkitOverflowScrolling: "touch",
                    msOverflowStyle: "-ms-autohiding-scrollbar"
                }}
                pb={5}
            >
                {layouts.map((layout) => {
                    return <LayoutButton key={layout.layoutIdentifier} layout={layout} userProfile={userProfile}/>
                })}
            </Flex>            
        </Flex>
    );
}
