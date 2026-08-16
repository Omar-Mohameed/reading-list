import { Injectable, signal } from '@angular/core';
import { Book } from '../Models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books = signal<Book[]>([]);

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
