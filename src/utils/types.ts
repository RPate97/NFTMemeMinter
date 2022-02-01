export type ImageRequest = {
    _id: string,
    src: string,
    width: number,
    height: number,
    name: string,
    requestedBy: string,
};

export type Layout = {
    layoutIdentifier: string,
    columns: number,
    rows: number,
    layoutSections: LayoutSection[],
}

export type LayoutSection = {
    key: number,
    colStart: number,
    colEnd: number,
    rowStart: number,
    rowEnd: number,
    src: string | undefined,
    uniqueId: string | undefined,
    imageWidth: number | undefined,
    imageHeight: number | undefined,
}

export type LayoutImage = {
    _id: string,
    src: string,
    width: number,
    height: number,
    name: string,
}