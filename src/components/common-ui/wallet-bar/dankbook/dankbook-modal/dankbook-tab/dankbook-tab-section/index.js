import { Flex, Text } from "@chakra-ui/react"

export const DankBookTabSection = ({section}) => {
    return (
        <Flex flexDirection="column" alignItems="start">
            <Text fontSize="xl" color="white">
                {section.title}
            </Text>
            {section.content.map((el) => {
                return (
                    <Text key={el} fontSize="md" color="white" mb={3}>
                        {el}
                    </Text>                    
                )
            }
            )}
        </Flex>
    )
}
