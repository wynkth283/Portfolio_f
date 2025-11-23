import { useEffect, useState } from 'react'
import './../assets/css/auth.css'
import './../assets/css/toast.css'
import './../components/Toast.jsx'
import {API_URL} from './../config/api';

export default function AuthModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            showToast('info', 'Processing... !');
            const res = await fetch(API_URL.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                showToast('error', 'Login failed! ' + data.message);
                return;
            }
    
            // Thành công
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
    
            $('#AuthForm').modal('hide');
            showToast('success', 'Login successful!');

            if (data.user?.role === 'admin') {
                window.location.href = API_URL.BASE;
            } else {
                window.location.reload();
            }
    
        } catch (err) {
            showToast('error', 'Server connection error!');
        }
    };

    useEffect(() => {
        $('.register').off('click');
        
        $('.register').on('click', function(e) {
            e.preventDefault();
            const form = $('#registerForm');
            const name = $('.name', form).val();
            const email = $('.email', form).val();
            const password = $('.password', form).val();
            const passwordConfirm = $('.password-confirm', form).val();
            
            if (!name || !email || !password) {
                showToast('error', 'Vui lòng điền đầy đủ thông tin');
                return;
            }
            
            if (password.length < 8) {
                showToast('error', 'Mật khẩu phải có ít nhất 8 ký tự');
                return;
            }
            
            if (password !== passwordConfirm) {
                showToast('error', 'Mật khẩu xác nhận không khớp');
                return;
            }
            
            $.ajax({
                url: API_URL.REGISTER,
                type: "POST",
                data: {
                    'name': name,
                    'email': email,
                    'password': password,
                },
                dataType: "json",
                success: function (res) {
                    if (res.message === "success") {
                        $('.name, .email, .password', form).val('');
                        $('.password-confirm', form).val('');
                        $('#agree').prop('checked', false);
                        $('#AuthForm').modal('hide');
                        showToast('success', 'Đăng ký thành công!');
                    } else {
                        showToast('error', res.message);
                    }
                },
                error: function (xhr) {
                    const errorMessage = xhr.responseJSON?.message || xhr.responseJSON?.errors ? 
                        Object.values(xhr.responseJSON.errors).flat().join(', ') : 
                        'Đã xảy ra lỗi khi đăng ký';
                    showToast('error', errorMessage);
                }
            });
        });
        
        return () => {
            $('.register').off('click');
        };
    }, []); // Chỉ chạy một lần khi mount

    return (
        <>
        <div className="modal fade" id="AuthForm" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="AuthFormLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content rounded-0">
                    <div className="auth-card">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item col">
                                <a className="nav-link rounded-0 text-center active" data-bs-toggle="tab" href="#login">
                                    <i className="fas fa-sign-in-alt me-2"></i>LOGIN
                                </a>
                            </li>
                            <li className="nav-item col">
                                <a className="nav-link rounded-0 text-center" data-bs-toggle="tab" href="#register">
                                    <i className="fas fa-user-plus me-2"></i>REGISTER
                                </a>
                            </li>
                        </ul>
            
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="login">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email"><i className="fas fa-envelope me-2"></i>Email</label>
                                    <input type="email" id="email" className="form-control" placeholder="" required value={email} onChange={e => setEmail(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password"><i className="fas fa-lock me-2"></i>Password</label>
                                    <input type="password" id="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)}/>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <a href="#" className="text-link" onClick={(e) => { e.preventDefault(); $('#forgotPasswordModal').modal('show'); $('#AuthForm').modal('hide');}}>Forgot password?</a>
                                </div>
                                <button type="submit" className="cta-button glass transparent w-100" onClick={e => handleLogin(e)}>
                                    <i className="fas fa-sign-in-alt me-2"></i>Login
                                </button>
                            </div>
            
                            <div className="tab-pane fade" id="register">
                                <div id="registerForm">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="name"><i className="fas fa-user me-2"></i>Full Name</label>
                                        <input type="text" id="name" className="form-control name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="email"><i className="fas fa-envelope me-2"></i>Email</label>
                                        <input type="email" id="email" className="form-control email" placeholder="" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="password"><i className="fas fa-lock me-2"></i>Password</label>
                                        <input type="password" id="password" className="form-control password" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="confirm-password"><i className="fas fa-redo me-2"></i>Confirm password</label>
                                        <input type="password" id="confirm-password" className="form-control password-confirm" required />
                                    </div>
                                    <button type="submit" className="cta-button glass transparent w-100 register">
                                        <i className="fas fa-user-plus me-2"></i>Create account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>
    );
}