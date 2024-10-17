function isValidDate(date) {
    // Kiểm tra xem ngày có hợp lệ không
    if (!date) {
        return false;
    }
    // Kiểm tra định dạng ngày tháng (ví dụ: YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return false; // Định dạng ngày không hợp lệ
    }
    // Kiểm tra ngày tháng có hợp lệ không
    const [year, month, day] = date.split('-').map(Number);
    const inputDate = new Date(year, month - 1, day);
    if (
        inputDate.getFullYear() !== year ||
        inputDate.getMonth() !== month - 1 ||
        inputDate.getDate() !== day
    ) {
        return false; // Ngày tháng không hợp lệ
    }
    // Kiểm tra ngày xem có phải là quá khứ không
    const today = new Date();
    if (inputDate < today) {
        return false; // Ngày xem không được là ngày quá khứ
    }
    return true; // Ngày hợp lệ
}

function isValidRap(rapChieu, ngayChieu, danhSachRapHoatDong) {

    // Kiểm tra xem rạp chiếu có hợp lệ không
    if (!rapChieu) {
        return false; // Rạp chiếu không được để trống
    }

    // Kiểm tra xem ngày chiếu có hợp lệ không
    if (!ngayChieu) {
        return false; // Ngày chiếu không được để trống
    }

    // Tìm rạp chiếu trong danh sách các rạp đang hoạt động
    const rapTimThay = danhSachRapHoatDong.find(rap => {
        return rap.ten === rapChieu && rap.hoatDong; // Rạp phải đang hoạt động
    });

    // Kiểm tra xem rạp có được tìm thấy và có suất chiếu trong ngày hay không
    if (!rapTimThay || !rapTimThay.suatChieu.includes(ngayChieu)) {
        return false; // Rạp không hợp lệ hoặc không có suất chiếu trong ngày chọn
    }

    return true; // Rạp chiếu hợp lệ
}

// Danh sách thể loại phim
const danhSachTheLoai = ['Hành Động', 'Hài Hước', 'Kinh Dị', 'Tình Cảm', 'Viễn Tưởng'];

function validateGenreSelection(selectedGenres) {
    if (!Array.isArray(selectedGenres)) {
        throw new Error('Giá trị không hợp lệ: phải là một mảng.');
    }

    for (let genre of selectedGenres) {
        if (typeof genre !== 'string') {
            throw new Error(`Giá trị không hợp lệ: "${genre}" không phải là chuỗi.`);
        }

        const invalidCharsRegex = /[@#]/;
        if (invalidCharsRegex.test(genre)) {
            throw new Error(`Giá trị không hợp lệ: "${genre}" chứa ký tự không hợp lệ.`);
        }

        if (!danhSachTheLoai.includes(genre)) {
            throw new Error(`Thể loại không hợp lệ: "${genre}" không có trong danh sách.`);
        }
    }

    return true;
}

function danhGiaPhim(soSao, binhLuan, idPhim, daXem, daDangNhap) {
    // Kiểm tra người dùng đã đăng nhập
    if (!daDangNhap) {
        throw new Error('Bạn phải đăng nhập để đánh giá phim.');
    }

    // Kiểm tra đã xem phim
    if (!daXem) {
        throw new Error('Bạn chỉ có thể đánh giá phim đã xem.');
    }

    // Kiểm tra ID phim
    if (!idPhim || typeof idPhim !== 'string' || idPhim.trim().length === 0) {
        throw new Error('ID phim không được để trống.');
    }

    // Kiểm tra số sao
    if (typeof soSao !== 'number' || soSao < 1 || soSao > 5) {
        throw new Error('Số sao phải là một số và nằm trong khoảng từ 1 đến 5.');
    }

    // Kiểm tra bình luận
    if (typeof binhLuan !== 'string' || binhLuan.trim().length === 0 || containsInvalidChars(binhLuan)) {
        throw new Error('Nhận xét không hợp lệ.');
    }

    // Kiểm tra độ dài bình luận
    if (binhLuan.length > 500) {
        throw new Error('Nhận xét không được quá dài.');
    }

    // Kiểm tra nội dung nhận xét
    const inappropriateContentRegex = /[tục tĩu|spam|thông tin cá nhân]/i;
    if (inappropriateContentRegex.test(binhLuan)) {
        throw new Error('Nội dung nhận xét không phù hợp.');
    }

    return 'Đánh giá của bạn đã được gửi thành công.';
}


module.exports = { isValidDate, isValidRap, validateGenreSelection, danhGiaPhim };