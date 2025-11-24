import ProjectCard from "./ProjectCard";
import { useState, useEffect } from 'react';
import SkeletonProject from "./SkeletonProject";
import {API_URL} from './../config/api';
import { useLanguage } from "../context/LanguageContext";

export default function Projects() {
    const { t } = useLanguage();
    // const projects = [
    //     {   
    //         id: 1,
    //         name:"Blood Cell classNameifier",
    //         duration: "03/2025 – 05/2025",
    //         role: "Personal Project — Role: Developer",
    //         description: "A web application for classNameifying blood cell images using deep learning (Vision Transformer) and fuzzy logic-based preprocessing. The system allows users to upload blood cell images and receive predictions with visual explanations (Grad-CAM).",
    //         technologies: "Technologies: Python, HTML, CSS, JavaScript, Chart.js, Git",
    //         link: "#"
    //     },
    //     {
    //         id: 2,
    //         name:"VLUTE Job Portal",
    //         duration: "11/2024 – 06/2025",
    //         role: "Personal Project — Role: Developer",
    //         description: "A web-based job portal for university students and employers, designed to streamline job postings, CV management, and recruitment processes within the campus community.",
    //         technologies: "Technologies: PHP, MySQL, Bootstrap, Keycloak, PHPMailer, PHPWord, Machine Learning (joblib), Git",
    //         link: "#"
    //     },
    //     {
    //         id: 3,
    //         name:"Car Dealership Website",
    //         duration: "03/2025 – 05/2025",
    //         role: "Personal Project — Role: Developer",
    //         description: "A web application for buying and selling cars online, featuring both admin and customer interfaces. The platform allows users to browse car listings, view detailed information, and place orders, while administrators can manage inventory, orders, and promotional campaigns.",
    //         technologies: "Technologies: PHP, MySQL, HTML, CSS, JavaScript, PHPMailer, DataTables, Git",
    //         link: "#"
    //     }
    // ]

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL.PROJECTS)
            .then(res => res.json())
            .then(data => {
                setProjects(data.data || data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if(loading) { 
        return (
            <>
                <section id="projects" className="section section-2col">
                    <div className="section-content">
                        <h2 className="effect-fade-left">{t.projectsTitle}</h2>
                        <div className="timeline">
                            <SkeletonProject></SkeletonProject>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    if(projects.length === 0) { return <div className="text-center">{t.projectsEmpty}</div> }

    return (
        <>
            <section id="projects" className="section section-2col">
                <div className="section-content">
                    <h2 className="effect-fade-left">{t.projectsTitle}</h2>
                    <div className="timeline">
                        {projects.map(project => (
                            <ProjectCard key={project.id} project={project}></ProjectCard>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};