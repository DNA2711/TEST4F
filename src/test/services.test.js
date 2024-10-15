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

        // Case 1: CGV Vincom, Hành động
        if (ngayXem === '2024-10-17' && rapChieu === 'CGV Vincom' && theLoai.includes('Hành động')) {
            danhSachPhim.push(
                { tenPhim: 'John Wick 4', thoiGian: '14:00', dinhDang: '2D', gheTrong: 50 },
                { tenPhim: 'Fast & Furious 9', thoiGian: '16:30', dinhDang: '3D', gheTrong: 30 }
            );
        }
        // Case 2: BHD Star Cineplex, Tình cảm
        else if (ngayXem === '2024-10-18' && rapChieu === 'BHD Star Cineplex' && theLoai.includes('Tình cảm')) {
            danhSachPhim.push(
                { tenPhim: 'A Star is Born', thoiGian: '18:00', dinhDang: '2D', gheTrong: 40 }
            );
        }
        // Case 3: Galaxy Nguyễn Du, Kinh dị
        else if (ngayXem === '2024-10-19' && rapChieu === 'Galaxy Nguyễn Du' && theLoai.includes('Kinh dị')) {
            danhSachPhim.push(
                { tenPhim: 'The Conjuring: The Devil Made Me Do It', thoiGian: '20:00', dinhDang: '2D', gheTrong: 25 },
                { tenPhim: 'IT Chapter Two', thoiGian: '22:30', dinhDang: '3D', gheTrong: 10 }
            );
        }
        // Case 4: Lotte Cinema, Hoạt hình
        else if (ngayXem === '2024-10-20' && rapChieu === 'Lotte Cinema' && theLoai.includes('Hoạt hình')) {
            danhSachPhim.push(
                { tenPhim: 'Frozen II', thoiGian: '10:00', dinhDang: '2D', gheTrong: 60 },
                { tenPhim: 'Toy Story 4', thoiGian: '12:30', dinhDang: '3D', gheTrong: 45 }
            );
        }
        // Case 5: CGV Aeon Mall, Hài
        else if (ngayXem === '2024-10-21' && rapChieu === 'CGV Aeon Mall' && theLoai.includes('Hài')) {
            danhSachPhim.push(
                { tenPhim: 'The Hangover', thoiGian: '16:00', dinhDang: '2D', gheTrong: 35 },
                { tenPhim: 'Jumanji: Welcome to the Jungle', thoiGian: '18:30', dinhDang: '3D', gheTrong: 20 }
            );
        }
        // Case 6: CGV Landmark, Phiêu lưu
        else if (ngayXem === '2024-10-22' && rapChieu === 'CGV Landmark' && theLoai.includes('Phiêu lưu')) {
            danhSachPhim.push(
                { tenPhim: 'Indiana Jones and the Dial of Destiny', thoiGian: '14:30', dinhDang: '2D', gheTrong: 45 },
                { tenPhim: 'Jungle Cruise', thoiGian: '19:00', dinhDang: '3D', gheTrong: 30 }
            );
        }
        // Case 7: CGV Bitexco, Khoa học viễn tưởng
        else if (ngayXem === '2024-10-23' && rapChieu === 'CGV Bitexco' && theLoai.includes('Khoa học viễn tưởng')) {
            danhSachPhim.push(
                { tenPhim: 'Dune', thoiGian: '13:00', dinhDang: '2D', gheTrong: 40 },
                { tenPhim: 'Interstellar', thoiGian: '17:00', dinhDang: '3D', gheTrong: 25 }
            );
        }

        // Nếu không có phim nào
        if (danhSachPhim.length === 0) {
            throw new Error('Không tìm thấy phim nào.');
        }

        return danhSachPhim;
    }),
}));

