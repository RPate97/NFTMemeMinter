import {
    Button,
    Text,
    Flex,
} from "@chakra-ui/react";
import Image from "next/image";
import { LayoutSection, LayoutImage } from "src/utils/types";

type Props = {
    image: LayoutImage,
    onClose: () => void,
    layoutSection: LayoutSection,
    addLayoutImage: (index: number, newSrc: string, newId: string, imageWidth: number, imageHeight: number) => void,
    removeLayoutImage:  (index: number) => void,
    layoutIndex: number,
};

export const ImageButton: React.FC<Props> = ({image, onClose, layoutSection, addLayoutImage, removeLayoutImage, layoutIndex}) => {
    return (
        <Button
            onClick={() => {
                addLayoutImage(layoutIndex, image.src, image._id, image.width, image.height);
                onClose();
            }}
            bg="transparent"
            border="1px solid transparent"
            _hover={{
                border: "1px",
                borderStyle: "solid",
                borderColor: "white",
                backgroundColor: "gray.700",
            }}
            borderRadius="xl"
            m={2}
            p={2}
            mb={2}
            width="fit-content"
            height="fit-height">
            <Flex flexDirection="column" maxWidth={150}>
                <Image src={image.src} width={image.width} height={image.height} objectFit="contain" alt={`Image Button ${image.name}`} />
                <Text textAlign="center" color="white" fontSize="md" mb={2} width={150} maxWidth={150} overflowWrap="anywhere" noOfLines={3} whiteSpace="initial">
                    {image.name}
                </Text>
            </Flex>
        </Button>
    )
}
