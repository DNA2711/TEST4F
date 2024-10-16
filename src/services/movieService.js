import { isValidDate, isValidRap, validateGenreSelection } from '../utils/validation.jsh';

function xemLichChieuPhim(ngayXem, rapChieu, theLoai) {
    // Kiểm tra xem ngayXem có hợp lệ
    if (!ngayXem || !isValidDate(ngayXem)) {
        throw new Error('Ngày xem không hợp lệ.');
    }

    // Truy xuất ngày xem đã hợp lệ
    const inputDate = new Date(ngayXem);

    // Kiểm tra xem ngayXem không phải là quá khứ
    const today = new Date();
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

    // Xác thực các thể loại đã chọn
    validateGenreSelection(theLoai);

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
        { tenPhim: 'Phim 1', thoiGian: '18:00', dinhDang: '2D', gheTrong: 50, theLoai: ['Hành Động', 'Hài Hước'] },
        { tenPhim: 'Phim 2', thoiGian: '20:00', dinhDang: '3D', gheTrong: 28, theLoai: ['Kinh Dị'] },
        { tenPhim: 'Bố Già', thoiGian: '15:30', dinhDang: '2D', gheTrong: 20, theLoai: ['Tình Cảm', 'Hài Hước'] },
        { tenPhim: 'Mắt Biếc', thoiGian: '17:45', dinhDang: '2D', gheTrong: 35, theLoai: ['Tình Cảm'] },
        { tenPhim: 'Hai Phượng', thoiGian: '19:00', dinhDang: '3D', gheTrong: 10, theLoai: ['Hành Động'] },
        { tenPhim: 'Gái Già Lắm Chiêu', thoiGian: '21:00', dinhDang: '2D', gheTrong: 12, theLoai: ['Hài Hước'] },
        { tenPhim: 'Tiệc Trăng Máu', thoiGian: '16:30', dinhDang: '2D', gheTrong: 25, theLoai: ['Hài Hước', 'Kinh Dị'] },
        { tenPhim: 'Ròm', thoiGian: '14:00', dinhDang: '2D', gheTrong: 40, theLoai: ['Hành Động'] },
        { tenPhim: 'Song Lang', thoiGian: '20:30', dinhDang: '2D', gheTrong: 8, theLoai: ['Tình Cảm'] },
        { tenPhim: 'Em Chưa 18', thoiGian: '22:00', dinhDang: '2D', gheTrong: 15, theLoai: ['Hài Hước', 'Tình Cảm'] },
        { tenPhim: 'Tháng Năm Rực Rỡ', thoiGian: '13:00', dinhDang: '2D', gheTrong: 30, theLoai: ['Tình Cảm'] },
        { tenPhim: 'Chị Mười Ba', thoiGian: '18:30', dinhDang: '3D', gheTrong: 20, theLoai: ['Hành Động'] },
        { tenPhim: 'Để Mai Tính', thoiGian: '19:45', dinhDang: '2D', gheTrong: 18, theLoai: ['Hài Hước'] },
        { tenPhim: 'Cô Gái Đến Từ Hôm Qua', thoiGian: '14:30', dinhDang: '2D', gheTrong: 25, theLoai: ['Tình Cảm'] },
        { tenPhim: 'Người Bất Tử', thoiGian: '21:30', dinhDang: '3D', gheTrong: 9, theLoai: ['Kinh Dị'] },
        { tenPhim: 'Lật Mặt', thoiGian: '20:15', dinhDang: '2D', gheTrong: 13, theLoai: ['Hành Động'] },
        { tenPhim: 'Nắng 3', thoiGian: '17:00', dinhDang: '2D', gheTrong: 22, theLoai: ['Tình Cảm'] },
        { tenPhim: 'Mẹ Chồng', thoiGian: '15:00', dinhDang: '2D', gheTrong: 18, theLoai: ['Tình Cảm'] }
    ];

    // Lọc danh sách phim theo thể loại đã chọn
    return danhSachPhim.filter(phim => {
        return theLoai.some(tl => phim.theLoai.includes(tl));
    });
}

module.exports = { xemLichChieuPhim };
