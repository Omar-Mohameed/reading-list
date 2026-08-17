import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddBookForm } from "./components/add-book-form/add-book-form";
import { BookList } from "./components/book-list/book-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddBookForm, BookList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('reading-list');
}
