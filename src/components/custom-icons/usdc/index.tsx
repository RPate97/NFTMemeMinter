import { Icon, createIcon } from '@chakra-ui/react';
import React from 'react';
import Image from "next/image";

type Props = {
    width: number,
    height: number,
}

export const USDCIcon: React.FC<Props> = ({width, height}) => {
    return (
        <Image src="/icons/usdc.svg" alt="USDC Icon" width={width} height={height} />
    );
}