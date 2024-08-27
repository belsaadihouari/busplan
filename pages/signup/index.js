import React from "react";
import Signup from "@/components/signup";
import signupcss from "@/styles/signup.module.css";
import Head from "next/head";
const Index = () => {
  return (
    <>
      <Head>
        <title>(Sign-up)</title>
        <meta name="description" content="Sign-up and start your journey" />
        <meta name="author" content="houari belsaadi" />
      </Head>
      <div className={signupcss.container}>
        <Signup />
      </div>
    </>
  );
};

export default Index;
