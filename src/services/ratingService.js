import { containsInvalidChars } from '../utils/validation.js';

function danhGiaPhim(soSao, binhLuan, idPhim, daXem) {
    if (soSao < 1 || soSao > 5) {
        throw new Error('Số sao phải nằm trong khoảng từ 1 đến 5.');
    }
    if (!binhLuan || binhLuan.length === 0 || containsInvalidChars(binhLuan)) {
        throw new Error('Bình luận không hợp lệ.');
    }
    if (!idPhim) {
        throw new Error('ID phim không được để trống.');
    }
    if (!daXem) {
        throw new Error('Bạn chỉ có thể đánh giá phim đã xem.');
    }

    return 'Đánh giá của bạn đã được gửi thành công.';
}

module.exports = { danhGiaPhim };