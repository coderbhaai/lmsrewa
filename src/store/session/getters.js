export const isAuthenticated = (state) => !!state.user;
export const token = (state) => state.user.token;
