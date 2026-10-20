import { Component } from '@angular/core';

import { INVITATION_CONFIG } from '../../../../core/config/invitation.config';

/**
 * Código de vestimenta: paleta pastel sugerida + ejemplos ilustrados,
 * sobre un fondo con el encaje redondo de fondo.
 */
@Component({
  selector: 'app-dress-code',
  standalone: true,
  imports: [],
  templateUrl: './dress-code.component.html',
  styleUrl: './dress-code.component.scss',
})
export class DressCodeComponent {
  protected readonly message = INVITATION_CONFIG.dressCode.message;
  protected readonly buttonText = INVITATION_CONFIG.dressCode.buttonText;
  protected readonly buttonUrl = INVITATION_CONFIG.dressCode.buttonUrl;
  protected readonly palette = INVITATION_CONFIG.dressCode.palette;
}
