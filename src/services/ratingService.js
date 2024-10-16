import { containsInvalidChars } from '../utils/validation.js';

const danhSachTheLoai = ['Hành Động', 'Hài Hước', 'Kinh Dị', 'Tình Cảm', 'Viễn Tưởng'];

function validateGenreSelection(selectedGenres) {
    // Kiểm tra kiểu dữ liệu
    if (!Array.isArray(selectedGenres)) {
        throw new Error('Giá trị không hợp lệ: phải là một mảng.');
    }

    // Kiểm tra xem các thể loại có hợp lệ hay không
    for (let genre of selectedGenres) {
        // Kiểm tra kiểu dữ liệu chuỗi
        if (typeof genre !== 'string') {
            throw new Error(`Giá trị không hợp lệ: "${genre}" không phải là chuỗi.`);
        }

        // Kiểm tra ký tự không hợp lệ
        const invalidCharsRegex = /[@#]/; // Ví dụ: không cho phép ký tự @ và #
        if (invalidCharsRegex.test(genre)) {
            throw new Error(`Giá trị không hợp lệ: "${genre}" chứa ký tự không hợp lệ.`);
        }

        // Kiểm tra xem thể loại có trong danh sách hay không
        if (!danhSachTheLoai.includes(genre)) {
            throw new Error(`Thể loại không hợp lệ: "${genre}" không có trong danh sách.`);
        }
    }

    return true; // Nếu tất cả kiểm tra đều hợp lệ
}

function danhGiaPhim(soSao, binhLuan, idPhim, daXem) {
    // Kiểm tra số sao
    if (typeof soSao !== 'number' || soSao < 1 || soSao > 5) {
        throw new Error('Số sao phải là một số và nằm trong khoảng từ 1 đến 5.');
    }

    // Kiểm tra bình luận
    if (typeof binhLuan !== 'string' || binhLuan.trim().length === 0 || containsInvalidChars(binhLuan)) {
        throw new Error('Bình luận không hợp lệ.');
    }

    // Kiểm tra ID phim
    if (!idPhim || typeof idPhim !== 'string' || idPhim.trim().length === 0) {
        throw new Error('ID phim không được để trống.');
    }

    // Kiểm tra đã xem phim
    if (!daXem) {
        throw new Error('Bạn chỉ có thể đánh giá phim đã xem.');
    }

    return 'Đánh giá của bạn đã được gửi thành công.';
}

module.exports = { danhGiaPhim, validateGenreSelection };
