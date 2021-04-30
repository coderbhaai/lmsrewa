// import something here

// "async" is optional;
// // more info on params: https://quasar.dev/quasar-cli/boot-files
// export default async (/* { app, router, Vue ... } */) => {
//   // something to do
// }


import Vuelidate from 'vuelidate'

export default async ({ Vue }) => {
  Vue.use(Vuelidate)
}