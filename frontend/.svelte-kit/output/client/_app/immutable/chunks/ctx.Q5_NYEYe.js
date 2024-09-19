import{o as H,m as v,b as x,e as K,a as y,i as k,c as B,f as T,g as F,k as m}from"./create.CWXb-gbW.js";import{V as I,N as L}from"./scheduler.C5Rd-ZIZ.js";import{n as U,p as W,l as q}from"./array.Da8vNzNy.js";import{g as z}from"./locale.2WNLRJku.js";import{t as j,o as G,r as J,g as Q}from"./updater.C5YpvhWQ.js";import{w as X}from"./index.NQB3_1Bs.js";import{c as Y}from"./events.D-BaW_4L.js";const Z={orientation:"horizontal",activateOnFocus:!0,loop:!0,autoSet:!0},{name:E,selector:_}=B("tabs");function $(i){const r={...Z,...i},g=j(H(r,"defaultValue","value","onValueChange","autoSet")),{orientation:l,activateOnFocus:c,loop:S}=g,V=r.value??X(r.defaultValue),n=G(V,r==null?void 0:r.onValueChange);let b=r.defaultValue??n.get();const C=v(E(),{stores:l,returned:t=>({"data-orientation":t})}),M=v(E("list"),{stores:l,returned:t=>({role:"tablist","aria-orientation":t,"data-orientation":t})}),N=t=>typeof t=="string"?{value:t}:t,O=v(E("trigger"),{stores:[n,l],returned:([t,u])=>e=>{const{value:s,disabled:o}=N(e);!t&&!b&&r.autoSet&&(b=s,t=s,n.set(s));const d=(k?t:b)===s;return{type:"button",role:"tab","data-state":d?"active":"inactive",tabindex:d?0:-1,"data-value":s,"data-orientation":u,"data-disabled":x(o),disabled:x(o)}},action:t=>({destroy:K(y(t,"focus",()=>{const e=t.dataset.disabled==="true",s=t.dataset.value;c.get()&&!e&&s!==void 0&&n.set(s)}),y(t,"click",e=>{if(t.focus(),e.preventDefault(),t.dataset.disabled==="true")return;const o=t.dataset.value;t.focus(),o!==void 0&&n.set(o)}),y(t,"keydown",e=>{const s=t.dataset.value;if(!s)return;const o=e.currentTarget;if(!T(o))return;const p=o.closest(_());if(!T(p))return;const d=S.get(),f=Array.from(p.querySelectorAll('[role="tab"]')).filter(a=>T(a)).filter(a=>!a.hasAttribute("data-disabled")),A=f.findIndex(a=>a===e.target),P=z(p),{nextKey:R,prevKey:w}=F(P,l.get());e.key===R?(e.preventDefault(),U(f,A,d).focus()):e.key===w?(e.preventDefault(),W(f,A,d).focus()):e.key===m.ENTER||e.key===m.SPACE?(e.preventDefault(),n.set(s)):e.key===m.HOME?(e.preventDefault(),f[0].focus()):e.key===m.END&&(e.preventDefault(),q(f).focus())}))})}),h=v(E("content"),{stores:n,returned:t=>u=>({role:"tabpanel","aria-labelledby":u,hidden:k?t===u?void 0:!0:b===u?void 0:!0,tabindex:0})});return{elements:{root:C,list:M,trigger:O,content:h},states:{value:n},options:g}}function D(){return{NAME:"tabs",PARTS:["root","content","list","trigger"]}}function lt(i){const{NAME:r,PARTS:g}=D(),l=Y(r,g),c={...$(J(i)),getAttrs:l};return I(r,c),{...c,updateOption:Q(c.options)}}function ut(){const{NAME:i}=D();return L(i)}export{ut as g,lt as s};
