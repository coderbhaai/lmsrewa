import { Notify } from 'quasar';

export function message(mesg) {
  Notify.create({
    type: 'positive',
    color: 'positive',
    timeout: 2000,
    position: 'bottom',
    message: mesg,
  });
}
