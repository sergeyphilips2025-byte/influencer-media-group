import Nav        from './components/Nav';
import Hero       from './components/Hero';
import Services   from './components/Services';
import SalesEngine from './components/SalesEngine';
import Metrics    from './components/Metrics';
import Program    from './components/Program';
import CTA        from './components/CTA';
import Footer     from './components/Footer';
import Cursor     from './components/Cursor';

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Services />
        <SalesEngine />
        <Metrics />
        <Program />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
