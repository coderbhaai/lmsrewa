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

export const rules = {
  required: [v => !!v || 'Field is required'],
  aleast3Words: [v => v.length >= 3 || 'Field is too short']
}