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

export type NFTMeme = {
  collection: {
    name: string, 
    icon_url: string
  }
  created_at: string,
  description: string,
  id: string,
  image_url: string,
  name: string,
  status: string,
  token_address: string,
  token_id: string,
  updated_at: string,
  uri: string,
  user: string, 
  metadata: {
    DNA: string,
    creationDate: number,
    creator: string,
    creatorAddress: string,
    dankness: number,
    descendants: number,
    description: string,
    downvotes: number,
    dynasty: string,
    hash: string,
    headOfDynasty: boolean,
    image: string,
    lineage: number[],
    name: string,
    quantity: number,
    rarity: number,
    score: number,
    tokenId: string,
    upvotes: number,
  }
}

export type UserProfile = {
  _id: string,
  address: string,
  nonce: string,
  handle: string,
  memeIndex: number,
  starkPublicKey: string
};


// ImmutableX
export type MarketOrder = {
  amount_sold: number,
  buy: {
    data: {
      decimals: 18,
      quantity: string,
      token_address: string,
    },
    type: string,
  },
  sell: {
    data: {
      id: string,
      properties: {
        collection: {
          name: string, 
          icon_url: string,
        }
        image_url: string,
        name: string,
      }
      quantity: string,
      token_address: string,
      token_id: string,
    }
    type: string,
  },
  status: "active" | "filled" | "cancelled" | "expired" | "inactive",
  timestamp: string,
  updated_timestamp: string,
  user: string,
  order_id: number,
  expiration_timestamp: string,
}