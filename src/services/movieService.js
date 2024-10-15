import { isValidDate, isValidRap } from '../utils/validation.jsh';

function xemLichChieuPhim(ngayXem, rapChieu, theLoai) {
    // Kiểm tra xem ngayXem có hợp lệ
    if (!ngayXem || !isValidDate(ngayXem)) {
        throw new Error('Ngày xem không hợp lệ.');
    }

    // Truy xuất ngày xem đã hợp lệ
    const inputDate = new Date(ngayXem);

    // Kiểm tra xem ngayXem không phải là quá khứ
    const today = new Date();
    // Đặt giờ, phút, giây và mili giây về 0 để so sánh chỉ dựa trên ngày
    today.setHours(0, 0, 0, 0);
    if (inputDate < today) {
        throw new Error('Ngày xem không được là ngày quá khứ.');
    }

    // Kiểm tra rapChieu hợp lệ
    if (!rapChieu || !isValidRap(rapChieu)) {
        throw new Error('Rạp chiếu không hợp lệ.');
    }

    // Kiểm tra theLoai hợp lệ
    if (!theLoai || !Array.isArray(theLoai) || theLoai.length === 0) {
        throw new Error('Thể loại phim không hợp lệ.');
    }

    // Truy xuất danh sách phim
    const danhSachPhim = getDanhSachPhim(ngayXem, rapChieu, theLoai);
    if (danhSachPhim.length === 0) {
        throw new Error('Không tìm thấy phim nào.');
    }

    return danhSachPhim;
}


// Hàm giả lập để lấy danh sách phim
function getDanhSachPhim(ngayXem, rapChieu, theLoai) {
    const danhSachPhim = [
        { tenPhim: 'Phim 1', thoiGian: '18:00', dinhDang: '2D', gheTrong: 50 },
        { tenPhim: 'Phim 2', thoiGian: '20:00', dinhDang: '3D', gheTrong: 28 },
        { tenPhim: 'Bố Già', thoiGian: '15:30', dinhDang: '2D', gheTrong: 20 },
        { tenPhim: 'Mắt Biếc', thoiGian: '17:45', dinhDang: '2D', gheTrong: 35 },
        { tenPhim: 'Hai Phượng', thoiGian: '19:00', dinhDang: '3D', gheTrong: 10 },
        { tenPhim: 'Gái Già Lắm Chiêu', thoiGian: '21:00', dinhDang: '2D', gheTrong: 12 },
        { tenPhim: 'Tiệc Trăng Máu', thoiGian: '16:30', dinhDang: '2D', gheTrong: 25 },
        { tenPhim: 'Ròm', thoiGian: '14:00', dinhDang: '2D', gheTrong: 40 },
        { tenPhim: 'Song Lang', thoiGian: '20:30', dinhDang: '2D', gheTrong: 8 },
        { tenPhim: 'Em Chưa 18', thoiGian: '22:00', dinhDang: '2D', gheTrong: 15 },
        { tenPhim: 'Tháng Năm Rực Rỡ', thoiGian: '13:00', dinhDang: '2D', gheTrong: 30 },
        { tenPhim: 'Chị Mười Ba', thoiGian: '18:30', dinhDang: '3D', gheTrong: 20 },
        { tenPhim: 'Để Mai Tính', thoiGian: '19:45', dinhDang: '2D', gheTrong: 18 },
        { tenPhim: 'Cô Gái Đến Từ Hôm Qua', thoiGian: '14:30', dinhDang: '2D', gheTrong: 25 },
        { tenPhim: 'Người Bất Tử', thoiGian: '21:30', dinhDang: '3D', gheTrong: 9 },
        { tenPhim: 'Lật Mặt', thoiGian: '20:15', dinhDang: '2D', gheTrong: 13 },
        { tenPhim: 'Nắng 3', thoiGian: '17:00', dinhDang: '2D', gheTrong: 22 },
        { tenPhim: 'Mẹ Chồng', thoiGian: '15:00', dinhDang: '2D', gheTrong: 18 }
    ];
    return danhSachPhim;
}

module.exports = { xemLichChieuPhim };