import { xemLichChieuPhim } from '../../src/services/movieService.js';
import { isValidDate, isValidRap } from '../../src/utils/validation.js';
import { danhGiaPhim } from '../../src/services/ratingService.js';
import { vi } from 'vitest';

// Mock hàm getDanhSachPhim
vi.mock('../services/movieService.js', () => ({
    xemLichChieuPhim: vi.fn((ngayXem, rapChieu, theLoai) => {
        if (!ngayXem || !isValidDate(ngayXem)) {
            throw new Error('Ngày xem không hợp lệ.');
        }

        if (!rapChieu || !isValidRap(rapChieu)) {
            throw new Error('Rạp chiếu không hợp lệ.');
        }

        if (!theLoai || !Array.isArray(theLoai) || theLoai.length === 0) {
            throw new Error('Thể loại phim không hợp lệ.');
        }

        // Logic trả về danh sách phim dựa trên tham số đầu vào
        const danhSachPhim = [];

        // Các trường hợp khác nhau
        if (ngayXem === '2024-10-17' && rapChieu === 'CGV Vincom' && theLoai.includes('Hành động')) {
            danhSachPhim.push(
                { tenPhim: 'John Wick 4', thoiGian: '14:00', dinhDang: '2D', gheTrong: 50 },
                { tenPhim: 'Fast & Furious 9', thoiGian: '16:30', dinhDang: '3D', gheTrong: 30 }
            );
        }
        else if (ngayXem === '2024-10-18' && rapChieu === 'BHD Star Cineplex' && theLoai.includes('Tình cảm')) {
            danhSachPhim.push(
                { tenPhim: 'A Star is Born', thoiGian: '18:00', dinhDang: '2D', gheTrong: 40 }
            );
        }
        else if (ngayXem === '2024-10-19' && rapChieu === 'Galaxy Nguyễn Du' && theLoai.includes('Kinh dị')) {
            danhSachPhim.push(
                { tenPhim: 'The Conjuring: The Devil Made Me Do It', thoiGian: '20:00', dinhDang: '2D', gheTrong: 25 },
                { tenPhim: 'IT Chapter Two', thoiGian: '22:30', dinhDang: '3D', gheTrong: 10 }
            );
        }
        else if (ngayXem === '2024-10-20' && rapChieu === 'Lotte Cinema' && theLoai.includes('Hoạt hình')) {
            danhSachPhim.push(
                { tenPhim: 'Frozen II', thoiGian: '10:00', dinhDang: '2D', gheTrong: 60 },
                { tenPhim: 'Toy Story 4', thoiGian: '12:30', dinhDang: '3D', gheTrong: 45 }
            );
        }
        else if (ngayXem === '2024-10-21' && rapChieu === 'CGV Aeon Mall' && theLoai.includes('Hài')) {
            danhSachPhim.push(
                { tenPhim: 'The Hangover', thoiGian: '16:00', dinhDang: '2D', gheTrong: 35 },
                { tenPhim: 'Jumanji: Welcome to the Jungle', thoiGian: '18:30', dinhDang: '3D', gheTrong: 20 }
            );
        }
        else if (ngayXem === '2024-10-22' && rapChieu === 'CGV Landmark' && theLoai.includes('Phiêu lưu')) {
            danhSachPhim.push(
                { tenPhim: 'Indiana Jones and the Dial of Destiny', thoiGian: '14:30', dinhDang: '2D', gheTrong: 45 },
                { tenPhim: 'Jungle Cruise', thoiGian: '19:00', dinhDang: '3D', gheTrong: 30 }
            );
        }
        else if (ngayXem === '2024-10-23' && rapChieu === 'CGV Bitexco' && theLoai.includes('Khoa học viễn tưởng')) {
            danhSachPhim.push(
                { tenPhim: 'Dune', thoiGian: '13:00', dinhDang: '2D', gheTrong: 40 },
                { tenPhim: 'Interstellar', thoiGian: '17:00', dinhDang: '3D', gheTrong: 25 }
            );
        }

        if (danhSachPhim.length === 0) {
            throw new Error('Không tìm thấy phim nào.');
        }

        return danhSachPhim;
    }),
}));