describe('xemLichChieuPhim', () => {
    // Trường hợp 1: Ngày xem không hợp lệ
    describe('Ngày xem không hợp lệ', () => {
        it('should throw an error if ngayXem is in the past', () => {
            const testCases = [
                { ngayXem: '2023-10-01', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedError: 'Ngày xem không hợp lệ.' }, // past date
                { ngayXem: '2023-10-01', rapChieu: 'BHD Star Cineplex', theLoai: ['Tình cảm'], expectedError: 'Ngày xem không hợp lệ.' }, // past date
                { ngayXem: '2024-10-17', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedError: null }, // future date
                { ngayXem: '2024-10-18', rapChieu: 'BHD Star Cineplex', theLoai: ['Tình cảm'], expectedError: null }, // future date
            ];

            testCases.forEach(({ ngayXem, rapChieu, theLoai, expectedError }, index) => {
                if (expectedError) {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).toThrow(expectedError);
                } else {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).not.toThrow();
                }
            });
        });

        it('should throw an error if ngayXem is invalid', () => {
            const testCases = [
                { ngayXem: '', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedError: 'Ngày xem không hợp lệ.' },
                { ngayXem: 'invalid-date', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedError: 'Ngày xem không hợp lệ.' },
                { ngayXem: '2024-10-24', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedError: null }, // valid future date
                { ngayXem: '2024-10-17', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedError: null }, // valid future date
            ];

            testCases.forEach(({ ngayXem, rapChieu, theLoai, expectedError }) => {
                if (expectedError) {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).toThrow(expectedError);
                } else {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).not.toThrow();
                }
            });
        });
    });

    // Trường hợp 2: Rạp chiếu không hợp lệ
    describe('Rạp chiếu không hợp lệ', () => {
        it('should throw an error if rapChieu is invalid', () => {
            const testCases = [
                { ngayXem: '2024-10-17', rapChieu: 'Rạp ABC', theLoai: ['Hành động'], expectedError: 'Rạp chiếu không hợp lệ.' },
                { ngayXem: '2024-10-17', rapChieu: '', theLoai: ['Hành động'], expectedError: 'Rạp chiếu không hợp lệ.' },
                { ngayXem: '2024-10-17', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedError: null }, // valid
                { ngayXem: '2024-10-18', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedError: null }, // valid
            ];

            testCases.forEach(({ ngayXem, rapChieu, theLoai, expectedError }) => {
                if (expectedError) {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).toThrow(expectedError);
                } else {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).not.toThrow();
                }
            });
        });
    });

    // Trường hợp 3: Thể loại phim không hợp lệ
    describe('Thể loại phim không hợp lệ', () => {
        it('should throw an error if theLoai is invalid', () => {
            const testCases = [
                { ngayXem: '2024-10-17', rapChieu: 'CGV Vincom', theLoai: [], expectedError: 'Thể loại phim không hợp lệ.' },
                { ngayXem: '2024-10-17', rapChieu: 'CGV Vincom', theLoai: '', expectedError: 'Thể loại phim không hợp lệ.' },
                { ngayXem: '2024-10-17', rapChieu: 'CGV Vincom', theLoai: ['Hài'], expectedError: null }, // valid
                { ngayXem: '2024-10-18', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedError: null }, // valid
            ];

            testCases.forEach(({ ngayXem, rapChieu, theLoai, expectedError }) => {
                if (expectedError) {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).toThrow(expectedError);
                } else {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).not.toThrow();
                }
            });
        });
    });

    // Trường hợp 4: Không tìm thấy phim nào
    describe('Không tìm thấy phim nào', () => {
        it('should throw an error if no movies found', () => {
            const testCases = [
                { ngayXem: '2024-10-19', rapChieu: 'BHD Star Cineplex', theLoai: ['Kinh dị'], expectedError: 'Không tìm thấy phim nào.' }, // No movies found
                { ngayXem: '2024-10-19', rapChieu: 'CGV Vincom', theLoai: ['Hoạt hình'], expectedError: 'Không tìm thấy phim nào.' }, // No movies found
                { ngayXem: '2024-10-17', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedError: null }, // Valid case with movies found
                { ngayXem: '2024-10-18', rapChieu: 'BHD Star Cineplex', theLoai: ['Tình cảm'], expectedError: null }, // Valid case with movies found
            ];

            testCases.forEach(({ ngayXem, rapChieu, theLoai, expectedError }) => {
                if (expectedError) {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).toThrow(expectedError);
                } else {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).not.toThrow();
                }
            });
        });
    });

    // Trường hợp 5: Tìm phim cho thể loại hợp lệ
    describe('Tìm phim cho thể loại hợp lệ', () => {
        it('should return a list of movies for valid inputs (Hành động)', () => {
            const testCases = [
                {
                    ngayXem: '2024-10-17', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedMovies: [
                        { tenPhim: 'John Wick 4', thoiGian: '14:00', dinhDang: '2D', gheTrong: 50 },
                        { tenPhim: 'Fast & Furious 9', thoiGian: '16:30', dinhDang: '3D', gheTrong: 30 }
                    ]
                },
                { ngayXem: '2024-10-18', rapChieu: 'BHD Star Cineplex', theLoai: ['Hành động'], expectedMovies: null }, // No movies found
                {
                    ngayXem: '2024-10-17', rapChieu: 'CGV Vincom', theLoai: ['Hành động', 'Tình cảm'], expectedMovies: [
                        { tenPhim: 'John Wick 4', thoiGian: '14:00', dinhDang: '2D', gheTrong: 50 },
                        { tenPhim: 'Fast & Furious 9', thoiGian: '16:30', dinhDang: '3D', gheTrong: 30 }
                    ]
                },
                { ngayXem: '2024-10-19', rapChieu: 'CGV Vincom', theLoai: ['Hành động'], expectedMovies: null }, // No movies found
            ];

            testCases.forEach(({ ngayXem, rapChieu, theLoai, expectedMovies }) => {
                if (expectedMovies) {
                    const result = xemLichChieuPhim(ngayXem, rapChieu, theLoai);
                    expect(result).toEqual(expectedMovies);
                } else {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).toThrow('Không tìm thấy phim nào.');
                }
            });
        });

        it('should return a list of movies for valid inputs (Tình cảm)', () => {
            const testCases = [
                {
                    ngayXem: '2024-10-18', rapChieu: 'BHD Star Cineplex', theLoai: ['Tình cảm'], expectedMovies: [
                        { tenPhim: 'A Star is Born', thoiGian: '18:00', dinhDang: '2D', gheTrong: 40 }
                    ]
                },
                { ngayXem: '2024-10-18', rapChieu: 'BHD Star Cineplex', theLoai: ['Kinh dị'], expectedMovies: null }, // No movies found
                {
                    ngayXem: '2024-10-18', rapChieu: 'BHD Star Cineplex', theLoai: ['Tình cảm', 'Hành động'], expectedMovies: [
                        { tenPhim: 'A Star is Born', thoiGian: '18:00', dinhDang: '2D', gheTrong: 40 }
                    ]
                },
                { ngayXem: '2024-10-19', rapChieu: 'BHD Star Cineplex', theLoai: ['Tình cảm'], expectedMovies: null }, // No movies found
            ];

            testCases.forEach(({ ngayXem, rapChieu, theLoai, expectedMovies }) => {
                if (expectedMovies) {
                    const result = xemLichChieuPhim(ngayXem, rapChieu, theLoai);
                    expect(result).toEqual(expectedMovies);
                } else {
                    expect(() => xemLichChieuPhim(ngayXem, rapChieu, theLoai)).toThrow('Không tìm thấy phim nào.');
                }
            });
        });
    });
});

