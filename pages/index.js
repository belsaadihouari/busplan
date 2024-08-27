import React from "react";
import Signin from "@/components/signin";
import signincss from "@/styles/signin.module.css";
import Head from "next/head";
const Index = () => {
  return (
    <>
      <Head>
        <title>Accompagnateur</title>
        <meta name="description" content="Sign-in in your Session" />
        <meta name="author" content="houari belsaadi" />
      </Head>
      <div className={signincss.container}>
        <Signin />
      </div>
    </>
  );
};

export default Index;
