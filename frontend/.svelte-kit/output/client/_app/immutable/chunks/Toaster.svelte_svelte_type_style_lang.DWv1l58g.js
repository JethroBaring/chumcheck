import{M as S}from"./scheduler.C5Rd-ZIZ.js";import{w as _}from"./index.NQB3_1Bs.js";function W(...t){return t.filter(Boolean).join(" ")}const b=typeof document<"u";function h(t){const o=_(t);function d(l){b&&o.set(l)}function i(l){b&&o.update(l)}return{subscribe:o.subscribe,set:d,update:i}}let w=0;function C(){const t=h([]),o=h([]);function d(n){t.update(e=>[n,...e])}function i(n){var y;const{message:e,...s}=n,c=typeof(n==null?void 0:n.id)=="number"||n.id&&((y=n.id)==null?void 0:y.length)>0?n.id:w++,f=n.dismissable===void 0?!0:n.dismissable,r=n.type===void 0?"default":n.type;return S(t).find(m=>m.id===c)?t.update(m=>m.map(g=>g.id===c?{...g,...n,id:c,title:e,dismissable:f,type:r,updated:!0}:{...g,updated:!1})):d({...s,id:c,title:e,dismissable:f,type:r}),c}function l(n){if(n===void 0){t.set([]);return}return t.update(e=>e.filter(s=>s.id!==n)),n}function T(n,e){return i({...e,type:"default",message:n})}function a(n,e){return i({...e,type:"error",message:n})}function x(n,e){return i({...e,type:"success",message:n})}function E(n,e){return i({...e,type:"info",message:n})}function H(n,e){return i({...e,type:"warning",message:n})}function $(n,e){return i({...e,type:"loading",message:n})}function j(n,e){if(!e)return;let s;e.loading!==void 0&&(s=i({...e,promise:n,type:"loading",message:e.loading}));const c=n instanceof Promise?n:n();let f=s!==void 0;return c.then(r=>{if(r&&typeof r.ok=="boolean"&&!r.ok){f=!1;const p=typeof e.error=="function"?e.error(`HTTP error! status: ${r.status}`):e.error;i({id:s,type:"error",message:p})}else if(e.success!==void 0){f=!1;const p=typeof e.success=="function"?e.success(r):e.success;i({id:s,type:"success",message:p})}}).catch(r=>{if(e.error!==void 0){f=!1;const p=typeof e.error=="function"?e.error(r):e.error;i({id:s,type:"error",message:p})}}).finally(()=>{var r;f&&(l(s),s=void 0),(r=e.finally)==null||r.call(e)}),s}function k(n,e){const s=(e==null?void 0:e.id)||w++;return i({component:n,id:s,...e}),s}function v(n){o.update(e=>e.filter(s=>s.toastId!==n))}function B(n){o.update(e=>[n,...e])}function P(){t.set([]),o.set([])}return{create:i,addToast:d,dismiss:l,message:T,error:a,success:x,info:E,warning:H,loading:$,promise:j,custom:k,removeHeight:v,addHeight:B,reset:P,toasts:t,heights:o}}const u=C();function D(t,o){return u.create({message:t,...o})}const F=D,q=Object.assign(F,{success:u.success,info:u.info,warning:u.warning,error:u.error,custom:u.custom,message:u.message,promise:u.promise,dismiss:u.dismiss,loading:u.loading}),z=t=>({subscribe:t});export{u as a,W as c,q as t,z as u};
