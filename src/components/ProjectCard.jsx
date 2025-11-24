import vietnam from './../assets/IMG/vietnam.jpg'
import { useLanguage } from "../context/LanguageContext";
function ProjectCard({ project }) {
    const { t } = useLanguage();
    return (
        <div className="timeline-item effect-fade-left">
            <div className="timeline-dot"></div>
            <div className="timeline-content card p-4 border"> 
                <div>
                    <img className="card-img" 
                    style=
                    {{
                        height: '100px',
                        width: '200px',
                        background: 'red'
                    }} 
                    src={ vietnam } alt="Project preview" />
                </div>
                <div className="card-body p-0 pt-2">
                    <div className="timeline-school">{project.project_name}</div>
                    <div className="timeline-year text-warning">{project.project_date}</div>
                    <div className="timeline-major">{project.project_type}</div>
                    <div className="timeline-major">
                        <span className="fw-bold">{t.projectRoleLabel}:</span> {project.project_role}
                    </div>
                    <div className="timeline-desc">
                        <span className="fw-bold">{t.projectDescriptionLabel}:</span> {project.project_description}
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