
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://github.com/Maarttin/CineCritico',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "redirectTo": "/Maarttin/CineCritico/login",
    "route": "/Maarttin/CineCritico"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-YCYS24A2.js",
      "chunk-TYUWL7TT.js",
      "chunk-WA67IRQH.js"
    ],
    "route": "/Maarttin/CineCritico/login"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-M75R7UVO.js",
      "chunk-WA67IRQH.js"
    ],
    "route": "/Maarttin/CineCritico/home"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-FGCCSQYD.js",
      "chunk-TYUWL7TT.js",
      "chunk-WA67IRQH.js"
    ],
    "route": "/Maarttin/CineCritico/resena/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 878, hash: '425c0fddb5d38291a14c9ae75853769eaaa67ea546c74ebdd3b7fdfc73e7e804', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1140, hash: 'd0e45924bb8e524c8fcea34ea841b78eaf3f6211ef2c3dbf275825f1110128a8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-VYYZIPDP.css': {size: 126, hash: 'V0LNZXZ1Kng', text: () => import('./assets-chunks/styles-VYYZIPDP_css.mjs').then(m => m.default)}
  },
};
