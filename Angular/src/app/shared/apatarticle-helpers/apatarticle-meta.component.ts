import { Component, Input } from '@angular/core';

import { Apatarticle } from '../models';

@Component({
  selector: 'apatarticle-meta',
  templateUrl: './apatarticle-meta.component.html'
})
export class ApatarticleMetaComponent {
  @Input() apatarticle: Apatarticle;
}