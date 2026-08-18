import { Injectable, signal } from '@angular/core';
import { Book, BookStatus } from '../Models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books = signal<Book[]>([]);
  constructor() {
    this.books.update(books => [...books, {
      id: crypto.randomUUID(),
      title: 'Book Title One',
      author: 'author One',
      image: 'images/1.jpg',
      rating: 4,
      status: 'Want to Read' as BookStatus,
    },
    {
      id: crypto.randomUUID(),
      title: 'Book Title Two',
      author: 'author Two',
      image: 'images/2.jpg',
      rating: 3,q
      status: 'Currently Reading' as BookStatus,
    }]);
  }

  getBooks() {
    return this.books.asReadonly();
  }
  addBook(book: Book): void {
    this.books.update(books => [...books, book]);
  }

  removeBook(id: string): void {
    this.books.update(books =>
      books.filter(book => book.id !== id)
    );
  }
}
