import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React from "react";
import NavBar from "../components/NavBar";
import client from "../utils/UrqlClient";

function Home() {
  return (
    <div>
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
    </div>
  );
}
export default withUrqlClient(client)(Home);
