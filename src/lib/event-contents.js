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
      title: "hello",
      content: "this is hello",
      end: "goodbye",
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
      title: "hello",
      content: "this is hello",
      end: "goodbye",
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
      title: "hello",
      content: "this is hello",
      end: "goodbye",
    },
  },
];
