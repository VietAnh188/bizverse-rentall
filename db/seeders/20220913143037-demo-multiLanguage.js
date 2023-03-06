'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("MultiLanguage", [
      {
        "type": "houseType",
        "typeId": 6,
        "language": "vi",
        "translation": "Căn hộ"
      },
      {
        "type": "houseType",
        "typeId": 8,
        "language": "vi",
        "translation": "Khách sạn nhỏ"
      },
      {
        "type": "bedType",
        "typeId": 16,
        "language": "vi",
        "translation": "Giường đơn"
      },
      {
        "type": "bathrooms",
        "typeId": 21,
        "language": "vi",
        "translation": "Phòng tắm"
      },
      {
        "type": "listSetting",
        "typeId": 1,
        "language": "vi",
        "translation": "Loại phòng"
      },
      {
        "type": "listSetting",
        "typeId": 3,
        "language": "vi",
        "translation": "Loại nhà"
      },
      {
        "type": "listSetting",
        "typeId": 4,
        "language": "vi",
        "translation": "Kích thước tòa nhà"
      },
      {
        "type": "listSetting",
        "typeId": 5,
        "language": "vi",
        "translation": "Phòng ngủ"
      },
      {
        "type": "listSetting",
        "typeId": 6,
        "language": "vi",
        "translation": "Giường"
      },
      {
        "type": "listSetting",
        "typeId": 7,
        "language": "vi",
        "translation": "Loại giường"
      },
      {
        "type": "listSetting",
        "typeId": 8,
        "language": "vi",
        "translation": "Phòng tắm"
      },
      {
        "type": "listSetting",
        "typeId": 9,
        "language": "vi",
        "translation": "Loại phòng tắm"
      },
      {
        "type": "listSetting",
        "typeId": 10,
        "language": "vi",
        "translation": "Tiện nghi thiết yếu"
      },
      {
        "type": "listSetting",
        "typeId": 11,
        "language": "vi",
        "translation": "Tiện nghi an toàn"
      },
      {
        "type": "listSetting",
        "typeId": 12,
        "language": "vi",
        "translation": "Không gian"
      },
      {
        "type": "listSetting",
        "typeId": 13,
        "language": "vi",
        "translation": "Yêu cầu khách"
      },
      {
        "type": "listSetting",
        "typeId": 14,
        "language": "vi",
        "translation": "Nội quy nhà ở"
      },
      {
        "type": "listSetting",
        "typeId": 15,
        "language": "vi",
        "translation": "Xem lại cách khách đặt phòng"
      },
      {
        "type": "listSetting",
        "typeId": 16,
        "language": "vi",
        "translation": "Thời gian thông báo đặt chỗ"
      },
      {
        "type": "listSetting",
        "typeId": 17,
        "language": "vi",
        "translation": "Thông báo về số ngày tối đa"
      },
      {
        "type": "listSetting",
        "typeId": 18,
        "language": "vi",
        "translation": "Đêm tối thiểu"
      },
      {
        "type": "listSetting",
        "typeId": 19,
        "language": "vi",
        "translation": "Đêm tối đa"
      },
      {
        "type": "houseType",
        "typeId": 7,
        "language": "vi",
        "translation": "Giường & Bữa sáng"
      },
      {
        "type": "houseType",
        "typeId": 100,
        "language": "vi",
        "translation": "Ngôi nhà tranh"
      },
      {
        "type": "buildingSize",
        "typeId": 10,
        "language": "vi",
        "translation": "1-5 phòng"
      },
      {
        "type": "buildingSize",
        "typeId": 11,
        "language": "vi",
        "translation": "6-25 phòng"
      },
      {
        "type": "buildingSize",
        "typeId": 102,
        "language": "vi",
        "translation": "25-50 phòng"
      },
      {
        "type": "buildingSize",
        "typeId": 105,
        "language": "vi",
        "translation": "50-100 phòng"
      },
      {
        "type": "buildingSize",
        "typeId": 126,
        "language": "bi",
        "translation": "100+ phòng"
      },
      {
        "type": "bedrooms",
        "typeId": 14,
        "language": "vi",
        "translation": "Phòng ngủ"
      },
      {
        "type": "beds",
        "typeId": 15,
        "language": "vi",
        "translation": "Giường"
      },
      {
        "type": "bedType",
        "typeId": 16,
        "language": "vi",
        "translation": "Đơn"
      },
      {
        "type": "bedType",
        "typeId": 17,
        "language": "vi",
        "translation": "Đôi"
      },
      {
        "type": "bedType",
        "typeId": 18,
        "language": "vi",
        "translation": "Hoàng Hậu"
      },
      {
        "type": "bedType",
        "typeId": 19,
        "language": "vi",
        "translation": "Vua"
      },
      {
        "type": "bedType",
        "typeId": 20,
        "language": "vi",
        "translation": "Giường tầng"
      },
      {
        "type": "bathrooms",
        "typeId": 21,
        "language": "vi",
        "translation": "Phòng tắm"
      },
      {
        "type": "bathroomType",
        "typeId": 22,
        "language": "vi",
        "translation": "Phòng riêng"
      },
      {
        "type": "bathroomType",
        "typeId": 23,
        "language": "vi",
        "translation": "Phòng chung"
      },
      {
        "type": "bathroomType",
        "typeId": 24,
        "language": "vi",
        "translation": "Khác"
      },
      {
        "type": "essentialsAmenities",
        "typeId": 25,
        "language": "vi",
        "translation": "Khăn tắm, ga trải giường, xà phòng và giấy vệ sinh"
      },
      {
        "type": "essentialsAmenities",
        "typeId": 26,
        "language": "vi",
        "translation": "Wifi"
      },
      {
        "type": "essentialsAmenities",
        "typeId": 27,
        "language": "vi",
        "translation": "Dầu gội"
      },
      {
        "type": "essentialsAmenities",
        "typeId": 28,
        "language": "vi",
        "translation": "Tủ / ngăn kéo"
      },
      {
        "type": "essentialsAmenities",
        "typeId": 73,
        "language": "vi",
        "translation": "Máy sấy tóc"
      },
      {
        "type": "essentialsAmenities",
        "typeId": 87,
        "language": "vi",
        "translation": "TV LED"
      },
      {
        "type": "essentialsAmenities",
        "typeId": 97,
        "language": "vi",
        "translation": "TV"
      },
      {
        "type": "essentialsAmenities",
        "typeId": 106,
        "language": "vi",
        "translation": "Mục"
      },
      {
        "type": "essentialsAmenities",
        "typeId": 118,
        "language": "vi",
        "translation": "Bãi đậu xe"
      },
      {
        "type": "essentialsAmenities",
        "typeId": 119,
        "language": "vi",
        "translation": "Bể bơi"
      },
      {
        "type": "safetyAmenities",
        "typeId": 29,
        "language": "vi",
        "translation": "Máy phát hiện khói"
      },
      {
        "type": "safetyAmenities",
        "typeId": 30,
        "language": "vi",
        "translation": "Máy phát hiện khí carbon monoxide"
      },
      {
        "type": "safetyAmenities",
        "typeId": 31,
        "language": "vi",
        "translation": "Bộ sơ cứu"
      },
      {
        "type": "safetyAmenities",
        "typeId": 32,
        "language": "vi",
        "translation": "Thẻ an toàn"
      },
      {
        "type": "spaces",
        "typeId": 33,
        "language": "vi",
        "translation": "Phòng bếp"
      },
      {
        "type": "spaces",
        "typeId": 34,
        "language": "vi",
        "translation": "Giặt là - máy giặt"
      },
      {
        "type": "spaces",
        "typeId": 36,
        "language": "vi",
        "translation": "Bãi đậu xe"
      },
      {
        "type": "guestRequirements",
        "typeId": 45,
        "language": "vi",
        "translation": "Thông tin thanh toán"
      },
      {
        "type": "guestRequirements",
        "typeId": 46,
        "language": "vi",
        "translation": "Đồng ý với Nội quy nhà của bạn"
      },
      {
        "type": "guestRequirements",
        "typeId": 47,
        "language": "vi",
        "translation": "Cho bạn biết mục đích chuyến đi của họ"
      },
      {
        "type": "guestRequirements",
        "typeId": 127,
        "language": "vi",
        "translation": "Email đã xác nhận"
      },
      {
        "type": "houseRules",
        "typeId": 48,
        "language": "vi",
        "translation": "Thích hợp cho trẻ em (2-14 tuổi)"
      },
      {
        "type": "houseRules",
        "typeId": 49,
        "language": "vi",
        "translation": "Thích hợp cho trẻ sơ sinh (Dưới 2 tuổi)"
      },
      {
        "type": "houseRules",
        "typeId": 50,
        "language": "vi",
        "translation": "Thích hợp cho thú cưng"
      },
      {
        "type": "houseRules",
        "typeId": 51,
        "language": "vi",
        "translation": "Không được phép hút thuốc"
      },
      {
        "type": "houseRules",
        "typeId": 52,
        "language": "vi",
        "translation": "Sự kiện hoặc bữa tiệc được phép"
      },
      {
        "type": "houseRules",
        "typeId": 103,
        "language": "vi",
        "translation": "Âm nhạc lớn không được phép"
      },
      {
        "type": "houseRules",
        "typeId": 125,
        "language": "vi",
        "translation": "Người ồn ào không được phép"
      },
      {
        "type": "reviewGuestBook",
        "typeId": 53,
        "language": "vi",
        "translation": "Đáp ứng các yêu cầu của khách RentAll"
      },
      {
        "type": "reviewGuestBook",
        "typeId": 54,
        "language": "vi",
        "translation": "Đồng ý với nội quy của bạn"
      },
      {
        "type": "reviewGuestBook",
        "typeId": 55,
        "language": "vi",
        "translation": "Cho bạn biết mục đích chuyến đi của họ"
      },
      {
        "type": "reviewGuestBook",
        "typeId": 56,
        "language": "vi",
        "translation": "Cho bạn biết có bao nhiêu người sẽ đến trong chuyến đi"
      },
      {
        "type": "bookingNoticeTime",
        "typeId": 58,
        "language": "vi",
        "translation": "1 ngày"
      },
      {
        "type": "bookingNoticeTime",
        "typeId": 59,
        "language": "vi",
        "translation": "2 ngày"
      },
      {
        "type": "bookingNoticeTime",
        "typeId": 60,
        "language": "vi",
        "translation": "3 ngày"
      },
      {
        "type": "bookingNoticeTime",
        "typeId": 61,
        "language": "vi",
        "translation": "7 ngày"
      },
      {
        "type": "bookingNoticeTime",
        "typeId": 128,
        "language": "vi",
        "translation": "Trong cùng một ngày"
      },
      {
        "type": "maxDaysNotice",
        "typeId": 62,
        "language": "vi",
        "translation": "Ngày không có sẵn theo mặc định"
      },
      {
        "type": "maxDaysNotice",
        "typeId": 63,
        "language": "vi",
        "translation": "Bất kỳ lúc nào"
      },
      {
        "type": "maxDaysNotice",
        "typeId": 64,
        "language": "vi",
        "translation": "3 tháng"
      },
      {
        "type": "maxDaysNotice",
        "typeId": 65,
        "language": "vi",
        "translation": "6 tháng"
      },
      {
        "type": "maxDaysNotice",
        "typeId": 66,
        "language": "vi",
        "translation": "1 năm"
      },
      {
        "type": "minNight",
        "typeId": 67,
        "language": "vi",
        "translation": "Đêm tối thiểu"
      },
      {
        "type": "maxNight",
        "typeId": 68,
        "language": "vi",
        "translation": "Đêm tối đa"
      },
      {
        "type": "roomType",
        "typeId": 74,
        "language": "vi",
        "translation": "Phòng khách"
      },
      {
        "type": "roomType",
        "typeId": 76,
        "language": "vi",
        "translation": "Phòng riêng"
      },
      {
        "type": "roomType",
        "typeId": 77,
        "language": "vi",
        "translation": "Toàn bộ địa điểm"
      },
      {
        "type": "roomType",
        "typeId": 110,
        "language": "vi",
        "translation": "Đoạn giới thiệu về phong cảnh"
      },
      {
        "type": "roomType",
        "typeId": 112,
        "language": "vi",
        "translation": "Lều"
      },
      {
        "type": "roomType",
        "typeId": 113,
        "language": "vi",
        "translation": "Phòng chung"
      },
      {
        "type": "personCapacity",
        "typeId": 39,
        "language": "vi",
        "translation": "Khách"
      },
      {
        "type": "listSetting",
        "typeId": 2,
        "language": "vi",
        "translation": "Năng lực người"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
