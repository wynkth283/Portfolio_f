import { useState, useEffect } from 'react';

function ButtonOnTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!show) return null;

    return (
        <button
            onClick={handleClick}
            className="position-fixed"
            style={{ 
                background: 'none',
                cursor: 'pointer',
                bottom: '20px', 
                right: '20px', 
                borderRadius: '0%', 
                border: 'none',
                width: '50px', 
                height: '50px', 
                zIndex: 1000 
            }}
        >
            <i 
                className="fas fa-chevron-up" 
                style={{
                    fontSize: '28px',
                    color: 'white'
                }}
            ></i>
        </button>
    );
}

export default ButtonOnTop;