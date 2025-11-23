export default function SkeletonProject() {
    return (
        <>
            {[1,2,3,].map(i => (
                <div key={i} className="timeline-item mb-5 p-4 border">
                    <div className="timeline-left">
                        <div className="skeleton" style={{width: '80px', height: '80px', borderRadius: '12px'}}></div>
                    </div>
                    
                    <div className="timeline-line">
                        <div className="skeleton" style={{width: '100%', height: '4px', borderRadius: '2px'}}></div>
                    </div>
                    
                    <div className="timeline-right">
                        <div className="project-card p-4">
                        <div className="skeleton skeleton-text mb-3" style={{width: '70%', height: '24px'}}></div>
                        <div className="skeleton skeleton-text mb-2" style={{width: '90%', height: '16px'}}></div>
                        <div className="skeleton skeleton-text mb-4" style={{width: '85%', height: '16px'}}></div>
                        
                        <div className="d-flex gap-2">
                            <div className="skeleton" style={{width: '90px', height: '32px', borderRadius: '50px'}}></div>
                            <div className="skeleton" style={{width: '90px', height: '32px', borderRadius: '50px'}}></div>
                        </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}