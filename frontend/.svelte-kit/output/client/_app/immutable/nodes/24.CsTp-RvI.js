import{s as xe,a as C,e as I,E as ke,f as m,g as E,c as T,b as H,w as y,l as _,i as x,h as b,q as Ce,n as ne,t as K,d as Q,r as Ee,z as Se,j as Ae,A as De}from"../chunks/scheduler.C5Rd-ZIZ.js";import{S as Me,i as Ie,c as d,a as h,m as w,b as p,e as oe,t as i,d as v,g as fe,f as _e}from"../chunks/index.GzWkxjRN.js";import{e as ge}from"../chunks/events.D-BaW_4L.js";import{C as Te,a as Be}from"../chunks/chevron-up.BCjarbz3.js";import{H as Ne}from"../chunks/home.j7BFfv5r.js";import{S as Pe,a as He,P as Re,D as de,M as Ve}from"../chunks/menu.DJvDXReH.js";import"../chunks/create.CWXb-gbW.js";import{f as he}from"../chunks/Cross2.C7ABTaIM.js";import"../chunks/index.BBcO3jaG.js";import"../chunks/index.BfW4Bjkg.js";import{C as je}from"../chunks/card.BGfw9Nof.js";import{R as qe,T as ze,D as Oe,a as Le,b as le}from"../chunks/index.CUJBR1SE.js";import{I as Ue}from"../chunks/input.B5tr6xkC.js";import{R as Fe,T as Ge}from"../chunks/index.CFanqtBM.js";import"../chunks/Toaster.svelte_svelte_type_style_lang.DWv1l58g.js";import{S as Je,M as Ke}from"../chunks/Moon.Yu6YKDbJ.js";import{t as Qe}from"../chunks/mode.BeX9mL50.js";import"../chunks/stores.C5trPz4Q.js";import{B as $e}from"../chunks/button.BLb86KRQ.js";import"../chunks/entry.DUo1yLof.js";import{B as We}from"../chunks/badge.zKs8mEVa.js";function we($,e,n){const t=$.slice();return t[5]=e[n],t}function Xe($){let e,n,t,s="Toggle navigation menu",r;return e=new Ve({props:{class:"h-5 w-5"}}),{c(){d(e.$$.fragment),n=C(),t=I("span"),t.textContent=s,this.h()},l(l){h(e.$$.fragment,l),n=E(l),t=T(l,"SPAN",{class:!0,"data-svelte-h":!0}),y(t)!=="svelte-9wqi12"&&(t.textContent=s),this.h()},h(){_(t,"class","sr-only")},m(l,a){w(e,l,a),x(l,n,a),x(l,t,a),r=!0},p:ne,i(l){r||(i(e.$$.fragment,l),r=!0)},o(l){p(e.$$.fragment,l),r=!1},d(l){l&&(m(n),m(t)),v(e,l)}}}function Ye($){let e,n;return e=new $e({props:{variant:"outline",size:"icon",class:"shrink-0 md:hidden",builders:[$[8]],$$slots:{default:[Xe]},$$scope:{ctx:$}}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},p(t,s){const r={};s&256&&(r.builders=[t[8]]),s&512&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){n||(i(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function Ze($){let e,n,t,s,r,l="Acme Inc",a,o,u,D,A;return t=new Re({props:{class:"h-6 w-6"}}),u=new Ne({props:{class:"h-5 w-5"}}),{c(){e=I("nav"),n=I("a"),d(t.$$.fragment),s=C(),r=I("span"),r.textContent=l,a=C(),o=I("a"),d(u.$$.fragment),D=K(`
							Home`),this.h()},l(S){e=T(S,"NAV",{class:!0});var k=H(e);n=T(k,"A",{href:!0,class:!0});var R=H(n);h(t.$$.fragment,R),s=E(R),r=T(R,"SPAN",{class:!0,"data-svelte-h":!0}),y(r)!=="svelte-1vyedid"&&(r.textContent=l),R.forEach(m),a=E(k),o=T(k,"A",{href:!0,class:!0});var f=H(o);h(u.$$.fragment,f),D=Q(f,`
							Home`),f.forEach(m),k.forEach(m),this.h()},h(){_(r,"class","sr-only"),_(n,"href","##"),_(n,"class","flex items-center gap-2 text-lg font-semibold"),_(o,"href","##"),_(o,"class","mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"),_(e,"class","grid gap-2 text-lg font-medium")},m(S,k){x(S,e,k),b(e,n),w(t,n,null),b(n,s),b(n,r),b(e,a),b(e,o),w(u,o,null),b(o,D),A=!0},p:ne,i(S){A||(i(t.$$.fragment,S),i(u.$$.fragment,S),A=!0)},o(S){p(t.$$.fragment,S),p(u.$$.fragment,S),A=!1},d(S){S&&m(e),v(t),v(u)}}}function ye($){let e,n,t,s;return e=new Ge({props:{asChild:!0,$$slots:{default:[Ye,({builder:r})=>({8:r}),({builder:r})=>r?256:0]},$$scope:{ctx:$}}}),t=new He({props:{side:"left",class:"flex flex-col",$$slots:{default:[Ze]},$$scope:{ctx:$}}}),{c(){d(e.$$.fragment),n=C(),d(t.$$.fragment)},l(r){h(e.$$.fragment,r),n=E(r),h(t.$$.fragment,r)},m(r,l){w(e,r,l),x(r,n,l),w(t,r,l),s=!0},p(r,l){const a={};l&768&&(a.$$scope={dirty:l,ctx:r}),e.$set(a);const o={};l&512&&(o.$$scope={dirty:l,ctx:r}),t.$set(o)},i(r){s||(i(e.$$.fragment,r),i(t.$$.fragment,r),s=!0)},o(r){p(e.$$.fragment,r),p(t.$$.fragment,r),s=!1},d(r){r&&m(n),v(e,r),v(t,r)}}}function et($){let e,n,t,s,r,l="Toggle theme",a;return e=new Je({props:{class:"h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"}}),t=new Ke({props:{class:"absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"}}),{c(){d(e.$$.fragment),n=C(),d(t.$$.fragment),s=C(),r=I("span"),r.textContent=l,this.h()},l(o){h(e.$$.fragment,o),n=E(o),h(t.$$.fragment,o),s=E(o),r=T(o,"SPAN",{class:!0,"data-svelte-h":!0}),y(r)!=="svelte-ntgole"&&(r.textContent=l),this.h()},h(){_(r,"class","sr-only")},m(o,u){w(e,o,u),x(o,n,u),w(t,o,u),x(o,s,u),x(o,r,u),a=!0},p:ne,i(o){a||(i(e.$$.fragment,o),i(t.$$.fragment,o),a=!0)},o(o){p(e.$$.fragment,o),p(t.$$.fragment,o),a=!1},d(o){o&&(m(n),m(s),m(r)),v(e,o),v(t,o)}}}function tt($){let e;return{c(){e=K("Mentor")},l(n){e=Q(n,"Mentor")},m(n,t){x(n,e,t)},d(n){n&&m(e)}}}function rt($){let e,n;return{c(){e=I("img"),this.h()},l(t){e=T(t,"IMG",{src:!0,width:!0,height:!0,alt:!0,class:!0}),this.h()},h(){De(e.src,n="/images/placeholder.jpg")||_(e,"src",n),_(e,"width",36),_(e,"height",36),_(e,"alt","Avatar"),_(e,"class","overflow-hidden rounded-full")},m(t,s){x(t,e,s)},p:ne,d(t){t&&m(e)}}}function nt($){let e,n;return e=new $e({props:{builders:[$[8]],variant:"outline",size:"icon",class:"overflow-hidden rounded-full",$$slots:{default:[rt]},$$scope:{ctx:$}}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},p(t,s){const r={};s&256&&(r.builders=[t[8]]),s&512&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){n||(i(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function st($){let e;return{c(){e=K("My Account")},l(n){e=Q(n,"My Account")},m(n,t){x(n,e,t)},d(n){n&&m(e)}}}function at($){let e;return{c(){e=K("Settings")},l(n){e=Q(n,"Settings")},m(n,t){x(n,e,t)},d(n){n&&m(e)}}}function lt($){let e;return{c(){e=K("Support")},l(n){e=Q(n,"Support")},m(n,t){x(n,e,t)},d(n){n&&m(e)}}}function ot($){let e;return{c(){e=K("Logout")},l(n){e=Q(n,"Logout")},m(n,t){x(n,e,t)},d(n){n&&m(e)}}}function ft($){let e,n,t,s,r,l,a,o,u,D,A,S,k,R;return e=new Le({props:{$$slots:{default:[st]},$$scope:{ctx:$}}}),t=new de({}),r=new le({props:{$$slots:{default:[at]},$$scope:{ctx:$}}}),a=new le({props:{$$slots:{default:[lt]},$$scope:{ctx:$}}}),u=new de({}),k=new le({props:{$$slots:{default:[ot]},$$scope:{ctx:$}}}),{c(){d(e.$$.fragment),n=C(),d(t.$$.fragment),s=C(),d(r.$$.fragment),l=C(),d(a.$$.fragment),o=C(),d(u.$$.fragment),D=C(),A=I("form"),S=I("button"),d(k.$$.fragment),this.h()},l(f){h(e.$$.fragment,f),n=E(f),h(t.$$.fragment,f),s=E(f),h(r.$$.fragment,f),l=E(f),h(a.$$.fragment,f),o=E(f),h(u.$$.fragment,f),D=E(f),A=T(f,"FORM",{action:!0,method:!0});var g=H(A);S=T(g,"BUTTON",{type:!0});var P=H(S);h(k.$$.fragment,P),P.forEach(m),g.forEach(m),this.h()},h(){_(S,"type","submit"),_(A,"action","/logout"),_(A,"method","post")},m(f,g){w(e,f,g),x(f,n,g),w(t,f,g),x(f,s,g),w(r,f,g),x(f,l,g),w(a,f,g),x(f,o,g),w(u,f,g),x(f,D,g),x(f,A,g),b(A,S),w(k,S,null),R=!0},p(f,g){const P={};g&512&&(P.$$scope={dirty:g,ctx:f}),e.$set(P);const W={};g&512&&(W.$$scope={dirty:g,ctx:f}),r.$set(W);const V={};g&512&&(V.$$scope={dirty:g,ctx:f}),a.$set(V);const X={};g&512&&(X.$$scope={dirty:g,ctx:f}),k.$set(X)},i(f){R||(i(e.$$.fragment,f),i(t.$$.fragment,f),i(r.$$.fragment,f),i(a.$$.fragment,f),i(u.$$.fragment,f),i(k.$$.fragment,f),R=!0)},o(f){p(e.$$.fragment,f),p(t.$$.fragment,f),p(r.$$.fragment,f),p(a.$$.fragment,f),p(u.$$.fragment,f),p(k.$$.fragment,f),R=!1},d(f){f&&(m(n),m(s),m(l),m(o),m(D),m(A)),v(e,f),v(t,f),v(r,f),v(a,f),v(u,f),v(k)}}}function $t($){let e,n,t,s;return e=new ze({props:{asChild:!0,$$slots:{default:[nt,({builder:r})=>({8:r}),({builder:r})=>r?256:0]},$$scope:{ctx:$}}}),t=new Oe({props:{align:"end",$$slots:{default:[ft]},$$scope:{ctx:$}}}),{c(){d(e.$$.fragment),n=C(),d(t.$$.fragment)},l(r){h(e.$$.fragment,r),n=E(r),h(t.$$.fragment,r)},m(r,l){w(e,r,l),x(r,n,l),w(t,r,l),s=!0},p(r,l){const a={};l&768&&(a.$$scope={dirty:l,ctx:r}),e.$set(a);const o={};l&512&&(o.$$scope={dirty:l,ctx:r}),t.$set(o)},i(r){s||(i(e.$$.fragment,r),i(t.$$.fragment,r),s=!0)},o(r){p(e.$$.fragment,r),p(t.$$.fragment,r),s=!1},d(r){r&&m(n),v(e,r),v(t,r)}}}function ut($){let e,n;return e=new Te({props:{class:"h-4 w-4"}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(i(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function mt($){let e,n;return e=new Be({props:{class:"h-4 w-4"}}),{c(){d(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,s){w(e,t,s),n=!0},i(t){n||(i(e.$$.fragment,t),n=!0)},o(t){p(e.$$.fragment,t),n=!1},d(t){v(e,t)}}}function ve($){let e,n,t,s=ge($[0].startups),r=[];for(let a=0;a<s.length;a+=1)r[a]=be(we($,s,a));const l=a=>p(r[a],1,1,()=>{r[a]=null});return{c(){e=I("div");for(let a=0;a<r.length;a+=1)r[a].c();this.h()},l(a){e=T(a,"DIV",{class:!0});var o=H(e);for(let u=0;u<r.length;u+=1)r[u].l(o);o.forEach(m),this.h()},h(){_(e,"class","grid grid-cols-5 gap-5")},m(a,o){x(a,e,o);for(let u=0;u<r.length;u+=1)r[u]&&r[u].m(e,null);t=!0},p(a,o){if(o&1){s=ge(a[0].startups);let u;for(u=0;u<s.length;u+=1){const D=we(a,s,u);r[u]?(r[u].p(D,o),i(r[u],1)):(r[u]=be(D),r[u].c(),i(r[u],1),r[u].m(e,null))}for(fe(),u=s.length;u<r.length;u+=1)l(u);oe()}},i(a){if(!t){for(let o=0;o<s.length;o+=1)i(r[o]);a&&Ee(()=>{t&&(n||(n=_e(e,he,{},!0)),n.run(1))}),t=!0}},o(a){r=r.filter(Boolean);for(let o=0;o<r.length;o+=1)p(r[o]);a&&(n||(n=_e(e,he,{},!1)),n.run(0)),t=!1},d(a){a&&m(e),Se(r,a),a&&n&&n.end()}}}function it($){let e=$[5].name+"",n;return{c(){n=K(e)},l(t){n=Q(t,e)},m(t,s){x(t,n,s)},p(t,s){s&1&&e!==(e=t[5].name+"")&&Ae(n,e)},d(t){t&&m(n)}}}function be($){let e,n,t,s,r;return n=new je({props:{class:"flex h-44 cursor-pointer items-center justify-center text-xl font-semibold",$$slots:{default:[it]},$$scope:{ctx:$}}}),{c(){e=I("a"),d(n.$$.fragment),t=C(),this.h()},l(l){e=T(l,"A",{href:!0,"data-sveltekit-preload-data":!0});var a=H(e);h(n.$$.fragment,a),t=E(a),a.forEach(m),this.h()},h(){_(e,"href",s=`/mentor/startup/${$[5].id}/rl`),_(e,"data-sveltekit-preload-data","tap")},m(l,a){x(l,e,a),w(n,e,null),b(e,t),r=!0},p(l,a){const o={};a&513&&(o.$$scope={dirty:a,ctx:l}),n.$set(o),(!r||a&1&&s!==(s=`/mentor/startup/${l[5].id}/rl`))&&_(e,"href",s)},i(l){r||(i(n.$$.fragment,l),r=!0)},o(l){p(n.$$.fragment,l),r=!1},d(l){l&&m(e),v(n)}}}function ct($){let e,n,t,s,r,l,a,o="Startups",u,D,A,S,k,R,f,g,P,W,V,X,O,Y,z,j,q,ee,U,ue="Assigned startups",se,te,ae,me;r=new Fe({props:{$$slots:{default:[ye]},$$scope:{ctx:$}}}),A=new Pe({props:{class:"absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"}}),k=new Ue({props:{type:"search",placeholder:"Search...",class:"w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"}}),f=new $e({props:{variant:"ghost",size:"icon",class:"hover:bg-transparent hover:text-flutter-blue",$$slots:{default:[et]},$$scope:{ctx:$}}}),f.$on("click",Qe),P=new We({props:{$$slots:{default:[tt]},$$scope:{ctx:$}}}),V=new qe({props:{$$slots:{default:[$t]},$$scope:{ctx:$}}});const ie=[mt,ut],F=[];function ce(c,B){return c[1]?0:1}j=ce($),q=F[j]=ie[j]($);let M=$[1]&&ve($);return{c(){e=C(),n=I("div"),t=I("div"),s=I("header"),d(r.$$.fragment),l=C(),a=I("p"),a.textContent=o,u=C(),D=I("div"),d(A.$$.fragment),S=C(),d(k.$$.fragment),R=C(),d(f.$$.fragment),g=C(),d(P.$$.fragment),W=C(),d(V.$$.fragment),X=C(),O=I("main"),Y=I("div"),z=I("button"),q.c(),ee=C(),U=I("h1"),U.textContent=ue,se=C(),M&&M.c(),this.h()},l(c){ke("svelte-1tbr4kt",document.head).forEach(m),e=E(c),n=T(c,"DIV",{class:!0});var Z=H(n);t=T(Z,"DIV",{class:!0});var G=H(t);s=T(G,"HEADER",{class:!0});var N=H(s);h(r.$$.fragment,N),l=E(N),a=T(N,"P",{class:!0,"data-svelte-h":!0}),y(a)!=="svelte-1e7e65s"&&(a.textContent=o),u=E(N),D=T(N,"DIV",{class:!0});var J=H(D);h(A.$$.fragment,J),S=E(J),h(k.$$.fragment,J),J.forEach(m),R=E(N),h(f.$$.fragment,N),g=E(N),h(P.$$.fragment,N),W=E(N),h(V.$$.fragment,N),N.forEach(m),X=E(G),O=T(G,"MAIN",{class:!0});var L=H(O);Y=T(L,"DIV",{class:!0});var pe=H(Y);z=T(pe,"BUTTON",{class:!0});var re=H(z);q.l(re),ee=E(re),U=T(re,"H1",{class:!0,"data-svelte-h":!0}),y(U)!=="svelte-18ghf1h"&&(U.textContent=ue),re.forEach(m),pe.forEach(m),se=E(L),M&&M.l(L),L.forEach(m),G.forEach(m),Z.forEach(m),this.h()},h(){document.title="ChumCheck",_(a,"class","font-semibold"),_(D,"class","relative ml-auto flex-1 md:grow-0"),_(s,"class","flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"),_(U,"class","text-sm"),_(z,"class","flex w-fit cursor-pointer items-center gap-1"),_(Y,"class","relative flex w-full items-center justify-between"),_(O,"class","flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6"),_(t,"class","flex w-full flex-col bg-muted/40"),_(n,"class","grid min-h-screen w-full")},m(c,B){x(c,e,B),x(c,n,B),b(n,t),b(t,s),w(r,s,null),b(s,l),b(s,a),b(s,u),b(s,D),w(A,D,null),b(D,S),w(k,D,null),b(s,R),w(f,s,null),b(s,g),w(P,s,null),b(s,W),w(V,s,null),b(t,X),b(t,O),b(O,Y),b(Y,z),F[j].m(z,null),b(z,ee),b(z,U),b(O,se),M&&M.m(O,null),te=!0,ae||(me=Ce(z,"click",$[2]),ae=!0)},p(c,[B]){const Z={};B&512&&(Z.$$scope={dirty:B,ctx:c}),r.$set(Z);const G={};B&512&&(G.$$scope={dirty:B,ctx:c}),f.$set(G);const N={};B&512&&(N.$$scope={dirty:B,ctx:c}),P.$set(N);const J={};B&512&&(J.$$scope={dirty:B,ctx:c}),V.$set(J);let L=j;j=ce(c),j!==L&&(fe(),p(F[L],1,1,()=>{F[L]=null}),oe(),q=F[j],q||(q=F[j]=ie[j](c),q.c()),i(q,1),q.m(z,ee)),c[1]?M?(M.p(c,B),B&2&&i(M,1)):(M=ve(c),M.c(),i(M,1),M.m(O,null)):M&&(fe(),p(M,1,1,()=>{M=null}),oe())},i(c){te||(i(r.$$.fragment,c),i(A.$$.fragment,c),i(k.$$.fragment,c),i(f.$$.fragment,c),i(P.$$.fragment,c),i(V.$$.fragment,c),i(q),i(M),te=!0)},o(c){p(r.$$.fragment,c),p(A.$$.fragment,c),p(k.$$.fragment,c),p(f.$$.fragment,c),p(P.$$.fragment,c),p(V.$$.fragment,c),p(q),p(M),te=!1},d(c){c&&(m(e),m(n)),v(r),v(A),v(k),v(f),v(P),v(V),F[j].d(),M&&M.d(),ae=!1,me()}}}function pt($,e,n){let t=!0,{data:s}=e;function r(){n(1,t=!t)}return $.$$set=l=>{"data"in l&&n(0,s=l.data)},[s,t,r]}class Rt extends Me{constructor(e){super(),Ie(this,e,pt,ct,xe,{data:0})}}export{Rt as component};