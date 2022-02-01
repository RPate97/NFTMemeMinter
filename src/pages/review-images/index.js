import styles from 'styles/Home.module.css';
import { Gallery } from 'src/pages/review-images/Gallery';
import { Header } from "src/components/common-ui/header";
import { Flex } from "@chakra-ui/react";

export function ReviewImages() {
  return (
    <Flex>
      <Header title="Review Templates"/>
      <Gallery />
    </Flex>

  )
}