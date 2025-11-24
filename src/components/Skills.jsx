import { useEffect, useState } from "react";
import Skill_i_Card from "./Skill-i-Card";
import Skill_j_Card from "./Skill-j-Card";
import SkeletonSkill from "./SkeletonSkill";
import {API_URL} from './../config/api';
import vietnam from './../assets/IMG/vietnam.jpg'
import usa from './../assets/IMG/usa.jpg'
import { useLanguage } from "../context/LanguageContext";

function Skills() {
    const [groupSkills, setGroupSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t, language, setLanguage } = useLanguage();
    const languageOptions = [
        { code: "vi", label: t.languageOptions.vi, icon: vietnam },
        { code: "en", label: t.languageOptions.en, icon: usa },
    ];

    const handleLanguageChange = (selectedCode) => {
        if (language === selectedCode) {
            return;
        }
        setLanguage(selectedCode);
    };

    const handleLanguageKeyDown = (event, selectedCode) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleLanguageChange(selectedCode);
        }
    };

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
            <h2>{t.skillsTitle}</h2>
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
                <>
                    
                    <div className="skills-category effect-fade-left">
                        <h3 className="skills-title">{t.languageCategory}</h3>
                        <p className="skills-language-helper">{t.skillsLanguageHelper}</p>
                        <div className="skills-grid language-toggle-grid">
                            {languageOptions.map((option) => (
                                <div 
                                    key={option.code}
                                    role="button"
                                    tabIndex={0}
                                    aria-pressed={language === option.code}
                                    className={`skill-card transparent effect-fade-up language-card ${language === option.code ? 'language-card--active' : ''}`}
                                    onClick={() => handleLanguageChange(option.code)}
                                    onKeyDown={(event) => handleLanguageKeyDown(event, option.code)}
                                >
                                    <img 
                                        className="card-img" 
                                        style=
                                        {{
                                            height: '40px',
                                            width: '70px',
                                            background: 'red'
                                        }} 
                                        src={ option.icon } 
                                        alt={`${option.label} flag`} 
                                    /> 
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            </div>
        </section>
    );
}

export default Skills;
