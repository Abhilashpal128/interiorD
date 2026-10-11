import type { ReactNode } from 'react';
import { company, contact } from '../config/site';
import { useSeo } from '../hooks/useSeo';
import { Breadcrumbs } from '../components/Breadcrumbs';

function Doc({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  useSeo({ title, path, description: `${title} for ${company.name}` });
  return (
    <div className="container-x max-w-3xl py-12 sm:py-16">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: title }]} />
      <h1 className="mt-6 font-serif text-5xl">{title}</h1>
      <p className="mt-2 text-sm text-taupe">Template text - have it reviewed by a legal professional and adapt it to the business before launch.</p>
      <div className="mt-8 space-y-5 leading-relaxed text-ink/90 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-2xl [&_ul]:list-disc [&_ul]:pl-6">{children}</div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <Doc title="Privacy Policy" path="/privacy">
      <p>{company.name} ("we") collects the details you submit in our enquiry and contact forms so that we can respond to your request.</p>
      <h2>Information we collect</h2>
      <ul><li>Name, phone number, email address, city</li><li>Property type, size, service, budget and start date</li><li>Any message you choose to write</li><li>If you used the budget estimator, the selections you made</li></ul>
      <h2>How we use it</h2>
      <p>We use your information to contact you about your enquiry, prepare consultations and quotations, and send an acknowledgement email if you provided an email address. Enquiries are stored securely and are visible to authorised staff.</p>
      <h2>Cookies and analytics</h2>
      <p>This website does not currently use advertising or analytics cookies. If analytics is added, this policy and a cookie preference option will be updated.</p>
      <h2>Your choices</h2>
      <p>You may ask us to access, correct or delete your enquiry data by contacting <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
    </Doc>
  );
}

export function TermsPage() {
  return (
    <Doc title="Terms & Conditions" path="/terms">
      <p>By using this website you agree to these terms.</p>
      <h2>Estimates</h2>
      <p>Budget estimates on this website are indicative and illustrative. They are not quotations or offers. Final pricing is provided in a written quotation after consultation and site assessment.</p>
      <h2>Content</h2>
      <p>Images, project names and testimonials may be illustrative. Designs shown are examples and individual results will vary.</p>
      <h2>Enquiries</h2>
      <p>Submitting an enquiry does not create a contract. Services are provided only under a written agreement.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
    </Doc>
  );
}
