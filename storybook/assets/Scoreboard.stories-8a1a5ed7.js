import{a as s,j as e}from"./jsx-runtime-37f7df21.js";import{M as i}from"./MessageFormattedString-2871f6d2.js";import{r as y}from"./MessageFormatted-4fee1c60.js";import"./index-f1f2c4b1.js";import"./botUtils-08c80d46.js";function t({title:n,items:d,open:u,style:p}){return u?s("div",{className:"scoreboard-container",style:p,children:[e("div",{className:"scoreboard-title",children:e(i,{message:n})}),d.map(r=>{const o=r.displayName??r.name;return s("div",{className:"item-container",children:[e("div",{className:"item-name",children:e(i,{message:o})}),e("div",{className:"item-value",children:r.value})]},y(o)+"_"+r.value)})]}):null}try{t.displayName="Scoreboard",t.__docgenInfo={description:"",displayName:"Scoreboard",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"ScoreboardItems"}},open:{defaultValue:null,description:"",name:"open",required:!0,type:{name:"boolean"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}}}}}catch{}const b={component:t},a={args:{title:"Scoreboard",items:[{name:"item 1",value:9},{name:"item 2",value:8}],open:!0}};var m,l,c;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    title: 'Scoreboard',
    items: [{
      name: 'item 1',
      value: 9
    }, {
      name: 'item 2',
      value: 8
    }],
    open: true
  }
}`,...(c=(l=a.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const N=["Primary"];export{a as Primary,N as __namedExportsOrder,b as default};
//# sourceMappingURL=Scoreboard.stories-8a1a5ed7.js.map
