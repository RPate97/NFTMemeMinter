import { Icon, createIcon } from '@chakra-ui/react';
import React from 'react';
import Image from "next/image";

type Props = {
    width: number,
    height: number,
}

export const EthIcon: React.FC<Props> = ({width, height}) => {
    return (
        <Image src="/icons/eth.svg" alt="Ethereum Icon" width={width} height={height} />
    );
}