import { Component, Input } from '@angular/core';

import { Cararticle } from '../models';

@Component({
  selector: 'cararticle-meta',
  templateUrl: './cararticle-meta.component.html'
})
export class CararticleMetaComponent {
  @Input() cararticle: Cararticle;
}
