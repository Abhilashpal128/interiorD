import { useSeo } from '../hooks/useSeo';
import { faqs } from '../data/faqs';
import { company, contact, seo } from '../config/site';
import { photos } from '../data/media';
import { Hero } from '../sections/Hero';
import { Services } from '../sections/Services';
import { Designs } from '../sections/Designs';
import { Portfolio } from '../sections/Portfolio';
import { Walkthroughs } from '../sections/Walkthroughs';
import { Process } from '../sections/Process';
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
  description: company.description,
  logo: new URL(company.logoImage, company.siteUrl).href,
  address: { '@type': 'PostalAddress', ...contact.postalAddress },
  contactPoint: contact.phones.map((phone) => ({ '@type': 'ContactPoint', telephone: phone.tel, contactType: 'customer enquiries' })),
};

export default function HomePage() {
  useSeo({ path: '/', image: photos.livingDining.src, jsonLd: seo.enableLocalBusinessSchema ? [faqSchema, businessSchema] : [faqSchema] });
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <Walkthroughs />
      <Services />
      <Process />
      <Designs />
      <FAQ />
      <Contact />
    </>
  );
}