describe('danhGiaPhim', () => {
    describe('Invalid Inputs', () => {
        it('should throw an error if phimId is invalid', () => {
            const testCases = [
                { phimId: '', diemDanhGia: 5, expectedError: 'ID phim không hợp lệ.' }, // empty string
                { phimId: null, diemDanhGia: 5, expectedError: 'ID phim không hợp lệ.' }, // null
                { phimId: 12345, diemDanhGia: 5, expectedError: 'ID phim không hợp lệ.' }, // numeric ID
                { phimId: undefined, diemDanhGia: 5, expectedError: 'ID phim không hợp lệ.' }, // undefined
            ];

            testCases.forEach(({ phimId, diemDanhGia, expectedError }) => {
                expect(() => danhGiaPhim(phimId, diemDanhGia)).toThrow(expectedError);
            });
        });

        it('should throw an error if diemDanhGia is invalid', () => {
            const testCases = [
                { phimId: '123', diemDanhGia: '', expectedError: 'Điểm đánh giá không hợp lệ.' }, // empty string
                { phimId: '123', diemDanhGia: null, expectedError: 'Điểm đánh giá không hợp lệ.' }, // null
                { phimId: '123', diemDanhGia: 0, expectedError: 'Điểm đánh giá không hợp lệ.' }, // 0
                { phimId: '123', diemDanhGia: 11, expectedError: 'Điểm đánh giá không hợp lệ.' }, // > 10
                { phimId: '123', diemDanhGia: '9', expectedError: 'Điểm đánh giá không hợp lệ.' }, // string representation of a number
            ];

            testCases.forEach(({ phimId, diemDanhGia, expectedError }) => {
                expect(() => danhGiaPhim(phimId, diemDanhGia)).toThrow(expectedError);
            });
        });
    });

    describe('Valid Inputs', () => {
        it('should return the correct rating for valid inputs', () => {
            const testCases = [
                { phimId: '123', diemDanhGia: 5, expected: { phimId: '123', diemDanhGia: 5 } },
                { phimId: '456', diemDanhGia: 8, expected: { phimId: '456', diemDanhGia: 8 } },
                { phimId: '789', diemDanhGia: 10, expected: { phimId: '789', diemDanhGia: 10 } },
                { phimId: '999', diemDanhGia: 7, expected: { phimId: '999', diemDanhGia: 7 } },
            ];

            testCases.forEach(({ phimId, diemDanhGia, expected }) => {
                const result = danhGiaPhim(phimId, diemDanhGia);
                expect(result).toEqual(expected);
            });
        });
    });
});
