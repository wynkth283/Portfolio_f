import './../assets/css/ActionButtonGroup.css';
import Tooltip from './Tooltip';
import { getUser, isLogin, logout } from './../utils/Auth';

export default function ActionButtonGroup() {
    const user = getUser();
    return (
        <>
            <Tooltip></Tooltip>
            <div className="ABG-container">
                <div className="ABG-wrapper">
                    <button className="ABG-button mb-3" type="button" data-abg-tooltip={` ${isLogin() ? user.name : 'User'}`} data-bs-toggle="modal" data-bs-target={` ${isLogin() ? '#UserInfoModal' : '#AuthForm'}`}>
                        <i className="fas fa-user"></i>
                    </button>
                    <button className="ABG-button mb-3" type="button" data-abg-tooltip="Commnents" data-bs-toggle="modal" data-bs-target="#CmtForm">
                        <i className="fa-solid fa-comments"></i>
                    </button>
                    <a href="#about" data-abg-tooltip="About" className="ABG-button mb-3 fw-bold">
                        A
                    </a>
                    <a href="#skills" data-abg-tooltip="Skills" className="ABG-button mb-3 fw-bold">
                        S
                    </a>
                    <a href="#education" data-abg-tooltip="Education" className="ABG-button mb-3 fw-bold">
                        E
                    </a>
                    <a href="#projects" data-abg-tooltip="Projects" className="ABG-button mb-3 fw-bold">
                        P
                    </a>
                    <a href="#contact" data-abg-tooltip="Contact" className="ABG-button fw-bold">
                        C
                    </a>
                </div>
            </div>
        </>
    )
}