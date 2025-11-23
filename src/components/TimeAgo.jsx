const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
        năm: 31536000,
        tháng: 2592000,
        tuần: 604800,
        ngày: 86400,
        giờ: 3600,
        phút: 60,
        giây: 1
    };

    for (let key in intervals) {
        const value = intervals[key];
        const count = Math.floor(seconds / value);

        if (count >= 1) {
            if (key === "giây" && count < 10) {
                return "vừa xong";
            }
            return `${count} ${key} trước`;
        }
    }

    return "vừa xong";
};

export default timeAgo