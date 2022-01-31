import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Imagecontainer>
        <Image src="/whatsapp-home.png" height={250} width={600} />
        <h2 style={{ color: '#727372' }}>Keep your phone connected</h2>
        <p style={{ color: '#b7b9bb' }}>
          Whatsapp connects to your phone to sync messages. To reduce data
          usage, connect your phone to Wi-fi
        </p>
      </Imagecontainer>
    </Container>
  )
}

const Container = styled.div`
    align-items: center;
    background-color:#f8fafc;
    justify-content: center;
    width: 100%;
    display: flex;
    height: 100%;
`;

const Imagecontainer = styled.div`
  width: 50%;
  text-align: center;
`;
