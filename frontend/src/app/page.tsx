import Header from "@src/components/Header";
import Hero from "@src/components/Hero";
import About from "@src/components/About";
import HowItWorks from "@src/components/HowItWorks"; 
import JoinUs from "@src/components/JoinUs";
import CallToActions from "@src/components/CallToActions";

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
        {/* As outras secções da nossa página virão a seguir */}
      </main>
    </>
  );
}