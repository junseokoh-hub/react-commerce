import oldBookImage1 from "../images/old-books/old-books1.jpg";
import oldBookImage2 from "../images/old-books/old-books2.jpg";
import oldBookImage3 from "../images/old-books/old-books3.jpg";
import newProductImage1 from "../images/new-products/new-products1.jpg";
import newProductImage2 from "../images/new-products/new-products2.jpg";
import newProductImage3 from "../images/new-products/new-products3.jpg";
import bookConcertImage1 from "../images/book-concert/book-concert1.jpg";
import bookConcertImage2 from "../images/book-concert/book-concert2.jpg";
import bookConcertImage3 from "../images/book-concert/book-concert3.jpg";

export const EVENT_CONTENTS = [
  {
    id: "old-book-provide",
    image: {
      first: oldBookImage1,
      second: oldBookImage2,
      third: oldBookImage3,
    },
    description: {
      title: "헌책 나눔 이벤트",
      content:
        "저희가 가지고 있는 오래된 책들에 한 해서 무료로 나눠드리는 이벤트를 개최하게 되었습니다. 필요한 책이 있으시면 이벤트에 꼭 참여해주시길 바랍니다. ",
      end: {
        date: "2023년 1월 1일 ~ 2023년 1월 31일",
        subjected: "사이트 가입자 아무나",
      },
      hold: "2023-02-10",
    },
  },
  {
    id: "new-products-promotion",
    image: {
      first: newProductImage1,
      second: newProductImage2,
      third: newProductImage3,
    },
    description: {
      title: "신상품 우선 신청 이벤트",
      content:
        "12월 저희의 신상품과 함께 새로운 이벤트를 선사드립니다! 새로운 기기 프로모션과 함께 여러분께서 기존 가격보다 더 낮은 가격으로 선 구매를 하실 수 있는 기회를 잡으실 수 있습니다. 만약 원하는 기기를 선구매 하고 싶으신 분들께서는 꼭 이 이벤트에 신청해서 구매하시길 바랍니다. 여러분께 드리는 저희의 마음이 꼭 전달되기를 바랍니다.",
      end: {
        date: "2022년 12월 24일 ~ 2023년 1월 1일",
        subjected: "사이트 가입자 아무나",
      },
      hold: "2023-01-10",
    },
  },
  {
    id: "book-concert",
    image: {
      first: bookConcertImage1,
      second: bookConcertImage2,
      third: bookConcertImage3,
    },
    description: {
      title: "북 콘서트 개최 행사 이벤트",
      content:
        "다양한 저자들과 다양한 독자들과 함께 책이란 무엇인가, 책에 대하여 논의하고 싶으신 분들께 저희가 권해드립니다! 오프라인 개최로 책을 사랑하시는 분들이 모여 이야기 꽃을 펼치는 장에 모실 수 있는 기회가 바로 여기있습니다! 책에 대한 소통이 이루어지는 이번 이벤트에 많이 참가해주세요!",
      end: {
        date: "2023년 2월 1일 ~ 2023년 2월 15일",
        subjected: "사이트 가입자 아무나",
      },
      hold: "2023-03-5",
    },
  },
];
