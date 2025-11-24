import aboutIMG from './../assets/IMG/about.jpg'
import { useLanguage } from "../context/LanguageContext";

function About({user}) {
    const { t } = useLanguage();
    return (
        <>
            <section id="about" className="section section-2col">
                <div className="section-img effect-fade-left">
                    <img src={ aboutIMG } alt="About illustration" height="300" width="300" />
                </div>
                <div className="section-content effect-fade-right">
                    <h2>{t.aboutTitle}</h2>
                    <p>{user.loigioithieu}</p>
                </div>
            </section>
        </>
    );
};

export default About