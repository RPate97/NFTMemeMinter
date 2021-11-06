import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {
    Flex,
    Text,
  } from "@chakra-ui/react";
import Image from "next/image";

export function Dropzone({changeImage}) {
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      changeImage(acceptedFiles);
    }, [changeImage])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
        <Flex flexDirection="column" justifyContent="center" height="100%" width="100%">
            <div {...getRootProps()} style={{height: "100%"}}>
                <input {...getInputProps()} />
                {
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%" width="100%">
                        <Text 
                            fontSize="xl" 
                            mb={10} 
                            mx={10}
                            color="white" 
                            textAlign="center" 
                            fontWeight="bold">
                            Drag and drop, or click to select an image.
                        </Text>
                        <Image src="/images/image-upload.png" width={512 / 4} height={398 / 4} alt="upload icon" />
                    </Flex>
                }
            </div>
        </Flex>
    )
  }