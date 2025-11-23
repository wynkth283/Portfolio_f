import About from "./components/About"
import Contact from "./components/Contact"
import Education from "./components/Education"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import ButtonOnTop from "./components/ButtonOnTop"
import AuthModal from "./components/AuthModal"
import ForgotPasswordModal from "./components/ForgotPassword"
import ActionButtonGroup from "./components/ActionButtonGroup"
import CmtModal from "./components/CmtModal"
import UserInfoModal from "./components/UserInfoModal"
import { isLogin } from './utils/Auth';

function App() {
    const User = [{
        hoten: "Huynh Hung Thinh",
        email: "wynkth283@gmail.com",
        dienthoai: "+84 345 678 283",
        diachi: "Dong Nai, Vietnam",
        vitri: "Web Developer",
        loigioithieu: "My name is HUYNH HUNG THINH, graduated from Vinh Long University of Technical Education. I have experience using PHP web frameworks such as Laravel and Ruby on Rails. I have knowledge of Frontend technologies and platforms such as HTML, Javascript, CSS, jQuery, ReactJS. I also have knowledge of MySQL and PortgreSQL databases. I am looking for an opportunity to apply my knowledge, hone my programming skills and contribute to impactful software products.",
        tentruong: "Vinh Long University of Technology Education",
        chuyennganh: "Communication and Computer Networks",
        thoigianhoc: "09/2021 - 11/2025",
        mota_hocvan: "Relevant coursework: Data Structures and Algorithms, Database Systems, Web Development, Software Engineering, Computer Networks, Operating Systems.",
    }];
    
    return (
        <>
            <canvas id="galaxy-bg"></canvas>
            
            <ActionButtonGroup></ActionButtonGroup>
            <Hero user={User[0]}></Hero>
            <About user={User[0]}></About>
            <Skills></Skills>
            <Education user={User[0]}></Education>
            <Projects></Projects>
            <Contact user={User[0]}></Contact>
            <AuthModal></AuthModal>
            <ForgotPasswordModal></ForgotPasswordModal>
            <CmtModal></CmtModal>
            {isLogin() ? <UserInfoModal></UserInfoModal> : ''}
            <ButtonOnTop></ButtonOnTop>
            <div className="toast-container" id="toastContainer"></div>
        </>
    )
  }
  
  export default App