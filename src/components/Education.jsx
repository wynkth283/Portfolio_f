import educationIMG from './../assets/IMG/education-1.jpg'

function Education({user}) {
    return (
        <>
            <section id="education" className="section section-2col">
                <div className="section-img effect-fade-right">
                    <img src={ educationIMG } alt="Education illustration" />
                </div>
                <div className="section-content effect-fade-left">
                    <h2 className="effect-fade-left">Education</h2>
                    <div className="timeline effect-fade-left">
                        <div className="timeline-item">
                            <div className="timeline-dot"><i className="fa-solid fa-graduation-cap"></i></div>
                            <div className="timeline-content">
                                <div className="timeline-year">{user.thoigianhoc}</div>
                                <div className="timeline-school">{user.tentruong}</div>
                                <div className="timeline-major">Major: {user.chuyennganh}</div>
                                <div className="timeline-major">{user.mota_hocvan}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Education