import React, { useState } from 'react';
import type { NextPage } from 'next';
import { toast } from 'react-toastify';
import path from 'path';
import Head from 'next/head';
import Image from 'next/image';

import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios';

import styles from '../styles/Home.module.css';

interface DATA {
  city: string;
  rideCity: string;
  titleOne: string;
  titleTwo: string;
  textPageOne: string;
  textPageTwo: string;
  textPageThree: string;
  textPageFour: string;
  listPageOne: [string];
  listPageTwo: [string];
  listPageOneFormatted: string;
  listPageTwoFormatted: string;
  error?: string;
}

const Home: NextPage = () => {
  const [URL, setURL] = useState('');
  const [DATA, setDATA] = useState<DATA>({
    rideCity: 'Aguardando chamada!',
    city: '',
    titleOne: '',
    titleTwo: '',
    textPageOne: '',
    textPageTwo: '',
    textPageThree: '',
    textPageFour: '',
    listPageOne: [''],
    listPageTwo: [''],
    listPageOneFormatted: '',
    listPageTwoFormatted: '',
    error: '',
  })

  function notify() {
    toast.error(DATA.error, {toastId: DATA.error});
  }

  async function handleGetData() {
      await axios({
        method: 'post',
        data: { URL: URL },
        url: path.join(__dirname, '/api'),
      }).then((response) => {
      setDATA(response.data);
      
      console.log(response.data)
      setURL('');
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>WeWiNe</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.AppHeader}>    
        <p className={styles.AppContent}>
          <Image 
            src='/logo.svg' 
            height="100" 
            width="100" 
            alt="logo" 
            priority={true}
            className={styles.Applogo}
          />
          <input 
            className={styles.AppInput}
            type="text" 
            value={URL}
            onChange={e => setURL(e.target.value)}
          />
          <button
            className={styles.AppButton}
            type="button" 
            onClick={handleGetData}
          >
            visualizar
          </button>
        </p>
      </header>

      <main className={styles.Dashboard}>
        <div className={styles.DashboardItem}>
          <CopyToClipboard text={DATA.rideCity}><button>COPY</button></CopyToClipboard>
          {(DATA.error) ? (
            <>
              {notify()}
            </>
          ) : (
            <span>{DATA.rideCity}</span>
          )} 
        </div>
        <div className={styles.DashboardItem}>
          <CopyToClipboard text={DATA.city}><button>COPY</button></CopyToClipboard>
          <span>{DATA.city}</span> 
        </div>
        <div className={styles.DashboardItem}>
          <CopyToClipboard text={DATA.titleOne}><button>COPY</button></CopyToClipboard>
          <span>{DATA.titleOne}</span> 
        </div>
        <div className={styles.DashboardItem}>
          <CopyToClipboard text={DATA.textPageOne}><button>COPY</button></CopyToClipboard>
          <span>{DATA.textPageOne}</span> 
        </div>
        <div className={styles.DashboardItem}>
          <CopyToClipboard text={DATA.textPageTwo}><button>COPY</button></CopyToClipboard>
          <span>{DATA.textPageTwo}</span> 
        </div>
        <div className={styles.DashboardItem}>
          <CopyToClipboard text={DATA.textPageThree}><button>COPY</button></CopyToClipboard>
          <span>{DATA.textPageThree}</span> 
        </div>
        <div className={styles.DashboardItem}>
          <CopyToClipboard text={DATA.textPageFour}><button>COPY</button></CopyToClipboard>
          <span>{DATA.textPageFour}</span> 
        </div>
        <div className={styles.DashboardItem}>
          <CopyToClipboard text={DATA.titleTwo}><button>COPY</button></CopyToClipboard>
          <span>{DATA.titleTwo}</span> 
        </div>
          <div className={styles.DashboardItemList}>
          <div>
            <CopyToClipboard 
              text={DATA.listPageOneFormatted}
              options={{format: 'text/html'}}
            >
              <button>COPY</button>
            </CopyToClipboard>
            <ul>
              {DATA.error ? (
                <li></li>
              ) : (
                DATA.listPageOne.map((item) => {
                return <li key={item}>{item}</li>
                })
              )} 
            </ul>    
          </div>
          <div>
            <CopyToClipboard 
              text={DATA.listPageTwoFormatted}
              options={{format: 'text/html'}}
            >
              <button>COPY</button>
            </CopyToClipboard>
            <ul>
              {DATA.error ? (
                <li></li>
              ) : (
                DATA.listPageTwo.map((item) => {
                return <li key={item}>{item}</li>
                })
              )}  
            </ul>
          </div>
        </div>
        <div className='dashboard-item-list'>
        </div>
      </main>

      <footer className={styles.Footer}>
        <a
          href="https://github.com/erico-bruner"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <strong> Erico Bruner </strong>
        </a>
      </footer>
    </div>
  )
}

export default Home
