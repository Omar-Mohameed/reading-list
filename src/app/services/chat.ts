import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly http = inject(HttpClient);
  token: string = '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';
  baseUrl: string = 'https://api.groq.com/openai/v1/chat/completions';
  
  sendMessage(message: string) {
    return this.http.post(
      this.baseUrl,
      {
        "model": "openai/gpt-oss-120b",
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
      }
    );
  }
}
