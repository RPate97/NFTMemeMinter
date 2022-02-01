
import React, { useState, useEffect } from 'react'
import { GalleryMeme } from './GalleryMeme'
import { styles } from 'styles/styles';
import { WalletBar } from 'src/components/common-ui/wallet-bar'
import {
    Box,
    Button,
    useDisclosure,
    Flex,
    Text,
} from "@chakra-ui/react";
import useAxios from 'axios-hooks';
import axios from 'axios';
import { LayoutOptions } from 'src/components/MakeAMeme/Gallery/LayoutOptions';
import { ImageRequestButton } from 'src/components/image-request-button';

axios.defaults.baseURL = 'http://localhost:3000';

export const Gallery = ({account, deactivate, userProfile}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [page, setPage] = useState(1)
    const [{ data, loading, error }] = useAxios({
      url: '/api/fetchTemplates',
      params: { page },
    });

    return (
        <div>  
            <main style={styles.main}>
                <WalletBar account={account} deactivate={deactivate} userProfile={userProfile} />
                <Flex flexDirection="row" mt={7}>
                    <Flex flexDirection="column">
                        <ImageRequestButton />
                        <Text color="white" fontSize="sm" ml={5} mb={3} noOfLines={1}>
                            To be available when free styling
                        </Text>
                    </Flex>
                </Flex>
                <LayoutOptions userProfile={userProfile} />
                <Flex flexDirection="column">
                    <Text color="white" fontSize="3xl" ml={5} mb={0} noOfLines={1} fontFamily="space_monoregular">
                        Use a Dynasty
                    </Text>
                    <Box
                        padding={2}
                        w="100%"
                        mx="auto"
                        sx={{ columnCount: [1, 2, 3, 4], columnGap: "8px" }}
                    >
                        {userProfile && data && data.templates.map((el, index) => (
                            <GalleryMeme key={el._id} template={el} userAddress={account} userProfile={userProfile} />  
                        ))}  
                    </Box>
                </Flex>
            </main>
        </div>
    )
}