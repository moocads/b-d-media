import { useTranslations } from "next-intl";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const footerLogoLink = t("footerLogoLink");

  return (
    <section className="bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <img src={footerLogoLink} alt="Footer Logo" width={150} height={100} />
            <p className="text-white text-sm">{t("description")}</p>
          </div>
          <div>
            <h3 className="text-white font-bold">LINKS</h3>
            <ul>
              <li><Link className="text-white font-light" href="/about">{t("links.about")}</Link></li>
              <li><Link className="text-white font-light" href="/services">{t("links.services")}</Link></li>
              <li><Link className="text-white font-light" href="/contact">{t("links.contact")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold">CONTACT</h3>
            <p className="text-white text-sm">{t("contactInfo.email.title")}: {t("contactInfo.email.value")}</p>
            <p className="text-white text-sm">{t("contactInfo.phone.title")}: {t("contactInfo.phone.value")}</p>
            <br />
            <p className="text-white "> {t("contactInfo.address.location1.city")}</p>
                <Link className="text-white text-sm font-light" href={t("contactInfo.address.location1.address")}>{t("contactInfo.address.location1.address")}</Link> 
            <p className="text-white "> {t("contactInfo.address.location2.city")}</p>
                <Link className="text-white text-sm font-light" href={t("contactInfo.address.location2.address")}>{t("contactInfo.address.location2.address")}</Link> 
          </div>
          <div>
            <h3 className="text-white font-bold">FOLLOW US</h3>
            <br />
            <ul className="flex gap-4">
              <li><Link className="text-white font-light" href="/"><Facebook className="w-8 h-8" /> </Link></li>
              <li><Link className="text-white font-light" href="/"><Instagram className="w-8 h-8" /> </Link></li>
              <li><Link className="text-white font-light" href="/"><Linkedin className="w-8 h-8" /> </Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}