// import { Link } from "lucide-react";
import Link from "next/link";
import Header from "@src/components/Header";
import Hero from "@src/components/Hero";
import About from "@src/components/About";
import HowItWorks from "@src/components/HowItWorks"; 
import JoinUs from "@src/components/JoinUs";
import CallToActions from "@src/components/CallToActions";
import Footer from "@src/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <JoinUs />
        <CallToActions />
      </main>
      <Footer />
    </>
  );
}