import{j as l,a as p,F as U}from"./jsx-runtime-37f7df21.js";import{R as K,r as _}from"./index-f1f2c4b1.js";import{c as O,B as N}from"./Button-05b1cb82.js";import{f as W}from"./index.esm-b23235d8.js";import{i as Z}from"./MessageFormatted-4fee1c60.js";import{T as J}from"./Tabs-0aaa86eb.js";import{M as H}from"./MessageFormattedString-2871f6d2.js";const X=""+new URL("isles-5c297034.png",import.meta.url).href;/**
 * filesize
 *
 * @copyright 2023 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 10.0.12
 */const Q="array",ee="bit",P="bits",te="byte",Y="bytes",I="",ie="exponent",ne="function",D="iec",re="Invalid number",le="Invalid rounding method",q="jedec",oe="object",z=".",se="round",ce="s",ae="kbit",de="kB",ue=" ",fe="string",me="0",j={symbol:{iec:{bits:["bit","Kibit","Mibit","Gibit","Tibit","Pibit","Eibit","Zibit","Yibit"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["bit","Kbit","Mbit","Gbit","Tbit","Pbit","Ebit","Zbit","Ybit"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},fullform:{iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]}};function pe(e,{bits:t=!1,pad:s=!1,base:i=-1,round:c=2,locale:h=I,localeOptions:w={},separator:d=I,spacer:S=ue,symbols:R={},standard:u=I,output:E=fe,fullform:x=!1,fullforms:f=[],exponent:C=-1,roundingMethod:M=se,precision:y=0}={}){let r=C,v=Number(e),n=[],a=0,k=I;i===-1&&u.length===0?(i=10,u=q):i===-1&&u.length>0?(u=u===D?D:q,i=u===D?2:10):(i=i===2?2:10,u=i===10||u===q?q:D);const o=i===10?1e3:1024,b=x===!0,B=v<0,T=Math[M];if(typeof e!="bigint"&&isNaN(e))throw new TypeError(re);if(typeof T!==ne)throw new TypeError(le);if(B&&(v=-v),(r===-1||isNaN(r))&&(r=Math.floor(Math.log(v)/Math.log(o)),r<0&&(r=0)),r>8&&(y>0&&(y+=8-r),r=8),E===ie)return r;if(v===0)n[0]=0,k=n[1]=j.symbol[u][t?P:Y][r];else{a=v/(i===2?Math.pow(2,r*10):Math.pow(1e3,r)),t&&(a=a*8,a>=o&&r<8&&(a=a/o,r++));const g=Math.pow(10,r>0?c:0);n[0]=T(a*g)/g,n[0]===o&&r<8&&C===-1&&(n[0]=1,r++),k=n[1]=i===10&&r===1?t?ae:de:j.symbol[u][t?P:Y][r]}if(B&&(n[0]=-n[0]),y>0&&(n[0]=n[0].toPrecision(y)),n[1]=R[n[1]]||n[1],h===!0?n[0]=n[0].toLocaleString():h.length>0?n[0]=n[0].toLocaleString(h,w):d.length>0&&(n[0]=n[0].toString().replace(z,d)),s&&Number.isInteger(n[0])===!1&&c>0){const g=d||z,V=n[0].toString().split(g),F=V[1]||I,A=F.length,G=c-A;n[0]=`${V[0]}${g}${F.padEnd(A+G,me)}`}return b&&(n[1]=f[r]?f[r]:j.fullform[u][r]+(t?ee:te)+(n[0]===1?I:ce)),E===Q?n:E===oe?{value:n[0],symbol:n[1],exponent:r,unit:k}:n.join(S)}function L(e,t){var s,i;if(e===t)return!0;if(e&&t&&(s=e.constructor)===t.constructor){if(s===Date)return e.getTime()===t.getTime();if(s===RegExp)return e.toString()===t.toString();if(s===Array&&(i=e.length)===t.length){for(;i--&&L(e[i],t[i]););return i===-1}if(s===Object){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(i in e)if(!(i in t)||!L(e[i],t[i]))return!1;return!0}}return e!==e&&t!==t}function _e(e){const t=K.useRef([]);return L(e,t.current)||(t.current=e),t.current}function ge(e,t){return K.useMemo(e,_e(t))}function he(e,t,s,i){const c=_.useRef(s);c.current=s;const h=ge(()=>i,[i]);_.useEffect(()=>{if(!e)return;const w=d=>c.current.call(e,d);return e.addEventListener(t,w,h),()=>{e.removeEventListener(t,w,h)}},[e,t,h])}const we="_root_1w0l3_1",ye="_content_1w0l3_7",ve="_content_loading_1w0l3_20",be="_world_root_1w0l3_24",Ne="_world_title_1w0l3_31",Ee="_world_title_right_1w0l3_36",Se="_world_info_1w0l3_40",Re="_world_info_formatted_1w0l3_48",Ce="_world_info_description_line_1w0l3_52",Be="_world_image_1w0l3_56",Te="_image_missing_1w0l3_60",Me="_world_focused_1w0l3_63",ke="_title_1w0l3_67",m={root:we,content:ye,content_loading:ve,world_root:be,world_title:Ne,world_title_right:Ee,world_info:Se,world_info_formatted:Re,world_info_description_line:Ce,world_image:Be,image_missing:Te,world_focused:Me,title:ke},Ie="_container_1gx4v_1",xe="_input_1gx4v_10",$={container:Ie,input:xe},Ve=({autoFocus:e,rootStyles:t,inputRef:s,...i})=>{const c=_.useRef(null);return _.useEffect(()=>{s&&(s.current=c.current),!(!e||Z())&&c.current.focus()},[]),l("div",{className:$.container,style:t,children:l("input",{ref:c,className:$.input,autoComplete:"off",autoCapitalize:"off",autoCorrect:"off",autoSave:"off",spellCheck:"false",...i})})};try{Input.displayName="Input",Input.__docgenInfo={description:"",displayName:"Input",props:{rootStyles:{defaultValue:null,description:"",name:"rootStyles",required:!1,type:{name:"CSSProperties"}},autoFocus:{defaultValue:null,description:"",name:"autoFocus",required:!1,type:{name:"boolean"}},inputRef:{defaultValue:null,description:"",name:"inputRef",required:!1,type:{name:"RefObject<HTMLInputElement>"}}}}}catch{}const qe=({name:e,isFocused:t,title:s,lastPlayed:i,size:c,detail:h="",onFocus:w,onInteraction:d,iconSrc:S,formattedTextOverride:R,worldNameRight:u})=>{const E=_.useMemo(()=>{if(!i)return"";const f=new Intl.RelativeTimeFormat("en",{numeric:"auto"}),C=Date.now()-i,M=Math.floor(C/1e3/60),y=Math.floor(M/60),r=Math.floor(y/24);return r>0?f.format(-r,"day"):y>0?f.format(-y,"hour"):f.format(-M,"minute")},[i]),x=_.useMemo(()=>c?pe(c):"",[c]);return p("div",{className:O(m.world_root,t?m.world_focused:void 0),tabIndex:0,onFocus:()=>w==null?void 0:w(e),onKeyDown:f=>{(f.code==="Enter"||f.code==="Space")&&(f.preventDefault(),d==null||d(f.code==="Enter"?"enter":"space"))},onDoubleClick:()=>d==null?void 0:d("enter"),children:[l("img",{className:`${m.world_image} ${S?"":m.image_missing}`,src:S??X,alt:"world preview"}),p("div",{className:m.world_info,children:[p("div",{className:m.world_title,children:[l("div",{children:s}),l("div",{className:m.world_title_right,children:u})]}),R?l("div",{className:m.world_info_formatted,children:l(H,{message:R})}):p(U,{children:[p("div",{className:m.world_info_description_line,children:[E," ",h.slice(-30)]}),l("div",{className:m.world_info_description_line,children:x})]})]})]})},Ye=({worldData:e,onGeneralAction:t,onWorldAction:s,firstRowChildrenOverride:i,serversLayout:c,searchRowChildrenOverride:h,activeProvider:w,setActiveProvider:d,providerActions:S,providers:R={},disabledProviders:u,error:E,isReadonly:x,warning:f,warningAction:C,warningActionLabel:M})=>{const y=_.useRef(),r=_.useRef(null);he(window,"keydown",o=>{if(o.code==="ArrowDown"||o.code==="ArrowUp"){o.preventDefault();const b=o.code==="ArrowDown"?1:-1,B=W(y.current),T=B.indexOf(document.activeElement);if(T===-1)return;const g=B[T+b];g==null||g.focus()}});const[v,n]=_.useState(""),[a,k]=_.useState("");return _.useEffect(()=>{k("")},[w]),p("div",{ref:y,children:[l("div",{className:"dirt-bg"}),p("div",{className:O("fullscreen",m.root),children:[l("span",{className:O("screen-title",m.title),children:c?"Join Java Servers":"Select Saved World"}),h||l("div",{style:{display:"flex",flexDirection:"column"},children:l(Ve,{autoFocus:!0,value:v,onChange:({target:{value:o}})=>n(o)})}),p("div",{className:O(m.content,!e&&m.content_loading),children:[l(J,{tabs:Object.keys(R),disabledTabs:u,activeTab:w??"",labels:R,onTabChange:o=>{d==null||d(o)},fullSize:!0}),p("div",{style:{marginTop:3},children:[S&&p("div",{style:{display:"flex",alignItems:"center"},children:[l("span",{style:{fontSize:9,marginRight:3},children:"Actions: "})," ",Object.entries(S).map(([o,b])=>typeof b=="function"?l(N,{onClick:b,style:{width:100},children:o},o):l(_.Fragment,{children:b},o))]}),e?e.filter(o=>o.title.toLowerCase().includes(v.toLowerCase())).map(({name:o,size:b,detail:B,...T})=>_.createElement(qe,{...T,size:b,name:o,onFocus:k,isFocused:a===o,key:o,onInteraction:g=>{var V;g==="enter"?s("load",o):g==="space"&&((V=r.current)==null||V.focus())},detail:B})):l("div",{style:{fontSize:10,color:E?"red":"lightgray"},children:E||"Loading (check #dev console if loading too long)..."}),f&&p("div",{style:{fontSize:8,color:"#ffa500ba",marginTop:5,textAlign:"center"},children:[f," ",C&&l("a",{onClick:C,children:M})]})]})]}),p("div",{style:{display:"flex",flexDirection:"column",minWidth:400,paddingBottom:3},children:[i||p("div",{children:[l(N,{rootRef:r,disabled:!a,onClick:()=>s("load",a),children:"Load World"}),l(N,{onClick:()=>t("create"),disabled:x,children:"Create New World"})]}),p("div",{children:[c?l(N,{style:{width:100},disabled:!a,onClick:()=>s("edit",a),children:"Edit"}):l(N,{style:{width:100},disabled:!a,onClick:()=>s("export",a),children:"Export"}),l(N,{style:{width:100},disabled:!a,onClick:()=>s("delete",a),children:"Delete"}),c?l(N,{style:{width:100},onClick:()=>t("create"),children:"Add"}):l(N,{style:{width:100},onClick:()=>s("edit",a),disabled:!0,children:"Edit"}),l(N,{style:{width:100},onClick:()=>t("cancel"),children:"Cancel"})]})]})]})]})};try{Singleplayer.displayName="Singleplayer",Singleplayer.__docgenInfo={description:"",displayName:"Singleplayer",props:{worldData:{defaultValue:null,description:"",name:"worldData",required:!0,type:{name:"WorldProps[] | null"}},serversLayout:{defaultValue:null,description:"",name:"serversLayout",required:!1,type:{name:"boolean"}},firstRowChildrenOverride:{defaultValue:null,description:"",name:"firstRowChildrenOverride",required:!1,type:{name:"ReactNode"}},searchRowChildrenOverride:{defaultValue:null,description:"",name:"searchRowChildrenOverride",required:!1,type:{name:"ReactNode"}},providers:{defaultValue:null,description:"",name:"providers",required:!1,type:{name:"Record<string, string>"}},activeProvider:{defaultValue:null,description:"",name:"activeProvider",required:!1,type:{name:"string"}},setActiveProvider:{defaultValue:null,description:"",name:"setActiveProvider",required:!1,type:{name:"((provider: string) => void)"}},providerActions:{defaultValue:null,description:"",name:"providerActions",required:!1,type:{name:"Record<string, (() => void) | Element>"}},disabledProviders:{defaultValue:null,description:"",name:"disabledProviders",required:!1,type:{name:"string[]"}},isReadonly:{defaultValue:null,description:"",name:"isReadonly",required:!1,type:{name:"boolean"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string"}},warning:{defaultValue:null,description:"",name:"warning",required:!1,type:{name:"string"}},warningAction:{defaultValue:null,description:"",name:"warningAction",required:!1,type:{name:"(() => void)"}},warningActionLabel:{defaultValue:null,description:"",name:"warningActionLabel",required:!1,type:{name:"string"}},onWorldAction:{defaultValue:null,description:"",name:"onWorldAction",required:!0,type:{name:'(action: "load" | "export" | "delete" | "edit", worldName: string) => void'}},onGeneralAction:{defaultValue:null,description:"",name:"onGeneralAction",required:!0,type:{name:'(action: "cancel" | "create") => void'}}}}}catch{}export{Ve as I,Ye as S};
//# sourceMappingURL=Singleplayer-b4ac312a.js.map
