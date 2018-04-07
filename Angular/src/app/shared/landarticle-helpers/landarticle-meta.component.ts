import { Component, Input } from '@angular/core';

import { Landarticle } from '../models';

@Component({
  selector: 'landarticle-meta',
  templateUrl: './landarticle-meta.component.html'
})
export class LandarticleMetaComponent {
  @Input() landarticle: Landarticle;
}
