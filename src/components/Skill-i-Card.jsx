
export default function Skill_i_Card({ group, children}) {
    return (
        <div className="skills-category effect-fade-left">
            <h3 className="skills-title">{group.title}</h3>
            <div className="skills-grid">
                {children}
            </div>
        </div>
    );
}