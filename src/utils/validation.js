function isValidDate(date) {
    // Kiểm tra xem ngày có hợp lệ không
    if (!date) {
        return false; // Ngày không được để trống
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

function isValidRap(rapChieu) {
    // Kiểm tra xem rạp chiếu có hợp lệ không
    if (!rapChieu) {
        return false; // Rạp chiếu không được để trống
    }

    // Kiểm tra xem rạp chiếu có tồn tại trong danh sách rạp chiếu không
    const danhSachRapChieu = ['CGV Vincom', 'BHD Star Cineplex', 'Lotte Cinema', /* ... thêm các rạp khác */];
    if (!danhSachRapChieu.includes(rapChieu)) {
        return false; // Rạp chiếu không tồn tại
    }

    return true; // Rạp chiếu hợp lệ
}

function containsInvalidChars(text) {
    // Kiểm tra xem bình luận có chứa ký tự đặc biệt không hợp lệ hay không
    const invalidCharsRegex = /[@#]/; // Ví dụ: không cho phép ký tự @ và #
    return invalidCharsRegex.test(text);
}

module.exports = { isValidDate, isValidRap, containsInvalidChars };