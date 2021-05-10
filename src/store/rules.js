export const rules = {
    required: [v => !!v || 'Required'],
    minLength: [v => v.length >= 10 || 'short']
}