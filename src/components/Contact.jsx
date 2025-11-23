import contactIMG from './../assets/IMG/contact.jpg'

function Contact({user}) {
    return (
        <>
            <section id="contact" className="section section-2col reverse">
                <div className="section-img effect-fade-right">
                    <img src={ contactIMG } alt="Contact illustration" />
                </div>
                <div className="section-content">
                    <h2 className="effect-fade-left">Contact</h2>
                    <div className="timeline">
                        <div className="contact-row effect-fade-left"><i className="fa-solid fa-envelope"></i> <span>Email:</span> <a href={'mailto:' + user.email}>{user.email}</a></div>
                        <div className="contact-row effect-fade-left"><i className="fa-solid fa-phone"></i> <span>Phone:</span> {user.dienthoai}</div>
                        <div className="contact-row effect-fade-left"><i className="fa-solid fa-location-dot"></i> <span>Address:</span> {user.diachi}</div>
                    </div>
                    <div className="contact-social effect-fade-left">
                        <a href="https://facebook.com/yourprofile" target="_blank" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
                        <a href="https://instagram.com/yourprofile" target="_blank" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://github.com/yourprofile" target="_blank" aria-label="Github"><i className="fa-brands fa-github"></i></a>
                    </div>
                    <a href="mailto:wynkth283@gmail.com" className="cta-button glass transparent effect-fade-left"><i className="fa-solid fa-paper-plane"></i> Send a Message</a>
                </div>
            </section>
        </>
    );
};

export default Contact