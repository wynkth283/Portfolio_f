import aboutIMG from './../assets/IMG/about.jpg'

function About({user}) {
    return (
        <>
            <section id="about" className="section section-2col">
                <div className="section-img effect-fade-left">
                    <img src={ aboutIMG } alt="About illustration" height="300" width="300" />
                </div>
                <div className="section-content effect-fade-right">
                    <h2>About Me</h2>
                    <p>{user.loigioithieu}</p>
                </div>
            </section>
        </>
    );
};

export default About