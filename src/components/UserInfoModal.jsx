import { getUser, logout } from "../utils/Auth";
import { useEffect, useState } from "react";
import {API_URL} from './../config/api';

export default function UserInfoModal() {
    const authUser = getUser();

    const [isEditing, setIsEditing] = useState(false);
    const [formValues, setFormValues] = useState({
        name: authUser?.name || "",
        email: authUser?.email || ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setFormValues({
            name: authUser?.name || "",
            email: authUser?.email || ""
        });
        setIsEditing(false);
    };

    const handleConfirmClick = () => {
        let id = authUser.id;

        $.ajax({
            url: `${API_URL.AUTH}/${id}`,
            type: "PUT",
            data: {
                'name': $('#info .name').val(),
                'email': $('#info .email').val(),
            },
            dataType: "json",
            success: function (res) {
                if (res.message === "success") {
                    // Cập nhật localStorage ngay lập tức
                    const updatedUser = {
                        ...authUser,
                        name:  $('#info .name').val(),
                        email: $('#info .email').val(),
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
            
                    window.location.reload();
                    setIsEditing(false);
                } else {
                    showToast('error', res.message);
                }
            },
            error: function (xhr) {
                showToast('error', xhr.responseJSON.message);
            }
        });
        setIsEditing(false);
    };

    useEffect(() => {
        const handleChangePassword = function () {
            const id = authUser?.id;
            if (!id) {
                showToast('error', 'Không tìm thấy người dùng');
                return;
            }
    
            const currentPassword = $('#changePassForm .current-password').val().trim();
            const newPassword     = $('#changePassForm .new-password').val();
            const confirmPassword = $('#changePassForm .confirm-password').val();
    
            if (!currentPassword) {
                showToast('warning', 'Vui lòng nhập mật khẩu hiện tại');
                return;
            }
            if (newPassword.length < 8) {
                showToast('warning', 'Mật khẩu mới phải từ 8 ký tự');
                return;
            }
            if (newPassword !== confirmPassword) {
                showToast('warning', 'Xác nhận mật khẩu không khớp');
                return;
            }
    
            $.ajax({
                url: `${API_URL.CHANGE_PASSWORD}/${id}`,
                type: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                    confirm_password: confirmPassword
                }),
                success: function () {
                    showToast('success', 'Đổi mật khẩu thành công! Đang đăng xuất...');
                    $('#changePassForm')[0].reset();
                    $('#changePasswordModal').modal('hide');
    
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.location.href = '/';
                    }, 1500);
                },
                error: function (xhr) {
                    let msg = 'Lỗi đổi mật khẩu';
    
                    if (xhr.responseJSON?.message) {
                        msg = xhr.responseJSON.message;
                    } else if (xhr.responseJSON?.errors) {
                        const firstError = Object.values(xhr.responseJSON.errors)[0][0];
                        msg = firstError;
                    }
    
                    showToast('error', msg);
                }
            });
        };
    
        $('.changepass').on('click', handleChangePassword);
        return () => {
            $('.changepass').off('click', handleChangePassword);
        };
    }, [authUser?.id]);

    return (

        <>
            <div className="modal fade" id="UserInfoModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="UserInfoModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-0">
                        <div className="auth-card">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item col">
                                    <a className="nav-link rounded-0 text-center active" data-bs-toggle="tab" href="#info">
                                        <i className="fas fa-user me-2"></i> Infomation
                                    </a>
                                </li>
                                <li className="nav-item col">
                                    <a className="nav-link rounded-0 text-center" data-bs-toggle="tab" href="#setting">
                                        <i className="fas fa-shield me-2"></i>Security
                                    </a>
                                </li>
                            </ul>
                
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="info">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="name"><i className="fas fa-user me-2"></i>Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control name"
                                            required
                                            value={formValues.name}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="email"><i className="fas fa-envelope me-2"></i>Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control email"
                                            placeholder="name@example.com"
                                            required
                                            value={formValues.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="mb-3 d-flex gap-2">
                                        <button
                                            type="button"
                                            className={`btn-success btn btn-sm btnedit ${isEditing ? "d-none" : ""}`}
                                            onClick={handleEditClick}
                                        >
                                            <div className="d-flex justify-content-center align-items-center">
                                                <i className="fas fa-edit me-2"></i>Edit
                                            </div>
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn-secondary btn btn-sm btncancel ${isEditing ? "" : "d-none"}`}
                                            onClick={handleCancelClick}
                                        >
                                            <div className="d-flex justify-content-center align-items-center">
                                                <i className="fas fa-xmark me-2"></i>Cancel
                                            </div>
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn-primary btn btn-sm btnsuccess ${isEditing ? "" : "d-none"}`}
                                            onClick={handleConfirmClick}
                                        >
                                            <div className="d-flex justify-content-center align-items-center">
                                                <i className="fas fa-check me-2"></i>Confirm
                                            </div>
                                        </button>
                                    </div>
                                </div>
                
                                <div className="tab-pane fade" id="setting">
                                    <div id="changePassForm">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="password"><i className="fas fa-lock me-2"></i>Current password</label>
                                            <input type="password" id="password" className="form-control current-password" required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="new-password"><i className="fas fa-lock me-2"></i>New password</label>
                                            <input type="password" id="new-password" className="form-control new-password" required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="confirm-password"><i className="fas fa-redo me-2"></i>Confirm password</label>
                                            <input type="password" id="confirm-password" className="form-control confirm-password" required />
                                        </div>
                                        <button type="submit" className="cta-button glass transparent w-100 changepass" >
                                            Confirm password change
                                        </button>
                                        <button className="cta-button glass transparent w-100" type="button" onClick={logout}>
                                            <i className="fa-solid fa-right-from-bracket me-2"></i> Logout
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