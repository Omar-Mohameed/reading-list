import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList {
  private readonly bookService = inject(BookService);

  books = this.bookService.getBooks();

  onRemove(id: string): void {
    this.bookService.removeBook(id);
  }
}
