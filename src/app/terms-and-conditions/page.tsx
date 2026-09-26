import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions | Precise Learning Burari",
  description:
    "Terms for using the Precise Learning Burari website and study notes portal.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage title="Terms and conditions">
      <p>
        By using this website, you agree to these terms. If you do not agree,
        please do not use the site.
      </p>

      <h2>Website information</h2>
      <p>
        The website shares general information about tuition for Classes 6–12,
        subjects and study materials. Contact Precise Learning to confirm
        current batch availability, timings, fees and other arrangements.
        Website information may be updated without notice.
      </p>

      <h2>Study materials</h2>
      <p>
        Notes and other materials are provided for personal study. Do not
        republish, sell or distribute them without permission from the
        applicable rights holder. If you upload material through the admin
        portal, you must have the right to share it.
      </p>

      <h2>Enquiries and external services</h2>
      <p>
        Submitting the enquiry form opens a pre-filled WhatsApp message for you
        to review and send. A message is not delivered until you send it in
        WhatsApp. External services, including WhatsApp, Google Maps, Instagram
        and YouTube, are governed by their own terms.
      </p>

      <h2>No academic outcome guarantee</h2>
      <p>
        Teaching and study materials are intended to support learning.
        Individual academic results depend on many factors, so this website
        does not guarantee any particular marks, examination result or
        admission.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not attempt to disrupt the website, bypass access controls, or use
        the admin portal without authorisation.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href="mailto:preciselearning0014@gmail.com">
          preciselearning0014@gmail.com
        </a>
        .
      </p>
    </LegalPage>
  );
}
