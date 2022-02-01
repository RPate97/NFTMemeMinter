import {
    Flex,
    Text
} from "@chakra-ui/react";
import { DankBookTabSection } from "./dankbook-tab-section";

export const DankBookTab = ({tab}) => {
    return (
        <Flex flexDirection="column" alignItems="start">
            {tab.sections.map((el) => {
                return <DankBookTabSection key={el.title} section={el} />      
            })}
        </Flex>
    )
}
