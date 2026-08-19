import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book';
import { Book, BookStatus } from '../../Models/book.model';

@Component({
  selector: 'app-add-book-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-book-form.html',
  styleUrl: './add-book-form.scss',
})
export class AddBookForm {
  private readonly fb = inject(FormBuilder);  // Inject FormBuilder service
  private readonly bookService = inject(BookService);
  bookId = input<string | null>(null);
  editComplete = output<void>();   // Output event to notify when editing is complete

  constructor() {
    effect(() => {
      const id = this.bookId();
      console.log('bookId:', this.bookId());

      if (!id) {
        return;
      }

      const book = this.bookService.getBookById(id);

      if (!book) {
        return;
      }

      this.bookForm.patchValue({
        title: book.title,
        author: book.author,
        image: book.image,
        rating: book.rating,
        status: book.status,
      });
    });
  }

  bookForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    author: ['', [Validators.required, Validators.minLength(2)]],
    image: ['', Validators.required],
    rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    status: ['Want to Read' as BookStatus, Validators.required],
  });

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.bookForm.patchValue({
        image: reader.result as string,
      });
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const id = this.bookId();

    if (id) {
      const updatedBook: Book = {
        id,
        title: this.bookForm.value.title!,
        author: this.bookForm.value.author!,
        image: this.bookForm.value.image!,
        rating: this.bookForm.value.rating!,
        status: this.bookForm.value.status!,
      };

      this.bookService.updateBook(updatedBook);
      this.resetForm();
      this.editComplete.emit();  // Emit event to notify that editing is complete
      return;
    }

    const newBook: Book = {
      id: crypto.randomUUID(),
      title: this.bookForm.value.title!,
      author: this.bookForm.value.author!,
      image: this.bookForm.value.image!,
      rating: this.bookForm.value.rating!,
      status: this.bookForm.value.status!,
    };

    this.bookService.addBook(newBook);
  }

  resetForm(): void {
    this.bookForm.reset({
      title: '',
      author: '',
      image: '',
      rating: 1,
      status: 'Want to Read',
    });
  }
}
