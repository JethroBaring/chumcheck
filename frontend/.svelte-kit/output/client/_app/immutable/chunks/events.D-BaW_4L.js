import{b as C,t as S}from"./index.GzWkxjRN.js";import{v as T,Z as $}from"./scheduler.C5Rd-ZIZ.js";function q(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function k(e,n){e.d(1),n.delete(e.key)}function B(e,n){C(e,1,1,()=>{n.delete(e.key)})}function z(e,n){e.f(),k(e,n)}function F(e,n){e.f(),B(e,n)}function G(e,n,d,c,r,w,u,D,b,E,y,M){let a=e.length,f=w.length,o=a;const p={};for(;o--;)p[e[o].key]=o;const l=[],g=new Map,_=new Map,v=[];for(o=f;o--;){const t=M(r,w,o),s=d(t);let i=u.get(s);i?c&&v.push(()=>i.p(t,n)):(i=E(s,t),i.c()),g.set(s,l[o]=i),s in p&&_.set(s,Math.abs(o-p[s]))}const x=new Set,A=new Set;function m(t){S(t,1),t.m(D,y),u.set(t.key,t),y=t.first,f--}for(;a&&f;){const t=l[f-1],s=e[a-1],i=t.key,h=s.key;t===s?(y=t.first,a--,f--):g.has(h)?!u.has(i)||x.has(i)?m(t):A.has(h)?a--:_.get(i)>_.get(h)?(A.add(i),m(t)):(x.add(h),a--):(b(s,u),a--)}for(;a--;){const t=e[a];g.has(t.key)||b(t,u)}for(;f;)m(l[f-1]);return T(v),l}function H(e,n){const d={};return n.forEach(c=>{d[c]={[`data-${e}-${c}`]:""}}),c=>d[c]}function I(e){return e?{"aria-disabled":"true","data-disabled":""}:{"aria-disabled":void 0,"data-disabled":void 0}}function J(){const e=$();return n=>{const{originalEvent:d}=n.detail,{cancelable:c}=n,r=d.type;e(r,{originalEvent:d,currentTarget:d.currentTarget},{cancelable:c})||n.preventDefault()}}export{F as a,J as b,H as c,I as d,q as e,z as f,B as o,G as u};
