export default function Skill_j_Card({ skill }) {
    return (<div className="skill-card transparent effect-fade-up"><i className={skill.icon}></i> {skill.name}</div>);
}