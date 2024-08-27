import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Accompagnateur</title>
        <meta name="description" content="houari belsaadi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          {/* <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p> */}
          {/* <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}HB
              <Image
                src="/my.png"
                alt="my image"
                
                width={50}
                height={50}
                priority
              />
            </a>
          </div> */}
        </div>

        <div className={styles.center}>
         
        </div>

        <div className={styles.grid}>
        
          <a
            href=""
            className={styles.card}
            // target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Business Plan <span>-&gt;</span>
            </h2>
            <p>
             Create your business plan &nbsp;let go!
            </p>
          </a>

          <a
            href=""
            className={styles.card}
            // target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
            Make Appointment <span>-&gt;</span>
            </h2>
            <p>
              Take an appointement with analyst.
            </p>
          </a>

          



        </div>
      </main>
    </>
  );
}
