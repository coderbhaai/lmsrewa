export const isAuthenticated = (state) => !!state.user;
export const token = (state) => state.user.token;
export const user = (state) => state.user;
export const adminBasics = (state) => state.adminBasics;
export const blogMeta = (state) => state.blogMeta;
export const adminBlogs = (state) => state.adminBlogs;
export const blogMetaOptions = (state) => state.blogMetaOptions;
export const adminVideos = (state) => state.adminVideos;
