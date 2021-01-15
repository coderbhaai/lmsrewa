export const isAuthenticated = (state) => !!state.user;
export const token = (state) => state.user.token;
export const user = (state) => state.user;
