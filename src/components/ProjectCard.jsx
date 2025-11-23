function ProjectCard({ project }) {
    return (
        <div className="timeline-item effect-fade-left">
            <div className="timeline-dot"></div>
            <div className="timeline-content card p-4 border"> 
                <div className="card-img" style={
                    {
                        height: '100px',
                        width: '200px',
                        background: 'red'
                    }
                }>
                    
                </div>
                <div className="card-body p-0 pt-2">
                    <div className="timeline-school">{project.project_name}</div>
                    <div className="timeline-year text-warning">{project.project_date}</div>
                    <div className="timeline-major">{project.project_type}</div>
                    <div className="timeline-major">
                        <span className="fw-bold">Role:</span> {project.project_role}
                    </div>
                    <div className="timeline-desc">
                        <span className="fw-bold">Description:</span> {project.project_description}
                    </div>
                    <div className="d-flex" style={{gap: '10px'}}>
                    {
                        project.project_links?.map(link => (
                            <a key={link.id} href={link.link} className="cta-button glass transparent">{link.link_name}</a>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard