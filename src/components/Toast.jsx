// Toast.jsx
export function showToast(type = 'info', message = 'Thông báo!', duration = 3500) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
  
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✓', error: '✕', warning: '!', info: 'i' };
    
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || 'i'}</div>
      <div class="toast-message">${message}</div>
      <div class="toast-close">&times;</div>
    `;
  
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.onclick = () => closeToast(toast);
  
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
  
    const timer = setTimeout(() => closeToast(toast), duration);
    toast.onclick = (e) => {
      if (e.target === toast || e.target === toast.querySelector('.toast-message')) {
        clearTimeout(timer);
        closeToast(toast);
      }
    };
  }
  
  function closeToast(toast) {
    toast.style.transition = 'all .4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(50%) scale(0.9)';
    setTimeout(() => toast.remove(), 400);
  }
  
  // Gắn vào window để dùng toàn cục
  window.showToast = showToast;
  window.closeToast = closeToast;