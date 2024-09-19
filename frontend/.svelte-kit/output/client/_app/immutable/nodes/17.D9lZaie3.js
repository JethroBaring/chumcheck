import{s as Mt,a as k,g as I,i as w,f as m,e as E,t as z,c as T,b as B,w as Ne,d as R,l as N,h as g,j as je,z as ht,G as Ue,r as Lt,n as Je,q as Rt}from"../chunks/scheduler.C5Rd-ZIZ.js";import{S as Pt,i as Ot,c as d,a as h,m as v,t as p,b as _,d as b,g as Pe,e as Oe,f as Ct}from"../chunks/index.GzWkxjRN.js";import{e as qe}from"../chunks/events.D-BaW_4L.js";import{R as kt,E as Ut,a as qt,b as Jt}from"../chunks/RadarChart.BXpLYmcN.js";import"../chunks/index.BfW4Bjkg.js";import{C as Gt}from"../chunks/card.BGfw9Nof.js";import{C as Xt}from"../chunks/card-content.BpiV6AOx.js";import{R as Zt,T as Ht,D as Yt,a as Qt,b as gt}from"../chunks/index.CUJBR1SE.js";import{I as re}from"../chunks/input.B5tr6xkC.js";import{T as Wt,a as Ft,b as Kt,c as St,d as et,e as tt}from"../chunks/table-row.CUMOqsyR.js";import"../chunks/create.CWXb-gbW.js";import{T as yt}from"../chunks/tabs-content.JQOfzOGl.js";import{f as It}from"../chunks/Cross2.C7ABTaIM.js";import{L as Le}from"../chunks/label.C9yK8Fqe.js";import{R as xt,D as en}from"../chunks/index.D2umTjxw.js";import{R as tn,S as nn,a as an,V as ln,b as rn}from"../chunks/index.DMXiuYKp.js";import{P as We}from"../chunks/public.C6Wrg0vX.js";import{B as dt}from"../chunks/button.BLb86KRQ.js";function Dt(s,e,n){const t=s.slice();return t[23]=e[n],t}function Et(s,e,n){const t=s.slice();return t[26]=e[n],t[28]=n,t}function Tt(s,e,n){const t=s.slice();return t[29]=e[n],t}function sn(s){let e;return{c(){e=z("Startup Name")},l(n){e=R(n,"Startup Name")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function on(s){let e;return{c(){e=z("Group Name")},l(n){e=R(n,"Group Name")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function fn(s){let e;return{c(){e=z("Leader Name")},l(n){e=R(n,"Leader Name")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function $n(s){let e,n="Actions";return{c(){e=E("span"),e.textContent=n,this.h()},l(t){e=T(t,"SPAN",{class:!0,"data-svelte-h":!0}),Ne(e)!=="svelte-1nvuc3u"&&(e.textContent=n),this.h()},h(){N(e,"class","sr-only")},m(t,a){w(t,e,a)},p:Je,d(t){t&&m(e)}}}function un(s){let e,n,t,a,l,r,o,$;return e=new et({props:{$$slots:{default:[sn]},$$scope:{ctx:s}}}),t=new et({props:{$$slots:{default:[on]},$$scope:{ctx:s}}}),l=new et({props:{$$slots:{default:[fn]},$$scope:{ctx:s}}}),o=new et({props:{$$slots:{default:[$n]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment),n=k(),d(t.$$.fragment),a=k(),d(l.$$.fragment),r=k(),d(o.$$.fragment)},l(u){h(e.$$.fragment,u),n=I(u),h(t.$$.fragment,u),a=I(u),h(l.$$.fragment,u),r=I(u),h(o.$$.fragment,u)},m(u,f){v(e,u,f),w(u,n,f),v(t,u,f),w(u,a,f),v(l,u,f),w(u,r,f),v(o,u,f),$=!0},p(u,f){const c={};f[1]&4&&(c.$$scope={dirty:f,ctx:u}),e.$set(c);const D={};f[1]&4&&(D.$$scope={dirty:f,ctx:u}),t.$set(D);const j={};f[1]&4&&(j.$$scope={dirty:f,ctx:u}),l.$set(j);const J={};f[1]&4&&(J.$$scope={dirty:f,ctx:u}),o.$set(J)},i(u){$||(p(e.$$.fragment,u),p(t.$$.fragment,u),p(l.$$.fragment,u),p(o.$$.fragment,u),$=!0)},o(u){_(e.$$.fragment,u),_(t.$$.fragment,u),_(l.$$.fragment,u),_(o.$$.fragment,u),$=!1},d(u){u&&(m(n),m(a),m(r)),b(e,u),b(t,u),b(l,u),b(o,u)}}}function cn(s){let e,n;return e=new St({props:{$$slots:{default:[un]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,a){v(e,t,a),n=!0},p(t,a){const l={};a[1]&4&&(l.$$scope={dirty:a,ctx:t}),e.$set(l)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){_(e.$$.fragment,t),n=!1},d(t){b(e,t)}}}function mn(s){let e=s[29].name+"",n;return{c(){n=z(e)},l(t){n=R(t,e)},m(t,a){w(t,n,a)},p(t,a){a[0]&2&&e!==(e=t[29].name+"")&&je(n,e)},d(t){t&&m(n)}}}function pn(s){let e=s[29].group_name+"",n;return{c(){n=z(e)},l(t){n=R(t,e)},m(t,a){w(t,n,a)},p(t,a){a[0]&2&&e!==(e=t[29].group_name+"")&&je(n,e)},d(t){t&&m(n)}}}function _n(s){let e=s[29].leader_first_name+"",n,t,a=s[29].leader_last_name+"",l;return{c(){n=z(e),t=k(),l=z(a)},l(r){n=R(r,e),t=I(r),l=R(r,a)},m(r,o){w(r,n,o),w(r,t,o),w(r,l,o)},p(r,o){o[0]&2&&e!==(e=r[29].leader_first_name+"")&&je(n,e),o[0]&2&&a!==(a=r[29].leader_last_name+"")&&je(l,a)},d(r){r&&(m(n),m(t),m(l))}}}function gn(s){let e,n,t,a="Toggle menu",l;return e=new Jt({props:{class:"h-4 w-4"}}),{c(){d(e.$$.fragment),n=k(),t=E("span"),t.textContent=a,this.h()},l(r){h(e.$$.fragment,r),n=I(r),t=T(r,"SPAN",{class:!0,"data-svelte-h":!0}),Ne(t)!=="svelte-zt9sly"&&(t.textContent=a),this.h()},h(){N(t,"class","sr-only")},m(r,o){v(e,r,o),w(r,n,o),w(r,t,o),l=!0},p:Je,i(r){l||(p(e.$$.fragment,r),l=!0)},o(r){_(e.$$.fragment,r),l=!1},d(r){r&&(m(n),m(t)),b(e,r)}}}function dn(s){let e,n;return e=new dt({props:{"aria-haspopup":"true",size:"icon",variant:"ghost",builders:[s[32]],$$slots:{default:[gn]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,a){v(e,t,a),n=!0},p(t,a){const l={};a[1]&2&&(l.builders=[t[32]]),a[1]&4&&(l.$$scope={dirty:a,ctx:t}),e.$set(l)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){_(e.$$.fragment,t),n=!1},d(t){b(e,t)}}}function hn(s){let e;return{c(){e=z("Action")},l(n){e=R(n,"Action")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function vn(s){let e;return{c(){e=z("Approve")},l(n){e=R(n,"Approve")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function bn(s){let e;return{c(){e=z("Reject")},l(n){e=R(n,"Reject")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function wn(s){let e;return{c(){e=z("View")},l(n){e=R(n,"View")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function Cn(s){let e,n,t,a,l,r,o,$;e=new Qt({props:{$$slots:{default:[hn]},$$scope:{ctx:s}}}),t=new gt({props:{$$slots:{default:[vn]},$$scope:{ctx:s}}}),l=new gt({props:{$$slots:{default:[bn]},$$scope:{ctx:s}}});function u(){return s[17](s[29])}return o=new gt({props:{$$slots:{default:[wn]},$$scope:{ctx:s}}}),o.$on("click",u),{c(){d(e.$$.fragment),n=k(),d(t.$$.fragment),a=k(),d(l.$$.fragment),r=k(),d(o.$$.fragment)},l(f){h(e.$$.fragment,f),n=I(f),h(t.$$.fragment,f),a=I(f),h(l.$$.fragment,f),r=I(f),h(o.$$.fragment,f)},m(f,c){v(e,f,c),w(f,n,c),v(t,f,c),w(f,a,c),v(l,f,c),w(f,r,c),v(o,f,c),$=!0},p(f,c){s=f;const D={};c[1]&4&&(D.$$scope={dirty:c,ctx:s}),e.$set(D);const j={};c[1]&4&&(j.$$scope={dirty:c,ctx:s}),t.$set(j);const J={};c[1]&4&&(J.$$scope={dirty:c,ctx:s}),l.$set(J);const U={};c[1]&4&&(U.$$scope={dirty:c,ctx:s}),o.$set(U)},i(f){$||(p(e.$$.fragment,f),p(t.$$.fragment,f),p(l.$$.fragment,f),p(o.$$.fragment,f),$=!0)},o(f){_(e.$$.fragment,f),_(t.$$.fragment,f),_(l.$$.fragment,f),_(o.$$.fragment,f),$=!1},d(f){f&&(m(n),m(a),m(r)),b(e,f),b(t,f),b(l,f),b(o,f)}}}function kn(s){let e,n,t,a;return e=new Ht({props:{asChild:!0,$$slots:{default:[dn,({builder:l})=>({32:l}),({builder:l})=>[0,l?2:0]]},$$scope:{ctx:s}}}),t=new Yt({props:{align:"end",$$slots:{default:[Cn]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment),n=k(),d(t.$$.fragment)},l(l){h(e.$$.fragment,l),n=I(l),h(t.$$.fragment,l)},m(l,r){v(e,l,r),w(l,n,r),v(t,l,r),a=!0},p(l,r){const o={};r[1]&6&&(o.$$scope={dirty:r,ctx:l}),e.$set(o);const $={};r[0]&2|r[1]&4&&($.$$scope={dirty:r,ctx:l}),t.$set($)},i(l){a||(p(e.$$.fragment,l),p(t.$$.fragment,l),a=!0)},o(l){_(e.$$.fragment,l),_(t.$$.fragment,l),a=!1},d(l){l&&m(n),b(e,l),b(t,l)}}}function In(s){let e,n;return e=new Zt({props:{$$slots:{default:[kn]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,a){v(e,t,a),n=!0},p(t,a){const l={};a[0]&2|a[1]&4&&(l.$$scope={dirty:a,ctx:t}),e.$set(l)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){_(e.$$.fragment,t),n=!1},d(t){b(e,t)}}}function Dn(s){let e,n,t,a,l,r,o,$,u;return e=new tt({props:{class:"font-medium",$$slots:{default:[mn]},$$scope:{ctx:s}}}),t=new tt({props:{$$slots:{default:[pn]},$$scope:{ctx:s}}}),l=new tt({props:{class:"hidden md:table-cell",$$slots:{default:[_n]},$$scope:{ctx:s}}}),o=new tt({props:{$$slots:{default:[In]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment),n=k(),d(t.$$.fragment),a=k(),d(l.$$.fragment),r=k(),d(o.$$.fragment),$=k()},l(f){h(e.$$.fragment,f),n=I(f),h(t.$$.fragment,f),a=I(f),h(l.$$.fragment,f),r=I(f),h(o.$$.fragment,f),$=I(f)},m(f,c){v(e,f,c),w(f,n,c),v(t,f,c),w(f,a,c),v(l,f,c),w(f,r,c),v(o,f,c),w(f,$,c),u=!0},p(f,c){const D={};c[0]&2|c[1]&4&&(D.$$scope={dirty:c,ctx:f}),e.$set(D);const j={};c[0]&2|c[1]&4&&(j.$$scope={dirty:c,ctx:f}),t.$set(j);const J={};c[0]&2|c[1]&4&&(J.$$scope={dirty:c,ctx:f}),l.$set(J);const U={};c[0]&2|c[1]&4&&(U.$$scope={dirty:c,ctx:f}),o.$set(U)},i(f){u||(p(e.$$.fragment,f),p(t.$$.fragment,f),p(l.$$.fragment,f),p(o.$$.fragment,f),u=!0)},o(f){_(e.$$.fragment,f),_(t.$$.fragment,f),_(l.$$.fragment,f),_(o.$$.fragment,f),u=!1},d(f){f&&(m(n),m(a),m(r),m($)),b(e,f),b(t,f),b(l,f),b(o,f)}}}function Nt(s){let e,n;return e=new St({props:{class:"h-[80px]",$$slots:{default:[Dn]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,a){v(e,t,a),n=!0},p(t,a){const l={};a[0]&2|a[1]&4&&(l.$$scope={dirty:a,ctx:t}),e.$set(l)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){_(e.$$.fragment,t),n=!1},d(t){b(e,t)}}}function En(s){let e,n,t=qe(s[1]),a=[];for(let r=0;r<t.length;r+=1)a[r]=Nt(Tt(s,t,r));const l=r=>_(a[r],1,1,()=>{a[r]=null});return{c(){for(let r=0;r<a.length;r+=1)a[r].c();e=Ue()},l(r){for(let o=0;o<a.length;o+=1)a[o].l(r);e=Ue()},m(r,o){for(let $=0;$<a.length;$+=1)a[$]&&a[$].m(r,o);w(r,e,o),n=!0},p(r,o){if(o[0]&32770|o[1]&2){t=qe(r[1]);let $;for($=0;$<t.length;$+=1){const u=Tt(r,t,$);a[$]?(a[$].p(u,o),p(a[$],1)):(a[$]=Nt(u),a[$].c(),p(a[$],1),a[$].m(e.parentNode,e))}for(Pe(),$=t.length;$<a.length;$+=1)l($);Oe()}},i(r){if(!n){for(let o=0;o<t.length;o+=1)p(a[o]);n=!0}},o(r){a=a.filter(Boolean);for(let o=0;o<a.length;o+=1)_(a[o]);n=!1},d(r){r&&m(e),ht(a,r)}}}function Tn(s){let e,n,t,a;return e=new Ft({props:{$$slots:{default:[cn]},$$scope:{ctx:s}}}),t=new Kt({props:{$$slots:{default:[En]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment),n=k(),d(t.$$.fragment)},l(l){h(e.$$.fragment,l),n=I(l),h(t.$$.fragment,l)},m(l,r){v(e,l,r),w(l,n,r),v(t,l,r),a=!0},p(l,r){const o={};r[1]&4&&(o.$$scope={dirty:r,ctx:l}),e.$set(o);const $={};r[0]&2|r[1]&4&&($.$$scope={dirty:r,ctx:l}),t.$set($)},i(l){a||(p(e.$$.fragment,l),p(t.$$.fragment,l),a=!0)},o(l){_(e.$$.fragment,l),_(t.$$.fragment,l),a=!1},d(l){l&&m(n),b(e,l),b(t,l)}}}function Nn(s){let e,n;return e=new Wt({props:{$$slots:{default:[Tn]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,a){v(e,t,a),n=!0},p(t,a){const l={};a[0]&2|a[1]&4&&(l.$$scope={dirty:a,ctx:t}),e.$set(l)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){_(e.$$.fragment,t),n=!1},d(t){b(e,t)}}}function jn(s){let e,n;return e=new Xt({props:{class:"pt-[24px]",$$slots:{default:[Nn]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,a){v(e,t,a),n=!0},p(t,a){const l={};a[0]&2|a[1]&4&&(l.$$scope={dirty:a,ctx:t}),e.$set(l)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){_(e.$$.fragment,t),n=!1},d(t){b(e,t)}}}function Vn(s){let e,n;return e=new Gt({props:{"data-x-chunk-name":"dashboard-06-chunk-1","data-x-chunk-description":"A list of products in a table with actions. Each row has an image, name, status, price, total sales, created at and actions.",$$slots:{default:[jn]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,a){v(e,t,a),n=!0},p(t,a){const l={};a[0]&2|a[1]&4&&(l.$$scope={dirty:a,ctx:t}),e.$set(l)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){_(e.$$.fragment,t),n=!1},d(t){b(e,t)}}}function An(s){let e;return{c(){e=z("Startup Name")},l(n){e=R(n,"Startup Name")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function zn(s){let e,n,t,a,l;return n=new Ut({props:{class:"h-4 w-4 cursor-pointer"}}),{c(){e=E("button"),d(n.$$.fragment)},l(r){e=T(r,"BUTTON",{});var o=B(e);h(n.$$.fragment,o),o.forEach(m)},m(r,o){w(r,e,o),v(n,e,null),t=!0,a||(l=Rt(e,"click",s[13]),a=!0)},p:Je,i(r){t||(p(n.$$.fragment,r),t=!0)},o(r){_(n.$$.fragment,r),t=!1},d(r){r&&m(e),b(n),a=!1,l()}}}function Rn(s){let e,n,t,a,l;return n=new qt({props:{class:"h-4 w-4 cursor-pointer"}}),{c(){e=E("button"),d(n.$$.fragment)},l(r){e=T(r,"BUTTON",{});var o=B(e);h(n.$$.fragment,o),o.forEach(m)},m(r,o){w(r,e,o),v(n,e,null),t=!0,a||(l=Rt(e,"click",s[13]),a=!0)},p:Je,i(r){t||(p(n.$$.fragment,r),t=!0)},o(r){_(n.$$.fragment,r),t=!1},d(r){r&&m(e),b(n),a=!1,l()}}}function Sn(s){let e,n,t,a,l;const r=[Rn,zn],o=[];function $(u,f){return u[2]?0:1}return n=$(s),t=o[n]=r[n](s),{c(){e=z(`Capsule Proposal

							`),t.c(),a=Ue()},l(u){e=R(u,`Capsule Proposal

							`),t.l(u),a=Ue()},m(u,f){w(u,e,f),o[n].m(u,f),w(u,a,f),l=!0},p(u,f){let c=n;n=$(u),n===c?o[n].p(u,f):(Pe(),_(o[c],1,1,()=>{o[c]=null}),Oe(),t=o[n],t?t.p(u,f):(t=o[n]=r[n](u),t.c()),p(t,1),t.m(a.parentNode,a))},i(u){l||(p(t),l=!0)},o(u){_(t),l=!1},d(u){u&&(m(e),m(a)),o[n].d(u)}}}function jt(s){let e,n,t;return{c(){e=E("object"),this.h()},l(a){e=T(a,"OBJECT",{data:!0,type:!0,width:!0,height:!0,title:!0}),B(e).forEach(m),this.h()},h(){N(e,"data","/sample.pdf"),N(e,"type","application/pdf"),N(e,"width","700"),N(e,"height","1000"),N(e,"title","capsule_proposal")},m(a,l){w(a,e,l),t=!0},i(a){t||(a&&Lt(()=>{t&&(n||(n=Ct(e,It,{},!0)),n.run(1))}),t=!0)},o(a){a&&(n||(n=Ct(e,It,{},!1)),n.run(0)),t=!1},d(a){a&&m(e),a&&n&&n.end()}}}function Bn(s){let e;return{c(){e=z("Group Name")},l(n){e=R(n,"Group Name")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function Mn(s){let e;return{c(){e=z("Leader")},l(n){e=R(n,"Leader")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function Ln(s){let e,n=s[28]+1+"",t;return{c(){e=z("Member #"),t=z(n)},l(a){e=R(a,"Member #"),t=R(a,n)},m(a,l){w(a,e,l),w(a,t,l)},p:Je,d(a){a&&(m(e),m(t))}}}function Vt(s){let e,n,t,a,l,r,o,$,u,f;return n=new Le({props:{for:"email",$$slots:{default:[Ln]},$$scope:{ctx:s}}}),l=new re({props:{readonly:!0,name:"email",id:"email",type:"email",placeholder:"m@example.com",value:s[26].email}}),o=new re({props:{readonly:!0,name:"email",id:"email",type:"text",placeholder:"m@example.com",value:s[26].first_name}}),u=new re({props:{readonly:!0,name:"email",id:"email",type:"text",placeholder:"m@example.com",value:s[26].last_name}}),{c(){e=E("div"),d(n.$$.fragment),t=k(),a=E("div"),d(l.$$.fragment),r=k(),d(o.$$.fragment),$=k(),d(u.$$.fragment),this.h()},l(c){e=T(c,"DIV",{class:!0});var D=B(e);h(n.$$.fragment,D),t=I(D),a=T(D,"DIV",{class:!0});var j=B(a);h(l.$$.fragment,j),r=I(j),h(o.$$.fragment,j),$=I(j),h(u.$$.fragment,j),j.forEach(m),D.forEach(m),this.h()},h(){N(a,"class","flex gap-3"),N(e,"class","grid gap-2")},m(c,D){w(c,e,D),v(n,e,null),g(e,t),g(e,a),v(l,a,null),g(a,r),v(o,a,null),g(a,$),v(u,a,null),f=!0},p(c,D){const j={};D[1]&4&&(j.$$scope={dirty:D,ctx:c}),n.$set(j);const J={};D[0]&8&&(J.value=c[26].email),l.$set(J);const U={};D[0]&8&&(U.value=c[26].first_name),o.$set(U);const F={};D[0]&8&&(F.value=c[26].last_name),u.$set(F)},i(c){f||(p(n.$$.fragment,c),p(l.$$.fragment,c),p(o.$$.fragment,c),p(u.$$.fragment,c),f=!0)},o(c){_(n.$$.fragment,c),_(l.$$.fragment,c),_(o.$$.fragment,c),_(u.$$.fragment,c),f=!1},d(c){c&&m(e),b(n),b(l),b(o),b(u)}}}function At(s){let e,n,t,a,l;return n=new Le({props:{for:"email",$$slots:{default:[Pn]},$$scope:{ctx:s}}}),a=new re({props:{readonly:!0,name:"email",id:"email",type:"email",placeholder:"m@example.com",value:s[3].university_name}}),{c(){e=E("div"),d(n.$$.fragment),t=k(),d(a.$$.fragment),this.h()},l(r){e=T(r,"DIV",{class:!0});var o=B(e);h(n.$$.fragment,o),t=I(o),h(a.$$.fragment,o),o.forEach(m),this.h()},h(){N(e,"class","grid gap-2")},m(r,o){w(r,e,o),v(n,e,null),g(e,t),v(a,e,null),l=!0},p(r,o){const $={};o[1]&4&&($.$$scope={dirty:o,ctx:r}),n.$set($);const u={};o[0]&8&&(u.value=r[3].university_name),a.$set(u)},i(r){l||(p(n.$$.fragment,r),p(a.$$.fragment,r),l=!0)},o(r){_(n.$$.fragment,r),_(a.$$.fragment,r),l=!1},d(r){r&&m(e),b(n),b(a)}}}function Pn(s){let e;return{c(){e=z("University Name")},l(n){e=R(n,"University Name")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function On(s){let e,n;return e=new ln({props:{placeholder:"Choose a mentor"}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,a){v(e,t,a),n=!0},p:Je,i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){_(e.$$.fragment,t),n=!1},d(t){b(e,t)}}}function Un(s){let e=`${s[23].first_name} ${s[23].last_name}`,n;return{c(){n=z(e)},l(t){n=R(t,e)},m(t,a){w(t,n,a)},p(t,a){a[0]&1&&e!==(e=`${t[23].first_name} ${t[23].last_name}`)&&je(n,e)},d(t){t&&m(n)}}}function zt(s){let e,n;return e=new rn({props:{value:s[23].id,$$slots:{default:[Un]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,a){v(e,t,a),n=!0},p(t,a){const l={};a[0]&1&&(l.value=t[23].id),a[0]&1|a[1]&4&&(l.$$scope={dirty:a,ctx:t}),e.$set(l)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){_(e.$$.fragment,t),n=!1},d(t){b(e,t)}}}function qn(s){let e,n,t=qe(s[0].mentors),a=[];for(let r=0;r<t.length;r+=1)a[r]=zt(Dt(s,t,r));const l=r=>_(a[r],1,1,()=>{a[r]=null});return{c(){for(let r=0;r<a.length;r+=1)a[r].c();e=Ue()},l(r){for(let o=0;o<a.length;o+=1)a[o].l(r);e=Ue()},m(r,o){for(let $=0;$<a.length;$+=1)a[$]&&a[$].m(r,o);w(r,e,o),n=!0},p(r,o){if(o[0]&1){t=qe(r[0].mentors);let $;for($=0;$<t.length;$+=1){const u=Dt(r,t,$);a[$]?(a[$].p(u,o),p(a[$],1)):(a[$]=zt(u),a[$].c(),p(a[$],1),a[$].m(e.parentNode,e))}for(Pe(),$=t.length;$<a.length;$+=1)l($);Oe()}},i(r){if(!n){for(let o=0;o<t.length;o+=1)p(a[o]);n=!0}},o(r){a=a.filter(Boolean);for(let o=0;o<a.length;o+=1)_(a[o]);n=!1},d(r){r&&m(e),ht(a,r)}}}function Jn(s){let e,n,t,a;return e=new nn({props:{class:"w-[180px]",$$slots:{default:[On]},$$scope:{ctx:s}}}),t=new an({props:{$$slots:{default:[qn]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment),n=k(),d(t.$$.fragment)},l(l){h(e.$$.fragment,l),n=I(l),h(t.$$.fragment,l)},m(l,r){v(e,l,r),w(l,n,r),v(t,l,r),a=!0},p(l,r){const o={};r[1]&4&&(o.$$scope={dirty:r,ctx:l}),e.$set(o);const $={};r[0]&1|r[1]&4&&($.$$scope={dirty:r,ctx:l}),t.$set($)},i(l){a||(p(e.$$.fragment,l),p(t.$$.fragment,l),a=!0)},o(l){_(e.$$.fragment,l),_(t.$$.fragment,l),a=!1},d(l){l&&m(n),b(e,l),b(t,l)}}}function Gn(s){let e;return{c(){e=z("Reject")},l(n){e=R(n,"Reject")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function Xn(s){let e;return{c(){e=z("Approve")},l(n){e=R(n,"Approve")},m(n,t){w(n,e,t)},d(n){n&&m(e)}}}function Zn(s){let e,n,t,a,l="Project Details",r,o,$,u,f,c,D,j,J,U,F,M,K,Ge="Group Information",se,y,x,Xe,A,_e,W,X,ge,Z,ee,Ve,te,V,L,nt,Fe,at,Y,de,vt="Technology and Commercialization Calculator",lt,Ae,rt,Ze=s[4].technology_level+"",Ke,st,ze,ot,He=s[4].commercialization_level+"",ye,ft,Re,oe,$t,fe,he,bt="URAT Assessment",ut,Se,$e,it,ue,ve,wt="Assign Mentor",ct,ie,mt,ce,me,pt,ne,Be;$=new Le({props:{for:"email",$$slots:{default:[An]},$$scope:{ctx:s}}}),f=new re({props:{readonly:!0,name:"email",id:"email",type:"email",placeholder:"m@example.com",value:s[3].name}}),j=new Le({props:{for:"email",class:"flex gap-2",$$slots:{default:[Sn]},$$scope:{ctx:s}}});let q=s[2]&&jt();x=new Le({props:{for:"email",$$slots:{default:[Bn]},$$scope:{ctx:s}}}),A=new re({props:{readonly:!0,name:"email",id:"email",type:"email",placeholder:"m@example.com",value:s[3].group_name}}),X=new Le({props:{for:"email",$$slots:{default:[Mn]},$$scope:{ctx:s}}}),ee=new re({props:{readonly:!0,name:"email",id:"email",type:"email",placeholder:"m@example.com",value:s[3].leader_email}}),te=new re({props:{readonly:!0,name:"email",id:"email",type:"text",placeholder:"m@example.com",value:s[3].leader_first_name}}),L=new re({props:{readonly:!0,name:"email",id:"email",type:"text",placeholder:"m@example.com",value:s[3].leader_last_name}});let be=qe(s[3].members),S=[];for(let i=0;i<be.length;i+=1)S[i]=Vt(Et(s,be,i));const Bt=i=>_(S[i],1,1,()=>{S[i]=null});let P=s[3].university_name&&At(s);return oe=new kt({props:{id:s[3].id,min:0,max:5,data:[s[4].technology_score,s[4].product_development,s[4].product_definition,s[4].competitive_landscape,s[4].team,s[4].go_to_market,s[4].supply_chain],labels:["Technology","Product Development","Product Definition","Competitive Landscape","Team","Go-To-Market","Supply Chain"]}}),$e=new kt({props:{id:s[3].id+100,min:0,max:15,data:[s[5],s[6],s[7],s[8],s[9],s[10]],labels:["Technology","Organizational","Market","Regulatory","Acceptance","Investment"]}}),ie=new tn({props:{selected:s[12].value,onSelectedChange:s[18],$$slots:{default:[Jn]},$$scope:{ctx:s}}}),me=new dt({props:{variant:"destructive",$$slots:{default:[Gn]},$$scope:{ctx:s}}}),ne=new dt({props:{$$slots:{default:[Xn]},$$scope:{ctx:s}}}),ne.$on("click",s[19]),{c(){e=E("div"),n=E("div"),t=E("div"),a=E("h1"),a.textContent=l,r=k(),o=E("div"),d($.$$.fragment),u=k(),d(f.$$.fragment),c=k(),D=E("div"),d(j.$$.fragment),J=k(),U=E("div"),q&&q.c(),F=k(),M=E("div"),K=E("h1"),K.textContent=Ge,se=k(),y=E("div"),d(x.$$.fragment),Xe=k(),d(A.$$.fragment),_e=k(),W=E("div"),d(X.$$.fragment),ge=k(),Z=E("div"),d(ee.$$.fragment),Ve=k(),d(te.$$.fragment),V=k(),d(L.$$.fragment),nt=k();for(let i=0;i<S.length;i+=1)S[i].c();Fe=k(),P&&P.c(),at=k(),Y=E("div"),de=E("h1"),de.textContent=vt,lt=k(),Ae=E("div"),rt=z("Technology: "),Ke=z(Ze),st=k(),ze=E("div"),ot=z("Commercialization: "),ye=z(He),ft=k(),Re=E("div"),d(oe.$$.fragment),$t=k(),fe=E("div"),he=E("h1"),he.textContent=bt,ut=k(),Se=E("div"),d($e.$$.fragment),it=k(),ue=E("div"),ve=E("h1"),ve.textContent=wt,ct=k(),d(ie.$$.fragment),mt=k(),ce=E("div"),d(me.$$.fragment),pt=k(),d(ne.$$.fragment),this.h()},l(i){e=T(i,"DIV",{class:!0});var C=B(e);n=T(C,"DIV",{class:!0});var O=B(n);t=T(O,"DIV",{class:!0});var ae=B(t);a=T(ae,"H1",{class:!0,"data-svelte-h":!0}),Ne(a)!=="svelte-qcvjiq"&&(a.textContent=l),r=I(ae),o=T(ae,"DIV",{class:!0});var we=B(o);h($.$$.fragment,we),u=I(we),h(f.$$.fragment,we),we.forEach(m),c=I(ae),D=T(ae,"DIV",{class:!0});var Ce=B(D);h(j.$$.fragment,Ce),J=I(Ce),U=T(Ce,"DIV",{class:!0});var Ye=B(U);q&&q.l(Ye),Ye.forEach(m),Ce.forEach(m),ae.forEach(m),F=I(O),M=T(O,"DIV",{class:!0});var H=B(M);K=T(H,"H1",{class:!0,"data-svelte-h":!0}),Ne(K)!=="svelte-11kjis8"&&(K.textContent=Ge),se=I(H),y=T(H,"DIV",{class:!0});var ke=B(y);h(x.$$.fragment,ke),Xe=I(ke),h(A.$$.fragment,ke),ke.forEach(m),_e=I(H),W=T(H,"DIV",{class:!0});var Ie=B(W);h(X.$$.fragment,Ie),ge=I(Ie),Z=T(Ie,"DIV",{class:!0});var le=B(Z);h(ee.$$.fragment,le),Ve=I(le),h(te.$$.fragment,le),V=I(le),h(L.$$.fragment,le),le.forEach(m),Ie.forEach(m),nt=I(H);for(let _t=0;_t<S.length;_t+=1)S[_t].l(H);Fe=I(H),P&&P.l(H),H.forEach(m),at=I(O),Y=T(O,"DIV",{class:!0});var Q=B(Y);de=T(Q,"H1",{class:!0,"data-svelte-h":!0}),Ne(de)!=="svelte-1rekk8u"&&(de.textContent=vt),lt=I(Q),Ae=T(Q,"DIV",{});var De=B(Ae);rt=R(De,"Technology: "),Ke=R(De,Ze),De.forEach(m),st=I(Q),ze=T(Q,"DIV",{});var pe=B(ze);ot=R(pe,"Commercialization: "),ye=R(pe,He),pe.forEach(m),ft=I(Q),Re=T(Q,"DIV",{class:!0});var Qe=B(Re);h(oe.$$.fragment,Qe),Qe.forEach(m),Q.forEach(m),$t=I(O),fe=T(O,"DIV",{class:!0});var Ee=B(fe);he=T(Ee,"H1",{class:!0,"data-svelte-h":!0}),Ne(he)!=="svelte-37evcf"&&(he.textContent=bt),ut=I(Ee),Se=T(Ee,"DIV",{class:!0});var G=B(Se);h($e.$$.fragment,G),G.forEach(m),Ee.forEach(m),it=I(O),ue=T(O,"DIV",{class:!0});var Te=B(ue);ve=T(Te,"H1",{class:!0,"data-svelte-h":!0}),Ne(ve)!=="svelte-y6ivm1"&&(ve.textContent=wt),ct=I(Te),h(ie.$$.fragment,Te),Te.forEach(m),mt=I(O),ce=T(O,"DIV",{class:!0});var xe=B(ce);h(me.$$.fragment,xe),pt=I(xe),h(ne.$$.fragment,xe),xe.forEach(m),O.forEach(m),C.forEach(m),this.h()},h(){N(a,"class","text-lg font-semibold"),N(o,"class","grid gap-2"),N(U,"class","flex w-full justify-center"),N(D,"class","grid gap-2"),N(t,"class","flex flex-col gap-3"),N(K,"class","text-lg font-semibold"),N(y,"class","grid gap-2"),N(Z,"class","flex gap-3"),N(W,"class","grid gap-2"),N(M,"class","flex flex-col gap-3"),N(de,"class","text-lg font-semibold"),N(Re,"class","p-10"),N(Y,"class","flex flex-col gap-3"),N(he,"class","text-lg font-semibold"),N(Se,"class","p-20"),N(fe,"class","flex flex-col gap-3"),N(ve,"class","text-lg font-semibold"),N(ue,"class","flex flex-col gap-3"),N(ce,"class","flex justify-end gap-3"),N(n,"class","flex h-0 flex-col gap-5"),N(e,"class","flex flex-col overflow-scroll")},m(i,C){w(i,e,C),g(e,n),g(n,t),g(t,a),g(t,r),g(t,o),v($,o,null),g(o,u),v(f,o,null),g(t,c),g(t,D),v(j,D,null),g(D,J),g(D,U),q&&q.m(U,null),g(n,F),g(n,M),g(M,K),g(M,se),g(M,y),v(x,y,null),g(y,Xe),v(A,y,null),g(M,_e),g(M,W),v(X,W,null),g(W,ge),g(W,Z),v(ee,Z,null),g(Z,Ve),v(te,Z,null),g(Z,V),v(L,Z,null),g(M,nt);for(let O=0;O<S.length;O+=1)S[O]&&S[O].m(M,null);g(M,Fe),P&&P.m(M,null),g(n,at),g(n,Y),g(Y,de),g(Y,lt),g(Y,Ae),g(Ae,rt),g(Ae,Ke),g(Y,st),g(Y,ze),g(ze,ot),g(ze,ye),g(Y,ft),g(Y,Re),v(oe,Re,null),g(n,$t),g(n,fe),g(fe,he),g(fe,ut),g(fe,Se),v($e,Se,null),g(n,it),g(n,ue),g(ue,ve),g(ue,ct),v(ie,ue,null),g(n,mt),g(n,ce),v(me,ce,null),g(ce,pt),v(ne,ce,null),Be=!0},p(i,C){const O={};C[1]&4&&(O.$$scope={dirty:C,ctx:i}),$.$set(O);const ae={};C[0]&8&&(ae.value=i[3].name),f.$set(ae);const we={};C[0]&4|C[1]&4&&(we.$$scope={dirty:C,ctx:i}),j.$set(we),i[2]?q?C[0]&4&&p(q,1):(q=jt(),q.c(),p(q,1),q.m(U,null)):q&&(Pe(),_(q,1,1,()=>{q=null}),Oe());const Ce={};C[1]&4&&(Ce.$$scope={dirty:C,ctx:i}),x.$set(Ce);const Ye={};C[0]&8&&(Ye.value=i[3].group_name),A.$set(Ye);const H={};C[1]&4&&(H.$$scope={dirty:C,ctx:i}),X.$set(H);const ke={};C[0]&8&&(ke.value=i[3].leader_email),ee.$set(ke);const Ie={};C[0]&8&&(Ie.value=i[3].leader_first_name),te.$set(Ie);const le={};if(C[0]&8&&(le.value=i[3].leader_last_name),L.$set(le),C[0]&8){be=qe(i[3].members);let G;for(G=0;G<be.length;G+=1){const Te=Et(i,be,G);S[G]?(S[G].p(Te,C),p(S[G],1)):(S[G]=Vt(Te),S[G].c(),p(S[G],1),S[G].m(M,Fe))}for(Pe(),G=be.length;G<S.length;G+=1)Bt(G);Oe()}i[3].university_name?P?(P.p(i,C),C[0]&8&&p(P,1)):(P=At(i),P.c(),p(P,1),P.m(M,null)):P&&(Pe(),_(P,1,1,()=>{P=null}),Oe()),(!Be||C[0]&16)&&Ze!==(Ze=i[4].technology_level+"")&&je(Ke,Ze),(!Be||C[0]&16)&&He!==(He=i[4].commercialization_level+"")&&je(ye,He);const Q={};C[0]&8&&(Q.id=i[3].id),C[0]&16&&(Q.data=[i[4].technology_score,i[4].product_development,i[4].product_definition,i[4].competitive_landscape,i[4].team,i[4].go_to_market,i[4].supply_chain]),oe.$set(Q);const De={};C[0]&8&&(De.id=i[3].id+100),C[0]&2016&&(De.data=[i[5],i[6],i[7],i[8],i[9],i[10]]),$e.$set(De);const pe={};C[0]&4096&&(pe.selected=i[12].value),C[0]&4096&&(pe.onSelectedChange=i[18]),C[0]&1|C[1]&4&&(pe.$$scope={dirty:C,ctx:i}),ie.$set(pe);const Qe={};C[1]&4&&(Qe.$$scope={dirty:C,ctx:i}),me.$set(Qe);const Ee={};C[1]&4&&(Ee.$$scope={dirty:C,ctx:i}),ne.$set(Ee)},i(i){if(!Be){p($.$$.fragment,i),p(f.$$.fragment,i),p(j.$$.fragment,i),p(q),p(x.$$.fragment,i),p(A.$$.fragment,i),p(X.$$.fragment,i),p(ee.$$.fragment,i),p(te.$$.fragment,i),p(L.$$.fragment,i);for(let C=0;C<be.length;C+=1)p(S[C]);p(P),p(oe.$$.fragment,i),p($e.$$.fragment,i),p(ie.$$.fragment,i),p(me.$$.fragment,i),p(ne.$$.fragment,i),Be=!0}},o(i){_($.$$.fragment,i),_(f.$$.fragment,i),_(j.$$.fragment,i),_(q),_(x.$$.fragment,i),_(A.$$.fragment,i),_(X.$$.fragment,i),_(ee.$$.fragment,i),_(te.$$.fragment,i),_(L.$$.fragment,i),S=S.filter(Boolean);for(let C=0;C<S.length;C+=1)_(S[C]);_(P),_(oe.$$.fragment,i),_($e.$$.fragment,i),_(ie.$$.fragment,i),_(me.$$.fragment,i),_(ne.$$.fragment,i),Be=!1},d(i){i&&m(e),b($),b(f),b(j),q&&q.d(),b(x),b(A),b(X),b(ee),b(te),b(L),ht(S,i),P&&P.d(),b(oe),b($e),b(ie),b(me),b(ne)}}}function Hn(s){let e,n;return e=new en({props:{class:"h-[90%] max-w-[800px]",$$slots:{default:[Zn]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,a){v(e,t,a),n=!0},p(t,a){const l={};a[0]&6141|a[1]&4&&(l.$$scope={dirty:a,ctx:t}),e.$set(l)},i(t){n||(p(e.$$.fragment,t),n=!0)},o(t){_(e.$$.fragment,t),n=!1},d(t){b(e,t)}}}function Yn(s){let e,n,t,a;return e=new yt({props:{value:"rated",$$slots:{default:[Vn]},$$scope:{ctx:s}}}),t=new xt({props:{open:s[11],onOpenChange:s[14],$$slots:{default:[Hn]},$$scope:{ctx:s}}}),{c(){d(e.$$.fragment),n=k(),d(t.$$.fragment)},l(l){h(e.$$.fragment,l),n=I(l),h(t.$$.fragment,l)},m(l,r){v(e,l,r),w(l,n,r),v(t,l,r),a=!0},p(l,r){const o={};r[0]&2|r[1]&4&&(o.$$scope={dirty:r,ctx:l}),e.$set(o);const $={};r[0]&2048&&($.open=l[11]),r[0]&6141|r[1]&4&&($.$$scope={dirty:r,ctx:l}),t.$set($)},i(l){a||(p(e.$$.fragment,l),p(t.$$.fragment,l),a=!0)},o(l){_(e.$$.fragment,l),_(t.$$.fragment,l),a=!1},d(l){l&&m(n),b(e,l),b(t,l)}}}const Me="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MzEyMDQ2LCJpYXQiOjE3MTcwNTI4NDYsImp0aSI6ImM5ZmQ0ODA2MjhkZDRiOWNiMjNhYjU3ZTRjY2I4MzFlIiwidXNlcl9pZCI6MSwidXNlcl90eXBlIjoiTSJ9.d_W0LM7ljx5NF4NQ4czZzA5I0bWM7-4ux80yJvMzC-w";function Qn(s,e,n){let{data:t}=e,a=t.applicants.filter(A=>A.qualification_status===2),l=!1;function r(){n(2,l=!l)}let o,$,u,f=0,c=0,D=0,j=0,J=0,U=0,F=!1;function M(){n(11,F=!F)}async function K(A){const _e=await fetch(`${We}/startups/${A}/`,{method:"get",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Me}`}}),W=await _e.json();if(_e.ok){const X=await fetch("${PUBLIC_API_URL}/readinesslevel/urat-questions/",{method:"get",headers:{Authorization:`Bearer ${Me}`}}),ge=await X.json(),Z=await fetch(`${We}/urat-question-answers/?startup_id=${A}`,{method:"get",headers:{Authorization:`Bearer ${Me}`}}),ee=await Z.json(),Ve=await fetch(`${We}/startups/${A}/calculator-final-scores/`,{method:"get",headers:{Authorization:`Bearer ${Me}`}}),te=await Ve.json();X.ok&&Z.ok&&Ve.ok&&(n(3,o=W),ge.results,$=ee.results,n(4,u=te),n(5,f=$.filter(V=>V.readiness_type==="Technology").reduce((V,L)=>V+L.score,0)),n(6,c=$.filter(V=>V.readiness_type==="Organizational").reduce((V,L)=>V+L.score,0)),n(7,D=$.filter(V=>V.readiness_type==="Market").reduce((V,L)=>V+L.score,0)),n(8,j=$.filter(V=>V.readiness_type==="Regulatory").reduce((V,L)=>V+L.score,0)),n(9,J=$.filter(V=>V.readiness_type==="Acceptance").reduce((V,L)=>V+L.score,0)),n(10,U=$.filter(V=>V.readiness_type==="Investment").reduce((V,L)=>V+L.score,0)),M())}}async function Ge(A){if((await fetch(`${We}/startups/${A}/approve-applicant/`,{method:"post",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Me}`}})).ok){if((await fetch(`${We}/startups/${se}/appoint-mentors/`,{method:"post",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Me}`},body:JSON.stringify({mentor_ids:[se.toString()]})})).ok){const X=a.filter(ge=>ge.id!==A);n(1,a=X)}M()}}let se=t.mentors[0].id;const y=A=>K(A.id),x=A=>{A&&n(12,se=A.value)},Xe=()=>Ge(o.id);return s.$$set=A=>{"data"in A&&n(0,t=A.data)},[t,a,l,o,u,f,c,D,j,J,U,F,se,r,M,K,Ge,y,x,Xe]}class ma extends Pt{constructor(e){super(),Ot(this,e,Qn,Yn,Mt,{data:0},null,[-1,-1])}}export{ma as component};
