import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  sent = false;
  error = false;

  onSubmit(
    nombre: HTMLInputElement,
    email: HTMLInputElement,
    mensaje: HTMLTextAreaElement
  ): void {
    if (!nombre.value.trim() || !email.value.trim() || !mensaje.value.trim()) {
      this.error = true;
      setTimeout(() => (this.error = false), 3000);
      return;
    }

    const to      = 'jdcuitiva@ucompensar.edu.co';
    const subject = encodeURIComponent(`Contacto Maloca Joven – ${nombre.value.trim()}`);
    const body    = encodeURIComponent(
      `Nombre: ${nombre.value.trim()}\nEmail: ${email.value.trim()}\n\nMensaje:\n${mensaje.value.trim()}`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    this.sent = true;
    nombre.value  = '';
    email.value   = '';
    mensaje.value = '';
  }
}
