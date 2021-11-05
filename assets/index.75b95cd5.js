import{d as b,o as F,c as y,r as z,n as U,a as V,t as M,b as u,e as f,f as X,g as Y,u as I,h as k,i as P,w as j,v as H,j as W,k as q}from"./vendor.1dbfa13c.js";const G=function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))v(a);new MutationObserver(a=>{for(const t of a)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&v(c)}).observe(document,{childList:!0,subtree:!0});function i(a){const t={};return a.integrity&&(t.integrity=a.integrity),a.referrerpolicy&&(t.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?t.credentials="include":a.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function v(a){if(a.ep)return;a.ep=!0;const t=i(a);fetch(a.href,t)}};G();const K=b({props:{label:{type:String,default:"\u63D0\u4EA4"},disabled:{type:Boolean,default:!1}},setup(g){return(l,i)=>(F(),y("button",{class:U(["color-button",{disabled:g.disabled}])},[z(l.$slots,"default",{},()=>[V(M(g.label),1)])],2))}});const Z={class:"color-file-upload"},J={class:"file-button"},Q=u("i",{class:"file-glyphicon"},null,-1),ee=u("span",null,"UPLOAD FILE",-1),te=u("i",{class:"file-tips"},"Drop files here to upload",-1),ae=[te],oe=b({emits:["change"],setup(g,{emit:l}){const i=e=>{const r=e.target.files;if(!r)return!1;p(r)},v=e=>{e.stopPropagation(),e.preventDefault()},a=e=>{e.stopPropagation(),e.preventDefault()},t=e=>{e.stopPropagation(),e.preventDefault();const r=e.dataTransfer.files;p(r)},c=e=>{e.stopPropagation(),e.preventDefault();const r=e.clipboardData.files;p(r)},h=1*1024*1024,C=/^image\//,p=e=>{if(e.length!==1)return _("\u4E0D\u652F\u6301\u591A\u4E2A\u6587\u4EF6\u540C\u65F6\u64CD\u4F5C\uFF0C\u8BF7\u4EC5\u9009\u62E9\u5355\u4E2A\u6587\u4EF6"),!1;const r=e[0],{name:x,size:w,type:E}=r;if(!C.test(E))return _(`\u5F53\u524D\u6587\u4EF6\u7C7B\u578B\u4E3A${E}\uFF0C\u7C7B\u578B\u4E0D\u7B26\uFF0C\u8BF7\u9009\u62E9\u56FE\u7247\u7C7B\u578B\uFF01`),!1;if(w>h)return _("\u6587\u4EF6\u8D85\u8FC7\u6700\u5927\u9650\u52361M\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9"),!1;const m=new FileReader;m.onload=B=>{const $=B.target.result;D(x,$)},m.onerror=()=>{_(m.error.message)},m.readAsDataURL(r)},_=e=>{alert(e)},D=(e,r)=>{l("change",{name:e,base64:r})};return(e,r)=>(F(),y("div",Z,[u("div",J,[Q,ee,u("input",{class:"file-input",type:"file",name:"file",accept:"image/*",title:"",onChange:i},null,32)]),u("div",{class:"file-area",draggable:!0,contenteditable:!0,onDragenter:v,onDragover:a,onDrop:t,onPaste:c},ae,32)]))}});const ne={class:"container"},se={key:0,class:"container-wall"},re={key:1,class:"container-wraper"},le={class:"container-footer"},ue=b({setup(g){const l=f(!0),i=f(0),v=f(0),a=f(""),t=new Image,c=f(null),h=f(!1),C=f(null),p=f("#3F3F3F"),_=f("#3F3F3F"),D=100,e=100,r=()=>{t.onload=()=>{const n=c.value;n.width=t.naturalWidth,n.height=t.naturalHeight,i.value=t.naturalWidth,v.value=t.naturalHeight,x()},t.onerror=n=>{console.error(n)}},x=()=>{c.value.getContext("2d").drawImage(t,0,0)},w=n=>{const{data:o}=n;return`rgba(${o[0]}, ${o[1]}, ${o[2]}, ${o[3]/255})`},E=async n=>{const{offsetX:o,offsetY:s}=n;if(o<0||s<0)return;h.value=!0,m(o,s);const d=L(o,s);p.value=d},m=(n,o)=>{const s=c.value,A=C.value.getContext("2d"),O=Math.min(Math.max(0,n-5),s.width-10),T=Math.min(Math.max(0,o-5),s.height-10);A.drawImage(s,O,T,10,10,0,0,D,e)},B=()=>{h.value=!1,p.value="#3F3F3F"},$=n=>{const{offsetX:o,offsetY:s}=n;if(o<0||s<0)return;const d=L(o,s);_.value=d},L=(n,o)=>{const A=c.value.getContext("2d").getImageData(n,o,1,1);return w(A)},S=({name:n,base64:o})=>{l.value=!1,a.value=n,t.src=o},N=()=>{l.value=!0,h.value=!1,a.value="",i.value=0,v.value=0,p.value="#3F3F3F",_.value="#3F3F3F"},R=X(()=>l.value?"\u6574\u4E00\u5F20\u56FE\u7247\u4E0A\u6765\u5427":`${a.value} ${i.value} * ${v.value}`);return Y(()=>{r()}),(n,o)=>(F(),y("div",ne,[u("div",{class:"container-header",style:k({color:p.value})},[u("p",null,M(I(R)),1),u("div",{class:"container-active",style:k({backgroundColor:_.value})},null,4)],4),l.value?(F(),y("div",se,[P(I(oe),{onChange:S})])):(F(),y("div",re,[u("canvas",{ref:(s,d)=>{d.canvasRef=s,c.value=s},onMousemove:E,onMouseleave:B,onClick:$},null,544),j(u("canvas",{width:D,height:e,ref:(s,d)=>{d.layerRef=s,C.value=s}},null,512),[[H,h.value]])])),u("footer",le,[P(I(K),{label:"\u91CD\u7F6E",u:"primary",onClick:N})])]))}});const ce=b({setup(g){return(l,i)=>(F(),W(ue))}});q(ce).mount("#app");
