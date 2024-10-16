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

function containsInvalidChars(text) {
    // Kiểm tra xem bình luận có chứa ký tự đặc biệt không hợp lệ hay không
    const invalidCharsRegex = /[@#]/; // Ví dụ: không cho phép ký tự @ và #
    return invalidCharsRegex.test(text);
}

module.exports = { isValidDate, isValidRap, containsInvalidChars, validateGenreSelection };