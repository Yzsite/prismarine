import{j as e,a as n}from"./jsx-runtime-37f7df21.js";import{M as i}from"./MessageFormatted-4fee1c60.js";import{B as s}from"./Button-05b1cb82.js";import"./index-f1f2c4b1.js";import"./SharedHudVars-258ec26b.js";const m=({dieReasonMessage:r,respawnCallback:l,disconnectCallback:d})=>e("div",{className:"deathScreen-container",children:n("div",{className:"deathScreen",children:[e("h1",{className:"deathScreen-title",children:"You Died!"}),e("h5",{className:"deathScreen-reason",children:e(i,{parts:r})}),n("div",{className:"deathScreen-buttons-grouped",children:[e(s,{label:"Respawn",onClick:()=>{l()}}),e(s,{label:"Disconnnect",onClick:()=>{d()}})]})]})});try{DeathScreen.displayName="DeathScreen",DeathScreen.__docgenInfo={description:"",displayName:"DeathScreen",props:{dieReasonMessage:{defaultValue:null,description:"",name:"dieReasonMessage",required:!0,type:{name:"MessageFormatPart[]"}},respawnCallback:{defaultValue:null,description:"",name:"respawnCallback",required:!0,type:{name:"() => void"}},disconnectCallback:{defaultValue:null,description:"",name:"disconnectCallback",required:!0,type:{name:"() => void"}}}}}catch{}const b={component:m},a={args:{dieReasonMessage:[{text:"test"}],respawnCallback(){},disconnectCallback(){}}};var t,c,o;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    dieReasonMessage: [{
      text: 'test'
    }],
    respawnCallback() {},
    disconnectCallback() {}
  }
}`,...(o=(c=a.parameters)==null?void 0:c.docs)==null?void 0:o.source}}};const k=["Primary"];export{a as Primary,k as __namedExportsOrder,b as default};
//# sourceMappingURL=DeathScreen.stories-efb1467f.js.map
