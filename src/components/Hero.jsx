import heroIMG from './../assets/IMG/hero.jpg'
import { useLanguage } from "../context/LanguageContext";

function Hero({user}) {
    const { t } = useLanguage();
    return (
        <>
            <header className="hero">
                <div className="hero-2col">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <span className="logo-accent">{t.heroGreeting}</span> {user.hoten}
                        </h1>
                        <p className="hero-desc">{user.vitri}</p>
                        <a href="#contact" className="cta-button glass transparent effect-fade-up"><i className="fa-solid fa-paper-plane"></i> {t.heroCta}</a>
                    </div>
                    <div className="avatar-glow effect-fade-right">
                        <img src={ heroIMG } alt={'Profile picture of ' + user.hoten} className="avatar square" />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Hero