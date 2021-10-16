import React from 'react'
import Link from 'next/link'
import { styles } from '../styles/styles'
import { Text, Button } from "@chakra-ui/react";
import { Header } from "components/common-ui/header";

export const Landing = () => {
    return (
        <div style={styles.intro}>
            <div style={styles.intro.section}> 
                <h1 style={styles.intro.sectionTitle}>The meme generator that mints your memes as NFTs.</h1>    
                <h1 style={styles.intro.subtitle}>Guarenteed to be authentic, collectible, and truly one of a kind.</h1>                          
                <div style={styles.intro.actions}>
                    <Button
                        bg="transparent"
                        border="1px solid white"
                        _hover={{
                            border: "1px",
                            borderStyle: "solid",
                            borderColor: "white",
                            backgroundColor: "gray.700",
                        }}
                        borderRadius="xl"
                        m="0px"
                        ml="10px"
                        height="38px"
                        p={0}
                        pb="1px">
                        <Link href='/mint'>
                            <Text color="white" fontSize="md" p={4} m={0}>
                                Get Started
                            </Text>   
                        </Link>
                    </Button>  
                    <Button
                        bg="transparent"
                        border="1px solid transparent"
                        _hover={{
                            border: "1px",
                            borderStyle: "solid",
                            borderColor: "white",
                            backgroundColor: "gray.700",
                        }}
                        borderRadius="xl"
                        m="0px"
                        ml="10px"
                        height="38px"
                        p={0}
                        pb="1px">
                        <Link href='/dankpaper'>
                            <Text color="white" fontSize="md" p={4} m={0}>
                                Read The DankPaper
                            </Text>   
                        </Link>
                    </Button>   
                </div>
            </div>                
        </div>
    )
}
