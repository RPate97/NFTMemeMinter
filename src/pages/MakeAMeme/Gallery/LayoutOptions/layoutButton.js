import { Flex, Box, Text, Grid, GridItem, Button, useDisclosure } from "@chakra-ui/react"
import FreeStyleModal from "src/pages/MakeAMeme/FreeStyleModal";

export const LayoutButton = ({userAddress, layout, userProfile}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const rowWidth = 120 / layout.rows;
    const columnWidth = 120 / layout.columns;
    return (
        <Box>
            <Button 
                minWidth="120"
                minHeight="120"
                width="fit-content"
                height="fit-content"
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
                p={0}
                onClick={onOpen}>
                <Grid m={0} p={0} templateColumns={`repeat(${layout.columns}, ${columnWidth}px)`} templateRows={`repeat(${layout.rows}, ${rowWidth}px)`} gap="0">
                    {layout.layoutSections.map((el) => {
                        return (
                            <GridItem 
                                borderColor="white" 
                                borderTopLeftRadius={el.colStart === 1 && el.rowStart === 1 ? "lg" : undefined}
                                borderTopRightRadius={el.colEnd === layout.columns + 1 && el.rowStart === 1 ? "lg" : undefined}
                                borderBottomLeftRadius={el.colStart === 1 && el.rowEnd === layout.rows + 1 ? "lg" : undefined}
                                borderBottomRightRadius={el.colEnd === layout.columns + 1 && el.rowEnd === layout.rows + 1 ? "lg" : undefined}
                                borderTopWidth={el.rowStart === 1 ? "thick" : "medium" }
                                borderRightWidth={el.colEnd === layout.columns + 1 ? "thick" : "medium"}
                                borderBottomWidth={el.rowEnd === layout.rows + 1 ? "thick" : "medium"}
                                borderLeftWidth={el.colStart === 1 ? "thick" : "medium"}
                                key={el.key} 
                                colStart={el.colStart} 
                                colEnd={el.colEnd} 
                                rowStart={el.rowStart} 
                                rowEnd={el.rowEnd} 
                                bg="grey.100" 
                            />
                        )
                    })}
                </Grid>             
            </Button>
            <FreeStyleModal layout={layout} isOpen={isOpen} onClose={onClose} userProfile={userProfile} />
        </Box>
    )
}
