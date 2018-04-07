import { Component, Input } from '@angular/core';

import { Bizarticle } from '../models';

@Component({
  selector: 'bizarticle-meta',
  templateUrl: './bizarticle-meta.component.html'
})
export class BizarticleMetaComponent {
  @Input() bizarticle: Bizarticle;
}
