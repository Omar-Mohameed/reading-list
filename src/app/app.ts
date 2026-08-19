import { Component, signal } from '@angular/core';
import { AddBookForm } from "./components/add-book-form/add-book-form";
import { BookList } from "./components/book-list/book-list";

@Component({
  selector: 'app-root',
  imports: [AddBookForm, BookList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly title = signal('reading-list');
  // For Update 
  bookToEditId = signal<string | null>(null);
  onEditBook(id: string): void {
    this.bookToEditId.set(id);
  }

  onEditComplete(): void {
    this.bookToEditId.set(null);
  }
}
