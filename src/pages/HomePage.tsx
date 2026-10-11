import { useSeo } from '../hooks/useSeo';
import { faqs } from '../data/faqs';
import { company, contact, seo } from '../config/site';
import { IMG } from '../data/images';
import { Hero } from '../sections/Hero';
import { LeadCapture } from '../sections/LeadCapture';
import { TrustStrip } from '../sections/TrustStrip';
import { Services } from '../sections/Services';
import { Designs } from '../sections/Designs';
import { Portfolio } from '../sections/Portfolio';
import { BeforeAfterSection } from '../sections/BeforeAfterSection';
import { Process } from '../sections/Process';
import { RoomSelector } from '../sections/RoomSelector';
import { BudgetEstimator } from '../sections/BudgetEstimator';
import { Materials } from '../sections/Materials';
import { WhyUs } from '../sections/WhyUs';
import { Testimonials } from '../sections/Testimonials';
import { Journey } from '../sections/Journey';
import { ConsultCTA } from '../sections/ConsultCTA';
import { FAQ } from '../sections/FAQ';
import { About } from '../sections/About';
import { Contact } from '../sections/Contact';

// FAQ schema mirrors the visible FAQ section exactly.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};
// Only emitted when seo.enableLocalBusinessSchema is true (i.e. after real business details are entered).
const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: company.name,
  url: company.siteUrl,
  telephone: contact.phoneTel,
  email: contact.email,
  address: { '@type': 'PostalAddress', streetAddress: contact.addressLines.join(', ') },
};

export default function HomePage() {
  useSeo({ path: '/', image: IMG.hero, jsonLd: seo.enableLocalBusinessSchema ? [faqSchema, businessSchema] : [faqSchema] });
  return (
    <>
      <Hero />
      <LeadCapture />
      <TrustStrip />
      <Services />
      <Designs />
      <Portfolio />
      <BeforeAfterSection />
      <Process />
      <RoomSelector />
      <BudgetEstimator />
      <Materials />
      <WhyUs />
      <Testimonials />
      <Journey />
      <ConsultCTA />
      <FAQ />
      <About />
      <Contact />
    </>
  );
}
