import React from 'react';
import * as htmlToImage from 'html-to-image';
import { AppColors } from "styles/styles";
import {
    Flex,
    Text,
} from "@chakra-ui/react";
import { layouts } from "../../properties";
import { LayoutButton } from './layoutButton';

export const LayoutOptions = ({userProfile}) => {
    return (
        <Flex flexDirection="column">
            <Text color="white" fontSize="3xl" ml={5} mb={0}>
                Start A Dynasty
            </Text>
            <Text color="white" fontSize="md" ml={5} mb={3}>
                {"In DankMinter memes are living things that can reproduce, evolve, and change over time. When you create a new type of meme, we call this starting a dynasty. Anyone can create a meme within your Dynasty by remixing your meme or one of it's decendents. Starting a new Dynasty costs 140 TreeFiddy Tokens."}
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
