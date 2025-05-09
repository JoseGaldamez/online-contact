import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Platform,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonAvatar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { ContactModel } from '../services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonAvatar, RouterLink, IonItem, IonLabel],
})
export class MessageComponent {
  private platform = inject(Platform);
  @Input() contact?: ContactModel;
  isIos() {
    return this.platform.is('ios');
  }
  constructor() {
    addIcons({ chevronForward });
  }
}
