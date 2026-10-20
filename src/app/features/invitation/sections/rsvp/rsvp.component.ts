import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { INVITATION_CONFIG } from '../../../../core/config/invitation.config';
import { OrnamentDividerComponent } from '../../../../shared/ui/ornament-divider/ornament-divider.component';

interface RsvpModel {
  names: string;
  attendance: string;
  /** Casillas marcadas, por label de la opción. */
  dietary: Record<string, boolean>;
  /** Detalle escrito para las opciones que lo piden (Alergia, Otro). */
  dietaryDetails: Record<string, string>;
}

/**
 * Formulario de confirmación de asistencia. Un solo campo de nombres para
 * toda la familia (incluidos niños), asistencia y restricciones
 * alimentarias. Al enviar abre WhatsApp con la respuesta ya redactada para
 * INVITATION_CONFIG.rsvp.whatsappNumber (el invitado solo toca enviar) y
 * muestra el mensaje de agradecimiento.
 */
@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [FormsModule, OrnamentDividerComponent],
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.scss',
})
export class RsvpComponent {
  protected readonly intro = INVITATION_CONFIG.rsvp.intro;
  protected readonly namesLabel = INVITATION_CONFIG.rsvp.namesLabel;
  protected readonly namesPlaceholder = INVITATION_CONFIG.rsvp.namesPlaceholder;
  protected readonly attendanceOptions = INVITATION_CONFIG.rsvp.attendanceOptions;
  protected readonly dietaryQuestion = INVITATION_CONFIG.rsvp.dietaryQuestion;
  protected readonly dietaryOptions = INVITATION_CONFIG.rsvp.dietaryOptions;
  protected readonly submitLabel = INVITATION_CONFIG.rsvp.submitLabel;
  protected readonly warningNote = INVITATION_CONFIG.rsvp.warningNote;

  protected readonly model: RsvpModel = { names: '', attendance: '', dietary: {}, dietaryDetails: {} };
  protected readonly submitted = signal(false);
  protected readonly thanksMessage = signal('');

  /** Obligatorios: los nombres (sin contar espacios) y una opción de asistencia. */
  protected canSubmit(): boolean {
    return this.model.names.trim() !== '' && this.model.attendance !== '';
  }

  /** Si no va, no hay menú: las restricciones se bloquean. */
  protected isDeclining(): boolean {
    return this.model.attendance === this.attendanceOptions[1];
  }

  protected onAttendanceChange(): void {
    if (this.isDeclining()) {
      this.model.dietary = {};
      this.model.dietaryDetails = {};
    }
  }

  protected onSubmit(form: NgForm): void {
    if (form.invalid || !this.canSubmit()) {
      return;
    }

    const url = `https://wa.me/${INVITATION_CONFIG.rsvp.whatsappNumber}?text=${encodeURIComponent(this.buildWhatsappMessage())}`;
    // Abre WhatsApp con el mensaje ya escrito; el invitado solo toca enviar.
    // Si el navegador bloquea la pestaña nueva, navega en la misma.
    if (!window.open(url, '_blank')) {
      window.location.href = url;
    }

    this.thanksMessage.set(INVITATION_CONFIG.rsvp.thanksMessage.replace('{nombre}', this.namesInline()));
    this.submitted.set(true);
  }

  /** Los renglones del textarea en una sola línea, separados por coma. */
  private namesInline(): string {
    return this.model.names
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .join(', ');
  }

  /** Más de un nombre (por renglón, coma, "y", "&" o "+") o "Familia …" → mensaje en plural. */
  private isGroup(): boolean {
    const names = this.model.names;
    return /\bfamilia\b/i.test(names) || names.split(/\n|,|\s+y\s+|&|\+/i).filter((part) => part.trim()).length > 1;
  }

  private buildWhatsappMessage(): string {
    const date = INVITATION_CONFIG.weddingDate.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const names = this.namesInline();
    const group = this.isGroup();
    const greeting = '¡Hola Valen y Lauti! 💍';

    if (this.isDeclining()) {
      return group
        ? [
            greeting,
            `Somos *${names}*. Lamentablemente no podremos asistir a su boda 😔`,
            '¡Les deseamos lo mejor en este día tan especial! ❤️',
          ].join('\n')
        : [
            greeting,
            `Soy *${names}*. Lamentablemente no podré asistir a su boda 😔`,
            '¡Les deseo lo mejor en este día tan especial! ❤️',
          ].join('\n');
    }

    const lines = [
      greeting,
      group
        ? `Somos *${names}* y confirmamos nuestra asistencia a su boda del ${date}. ¡Vamos! 🥂`
        : `Soy *${names}* y confirmo mi asistencia a su boda del ${date}. ¡Voy! 🥂`,
    ];

    const dietary = this.dietaryOptions
      .filter((option) => this.model.dietary[option.label])
      .map((option) => {
        const detail = this.model.dietaryDetails[option.label]?.trim();
        return detail ? `${option.label} (${detail})` : option.label;
      });
    if (dietary.length) {
      lines.push('', `🍽️ Restricciones alimentarias: ${dietary.join(', ')}`);
    }

    return lines.join('\n');
  }
}
