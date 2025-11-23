import { useEffect, useState } from "react";
import Skill_i_Card from "./Skill-i-Card";
import Skill_j_Card from "./Skill-j-Card";
import SkeletonSkill from "./SkeletonSkill";
import {API_URL} from './../config/api';

function Skills() {
    const [groupSkills, setGroupSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL.SKILLS) 
            .then(res => res.json())
            .then(data => {
                const formatted = data
                .filter(item => item.StatusTK)
                .map(item => ({
                    title: item.TitleSkill,
                    skills: item.skills
                        .filter(skill => skill.StatusSkill)
                        .map(skill => ({
                            name: skill.NameSkill,
                            icon: skill.ClassIcon
                        }))
                }));
                setGroupSkills(formatted);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading skills:", err);
                setLoading(false);
            });
    }, []);

    return (
        <section id="skills" className="section">
            <h2>Skills</h2>
            <div className="skills-categories">
                {
                loading ? 
                (
                    <>
                        <SkeletonSkill></SkeletonSkill>
                        <SkeletonSkill></SkeletonSkill>
                    </>
                )
                : 
                groupSkills.map((group, i) => (
                    <Skill_i_Card key={i} group={group}>
                        {group.skills.map((skill, j) => (
                            <Skill_j_Card key={j} skill={skill} />
                        ))}
                    </Skill_i_Card>
                ))
                }
            </div>
        </section>
    );
}

export default Skills;
