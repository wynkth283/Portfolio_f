export default function SkeletonSkill() {
    return (
        <>
            <div className="skills-category">
                <div className="skills-title skeleton skeleton-text" style={{width: '180px', height: '28px'}}></div>
                
                <div className="skills-grid mt-3">
                    {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="skill-card transparent d-flex align-items-center gap-3">
                        <div className="skeleton" style={{width: '36px', height: '36px', borderRadius: '8px'}}></div>
                        <div className="skeleton skeleton-text" style={{width: '100px', height: '18px'}}></div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
}