import { ContactSection } from "./ContactSection";
import { Helmet } from "react-helmet-async";
import { useFavicon } from "../../hooks/useFavicon";

const ContactPage = () => {
    useFavicon('contact');

    return (
        <>
            <Helmet>
                <title>Contact | Lalith Kumar</title>
                <meta name="description" content="Get in touch with Siramdasu Lalith Kumar through email, phone, GitHub, or LinkedIn for collaborations and opportunities." />
            </Helmet>
            <div className="w-full min-h-full">
                <ContactSection />
            </div>
        </>
    );
};

export default ContactPage;
