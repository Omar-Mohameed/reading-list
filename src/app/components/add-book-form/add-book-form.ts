import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book';
import { BookStatus } from '../../Models/book.model';

@Component({
  selector: 'app-add-book-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-book-form.html',
  styleUrl: './add-book-form.scss',
})
export class AddBookForm {
  private readonly fb = inject(FormBuilder);  // Inject FormBuilder service
  private readonly bookService = inject(BookService);

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

    const book = {
      id: crypto.randomUUID(),
      title: this.bookForm.value.title!,
      author: this.bookForm.value.author!,
      image: this.bookForm.value.image!,
      rating: this.bookForm.value.rating!,
      status: this.bookForm.value.status!,
    };

    this.bookService.addBook(book);

    console.log('Book added:', book);
  }
}
