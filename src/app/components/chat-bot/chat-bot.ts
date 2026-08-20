import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../Models/ChatMessage';
import { ChatService } from '../../services/chat';

@Component({
  selector: 'app-chat-bot',
  imports: [FormsModule],
  templateUrl: './chat-bot.html',
  styleUrl: './chat-bot.scss',
})
export class ChatBot {
  isOpen = signal(false);
  message: string = '';
  messages = signal<ChatMessage[]>([]);
  isLoading = signal(false);
  @ViewChild('chatBody') chatBody!: ElementRef<HTMLDivElement>;

  private chatService = inject(ChatService);

  sendMessage(): void {
    if (!this.message.trim()) {
      return;
    }

    const userMessage = this.message.trim();

    this.messages.update(messages => [...messages, { sender: 'user', text: userMessage }]);

    setTimeout(() => this.scrollToBottom());
    // Simulate bot response (you can replace this with actual bot logic)
    // this.messages.push({ sender: 'bot', text: `Hello` });

    this.isLoading.set(true);
    this.chatService.sendMessage(userMessage).subscribe({
      next: (response) => {
        const botResponse = (response as any)?.choices?.[0]?.message?.content || 'Sorry, I did not understand that.';
        this.messages.update(messages => [...messages, { sender: 'bot', text: botResponse }]);
        this.isLoading.set(false);

        setTimeout(() => this.scrollToBottom());
        // console.log('OpenAI response:', botResponse);
      },
      error: (error) => {
        console.error('OpenAI error:', error);
        this.isLoading.set(false);
      },
    });
    this.message = '';
  }

  toggleChat(): void {
    this.isOpen.update(value => !value);
  }
  scrollToBottom(): void {
    const element = this.chatBody.nativeElement;

    element.scrollTop = element.scrollHeight;
  }
}
