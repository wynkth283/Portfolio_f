import contactIMG from './../assets/IMG/contact.jpg'
import { useLanguage } from "../context/LanguageContext";

function Contact({user}) {
    const { t } = useLanguage();
    return (
        <>
            <section id="contact" className="section section-2col reverse">
                <div className="section-img effect-fade-right">
                    <img src={ contactIMG } alt="Contact illustration" />
                </div>
                <div className="section-content">
                    <h2 className="effect-fade-left">{t.contactTitle}</h2>
                    <div className="timeline">
                        <div className="contact-row effect-fade-left"><i className="fa-solid fa-envelope"></i> <span>{t.contactEmailLabel}:</span> <a className='text-white' href={'mailto:' + user.email}>{user.email}</a></div>
                        {/* <div className="contact-row effect-fade-left"><i className="fa-solid fa-phone"></i> <span>{t.contactPhoneLabel}:</span> {user.dienthoai}</div> */}
                        <div className="contact-row effect-fade-left"><i className="fa-solid fa-location-dot"></i> <span>{t.contactAddressLabel}:</span> {user.diachi}</div>
                    </div>
                    <div className="contact-social effect-fade-left">
                        <a href="https://www.facebook.com/hth283" target="_blank" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
                        <a href="https://www.instagram.com/hhthin28.3" target="_blank" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://github.com/wynkth283" target="_blank" aria-label="Github"><i className="fa-brands fa-github"></i></a>
                    </div>
                    <a href="mailto:wynkth283@gmail.com" className="cta-button glass transparent effect-fade-left"> {t.contactCta}</a>
                </div>
            </section>
        </>
    );
};

export default Contact