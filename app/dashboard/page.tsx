'use client';
import Analytics from "./components/Analytics";
import { Metadata } from "next";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import withAuth from "../components/layout/protect";


function Home() {
  return (
    <>
      <DefaultLayout>
        <Analytics />
      </DefaultLayout>
    </>
  );
}

export default withAuth(Home)

