import heroIMG from './../assets/IMG/hero.jpg'

function Hero({user}) {
    return (
        <>
            <header className="hero">
                <div className="hero-2col">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <span className="logo-accent">Hello, I'm</span> {user.hoten}
                        </h1>
                        <p className="hero-desc">{user.vitri}</p>
                        <a href="#contact" className="cta-button glass transparent effect-fade-up"><i className="fa-solid fa-paper-plane"></i> Get in Touch</a>
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