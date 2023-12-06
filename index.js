(()=>{"use strict";var e={426:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(81),a=r.n(n),o=r(645),s=r.n(o)()(a());s.push([e.id,"body {\n    background-color: rgb(240, 240, 240);\n    display: flex;\n    flex-direction: column;\n}\n\n.banner {\n    text-align: center;\n}\n\n.boards-container {\n    display: flex;\n    justify-content: space-around;\n}\n\n.board-container {\n    display: flex;\n    flex-direction: column;\n    row-gap: 20px;\n    align-items: center;\n}\n\n.row {\n    display: flex;\n}\n\n.column {\n    background-color: rgb(220, 220, 220);\n    border: 1px solid white;\n    width: 40px;\n    height: 40px;\n}\n\n.human-board .column.ship {\n    background-color: rgb(110, 110, 110);\n}\n\n.human-board .column.preview-valid {\n    background-color: rgb(150, 150, 150);\n}\n\n.human-board .column.preview-invalid {\n    background-color: rgb(150, 0, 0);\n}\n\n.column.hit {\n    background-color: rgb(150, 0, 0);\n}\n\n.column.miss {\n    background-color: rgb(180, 180, 180);\n}\n\n.computer-board .column:not(.hit, .miss):hover {\n    background: rgb(200, 200, 200);\n}\n\n.missed-counter {\n    font-size: 0.8rem;\n}\n\n.reload-button {\n    display: none;\n    cursor: pointer;\n    font-size: 1.5rem;\n    padding: 5px;\n\n    align-self: center;\n}\n",""]);const i=s},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r="",n=void 0!==t[5];return t[4]&&(r+="@supports (".concat(t[4],") {")),t[2]&&(r+="@media ".concat(t[2]," {")),n&&(r+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),r+=e(t),n&&(r+="}"),t[2]&&(r+="}"),t[4]&&(r+="}"),r})).join("")},t.i=function(e,r,n,a,o){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(n)for(var i=0;i<this.length;i++){var d=this[i][0];null!=d&&(s[d]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);n&&s[l[0]]||(void 0!==o&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=o),r&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=r):l[2]=r),a&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=a):l[4]="".concat(a)),t.push(l))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function r(e){for(var r=-1,n=0;n<t.length;n++)if(t[n].identifier===e){r=n;break}return r}function n(e,n){for(var o={},s=[],i=0;i<e.length;i++){var d=e[i],c=n.base?d[0]+n.base:d[0],l=o[c]||0,u="".concat(c," ").concat(l);o[c]=l+1;var h=r(u),p={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==h)t[h].references++,t[h].updater(p);else{var m=a(p,n);n.byIndex=i,t.splice(i,0,{identifier:u,updater:m,references:1})}s.push(u)}return s}function a(e,t){var r=t.domAPI(t);return r.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;r.update(e=t)}else r.remove()}}e.exports=function(e,a){var o=n(e=e||[],a=a||{});return function(e){e=e||[];for(var s=0;s<o.length;s++){var i=r(o[s]);t[i].references--}for(var d=n(e,a),c=0;c<o.length;c++){var l=r(o[c]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}o=d}}},569:e=>{var t={};e.exports=function(e,r){var n=function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}(e);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(r)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,r)=>{e.exports=function(e){var t=r.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(r){!function(e,t,r){var n="";r.supports&&(n+="@supports (".concat(r.supports,") {")),r.media&&(n+="@media ".concat(r.media," {"));var a=void 0!==r.layer;a&&(n+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),n+=r.css,a&&(n+="}"),r.media&&(n+="}"),r.supports&&(n+="}");var o=r.sourceMap;o&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(n,e,t.options)}(t,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={id:n,exports:{}};return e[n](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.nc=void 0,(()=>{class e{static Height=10;static Width=10;constructor(){this.grid=[],this.missedShots=0,this.placedShipCoordinates=new Set,this.attackedCoors=new Set;for(let t=0;t<e.Height;t++)this.grid.push(Array.from({length:e.Width},(()=>null)));this.dom=null,this.shipyard=null,this.name=null}place({ship:e,x:t,y:r}){if(!this.canPlace({ship:e,x:t,y:r}))return!1;for(let n=0;n<e.length;n++)this.grid[r][t+n]=e,this.placedShipCoordinates.add([t+n,r].join());return!0}canPlace({ship:e,x:t,y:r}){return t>=0&&t+e.length-1<this.grid[0].length&&r>=0&&r<this.grid.length&&!this.hasOverlap({ship:e,x:t,y:r})}hasOverlap({ship:e,x:t,y:r}){for(let n=0;n<e.length;n++){let e=[t+n,r].join();if(this.placedShipCoordinates.has(e))return!0}return!1}receiveAttack({x:e,y:t}){return!this.hadAttack({x:e,y:t})&&(this.attackedCoors.add([e,t].join()),null==this.grid[t][e]?(this.missedShots++,!1):(this.grid[t][e].receiveHit(),!0))}hadAttack({x:e,y:t}){return this.attackedCoors.has([e,t].join())}isAllShipSunk(){return this.grid.every((e=>e.every((e=>null==e||e.isSunk()))))}clear(){this.grid.forEach(((e,t)=>{e.forEach(((e,r)=>{this.grid[t][r]=null}))}))}}class t{constructor({length:e}){this.length=e,this.receivedHitAmount=0}isSunk(){return this.receivedHitAmount>=this.length}receiveHit(){this.receivedHitAmount++}}class n{static populate({board:t}){for(let r=0;r<e.Height;r++){let n=document.createElement("div");n.classList.add("row"),t.dom.appendChild(n);for(let t=0;t<e.Width;t++){let e=document.createElement("div");e.dataset.x=t,e.dataset.y=r,e.classList.add("column"),n.appendChild(e)}}}static getColumns({board:e,ship:t,x:r,y:n}){const a=[];for(let o=0;o<t.length;o++){let t=this.getColumn({board:e,x:r+o,y:n});null!=t&&a.push(t)}return a}static getColumn({board:e,x:t,y:r}){return e.dom.querySelector(`.column[data-x="${t}"][data-y="${r}"]`)}static clearPreviewCSS({board:e}){e.dom.querySelectorAll(".column").forEach((e=>{e.classList.remove("preview-valid","preview-invalid")}))}static setCSSKlasses({column:e,adds:t,removes:r}){e.classList.add(...t),e.classList.remove(...r)}static extractParams({event:e}){let t=e.target;return{column:t,x:+t.dataset.x,y:+t.dataset.y}}static updateShipCSS({board:e}){e.grid.forEach(((r,n)=>{r.forEach(((r,a)=>{let o=this.getColumn({board:e,x:a,y:n});r instanceof t?o.classList.add("ship"):o.classList.remove("ship")}))}))}static incrementMissedCount({board:e}){const t=e.dom.parentNode.querySelector(".missed-counter");t.count=(t.count||0)+1,t.textContent=`Missed: ${t.count}`}static disableBoardEvents(){document.querySelectorAll(".board").forEach((e=>e.style.pointerEvents="none"))}static showWinner({board:e}){document.querySelector(".banner").textContent=`The winner is: ${e.name}`,document.querySelector(".reload-button").style.display="block"}static addReloadEvent({reloadButton:e}){e.addEventListener("click",(()=>location.reload()))}}class a{static addPreviewShipEvent({board:e}){e.dom.addEventListener("mouseover",(t=>{n.clearPreviewCSS({board:e}),this.addPreview({board:e,e:t})})),e.dom.addEventListener("mouseleave",(()=>{n.clearPreviewCSS({board:e})}))}static addPreview({board:e,e:t}){if(e.shipyard.isEmpty())return;let{x:r,y:a}=n.extractParams({event:t}),o=e.shipyard.ships[0],s=n.getColumns({board:e,ship:o,x:r,y:a});e.canPlace({ship:o,x:r,y:a})?s.forEach((e=>{n.setCSSKlasses({column:e,adds:["preview-valid"],removes:["preview-invalid"]})})):s.forEach((e=>{n.setCSSKlasses({column:e,adds:["preview-invalid"],removes:["preview-valid"]})}))}static addPlaceShipEvent({board:e}){e.dom.addEventListener("click",(t=>{this.placeShip({board:e,e:t})}))}static placeShip({board:e,e:t}){if(e.shipyard.isEmpty())return;let{x:r,y:a}=n.extractParams({event:t}),o=e.shipyard.ships[0];e.canPlace({ship:o,x:r,y:a})&&(e.shipyard.shift(),e.place({ship:o,x:r,y:a}),n.updateShipCSS({board:e}))}static addReceiveAttackEvent({board:e,opponentBoard:t,compController:r}){e.dom.addEventListener("click",(a=>{if(!t.shipyard.isEmpty())return;let{column:o,x:s,y:i}=n.extractParams({event:a});e.hadAttack({x:s,y:i})||(e.receiveAttack({x:s,y:i})?(n.setCSSKlasses({column:o,adds:["hit"],removes:[]}),e.isAllShipSunk()&&(n.disableBoardEvents(),n.showWinner({board:t}))):(n.setCSSKlasses({column:o,adds:["miss"],removes:[]}),n.incrementMissedCount({board:e}),r.attack({board:t})))}))}}class o{constructor({ships:e}){this.ships=[...e]}shift(){return this.ships.shift()}isEmpty(){return 0===this.ships.length}}var s=r(379),i=r.n(s),d=r(795),c=r.n(d),l=r(569),u=r.n(l),h=r(565),p=r.n(h),m=r(216),v=r.n(m),f=r(589),y=r.n(f),b=r(426),g={};g.styleTagTransform=y(),g.setAttributes=p(),g.insert=u().bind(null,"head"),g.domAPI=c(),g.insertStyleElement=v(),i()(b.Z,g),b.Z&&b.Z.locals&&b.Z.locals;const S=[5,4,4,3,2,2];let x=new e,C=new e;x.dom=document.querySelector(".human-board"),C.dom=document.querySelector(".computer-board"),x.name="Human",C.name="Computer";let w=S.map((e=>new t({length:e})));x.shipyard=new o({ships:w}),w=S.map((e=>new t({length:e}))),C.shipyard=new o({ships:w}),[x,C].forEach((e=>n.populate({board:e})));let E=new class{constructor({boardWidth:e,boardHeight:t}){this.atkCoordinates=[];for(let r=0;r<t;r++)for(let t=0;t<e;t++)this.atkCoordinates.push([t,r])}placeShips({board:e}){const t=[0,1,2,3,4,5,7,8,9];for(;!e.shipyard.isEmpty();){let r=e.shipyard.shift(),n=this.randomIndex(t),a=t.splice(n,1),o=Math.round(Math.random()*(10-r.length));e.place({ship:r,x:o,y:a})}}nextAtkCoordinate(){let e=this.randomIndex(this.atkCoordinates);return this.atkCoordinates.splice(e,1)[0]}randomIndex(e){return Math.floor(Math.random()*e.length)}}({boardWidth:e.Width,boardHeight:e.Height}),k=new class{constructor({computerPlayer:e,computerBoard:t}){this.computerPlayer=e,this.computerBoard=t}placeShips({board:e}){this.computerPlayer.placeShips({board:e}),n.updateShipCSS({board:e})}attack({board:e}){let[t,r]=this.computerPlayer.nextAtkCoordinate(),a=n.getColumn({board:e,x:t,y:r});e.receiveAttack({x:t,y:r})?(n.setCSSKlasses({column:a,adds:["hit"],removes:[]}),e.isAllShipSunk()&&(n.disableBoardEvents(),n.showWinner({board:this.computerBoard}))):(n.setCSSKlasses({column:a,adds:["miss"],removes:[]}),n.incrementMissedCount({board:e}))}}({computerPlayer:E,computerBoard:C});k.placeShips({board:C}),a.addPreviewShipEvent({board:x}),a.addPlaceShipEvent({board:x}),a.addReceiveAttackEvent({board:C,opponentBoard:x,compController:k});const P=document.querySelector(".reload-button");n.addReloadEvent({reloadButton:P})})()})();