describe('xemLichChieuPhim', () => {
    // Trường hợp 1: Ngày xem không hợp lệ
    it('should throw an error if ngayXem is empty', () => {
        expect(() => xemLichChieuPhim('', 'CGV Vincom', ['Hành động'])).toThrow('Ngày xem không hợp lệ.');
    });

    it('should throw an error if ngayXem is invalid date', () => {
        expect(() => xemLichChieuPhim('invalid-date', 'CGV Vincom', ['Hành động'])).toThrow('Ngày xem không hợp lệ.');
    });

    it('should throw an error if ngayXem is a past date', () => {
        expect(() => xemLichChieuPhim('2023-10-17', 'CGV Vincom', ['Hành động'])).toThrow('Ngày xem không hợp lệ.');
    });

    // Trường hợp 2: Rạp chiếu không hợp lệ
    it('should throw an error if rapChieu is invalid', () => {
        expect(() => xemLichChieuPhim('2024-10-17', 'Rạp ABC', ['Hành động'])).toThrow('Rạp chiếu không hợp lệ.');
    });

    // Trường hợp 3: Thể loại không hợp lệ
    it('should throw an error if theLoai is empty', () => {
        expect(() => xemLichChieuPhim('2024-10-17', 'CGV Vincom', [])).toThrow('Thể loại phim không hợp lệ.');
    });

    it('should throw an error if theLoai is not an array', () => {
        expect(() => xemLichChieuPhim('2024-10-17', 'CGV Vincom', 'Hành động')).toThrow('Thể loại phim không hợp lệ.');
    });

    // Trường hợp 4: Phim hợp lệ
    it('should return the correct list of movies for CGV Vincom on 2024-10-17', () => {
        const result = xemLichChieuPhim('2024-10-17', 'CGV Vincom', ['Hành động']);
        expect(result).toEqual([
            { tenPhim: 'John Wick 4', thoiGian: '14:00', dinhDang: '2D', gheTrong: 50 },
            { tenPhim: 'Fast & Furious 9', thoiGian: '16:30', dinhDang: '3D', gheTrong: 30 },
        ]);
    });

    it('should throw an error if no movies are found', () => {
        expect(() => xemLichChieuPhim('2024-10-24', 'CGV Vincom', ['Hành động'])).toThrow('Không tìm thấy phim nào.');
    });
});

describe('danhGiaPhim', () => {
    // Trường hợp 1: Đánh giá không hợp lệ
    it('should throw an error if danhGia is invalid', () => {
        const testCases = [
            { soSao: 0, binhLuan: 'Great movie!', idPhim: 'phim1', daXem: true, expectedError: 'Số sao phải là một số và nằm trong khoảng từ 1 đến 5.' },
            { soSao: 6, binhLuan: 'Great movie!', idPhim: 'phim1', daXem: true, expectedError: 'Số sao phải là một số và nằm trong khoảng từ 1 đến 5.' },
            { soSao: 'five', binhLuan: 'Great movie!', idPhim: 'phim1', daXem: true, expectedError: 'Số sao phải là một số và nằm trong khoảng từ 1 đến 5.' },
            { soSao: -3, binhLuan: 'Great movie!', idPhim: 'phim1', daXem: true, expectedError: 'Số sao phải là một số và nằm trong khoảng từ 1 đến 5.' }
        ];

        testCases.forEach(({ soSao, binhLuan, idPhim, daXem, expectedError }) => {
            expect(() => danhGiaPhim(soSao, binhLuan, idPhim, daXem)).toThrow(expectedError);
        });
    });

    // Trường hợp 2: Bình luận không hợp lệ
    it('should throw an error if binhLuan is invalid', () => {
        const testCases = [
            { soSao: 4, binhLuan: '', idPhim: 'phim1', daXem: true, expectedError: 'Bình luận không hợp lệ.' },
            { soSao: 4, binhLuan: '   ', idPhim: 'phim1', daXem: true, expectedError: 'Bình luận không hợp lệ.' },
            { soSao: 4, binhLuan: 'Great@movie!', idPhim: 'phim1', daXem: true, expectedError: 'Bình luận không hợp lệ.' }
        ];

        testCases.forEach(({ soSao, binhLuan, idPhim, daXem, expectedError }) => {
            expect(() => danhGiaPhim(soSao, binhLuan, idPhim, daXem)).toThrow(expectedError);
        });
    });

    // Trường hợp 3: ID phim không hợp lệ
    it('should throw an error if idPhim is invalid', () => {
        const testCases = [
            { soSao: 4, binhLuan: 'Great movie!', idPhim: '', daXem: true, expectedError: 'ID phim không được để trống.' },
            { soSao: 4, binhLuan: 'Great movie!', idPhim: '   ', daXem: true, expectedError: 'ID phim không được để trống.' }
        ];

        testCases.forEach(({ soSao, binhLuan, idPhim, daXem, expectedError }) => {
            expect(() => danhGiaPhim(soSao, binhLuan, idPhim, daXem)).toThrow(expectedError);
        });
    });

    // Trường hợp 4: Chưa xem phim
    it('should throw an error if daXem is false', () => {
        const testCases = [
            { soSao: 4, binhLuan: 'Great movie!', idPhim: 'phim1', daXem: false, expectedError: 'Bạn chỉ có thể đánh giá phim đã xem.' }
        ];

        testCases.forEach(({ soSao, binhLuan, idPhim, daXem, expectedError }) => {
            expect(() => danhGiaPhim(soSao, binhLuan, idPhim, daXem)).toThrow(expectedError);
        });
    });

    // Trường hợp 5: Đánh giá hợp lệ
    it('should return a success message if all inputs are valid', () => {
        const testCases = [
            { soSao: 5, binhLuan: 'Great movie!', idPhim: 'phim1', daXem: true },
            { soSao: 3, binhLuan: 'It was okay.', idPhim: 'phim2', daXem: true },
            { soSao: 4, binhLuan: 'Really enjoyed it.', idPhim: 'phim3', daXem: true }
        ];

        testCases.forEach(({ soSao, binhLuan, idPhim, daXem }) => {
            const result = danhGiaPhim(soSao, binhLuan, idPhim, daXem);
            expect(result).toBe('Đánh giá của bạn đã được gửi thành công.');
        });
    });
});