import { Component, inject, output } from '@angular/core';
import { BookService } from '../../services/book';
import { RatingStarsPipe } from "../../pipes/rating-stars-pipe";
import { CurrentlyReading } from '../../directives/currently-reading';
import { SlicePipe, UpperCasePipe } from '@angular/common';
import { HoverHighlight } from '../../directives/hover-highlight';
import { Book } from '../../Models/book.model';

@Component({
  selector: 'app-book-list',
  imports: [RatingStarsPipe, CurrentlyReading, UpperCasePipe, SlicePipe, HoverHighlight],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList {
  private readonly bookService = inject(BookService);

  editBook = output<string>();

  books = this.bookService.getBooks();

  onRemove(id: string): void {
    this.bookService.removeBook(id);
  }
  onEdit(id: string): void {
    const book = this.bookService.getBookById(id);

    if (!book) {
      return;
    }
      this.editBook.emit(id);
  }
}
