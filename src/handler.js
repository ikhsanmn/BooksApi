const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished;
  if (readPage === pageCount) {
    finished = true;
  } else {
    finished = false;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  // const isSuccess = books.filter((book) => book.id === id).length > 0;

  // books.push(finished);
  // const nameBook = books.filter((book) => book.name === name).length > 0;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

const getAllBooksHandler = (request, h) => {
  // const { pageCount } = request.params;
  const filterNameAndPage = books.filter(
    (book) => (book.name),
  );
  const filterPage = filterNameAndPage.filter((book) => (book.readPage <= book.pageCount));

  const filteredBooks = filterPage.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const isReading = request.query.reading;
  const isFinished = request.query.finished;
  if (isReading === '1') {
    const filterReading = filterNameAndPage.filter((book) => (book.reading === true));
    const filteredBooksReading = filterReading.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooksReading,
        // filterNameAndPage,
      },
      // data: books,
    });
    response.code(200);
    return response;
  }
  if (isReading === '0') {
    const filterReading = filterNameAndPage.filter((book) => (book.reading === false));
    const filteredBooksReading = filterReading.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooksReading,
        // filterNameAndPage,
      },
      // data: books,
    });
    response.code(200);
    return response;
  }

  if (isFinished === '1') {
    const filterFinished = filterNameAndPage.filter((book) => (book.finished === true));
    const filteredBooksFinished = filterFinished.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooksFinished,
        // filterNameAndPage,
      },
      // data: books,
    });
    response.code(200);
    return response;
  }
  if (isFinished === '0') {
    const filterFinished = filterNameAndPage.filter((book) => (book.finished === false));
    const filteredBooksFinished = filterFinished.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooksFinished,
        // filterNameAndPage,
      },
      // data: books,
    });
    response.code(200);
    return response;
  }
  if (isFinished === '1') {
    const filterFinished = filterNameAndPage.filter((book) => (book.finished === true));
    const filteredBooksFinished = filterFinished.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooksFinished,
        // filterNameAndPage,
      },
      // data: books,
    });
    response.code(200);
    return response;
  }
  /// /
  // const bookName = request.query.name;
  // const bookNameLowerCase = bookName.toLowerCase();
  // //const newBookFiltered = [];
  // if(bookName !== undefined){
  // console.log(books);
  // const booksWithDicoding = books.filter(book => book.name.includes(bookName.LowerCase()));
  // console.log(booksWithDicoding);
  // const filteredBooksFinished = booksWithDicoding.map((book) => ({
  //     id: book.id,
  //     name: book.name,
  //     publisher: book.publisher,
  //   }));
  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       books: filteredBooksFinished,
  //       // filterNameAndPage,
  //     },
  //     // data: books,
  //   });
  //   response.code(200);
  //   return response
  // }
  //console.log(checkName);
  // if (bookName.find(bookName)) {
  //   const filterFinished = filterNameAndPage.filter((book) => (book.name.indexOf('Dicoding')));
  //   const filteredBooksFinished = filterFinished.map((book) => ({
  //     id: book.id,
  //     name: book.name,
  //     publisher: book.publisher,
  //   }));
  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       books: filteredBooksFinished,
  //       // filterNameAndPage,
  //     },
  //     // data: books,
  //   });
  //   response.code(200);
  //   return response;
  // }
  /// //
  // const filterPage = filterNoName.filter((book) => book.readPage <= book.pageCount);
  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks,
      // filterNameAndPage,
    },
    // data: books,
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    // name === undefined
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (!id) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Id tidak ditemukan',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
      data: {
        bookId: id,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  // const {
  //   reading,
  // } = request.payload;

  if (!id) {
    const response = h.response({
      staturs: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
