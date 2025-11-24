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
import { useEffect } from "react";
import { useLanguage } from "./context/LanguageContext";

function App() {
    const { language } = useLanguage();
    const userProfiles = {
        en: {
            hoten: "Huynh Hung Thinh",
            email: "wynkth283@gmail.com",
            dienthoai: "+84 345 678 283",
            diachi: "Dong Nai, Vietnam",
            vitri: "Web Developer",
            loigioithieu: "My name is HUYNH HUNG THINH, graduated from Vinh Long University of Technical Education. I have experience using PHP web frameworks such as Laravel and Ruby on Rails. I have knowledge of Frontend technologies and platforms such as Bootstrap, Tailwind, ReactJS. I also have knowledge of MySQL and PortgreSQL databases. I am looking for an opportunity to apply my knowledge, hone my programming skills and contribute to impactful software products.",
            tentruong: "Vinh Long University of Technology Education",
            chuyennganh: "Communication and Computer Networks",
            thoigianhoc: "09/2021 - 11/2025",
            mota_hocvan: "Relevant coursework: Data Structures and Algorithms, Database Systems, Web Development, Software Engineering, Computer Networks, Operating Systems.",
        },
        vi: {
            hoten: "Huỳnh Hưng Thịnh",
            email: "wynkth283@gmail.com",
            dienthoai: "+84 345 678 283",
            diachi: "Đồng Nai, Việt Nam",
            vitri: "Lập trình viên Web",
            loigioithieu: "Tôi tên là HUỲNH HƯNG THỊNH, tốt nghiệp Đại học Sư phạm Kỹ thuật Vĩnh Long. Tôi có kinh nghiệm sử dụng các framework web PHP như Laravel và Ruby on Rails. Tôi có kiến ​​thức về các công nghệ và nền tảng Frontend như Bootstrap, Tailwind, ReactJS. Tôi cũng có kiến ​​thức về cơ sở dữ liệu MySQL và PortgreSQL. Tôi đang tìm kiếm cơ hội để áp dụng kiến ​​thức, trau dồi kỹ năng lập trình và đóng góp vào các sản phẩm phần mềm có sức ảnh hưởng.",
            tentruong: "Đại học Sư phạm Kỹ thuật Vĩnh Long",
            chuyennganh: "Truyền thông và Mạng máy tính",
            thoigianhoc: "09/2021 - 11/2025",
            mota_hocvan: "Các môn học liên quan: Cấu trúc Dữ liệu và Giải thuật, Hệ quản trị CSDL, Phát triển Web, Kỹ nghệ Phần mềm, Mạng máy tính, Hệ điều hành.",
        }
    };
    const user = userProfiles[language] || userProfiles.en;
    useEffect(() => {
        // Kiểm tra nếu có query parameter logout=true
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.get('logout') === 'true') {
            // Xóa token và user khỏi localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Hiển thị thông báo
            if (typeof showToast !== 'undefined') {
                showToast('success', 'Logged out successfully!');
            }
            
            // Xóa query parameter khỏi URL
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Reload trang để cập nhật UI
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }, []);
    return (
        <>
            <canvas id="galaxy-bg"></canvas>
            
            <ActionButtonGroup></ActionButtonGroup>
            <Hero user={user}></Hero>
            <About user={user}></About>
            <Skills></Skills>
            <Education user={user}></Education>
            <Projects></Projects>
            <Contact user={user}></Contact>
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