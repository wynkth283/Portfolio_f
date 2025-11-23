const API_BASE = import.meta.env.VITE_API_BASE || 'https://portfolio-huynhhungthinh.jobvlute.com';
const BASE = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
export const API_URL = {
    BASE: API_BASE,
    LOGIN: `${API_BASE}/api/login`,
    LOGOUT: `${API_BASE}/api/logout`,
    REGISTER: `${API_BASE}/api/users/register`,
    USER: `${API_BASE}/api/users`,
    PROJECTS: `${API_BASE}/api/projects`,
    COMMENTS: `${API_BASE}/api/comments`,
    SKILLS: `${API_BASE}/api/title-skills/getAll`,
    FORGOT_PASSWORD: `${API_BASE}/api/forgot-password`,
    VERIFY_OTP: `${API_BASE}/api/verify-otp`,
    RESET_PASSWORD: `${API_BASE}/api/reset-password`,
    CHANGE_PASSWORD: `${API_BASE}/api/users/change-password`,
    AUTH: `${API_BASE}/api/users/auth`,
};
export {BASE};
export default API_URL; 

