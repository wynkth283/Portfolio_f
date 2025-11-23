export const getToken = () => localStorage.getItem('token');
export const getUser  = () => {
    try { return JSON.parse(localStorage.getItem('user')); }
    catch { return null; }
};
export const isLogin  = () => !!getToken();
export const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        console.log('Logout error (có thể token đã hết hạn):', error);
    } finally {
        // Dù backend lỗi hay không → vẫn xóa localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }
};