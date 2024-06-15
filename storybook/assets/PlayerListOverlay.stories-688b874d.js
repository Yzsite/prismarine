import{a,j as e}from"./jsx-runtime-37f7df21.js";import{M as i}from"./MessageFormattedString-2871f6d2.js";import"./index-f1f2c4b1.js";import"./MessageFormatted-4fee1c60.js";import"./botUtils-08c80d46.js";const P=({playersLists:t,clientId:u,tablistHeader:p,tablistFooter:o,serverIP:m,style:c})=>a("div",{className:"playerlist-container",id:"playerlist-container",style:c,children:[a("span",{className:"playerlist-title",children:["Server IP: ",m]}),e("div",{className:"playerlist-header",children:e(i,{message:p})}),e("div",{className:"player-lists",children:t.map((y,g)=>e("div",{className:"player-list",children:y.map(r=>a("div",{className:`playerlist-entry${u===r.uuid?" active-player":""}`,id:`plist-player-${r.uuid}`,children:[e(i,{message:r.username}),a("div",{className:"playerlist-ping",children:[e("p",{className:"playerlist-ping-value",children:r.ping}),e("p",{className:"playerlist-ping-label",children:"ms"})]})]},r.uuid??r.username))},g))}),e("div",{className:"playerlist-footer",children:e(i,{message:o})})]});try{PlayerListOverlay.displayName="PlayerListOverlay",PlayerListOverlay.__docgenInfo={description:"",displayName:"PlayerListOverlay",props:{playersLists:{defaultValue:null,description:"",name:"playersLists",required:!0,type:{name:"PlayersLists"}},clientId:{defaultValue:null,description:"",name:"clientId",required:!0,type:{name:"string"}},tablistHeader:{defaultValue:null,description:"",name:"tablistHeader",required:!0,type:{name:"string | Record<string, any> | null"}},tablistFooter:{defaultValue:null,description:"",name:"tablistFooter",required:!0,type:{name:"string | Record<string, any> | null"}},serverIP:{defaultValue:null,description:"",name:"serverIP",required:!0,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}}}}}catch{}const I={component:P},s={args:{playersLists:[[{username:"Player 1",ping:10,uuid:"1"},{username:"Player 2",ping:20,uuid:"2"},{username:"Player 3",ping:30,uuid:"3"}]],clientId:"2",tablistHeader:"Header",tablistFooter:"Footer",serverIP:"95.163.228.101"}};var l,n,d;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    playersLists: [[{
      username: 'Player 1',
      ping: 10,
      uuid: '1'
    }, {
      username: 'Player 2',
      ping: 20,
      uuid: '2'
    }, {
      username: 'Player 3',
      ping: 30,
      uuid: '3'
    }]],
    clientId: '2',
    tablistHeader: 'Header',
    tablistFooter: 'Footer',
    serverIP: '95.163.228.101'
  }
}`,...(d=(n=s.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};const _=["Primary"];export{s as Primary,_ as __namedExportsOrder,I as default};
//# sourceMappingURL=PlayerListOverlay.stories-688b874d.js.map
