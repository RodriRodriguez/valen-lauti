import { Component } from '@angular/core';

import { INVITATION_CONFIG } from '../../../../core/config/invitation.config';
import { SectionShellComponent } from '../../../../shared/ui/section-shell/section-shell.component';

/**
 * Portada principal: "Nos casamos" + fecha + nombres, cada uno como imagen
 * (lettering propio, no texto renderizado), y la foto de la pareja
 * enmarcada en encaje. Se ve apenas se abre el sobre.
 */
@Component({
  selector: 'app-cover',
  standalone: true,
  imports: [SectionShellComponent],
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.scss',
})
export class CoverComponent {
  protected readonly partnerOne = INVITATION_CONFIG.couple.partnerOne;
  protected readonly partnerTwo = INVITATION_CONFIG.couple.partnerTwo;
}
