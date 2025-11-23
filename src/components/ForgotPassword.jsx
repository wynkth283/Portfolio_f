import { useState } from 'react';
import { showToast } from './Toast';
import {API_URL} from './../config/api';

export default function ForgotPasswordModal() {
    const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        mode: 'cors',
    };

    const sendOtp = async () => {   
        showToast('info', 'Processing... !');
        const res = await fetch(API_URL.FORGOT_PASSWORD , {
            ...requestConfig,
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) {
            showToast('success', data.message);
            setStep(2);
        } else {
            showToast('error', data.message);
        }
    };

    const verifyOtp = async () => {
        const res = await fetch(API_URL.VERIFY_OTP, {
            ...requestConfig,
            body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        if (res.ok) {
            showToast('success', data.message);
            setStep(3);
        } else {
            showToast('error', data.message);
        }
    };

    const resetPassword = async () => {
        if (password !== confirm) return showToast('error', 'Passwords do not match!');

        try {
            const res = await fetch(API_URL.RESET_PASSWORD, {
                ...requestConfig,
                body: JSON.stringify({
                    email,
                    otp,
                    password,
                    password_confirmation: confirm
                })
            });

            const data = await res.json();
            if (res.ok) {
                showToast('success', data.message);
                $('#forgotPasswordModal').modal('hide');
            } else {
                showToast('error', data.message || 'An error occurred.');
            }
        } catch (error) {
            showToast('error', 'Unable to connect to server!');
        }
    };

    return (
        <div className="modal fade" id="forgotPasswordModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content glass-modal">
                    <div className="modal-header">
                        <h5 className="modal-title text-white">Forgot password</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        {step === 1 && (
                            <div>
                                <input type="email" className="form-control mb-3" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                                <button onClick={sendOtp} className="cta-button glass transparent w-100">Send OTP code</button>
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <input type="text" className="form-control mb-3" placeholder="Enter OTP code" value={otp} onChange={e => setOtp(e.target.value)} />
                                <button onClick={verifyOtp} className="cta-button glass transparent w-100">Confirm</button>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <input type="password" className="form-control mb-3" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)} />
                                <input type="password" className="form-control mb-3" placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)} />
                                <button onClick={resetPassword} className="cta-button glass transparent w-100">Completed!</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}