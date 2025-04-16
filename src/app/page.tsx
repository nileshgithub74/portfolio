import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Certificates from './components/Certificates';


export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Certificates />
      <Projects />
    
      <Contact />
      <Footer />
    </Layout>
  );
}
