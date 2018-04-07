import { Component, Input } from '@angular/core';

import { Shoutarticle } from '../models';

@Component({
  selector: 'shoutarticle-meta',
  templateUrl: './shoutarticle-meta.component.html'
})
export class ShoutarticleMetaComponent {
  @Input() shoutarticle: Shoutarticle;
}
