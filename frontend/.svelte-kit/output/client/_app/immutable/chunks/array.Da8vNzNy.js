import{d as o}from"./create.CWXb-gbW.js";function i(n,t,e,u=!0){const f=t-e;return f<=0?u?n[n.length-1]:n[0]:n[f]}function l(n,t,e,u=!0){const f=t+e;return f>n.length-1?u?n[0]:n[n.length-1]:n[f]}function c(n,t,e=!0){return t===n.length-1?e?n[0]:n[t]:n[t+1]}function g(n,t,e=!0){return t<=0?e?n[n.length-1]:n[0]:n[t-1]}function p(n){return n[n.length-1]}function h(n,t){return n.map((e,u)=>n[(t+u)%n.length])}function d(n,t,e=o){const u=t.findIndex(f=>e(f,n));return u!==-1?t.splice(u,1):t.push(n),t}export{i as b,l as f,p as l,c as n,g as p,d as t,h as w};
