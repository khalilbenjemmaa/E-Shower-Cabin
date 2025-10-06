// bain-et-cuisine/src/app/rendezvous/rendezvous.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rendezvous',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.scss']
})
export class RendezvousComponent {

}
