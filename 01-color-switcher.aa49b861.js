const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");t.addEventListener("click",(()=>{timerId=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.disabled=!0})),e.addEventListener("click",(()=>{clearInterval(timerId),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.aa49b861.js.map