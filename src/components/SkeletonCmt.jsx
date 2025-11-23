export default function SkeletonCmt() {
    return (
        <>
            <div className="comment-glass mb-3 p-3 rounded">
                <div className="d-flex gap-3">
                    <div className="flex-shrink-0">
                        <div className="skeleton skeleton-avatar"></div>
                    </div>

                    <div className="flex-grow-1 w-100">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="skeleton skeleton-text" style={{width: '120px', height: '16px'}}></div>
                            <div className="skeleton skeleton-text" style={{width: '90px', height: '14px'}}></div>
                        </div>

                        <div className="skeleton skeleton-text mb-2" style={{width: '100%', height: '16px'}}></div>
                        <div className="skeleton skeleton-text" style={{width: '85%', height: '16px'}}></div>
                    </div>
                </div>
            </div>
        </>
    );
};