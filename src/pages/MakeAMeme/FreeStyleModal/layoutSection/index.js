import { GridItem, Flex, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import { SelectLayoutImage } from "../selectImageModal/index.tsx";
import SelectFillIcon from "./selectFillIcon";

export const LayoutSection = ({el, layout, addLayoutImage, removeLayoutImage, layoutIndex, rowWidth, colWidth, layoutBorderThickness, layoutBorderColor, token}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <GridItem 
                borderColor={layoutBorderColor} 
                borderTopLeftRadius={el.colStart === 1 && el.rowStart === 1 ? "lg" : undefined}
                borderTopRightRadius={el.colEnd === layout.columns + 1 && el.rowStart === 1 ? "lg" : undefined}
                borderBottomLeftRadius={el.colStart === 1 && el.rowEnd === layout.rows + 1 ? "lg" : undefined}
                borderBottomRightRadius={el.colEnd === layout.columns + 1 && el.rowEnd === layout.rows + 1 ? "lg" : undefined}
                borderTopWidth={el.rowStart === 1 ? "0" : `${layoutBorderThickness}px` }
                borderRightWidth={el.colEnd === layout.columns + 1 ? "0" : `${layoutBorderThickness}px` }
                borderBottomWidth={el.rowEnd === layout.rows + 1 ? "0" : `${layoutBorderThickness}px` }
                borderLeftWidth={el.colStart === 1 ? "0" : `${layoutBorderThickness}px` }
                key={el.key} 
                colStart={el.colStart} 
                colEnd={el.colEnd} 
                rowStart={el.rowStart} 
                rowEnd={el.rowEnd} 
                bg="gray.900" 
                onClick={onOpen}
                _hover={{
                    cursor: "pointer",
                }}
            >
                <Flex flexDirection="column" alignItems="center" justifyContent="center" h="full" mx={0}>
                    {el.src === undefined || el.src === "" ? 
                        <Flex flexDirection="column" alignItems="center">
                            <SelectFillIcon fill="white" width="100px" height="70px"/>
                            <Text mt={3} color="white" fontWeight="bold" textAlign="center"> Tap to select an image or fill </Text>
                        </Flex>
                    : <Image src={el.src} height={rowWidth * (el.rowEnd - el.rowStart)} width={colWidth * (el.colEnd - el.colStart)} objectFit="cover" alt="meme image here"/>}
                </Flex>
            </GridItem>
            {token && isOpen && <SelectLayoutImage isOpen={isOpen} onClose={onClose} layoutSection={el} addLayoutImage={addLayoutImage} removeLayoutImage={removeLayoutImage} layoutIndex={layoutIndex} token={token} />}
        </>
    );
}