import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Precise Learning Burari",
  description:
    "Learn how Precise Learning Burari handles website enquiries, analytics and study notes.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy policy">
      <p>
        This policy explains how Precise Learning Burari handles information
        when you use this website.
      </p>

      <h2>Enquiries</h2>
      <p>
        The enquiry form prepares a message in WhatsApp using the name, phone
        number, class and optional message you enter. The website does not
        submit that form to a Precise Learning server. WhatsApp opens so you can
        review and send the message. We receive the details only if you choose
        to send it.
      </p>
      <p>
        If you contact us by phone, email or WhatsApp, we use the information
        you provide to respond to your enquiry and discuss classes.
      </p>

      <h2>Website analytics</h2>
      <p>
        This website uses Vercel Web Analytics to understand general website
        traffic and improve the site. Vercel processes analytics information
        under its own privacy terms.
      </p>

      <h2>Study notes and third-party services</h2>
      <p>
        Study-note details are stored to display the notes portal, and uploaded
        files are served using Vercel Blob. Selecting WhatsApp, Google Maps,
        Instagram, YouTube or an external note link takes you to that provider,
        which handles information under its own policies.
      </p>
      <p>
        The admin area uses an authentication cookie to keep authorised
        administrators signed in while managing notes.
      </p>

      <h2>Children</h2>
      <p>
        Parents or guardians should send enquiries on behalf of younger
        students and avoid including sensitive personal information in a
        message.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions, email{" "}
        <a href="mailto:preciselearning0014@gmail.com">
          preciselearning0014@gmail.com
        </a>
        .
      </p>
    </LegalPage>
  );
}
