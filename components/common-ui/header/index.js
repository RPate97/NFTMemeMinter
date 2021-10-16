import Head from 'next/head';

export function Header({title}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="The only meme generator that mints your memes as NFTs." />
            <meta name="google" content="notranslate" />
        </Head>
    )
}