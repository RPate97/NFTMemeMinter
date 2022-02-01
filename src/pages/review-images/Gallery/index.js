
import React, { useState, useEffect } from 'react'
import { GalleryImageRequest } from './GalleryImageRequest'
import { styles } from 'styles/styles';
import {
    Box,
} from "@chakra-ui/react";
import useAxios from 'axios-hooks';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const Gallery = () => {
    const [page, setPage] = useState(1)
    const [{ data, loading, error }] = useAxios({
      url: '/api/admin/fetchImageRequests',
      params: { page },
    })

    useEffect(() => {
        if (!loading) {
            console.log(data);
        }
    }, [loading, data]);

    return (
        <div>  
            <main style={styles.main}>
                <Box
                    padding={2}
                    w="100%"
                    mx="auto"
                    sx={{ columnCount: [1, 2, 3, 4], columnGap: "8px" }}
                >
                    {data && data.imageRequests?.map((el, index) => (
                        <GalleryImageRequest key={el._id} imageRequest={el} />  
                    ))}  
                </Box>
            </main>
        </div>
    )
}