
export default {
  basePath: 'https://github.com/Maarttin/CineCritico',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
