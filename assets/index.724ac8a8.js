import{d as F,o as _,c as v,r as I,n as L,a as P,t as x,b as i,e as h,f as w,g as M,u as B,h as A,i as N,j as O,k as S}from"./vendor.2b715abf.js";const T=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))d(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function c(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerpolicy&&(o.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?o.credentials="include":a.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(a){if(a.ep)return;a.ep=!0;const o=c(a);fetch(a.href,o)}};T();const R=F({props:{label:{type:String,default:"\u63D0\u4EA4"},disabled:{type:Boolean,default:!1}},setup(f){return(r,c)=>(_(),v("button",{class:L(["color-button",{disabled:f.disabled}])},[I(r.$slots,"default",{},()=>[P(x(f.label),1)])],2))}});const U={class:"color-file-upload"},V={class:"file-button"},j=i("i",{class:"file-glyphicon"},null,-1),z=i("span",null,"UPLOAD FILE",-1),H=i("i",{class:"file-tips"},"Drop files here to upload",-1),W=[H],X=F({emits:["change"],setup(f,{emit:r}){const c=e=>{const s=e.target.files;if(!s)return!1;g(s)},d=e=>{e.stopPropagation(),e.preventDefault()},a=e=>{e.stopPropagation(),e.preventDefault()},o=e=>{e.stopPropagation(),e.preventDefault();const s=e.dataTransfer.files;g(s)},u=e=>{e.stopPropagation(),e.preventDefault();const s=e.clipboardData.files;g(s)},y=1*1024*1024,C=/^image\//,g=e=>{if(e.length!==1)return p("\u4E0D\u652F\u6301\u591A\u4E2A\u6587\u4EF6\u540C\u65F6\u64CD\u4F5C\uFF0C\u8BF7\u4EC5\u9009\u62E9\u5355\u4E2A\u6587\u4EF6"),!1;const s=e[0],{name:D,size:b,type:m}=s;if(!C.test(m))return p(`\u5F53\u524D\u6587\u4EF6\u7C7B\u578B\u4E3A${m}\uFF0C\u7C7B\u578B\u4E0D\u7B26\uFF0C\u8BF7\u9009\u62E9\u56FE\u7247\u7C7B\u578B\uFF01`),!1;if(b>y)return p("\u6587\u4EF6\u8D85\u8FC7\u6700\u5927\u9650\u52361M\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9"),!1;const t=new FileReader;t.onload=n=>{const l=n.target.result;E(D,l)},t.onerror=()=>{p(t.error.message)},t.readAsDataURL(s)},p=e=>{alert(e)},E=(e,s)=>{r("change",{name:e,base64:s})};return(e,s)=>(_(),v("div",U,[i("div",V,[j,z,i("input",{class:"file-input",type:"file",name:"file",accept:"image/*",title:"",onChange:c},null,32)]),i("div",{class:"file-area",draggable:!0,contenteditable:!0,onDragenter:d,onDragover:a,onDrop:o,onPaste:u},W,32)]))}});const Y={class:"container"},q={class:"container-header"},G={key:0,class:"container-wall"},K={key:1,class:"container-wraper"},Z={class:"container-footer"},J=F({setup(f){const r=h(!0),c=h(0),d=h(0),a=h(""),o=new Image,u=h(null),y=()=>{o.onload=async()=>{const t=u.value;t.width=o.naturalWidth,t.height=o.naturalHeight,c.value=o.naturalWidth,d.value=o.naturalHeight,C()},o.onerror=t=>{console.error(t)}},C=()=>{u.value.getContext("2d").drawImage(o,0,0)},g=t=>{const{data:n}=t;return`rgba(${n[0]}, ${n[1]}, ${n[2]}, ${n[3]/255})`},p=(t,n)=>{const k=u.value.getContext("2d").getImageData(t,n,1,1);return g(k)},E=t=>{const n=s(t);console.log("mousemove: ",n)},e=t=>{const n=s(t);console.log("click: ",n)},s=t=>{const{offsetX:n,offsetY:l}=t;if(!(n<0||l<0))return p(n,l)},D=({name:t,base64:n})=>{r.value=!1,a.value=t,o.src=n},b=async()=>{await N(),r.value=!0,a.value="",c.value=0,d.value=0},m=w(()=>r.value?"\u6574\u4E00\u5F20\u56FE\u7247\u4E0A\u6765\u5427":`${a.value} ${c.value} * ${d.value}`);return M(()=>{y()}),(t,n)=>(_(),v("div",Y,[i("div",q,x(B(m)),1),r.value?(_(),v("div",G,[A(B(X),{onChange:D})])):(_(),v("div",K,[i("canvas",{ref:(l,$)=>{$.canvasRef=l,u.value=l},onMousemove:E,onClick:e},null,544)])),i("footer",Z,[A(B(R),{label:"\u91CD\u7F6E",u:"primary",onClick:b})])]))}});const Q=F({setup(f){return(r,c)=>(_(),O(J))}});S(Q).mount("#app");