import { Notify } from 'quasar';

export function message(mesg) {
  console.log('mesg in functions', mesg);
  Notify.create({
    type: 'positive',
    color: 'positive',
    timeout: 2000,
    position: 'bottom',
    message: mesg,
  });
}
