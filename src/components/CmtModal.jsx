import { useEffect, useState } from 'react';
import './../assets/css/glassModal.css';
import SkeletonCmt from './SkeletonCmt';
import { isLogin, getUser } from './../utils/Auth';
import { showToast } from './../components/Toast';
import timeAgo from './TimeAgo';
import {API_URL} from './../config/api';

export default function CmtModal() {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [input, setInput] = useState('');
    // chống spam
    const [isSending, setIsSending] = useState(false);

    // Lấy tổng bình luận
    const [totalComments, setTotalComments] = useState(0);

    useEffect(() => {
        fetch(API_URL.COMMENTS)
            .then(r => r.json())
            .then(data => {
                setComments(data.data);
                setTotalComments(data.total);
                setHasMore(data.current_page < data.last_page);
            });
    }, []);

    // Load bình luận
    const loadComments = async (pageNum = 1) => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await fetch(API_URL.COMMENTS + `?page=${pageNum}`);
            const data = await res.json();
            
            if (pageNum === 1) {
                setComments(data.data);          
            } else {
                setComments(prev => [...prev, ...data.data]); 
            }

            setHasMore(data.current_page < data.last_page);
            setPage(data.current_page + 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Gửi bình luận mới
    const sendComment = async () => {
        if (!input.trim() || isSending) return;

        setIsSending(true); //Khóa nút gửi

        try {
            const res = await fetch(API_URL.COMMENTS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ cmt: input })
            });

            if (res.ok) {
                const newCmt = await res.json();
                setComments(prev => [newCmt.comment, ...prev]);
                setInput('');
                showToast('success', 'Đã gửi bình luận!');
            } else {
                const err = await res.json();
                showToast('error', err.message || 'Gửi thất bại');
            }
        } catch (err) {
            showToast('error', 'Lỗi kết nối');
        } finally {
            setIsSending(false); //Mở khóa khi request hoàn tất
        }
    };

    // Load khi modal hiện
    useEffect(() => {
        const modal = document.getElementById('CmtForm');
        const handleShow = () => {
            loadComments();
            setInput('');
        };

        modal?.addEventListener('shown.bs.modal', () => {
            setPage(1);
            setComments([]);
            loadComments(1);
        });
        
        const handleDelete = async function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const $btn = $(this);
            const commentId = $btn.data('id');
            
            if (!commentId) return;
            
            $btn.prop('disabled', true);
            
            if (!confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
                $btn.prop('disabled', false);
                return;
            }
            
            try {
                const res = await fetch(`${API_URL.COMMENTS}/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (res.ok) {
                    await loadComments();
                    showToast('success', 'Đã xóa bình luận!');
                } else {
                    const err = await res.json();
                    showToast('error', err.message || 'Xóa thất bại');
                    $btn.prop('disabled', false);
                }
            } catch (err) {
                showToast('error', 'Lỗi kết nối');
                $btn.prop('disabled', false);
            }
        };
        
        if (modal) {
            $(modal).on('click', '.btn-delete', handleDelete);
        }
        
        return () => {
            modal?.removeEventListener('shown.bs.modal', handleShow);
            if (modal) {
                $(modal).off('click', '.btn-delete', handleDelete);
            }
        };
    }, []);

    const currentUser = isLogin() ? getUser() : null;

    return (
        <div className="modal fade" id="CmtForm" tabIndex="-1" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content glass-modal">

                    <div className="modal-header glass-header">
                        <h5 className="modal-title text-white">
                            Bình luận và góp ý ({totalComments})
                        </h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body glass-body" style={{ maxHeight: '60vh' }}>
                        {loading ? (
                            <>
                                <SkeletonCmt></SkeletonCmt>
                                <SkeletonCmt></SkeletonCmt>
                                <SkeletonCmt></SkeletonCmt>
                                <SkeletonCmt></SkeletonCmt>
                                <SkeletonCmt></SkeletonCmt>
                                <SkeletonCmt></SkeletonCmt>
                                <SkeletonCmt></SkeletonCmt>
                            </>
                        ) : comments.length === 0 ? (
                            <p className="text-center text-white-50">Chưa có bình luận nào.</p>
                        ) : (
                            comments.map(cmt => (
                                <div key={cmt.id} className="comment-glass mb-3 p-3 rounded">
                                    <div className="d-flex gap-3">
                                        <div className="flex-shrink-0">
                                            <div className="avatar-circle bg-primary text-white d-flex align-items-center justify-content-center">
                                                {cmt.user?.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <strong className="text-white">{cmt.user?.name || 'Người dùng đã xóa'}</strong>
                                                <small className="text-white-50">
                                                    
                                                    <span title={new Date(cmt.created_at).toLocaleString('vi-VN')}>{timeAgo(cmt.created_at)}</span>
                                                </small>
                                            </div>
                                            <p className="text-white mb-0 content-comment">{cmt.content}</p>
                                        </div>
                                        {(currentUser?.id === cmt.user_id || currentUser?.role === 'admin') && (
                                            <button 
                                                className="p-0 text-white btn-delete" 
                                                data-id={cmt.id}
                                                type="button"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                        <div className="text-center mt-4 mb-4">
                            {hasMore && (
                                <button 
                                    onClick={() => loadComments(page)} 
                                    disabled={loading}
                                    className="btn btn-outline-light btn-sm"
                                >
                                    {loading ? 'Đang tải...' : 'Xem thêm bình luận'}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="modal-footer glass-footer border-0 p-3">
                        {isLogin() ? (
                            <div className="w-100 d-flex gap-2 align-items-center">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Viết bình luận..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendComment()}
                                />
                                <button
                                    onClick={sendComment}
                                    className="p-0 text-white btn-send"
                                    disabled={!input.trim()}
                                >
                                    <i className="fa-solid fa-paper-plane"></i>
                                </button>
                            </div>
                        ) : (
                            <div className="text-center w-100 text-white">
                                Vui lòng <a href="#" data-bs-toggle="modal" data-bs-target="#AuthForm">đăng nhập</a> để bình luận!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}