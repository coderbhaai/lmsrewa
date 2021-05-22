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

export const months= [
  {value: 1, name: 'January'},
  {value: 2, name: 'February'},
  {value: 3, name: 'March'},
  {value: 4, name: 'April'},
  {value: 5, name: 'May'},
  {value: 6, name: 'June'},
  {value: 7, name: 'July'},
  {value: 8, name: 'August'},
  {value: 9, name: 'September'},
  {value: 10, name: 'October'},
  {value: 11, name: 'November'},
  {value: 12, name: 'December'},
]

export function refineDate (rawDate) {  
  if (rawDate) {
    var reformatedDate = ''
    var year = rawDate.match(/^\d\d\d\d-/)
    var month = rawDate.match(/-\d\d-/)
    var day = rawDate.match(/-\d\d/)
    day = String(day[0].substring(1, day[0].length))
    month = parseInt(month[0].substring(1, month[0].length - 1))
    year = String(year[0].substring(0, year[0].length - 1))
    for (var i = 0; i < months.length; ++i) {
      if (months[i].value === month) {
        month = months[i].name
        break
      }
    }
    return reformatedDate.concat(day, ' ', month, ' ', year)
  } else {
    return 'No Date'
  }
}