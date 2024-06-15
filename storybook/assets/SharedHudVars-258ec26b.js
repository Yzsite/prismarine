import{r as s}from"./index-f1f2c4b1.js";const r=""+new URL("icons-607a6187.png",import.meta.url).href,o=""+new URL("widgets-26a3d4b8.png",import.meta.url).href,n=({children:e})=>(s.useEffect(()=>{if(document.getElementById("hud-vars-style"))return;const a=`
      html {
        --widgets-gui-atlas: url(${o});
        --gui-icons: url(${r}), url(${r});
        --hud-bottom-max: 0px;
        --hud-bottom-raw: max(env(safe-area-inset-bottom), var(--hud-bottom-max));
        --safe-area-inset-bottom: calc(var(--hud-bottom-raw) / 2);
      }
    `,t=document.createElement("style");t.id="hud-vars-style",t.textContent=a,document.head.appendChild(t)},[]),e);try{SharedHudVars.displayName="SharedHudVars",SharedHudVars.__docgenInfo={description:"",displayName:"SharedHudVars",props:{}}}catch{}export{n as S};
//# sourceMappingURL=SharedHudVars-258ec26b.js.map
