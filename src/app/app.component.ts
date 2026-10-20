import { Component } from '@angular/core';

import { InvitationComponent } from './features/invitation/invitation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvitationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
