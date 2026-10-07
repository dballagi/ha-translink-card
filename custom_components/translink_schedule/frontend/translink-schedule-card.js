import{b as f}from"./chunks/chunk-GFBGSF4Y.js";var I=globalThis,j=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),me=new WeakMap,z=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(j&&t===void 0){let o=e!==void 0&&e.length===1;o&&(t=me.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&me.set(e,t))}return t}toString(){return this.cssText}},B=a=>new z(typeof a=="string"?a:a+"",void 0,J),C=(a,...t)=>{let e=a.length===1?a[0]:t.reduce((o,i,r)=>o+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+a[r+1],a[0]);return new z(e,a,J)},ge=(a,t)=>{if(j)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let o=document.createElement("style"),i=I.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=e.cssText,a.appendChild(o)}},X=j?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(let o of t.cssRules)e+=o.cssText;return B(e)})(a):a;var{is:Fe,defineProperty:Le,getOwnPropertyDescriptor:He,getOwnPropertyNames:Ie,getOwnPropertySymbols:je,getPrototypeOf:Be}=Object,q=globalThis,be=q.trustedTypes,qe=be?be.emptyScript:"",Ke=q.reactiveElementPolyfillSupport,O=(a,t)=>a,M={toAttribute(a,t){switch(t){case Boolean:a=a?qe:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},K=(a,t)=>!Fe(a,t),ve={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ve){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let o=Symbol(),i=this.getPropertyDescriptor(t,o,e);i!==void 0&&Le(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){let{get:i,set:r}=He(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:i,set(s){let n=i?.call(this);r?.call(this,s),this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ve}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let t=Be(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let e=this.properties,o=[...Ie(e),...je(e)];for(let i of o)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[o,i]of e)this.elementProperties.set(o,i)}this._$Eh=new Map;for(let[e,o]of this.elementProperties){let i=this._$Eu(e,o);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let o=new Set(t.flat(1/0).reverse());for(let i of o)e.unshift(X(i))}else t!==void 0&&e.push(X(t));return e}static _$Eu(t,e){let o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ge(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){let o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(i!==void 0&&o.reflect===!0){let r=(o.converter?.toAttribute!==void 0?o.converter:M).toAttribute(e,o.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let o=this.constructor,i=o._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=o.getPropertyOptions(i),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:M;this._$Em=i;let n=s.fromAttribute(e,r.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,o,i=!1,r){if(t!==void 0){let s=this.constructor;if(i===!1&&(r=this[t]),o??=s.getPropertyOptions(t),!((o.hasChanged??K)(r,e)||o.useDefault&&o.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,o))))return;this.C(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:r},s){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),r!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[i,r]of o){let{wrapped:s}=r,n=this[i];s!==!0||this._$AL.has(i)||n===void 0||this.C(i,void 0,r,n)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[O("elementProperties")]=new Map,y[O("finalized")]=new Map,Ke?.({ReactiveElement:y}),(q.reactiveElementVersions??=[]).push("2.1.2");var ie=globalThis,xe=a=>a,V=ie.trustedTypes,ye=V?V.createPolicy("lit-html",{createHTML:a=>a}):void 0,Ae="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,Ee="?"+$,Ve=`<${Ee}>`,S=document,D=()=>S.createComment(""),N=a=>a===null||typeof a!="object"&&typeof a!="function",re=Array.isArray,We=a=>re(a)||typeof a?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_e=/-->/g,$e=/>/g,w=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),we=/'/g,ke=/"/g,Ce=/^(?:script|style|textarea|title)$/i,ae=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),d=ae(1),$t=ae(2),wt=ae(3),A=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),Se=new WeakMap,k=S.createTreeWalker(S,129);function Te(a,t){if(!re(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return ye!==void 0?ye.createHTML(t):t}var Ge=(a,t)=>{let e=a.length-1,o=[],i,r=t===2?"<svg>":t===3?"<math>":"",s=P;for(let n=0;n<e;n++){let l=a[n],h,u,p=-1,g=0;for(;g<l.length&&(s.lastIndex=g,u=s.exec(l),u!==null);)g=s.lastIndex,s===P?u[1]==="!--"?s=_e:u[1]!==void 0?s=$e:u[2]!==void 0?(Ce.test(u[2])&&(i=RegExp("</"+u[2],"g")),s=w):u[3]!==void 0&&(s=w):s===w?u[0]===">"?(s=i??P,p=-1):u[1]===void 0?p=-2:(p=s.lastIndex-u[2].length,h=u[1],s=u[3]===void 0?w:u[3]==='"'?ke:we):s===ke||s===we?s=w:s===_e||s===$e?s=P:(s=w,i=void 0);let m=s===w&&a[n+1].startsWith("/>")?" ":"";r+=s===P?l+Ve:p>=0?(o.push(h),l.slice(0,p)+Ae+l.slice(p)+$+m):l+$+(p===-2?n:m)}return[Te(a,r+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]},U=class a{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let r=0,s=0,n=t.length-1,l=this.parts,[h,u]=Ge(t,e);if(this.el=a.createElement(h,o),k.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=k.nextNode())!==null&&l.length<n;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(Ae)){let g=u[s++],m=i.getAttribute(p).split($),H=/([.?@])?(.*)/.exec(g);l.push({type:1,index:r,name:H[2],strings:m,ctor:H[1]==="."?Q:H[1]==="?"?ee:H[1]==="@"?te:R}),i.removeAttribute(p)}else p.startsWith($)&&(l.push({type:6,index:r}),i.removeAttribute(p));if(Ce.test(i.tagName)){let p=i.textContent.split($),g=p.length-1;if(g>0){i.textContent=V?V.emptyScript:"";for(let m=0;m<g;m++)i.append(p[m],D()),k.nextNode(),l.push({type:2,index:++r});i.append(p[g],D())}}}else if(i.nodeType===8)if(i.data===Ee)l.push({type:2,index:r});else{let p=-1;for(;(p=i.data.indexOf($,p+1))!==-1;)l.push({type:7,index:r}),p+=$.length-1}r++}}static createElement(t,e){let o=S.createElement("template");return o.innerHTML=t,o}};function T(a,t,e=a,o){if(t===A)return t;let i=o!==void 0?e._$Co?.[o]:e._$Cl,r=N(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(a),i._$AT(a,e,o)),o!==void 0?(e._$Co??=[])[o]=i:e._$Cl=i),i!==void 0&&(t=T(a,i._$AS(a,t.values),i,o)),t}var Z=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??S).importNode(e,!0);k.currentNode=i;let r=k.nextNode(),s=0,n=0,l=o[0];for(;l!==void 0;){if(s===l.index){let h;l.type===2?h=new F(r,r.nextSibling,this,t):l.type===1?h=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(h=new oe(r,this,t)),this._$AV.push(h),l=o[++n]}s!==l?.index&&(r=k.nextNode(),s++)}return k.currentNode=S,i}p(t){let e=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},F=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),N(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):We(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:o}=t,i=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=U.createElement(Te(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new Z(i,this),s=r.u(this.options);r.p(e),this.T(s),this._$AH=r}}_$AC(t){let e=Se.get(t.strings);return e===void 0&&Se.set(t.strings,e=new U(t)),e}k(t){re(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,o,i=0;for(let r of t)i===e.length?e.push(o=new a(this.O(D()),this.O(D()),this,this.options)):o=e[i],o._$AI(r),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let o=xe(t).nextSibling;xe(t).remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,r){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=c}_$AI(t,e=this,o,i){let r=this.strings,s=!1;if(r===void 0)t=T(this,t,e,0),s=!N(t)||t!==this._$AH&&t!==A,s&&(this._$AH=t);else{let n=t,l,h;for(t=r[0],l=0;l<r.length-1;l++)h=T(this,n[o+l],e,l),h===A&&(h=this._$AH[l]),s||=!N(h)||h!==this._$AH[l],h===c?t=c:t!==c&&(t+=(h??"")+r[l+1]),this._$AH[l]=h}s&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Q=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},ee=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},te=class extends R{constructor(t,e,o,i,r){super(t,e,o,i,r),this.type=5}_$AI(t,e=this){if((t=T(this,t,e,0)??c)===A)return;let o=this._$AH,i=t===c&&o!==c||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,r=t!==c&&(o===c||i);i&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},oe=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}};var Je=ie.litHtmlPolyfillSupport;Je?.(U,F),(ie.litHtmlVersions??=[]).push("3.3.3");var Re=(a,t,e)=>{let o=e?.renderBefore??t,i=o._$litPart$;if(i===void 0){let r=e?.renderBefore??null;o._$litPart$=i=new F(t.insertBefore(D(),r),r,void 0,e??{})}return i._$AI(a),i};var se=globalThis,b=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Re(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};b._$litElement$=!0,b.finalized=!0,se.litElementHydrateSupport?.({LitElement:b});var Xe=se.litElementPolyfillSupport;Xe?.({LitElement:b});(se.litElementVersions??=[]).push("4.2.2");var Ye={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:K},Ze=(a=Ye,t,e)=>{let{kind:o,metadata:i}=e,r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),o==="setter"&&((a=Object.create(a)).wrapped=!0),r.set(e.name,a),o==="accessor"){let{name:s}=e;return{set(n){let l=t.get.call(this);t.set.call(this,n),this.requestUpdate(s,l,a,!0,n)},init(n){return n!==void 0&&this.C(s,void 0,a,n),n}}}if(o==="setter"){let{name:s}=e;return function(n){let l=this[s];t.call(this,n),this.requestUpdate(s,l,a,!0,n)}}throw Error("Unsupported decorator location: "+o)};function _(a){return(t,e)=>typeof e=="object"?Ze(a,t,e):((o,i,r)=>{let s=i.hasOwnProperty(r);return i.constructor.createProperty(r,o),s?Object.getOwnPropertyDescriptor(i,r):void 0})(a,t,e)}function v(a){return _({...a,state:!0,attribute:!1})}function ne(a,t){return new Date(a.estimated_time).getTime()-new Date(t.estimated_time).getTime()}function Qe(a,t){let e=new Map;for(let i of t)e.set(i,[]);for(let i of a){let r=e.get(i.stop_id)??[];r.push(i),e.set(i.stop_id,r)}let o=[];for(;[...e.values()].some(i=>i.length>0);)for(let i of e.values()){let r=i.shift();r&&o.push(r)}return o}function le(a,t,e,o){let i=t==="hide"?a.filter(r=>!r.cancelled):[...a];return e==="balanced"?i=Qe(i,o):e==="route"?i.sort((r,s)=>r.route_name.localeCompare(s.route_name,void 0,{numeric:!0})||ne(r,s)):e==="realtime"?i.sort((r,s)=>Number(s.realtime)-Number(r.realtime)||ne(r,s)):i.sort(ne),t==="move"&&i.sort((r,s)=>Number(r.cancelled)-Number(s.cancelled)),i}function ze(a){let t=new Map;for(let e of a){let o=e.route_name.trim();if(!o)continue;let i=t.get(o);i?i.count+=1:t.set(o,{name:o,count:1,color:e.route_color,textColor:e.route_text_color})}return[...t.values()].sort((e,o)=>e.name.localeCompare(o.name,void 0,{numeric:!0,sensitivity:"base"}))}function ce(a,t){return t.size===0?a:a.filter(e=>t.has(e.route_name.trim()))}function Oe(a,t,e=Date.now()){return a?e-new Date(a).getTime()>t*6e4:!0}function Me(a,t=1){let e=!a.cancelled&&a.delay_seconds>=t*60;return{delayed:e,displayTime:a.cancelled?a.scheduled_time:a.estimated_time,scheduledTime:e?a.scheduled_time:void 0,delayMinutes:e?Math.round(a.delay_seconds/60):void 0}}function Pe(a,t=[]){return[...new Set([...t,...Object.keys(a.states)])].find(o=>{let i=a.states[o]?.attributes;return Array.isArray(i?.stops)&&Array.isArray(i?.departures)})}var De=`/* required styles */\r
\r
.leaflet-pane,\r
.leaflet-tile,\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow,\r
.leaflet-tile-container,\r
.leaflet-pane > svg,\r
.leaflet-pane > canvas,\r
.leaflet-zoom-box,\r
.leaflet-image-layer,\r
.leaflet-layer {\r
	position: absolute;\r
	left: 0;\r
	top: 0;\r
	}\r
.leaflet-container {\r
	overflow: hidden;\r
	}\r
.leaflet-tile,\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow {\r
	-webkit-user-select: none;\r
	   -moz-user-select: none;\r
	        user-select: none;\r
	  -webkit-user-drag: none;\r
	}\r
/* Prevents IE11 from highlighting tiles in blue */\r
.leaflet-tile::selection {\r
	background: transparent;\r
}\r
/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\r
.leaflet-safari .leaflet-tile {\r
	image-rendering: -webkit-optimize-contrast;\r
	}\r
/* hack that prevents hw layers "stretching" when loading new tiles */\r
.leaflet-safari .leaflet-tile-container {\r
	width: 1600px;\r
	height: 1600px;\r
	-webkit-transform-origin: 0 0;\r
	}\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow {\r
	display: block;\r
	}\r
/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\r
/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\r
.leaflet-container .leaflet-overlay-pane svg {\r
	max-width: none !important;\r
	max-height: none !important;\r
	}\r
.leaflet-container .leaflet-marker-pane img,\r
.leaflet-container .leaflet-shadow-pane img,\r
.leaflet-container .leaflet-tile-pane img,\r
.leaflet-container img.leaflet-image-layer,\r
.leaflet-container .leaflet-tile {\r
	max-width: none !important;\r
	max-height: none !important;\r
	width: auto;\r
	padding: 0;\r
	}\r
\r
.leaflet-container img.leaflet-tile {\r
	/* See: https://bugs.chromium.org/p/chromium/issues/detail?id=600120 */\r
	mix-blend-mode: plus-lighter;\r
}\r
\r
.leaflet-container.leaflet-touch-zoom {\r
	-ms-touch-action: pan-x pan-y;\r
	touch-action: pan-x pan-y;\r
	}\r
.leaflet-container.leaflet-touch-drag {\r
	-ms-touch-action: pinch-zoom;\r
	/* Fallback for FF which doesn't support pinch-zoom */\r
	touch-action: none;\r
	touch-action: pinch-zoom;\r
}\r
.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\r
	-ms-touch-action: none;\r
	touch-action: none;\r
}\r
.leaflet-container {\r
	-webkit-tap-highlight-color: transparent;\r
}\r
.leaflet-container a {\r
	-webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);\r
}\r
.leaflet-tile {\r
	filter: inherit;\r
	visibility: hidden;\r
	}\r
.leaflet-tile-loaded {\r
	visibility: inherit;\r
	}\r
.leaflet-zoom-box {\r
	width: 0;\r
	height: 0;\r
	-moz-box-sizing: border-box;\r
	     box-sizing: border-box;\r
	z-index: 800;\r
	}\r
/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\r
.leaflet-overlay-pane svg {\r
	-moz-user-select: none;\r
	}\r
\r
.leaflet-pane         { z-index: 400; }\r
\r
.leaflet-tile-pane    { z-index: 200; }\r
.leaflet-overlay-pane { z-index: 400; }\r
.leaflet-shadow-pane  { z-index: 500; }\r
.leaflet-marker-pane  { z-index: 600; }\r
.leaflet-tooltip-pane   { z-index: 650; }\r
.leaflet-popup-pane   { z-index: 700; }\r
\r
.leaflet-map-pane canvas { z-index: 100; }\r
.leaflet-map-pane svg    { z-index: 200; }\r
\r
.leaflet-vml-shape {\r
	width: 1px;\r
	height: 1px;\r
	}\r
.lvml {\r
	behavior: url(#default#VML);\r
	display: inline-block;\r
	position: absolute;\r
	}\r
\r
\r
/* control positioning */\r
\r
.leaflet-control {\r
	position: relative;\r
	z-index: 800;\r
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r
	pointer-events: auto;\r
	}\r
.leaflet-top,\r
.leaflet-bottom {\r
	position: absolute;\r
	z-index: 1000;\r
	pointer-events: none;\r
	}\r
.leaflet-top {\r
	top: 0;\r
	}\r
.leaflet-right {\r
	right: 0;\r
	}\r
.leaflet-bottom {\r
	bottom: 0;\r
	}\r
.leaflet-left {\r
	left: 0;\r
	}\r
.leaflet-control {\r
	float: left;\r
	clear: both;\r
	}\r
.leaflet-right .leaflet-control {\r
	float: right;\r
	}\r
.leaflet-top .leaflet-control {\r
	margin-top: 10px;\r
	}\r
.leaflet-bottom .leaflet-control {\r
	margin-bottom: 10px;\r
	}\r
.leaflet-left .leaflet-control {\r
	margin-left: 10px;\r
	}\r
.leaflet-right .leaflet-control {\r
	margin-right: 10px;\r
	}\r
\r
\r
/* zoom and fade animations */\r
\r
.leaflet-fade-anim .leaflet-popup {\r
	opacity: 0;\r
	-webkit-transition: opacity 0.2s linear;\r
	   -moz-transition: opacity 0.2s linear;\r
	        transition: opacity 0.2s linear;\r
	}\r
.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\r
	opacity: 1;\r
	}\r
.leaflet-zoom-animated {\r
	-webkit-transform-origin: 0 0;\r
	    -ms-transform-origin: 0 0;\r
	        transform-origin: 0 0;\r
	}\r
svg.leaflet-zoom-animated {\r
	will-change: transform;\r
}\r
\r
.leaflet-zoom-anim .leaflet-zoom-animated {\r
	-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\r
	   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\r
	        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\r
	}\r
.leaflet-zoom-anim .leaflet-tile,\r
.leaflet-pan-anim .leaflet-tile {\r
	-webkit-transition: none;\r
	   -moz-transition: none;\r
	        transition: none;\r
	}\r
\r
.leaflet-zoom-anim .leaflet-zoom-hide {\r
	visibility: hidden;\r
	}\r
\r
\r
/* cursors */\r
\r
.leaflet-interactive {\r
	cursor: pointer;\r
	}\r
.leaflet-grab {\r
	cursor: -webkit-grab;\r
	cursor:    -moz-grab;\r
	cursor:         grab;\r
	}\r
.leaflet-crosshair,\r
.leaflet-crosshair .leaflet-interactive {\r
	cursor: crosshair;\r
	}\r
.leaflet-popup-pane,\r
.leaflet-control {\r
	cursor: auto;\r
	}\r
.leaflet-dragging .leaflet-grab,\r
.leaflet-dragging .leaflet-grab .leaflet-interactive,\r
.leaflet-dragging .leaflet-marker-draggable {\r
	cursor: move;\r
	cursor: -webkit-grabbing;\r
	cursor:    -moz-grabbing;\r
	cursor:         grabbing;\r
	}\r
\r
/* marker & overlays interactivity */\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow,\r
.leaflet-image-layer,\r
.leaflet-pane > svg path,\r
.leaflet-tile-container {\r
	pointer-events: none;\r
	}\r
\r
.leaflet-marker-icon.leaflet-interactive,\r
.leaflet-image-layer.leaflet-interactive,\r
.leaflet-pane > svg path.leaflet-interactive,\r
svg.leaflet-image-layer.leaflet-interactive path {\r
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r
	pointer-events: auto;\r
	}\r
\r
/* visual tweaks */\r
\r
.leaflet-container {\r
	background: #ddd;\r
	outline-offset: 1px;\r
	}\r
.leaflet-container a {\r
	color: #0078A8;\r
	}\r
.leaflet-zoom-box {\r
	border: 2px dotted #38f;\r
	background: rgba(255,255,255,0.5);\r
	}\r
\r
\r
/* general typography */\r
.leaflet-container {\r
	font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;\r
	font-size: 12px;\r
	font-size: 0.75rem;\r
	line-height: 1.5;\r
	}\r
\r
\r
/* general toolbar styles */\r
\r
.leaflet-bar {\r
	box-shadow: 0 1px 5px rgba(0,0,0,0.65);\r
	border-radius: 4px;\r
	}\r
.leaflet-bar a {\r
	background-color: #fff;\r
	border-bottom: 1px solid #ccc;\r
	width: 26px;\r
	height: 26px;\r
	line-height: 26px;\r
	display: block;\r
	text-align: center;\r
	text-decoration: none;\r
	color: black;\r
	}\r
.leaflet-bar a,\r
.leaflet-control-layers-toggle {\r
	background-position: 50% 50%;\r
	background-repeat: no-repeat;\r
	display: block;\r
	}\r
.leaflet-bar a:hover,\r
.leaflet-bar a:focus {\r
	background-color: #f4f4f4;\r
	}\r
.leaflet-bar a:first-child {\r
	border-top-left-radius: 4px;\r
	border-top-right-radius: 4px;\r
	}\r
.leaflet-bar a:last-child {\r
	border-bottom-left-radius: 4px;\r
	border-bottom-right-radius: 4px;\r
	border-bottom: none;\r
	}\r
.leaflet-bar a.leaflet-disabled {\r
	cursor: default;\r
	background-color: #f4f4f4;\r
	color: #bbb;\r
	}\r
\r
.leaflet-touch .leaflet-bar a {\r
	width: 30px;\r
	height: 30px;\r
	line-height: 30px;\r
	}\r
.leaflet-touch .leaflet-bar a:first-child {\r
	border-top-left-radius: 2px;\r
	border-top-right-radius: 2px;\r
	}\r
.leaflet-touch .leaflet-bar a:last-child {\r
	border-bottom-left-radius: 2px;\r
	border-bottom-right-radius: 2px;\r
	}\r
\r
/* zoom control */\r
\r
.leaflet-control-zoom-in,\r
.leaflet-control-zoom-out {\r
	font: bold 18px 'Lucida Console', Monaco, monospace;\r
	text-indent: 1px;\r
	}\r
\r
.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {\r
	font-size: 22px;\r
	}\r
\r
\r
/* layers control */\r
\r
.leaflet-control-layers {\r
	box-shadow: 0 1px 5px rgba(0,0,0,0.4);\r
	background: #fff;\r
	border-radius: 5px;\r
	}\r
.leaflet-control-layers-toggle {\r
	background-image: url(images/layers.png);\r
	width: 36px;\r
	height: 36px;\r
	}\r
.leaflet-retina .leaflet-control-layers-toggle {\r
	background-image: url(images/layers-2x.png);\r
	background-size: 26px 26px;\r
	}\r
.leaflet-touch .leaflet-control-layers-toggle {\r
	width: 44px;\r
	height: 44px;\r
	}\r
.leaflet-control-layers .leaflet-control-layers-list,\r
.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\r
	display: none;\r
	}\r
.leaflet-control-layers-expanded .leaflet-control-layers-list {\r
	display: block;\r
	position: relative;\r
	}\r
.leaflet-control-layers-expanded {\r
	padding: 6px 10px 6px 6px;\r
	color: #333;\r
	background: #fff;\r
	}\r
.leaflet-control-layers-scrollbar {\r
	overflow-y: scroll;\r
	overflow-x: hidden;\r
	padding-right: 5px;\r
	}\r
.leaflet-control-layers-selector {\r
	margin-top: 2px;\r
	position: relative;\r
	top: 1px;\r
	}\r
.leaflet-control-layers label {\r
	display: block;\r
	font-size: 13px;\r
	font-size: 1.08333em;\r
	}\r
.leaflet-control-layers-separator {\r
	height: 0;\r
	border-top: 1px solid #ddd;\r
	margin: 5px -10px 5px -6px;\r
	}\r
\r
/* Default icon URLs */\r
.leaflet-default-icon-path { /* used only in path-guessing heuristic, see L.Icon.Default */\r
	background-image: url(images/marker-icon.png);\r
	}\r
\r
\r
/* attribution and scale controls */\r
\r
.leaflet-container .leaflet-control-attribution {\r
	background: #fff;\r
	background: rgba(255, 255, 255, 0.8);\r
	margin: 0;\r
	}\r
.leaflet-control-attribution,\r
.leaflet-control-scale-line {\r
	padding: 0 5px;\r
	color: #333;\r
	line-height: 1.4;\r
	}\r
.leaflet-control-attribution a {\r
	text-decoration: none;\r
	}\r
.leaflet-control-attribution a:hover,\r
.leaflet-control-attribution a:focus {\r
	text-decoration: underline;\r
	}\r
.leaflet-attribution-flag {\r
	display: inline !important;\r
	vertical-align: baseline !important;\r
	width: 1em;\r
	height: 0.6669em;\r
	}\r
.leaflet-left .leaflet-control-scale {\r
	margin-left: 5px;\r
	}\r
.leaflet-bottom .leaflet-control-scale {\r
	margin-bottom: 5px;\r
	}\r
.leaflet-control-scale-line {\r
	border: 2px solid #777;\r
	border-top: none;\r
	line-height: 1.1;\r
	padding: 2px 5px 1px;\r
	white-space: nowrap;\r
	-moz-box-sizing: border-box;\r
	     box-sizing: border-box;\r
	background: rgba(255, 255, 255, 0.8);\r
	text-shadow: 1px 1px #fff;\r
	}\r
.leaflet-control-scale-line:not(:first-child) {\r
	border-top: 2px solid #777;\r
	border-bottom: none;\r
	margin-top: -2px;\r
	}\r
.leaflet-control-scale-line:not(:first-child):not(:last-child) {\r
	border-bottom: 2px solid #777;\r
	}\r
\r
.leaflet-touch .leaflet-control-attribution,\r
.leaflet-touch .leaflet-control-layers,\r
.leaflet-touch .leaflet-bar {\r
	box-shadow: none;\r
	}\r
.leaflet-touch .leaflet-control-layers,\r
.leaflet-touch .leaflet-bar {\r
	border: 2px solid rgba(0,0,0,0.2);\r
	background-clip: padding-box;\r
	}\r
\r
\r
/* popup */\r
\r
.leaflet-popup {\r
	position: absolute;\r
	text-align: center;\r
	margin-bottom: 20px;\r
	}\r
.leaflet-popup-content-wrapper {\r
	padding: 1px;\r
	text-align: left;\r
	border-radius: 12px;\r
	}\r
.leaflet-popup-content {\r
	margin: 13px 24px 13px 20px;\r
	line-height: 1.3;\r
	font-size: 13px;\r
	font-size: 1.08333em;\r
	min-height: 1px;\r
	}\r
.leaflet-popup-content p {\r
	margin: 17px 0;\r
	margin: 1.3em 0;\r
	}\r
.leaflet-popup-tip-container {\r
	width: 40px;\r
	height: 20px;\r
	position: absolute;\r
	left: 50%;\r
	margin-top: -1px;\r
	margin-left: -20px;\r
	overflow: hidden;\r
	pointer-events: none;\r
	}\r
.leaflet-popup-tip {\r
	width: 17px;\r
	height: 17px;\r
	padding: 1px;\r
\r
	margin: -10px auto 0;\r
	pointer-events: auto;\r
\r
	-webkit-transform: rotate(45deg);\r
	   -moz-transform: rotate(45deg);\r
	    -ms-transform: rotate(45deg);\r
	        transform: rotate(45deg);\r
	}\r
.leaflet-popup-content-wrapper,\r
.leaflet-popup-tip {\r
	background: white;\r
	color: #333;\r
	box-shadow: 0 3px 14px rgba(0,0,0,0.4);\r
	}\r
.leaflet-container a.leaflet-popup-close-button {\r
	position: absolute;\r
	top: 0;\r
	right: 0;\r
	border: none;\r
	text-align: center;\r
	width: 24px;\r
	height: 24px;\r
	font: 16px/24px Tahoma, Verdana, sans-serif;\r
	color: #757575;\r
	text-decoration: none;\r
	background: transparent;\r
	}\r
.leaflet-container a.leaflet-popup-close-button:hover,\r
.leaflet-container a.leaflet-popup-close-button:focus {\r
	color: #585858;\r
	}\r
.leaflet-popup-scrolled {\r
	overflow: auto;\r
	}\r
\r
.leaflet-oldie .leaflet-popup-content-wrapper {\r
	-ms-zoom: 1;\r
	}\r
.leaflet-oldie .leaflet-popup-tip {\r
	width: 24px;\r
	margin: 0 auto;\r
\r
	-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";\r
	filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\r
	}\r
\r
.leaflet-oldie .leaflet-control-zoom,\r
.leaflet-oldie .leaflet-control-layers,\r
.leaflet-oldie .leaflet-popup-content-wrapper,\r
.leaflet-oldie .leaflet-popup-tip {\r
	border: 1px solid #999;\r
	}\r
\r
\r
/* div icon */\r
\r
.leaflet-div-icon {\r
	background: #fff;\r
	border: 1px solid #666;\r
	}\r
\r
\r
/* Tooltip */\r
/* Base styles for the element that has a tooltip */\r
.leaflet-tooltip {\r
	position: absolute;\r
	padding: 6px;\r
	background-color: #fff;\r
	border: 1px solid #fff;\r
	border-radius: 3px;\r
	color: #222;\r
	white-space: nowrap;\r
	-webkit-user-select: none;\r
	-moz-user-select: none;\r
	-ms-user-select: none;\r
	user-select: none;\r
	pointer-events: none;\r
	box-shadow: 0 1px 3px rgba(0,0,0,0.4);\r
	}\r
.leaflet-tooltip.leaflet-interactive {\r
	cursor: pointer;\r
	pointer-events: auto;\r
	}\r
.leaflet-tooltip-top:before,\r
.leaflet-tooltip-bottom:before,\r
.leaflet-tooltip-left:before,\r
.leaflet-tooltip-right:before {\r
	position: absolute;\r
	pointer-events: none;\r
	border: 6px solid transparent;\r
	background: transparent;\r
	content: "";\r
	}\r
\r
/* Directions */\r
\r
.leaflet-tooltip-bottom {\r
	margin-top: 6px;\r
}\r
.leaflet-tooltip-top {\r
	margin-top: -6px;\r
}\r
.leaflet-tooltip-bottom:before,\r
.leaflet-tooltip-top:before {\r
	left: 50%;\r
	margin-left: -6px;\r
	}\r
.leaflet-tooltip-top:before {\r
	bottom: 0;\r
	margin-bottom: -12px;\r
	border-top-color: #fff;\r
	}\r
.leaflet-tooltip-bottom:before {\r
	top: 0;\r
	margin-top: -12px;\r
	margin-left: -6px;\r
	border-bottom-color: #fff;\r
	}\r
.leaflet-tooltip-left {\r
	margin-left: -6px;\r
}\r
.leaflet-tooltip-right {\r
	margin-left: 6px;\r
}\r
.leaflet-tooltip-left:before,\r
.leaflet-tooltip-right:before {\r
	top: 50%;\r
	margin-top: -6px;\r
	}\r
.leaflet-tooltip-left:before {\r
	right: 0;\r
	margin-right: -12px;\r
	border-left-color: #fff;\r
	}\r
.leaflet-tooltip-right:before {\r
	left: 0;\r
	margin-left: -12px;\r
	border-right-color: #fff;\r
	}\r
\r
/* Printing */\r
\r
@media print {\r
	/* Prevent printers from removing background-images of controls. */\r
	.leaflet-control {\r
		-webkit-print-color-adjust: exact;\r
		print-color-adjust: exact;\r
		}\r
	}\r
`;function tt(a){return`/api/map_tiles/raster/{z}/{x}/{y}.png?token=${encodeURIComponent(a)}`}var de="#0698E4",ot="#0479B5",it="#757575",pe="#FFFFFF",rt=`
  <div class="translink-map-bus-marker" aria-hidden="true">
    <ha-icon icon="mdi:bus"></ha-icon>
  </div>
`,x=class extends b{constructor(){super(...arguments);this.entryId="";this.tilesUnavailable=!1;this.expanded=!1;this.handleKeydown=e=>{e.key==="Escape"&&this.close()}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleKeydown)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeydown),this.map?.remove(),super.disconnectedCallback()}firstUpdated(){this.load()}updated(){this.data&&!this.map&&!this.error&&requestAnimationFrame(()=>void this.createMap())}render(){let e=this.departure?.destination||this.departure?.route_long_name||"";return d`
      <div class="backdrop" @click=${this.backdropClicked}>
        <section
          class="dialog ${this.expanded?"expanded":""}"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trip-map-title"
        >
          <header
            role="button"
            tabindex="0"
            aria-label=${this.expanded?"Restore map dialog size":"Expand map dialog"}
            aria-expanded=${String(this.expanded)}
            @click=${this.toggleExpanded}
            @keydown=${this.headerKeydown}
          >
            <div>
              <div class="eyebrow">Route ${this.departure?.route_name}</div>
              <h2 id="trip-map-title">${e}</h2>
            </div>
            <button
              type="button"
              aria-label="Close route map"
              @click=${this.closeClicked}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          ${this.error?d`<div class="state error" role="alert">
                <ha-icon icon="mdi:map-marker-alert"></ha-icon>
                <div>
                  <strong>Route map unavailable</strong>
                  <span>${this.error}</span>
                </div>
              </div>`:this.data?d`
                  <div class="map" aria-label="Planned route map"></div>
                  <footer>
                    <div class=${this.data.vehicle?"live":"unavailable"}>
                      <ha-icon
                        icon=${this.data.vehicle?"mdi:bus-marker":"mdi:bus-alert"}
                      ></ha-icon>
                      <span>
                        <strong>
                          ${this.data.vehicle?this.vehicleLabel(this.data):"Live vehicle position unavailable"}
                        </strong>
                        ${this.data.vehicle?.timestamp?d`<small>
                              Last reported
                              ${this.positionAge(this.data.vehicle.timestamp)}
                            </small>`:this.data.vehicle_error?d`<small>${this.data.vehicle_error}</small>`:c}
                      </span>
                    </div>
                    ${this.tilesUnavailable?d`<small class="tile-warning">
                          Basemap tiles could not be loaded. Route geometry is
                          still shown.
                        </small>`:c}
                  </footer>
                `:d`<div class="state" role="status">
                  <ha-circular-progress active></ha-circular-progress>
                  Loading planned route and vehicle position...
                </div>`}
        </section>
      </div>
    `}async load(){if(!this.hass?.callApi||!this.departure||!this.entryId){this.error="This departure is missing map identity data.";return}let e=new URLSearchParams({entry_id:this.entryId,trip_id:this.departure.trip_id,stop_id:this.departure.stop_id});try{let[o,i]=await Promise.all([this.hass.callApi("GET",`translink_schedule/trip-map?${e}`),this.loadMapTilesToken()]);this.mapTilesToken=i,this.data=o}catch(o){this.error=o instanceof Error?o.message:"Unable to load map data."}}async loadMapTilesToken(){if(this.hass?.connection)try{return(await this.hass.connection.sendMessagePromise({type:"map_tiles/access_token"})).token}catch{return}}async createMap(){let e=this.renderRoot.querySelector(".map");if(!(!e||!this.data||this.map))try{let i=(await import("./chunks/leaflet-src-ECJ6RXIK.js")).default;if(!this.isConnected||this.map)return;this.leaflet=i;let r=this.data.shape.map(s=>[s.latitude,s.longitude]);this.map=i.map(e,{attributionControl:!0,zoomControl:!0}),this.mapTilesToken?i.tileLayer(tt(this.mapTilesToken),{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxNativeZoom:19,maxZoom:20}).on("tileerror",()=>{this.tilesUnavailable=!0}).addTo(this.map):this.tilesUnavailable=!0,i.polyline(r,{color:ot,opacity:1,weight:8,lineCap:"round",lineJoin:"round"}).addTo(this.map),i.polyline(r,{color:de,opacity:1,weight:6,lineCap:"round",lineJoin:"round"}).addTo(this.map),this.addPoint(this.data.shape[0],"Route start",{color:de,fillColor:pe,radius:6,weight:3}),this.addPoint(this.data.boarding_stop,`Board at ${this.data.boarding_stop.name}`,{color:pe,fillColor:de,radius:7,weight:3}),this.addPoint(this.data.destination_point,this.data.destination,{color:it,fillColor:pe,radius:8,weight:3}),this.data.vehicle&&i.marker([this.data.vehicle.latitude,this.data.vehicle.longitude],{icon:i.divIcon({className:"translink-map-bus-icon",html:rt,iconAnchor:[20,20],iconSize:[40,40],tooltipAnchor:[0,-20]}),keyboard:!0,title:this.vehicleLabel(this.data)}).bindTooltip(this.vehicleLabel(this.data)).addTo(this.map),this.map.fitBounds(i.latLngBounds(r),{padding:[24,24]})}catch(o){this.error=o instanceof Error?`Unable to initialize route map: ${o.message}`:"Unable to initialize route map."}}addPoint(e,o,i){let r=this.leaflet;r&&r.circleMarker([e.latitude,e.longitude],{className:"translink-map-node",color:i.color,fillColor:i.fillColor,fillOpacity:1,radius:i.radius,weight:i.weight}).bindTooltip(o).addTo(this.map)}vehicleLabel(e){let o=e.vehicle?.vehicle_label??e.vehicle?.vehicle_id;return o?`Bus ${o}`:"Last reported bus position"}positionAge(e){let o=Math.max(0,Math.round((Date.now()-new Date(e).getTime())/1e3));return o<60?`${o} sec ago`:`${Math.round(o/60)} min ago`}backdropClicked(e){e.target===e.currentTarget&&this.close()}toggleExpanded(){this.expanded=!this.expanded,this.updateComplete.then(()=>this.refitMap())}headerKeydown(e){e.target===e.currentTarget&&(e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),this.toggleExpanded()))}refitMap(){if(!this.map||!this.leaflet||!this.data)return;let e=this.leaflet.latLngBounds(this.data.shape.map(o=>[o.latitude,o.longitude]));this.map.invalidateSize(),this.map.fitBounds(e,{padding:[24,24]})}closeClicked(e){e.stopPropagation(),this.close()}close(){this.remove()}static{this.styles=[B(De),C`
    :host {
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .backdrop {
      align-items: center;
      background: rgb(0 0 0 / 45%);
      display: flex;
      inset: 0;
      justify-content: center;
      padding: 16px;
      position: fixed;
      z-index: 10000;
    }
    .dialog {
      background: var(--card-background-color, #fff);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, 0 12px 36px rgb(0 0 0 / 35%));
      max-height: calc(100vh - 32px);
      max-width: 760px;
      overflow: hidden;
      width: 100%;
    }
    .dialog.expanded {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 32px);
      max-width: none;
      width: calc(100vw - 32px);
    }
    header {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding: 16px 20px 14px;
    }
    header { cursor: pointer; }
    header:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .eyebrow {
      color: var(--primary-color);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .06em;
      text-transform: uppercase;
    }
    h2 { font-size: 20px; margin: 3px 0 0; }
    button {
      background: transparent;
      border: 0;
      border-radius: 50%;
      color: var(--primary-text-color);
      cursor: pointer;
      height: 40px;
      width: 40px;
    }
    button:hover { background: var(--secondary-background-color); }
    button:focus-visible { outline: 2px solid var(--primary-color); }
    .map { height: min(58vh, 520px); min-height: 320px; }
    .expanded .map {
      flex: 1 1 auto;
      height: auto;
      min-height: 0;
    }
    .state {
      align-items: center;
      display: flex;
      gap: 14px;
      justify-content: center;
      min-height: 320px;
      padding: 24px;
    }
    .state ha-icon { --mdc-icon-size: 30px; }
    .state div, footer span { display: flex; flex-direction: column; }
    .state span, footer small { color: var(--secondary-text-color); }
    .error ha-icon { color: var(--error-color); }
    footer { padding: 12px 18px 14px; }
    footer > div {
      align-items: center;
      display: flex;
      gap: 10px;
    }
    footer ha-icon { color: var(--primary-color); }
    .unavailable ha-icon, .tile-warning { color: var(--warning-color, #f59e0b); }
    .tile-warning { display: block; margin-top: 8px; }
    .leaflet-container { font-family: inherit; }
    .leaflet-control-container { font-size: 11px; }
    .translink-map-node {
      filter: drop-shadow(0 1px 2px rgb(0 0 0 / 45%));
    }
    .translink-map-bus-icon {
      background: transparent;
      border: 0;
    }
    .translink-map-bus-marker {
      align-items: center;
      background: #fff;
      border: 2px solid #dadce0;
      border-radius: 50%;
      box-shadow:
        0 1px 2px rgb(60 64 67 / 30%),
        0 2px 6px rgb(60 64 67 / 18%);
      display: flex;
      height: 36px;
      justify-content: center;
      width: 36px;
    }
    .translink-map-bus-marker ha-icon {
      --mdc-icon-size: 24px;
      color: #3c4043;
    }
    @media (max-width: 600px) {
      .backdrop { align-items: flex-end; padding: 0; }
      .dialog { border-radius: 16px 16px 0 0; max-height: 92vh; }
      .dialog.expanded {
        border-radius: 0;
        height: 100vh;
        max-height: 100vh;
        width: 100vw;
      }
      .map { height: 56vh; min-height: 280px; }
      .expanded .map { height: auto; min-height: 0; }
    }
    `]}};f([_({attribute:!1})],x.prototype,"hass",2),f([_()],x.prototype,"entryId",2),f([_({attribute:!1})],x.prototype,"departure",2),f([v()],x.prototype,"data",2),f([v()],x.prototype,"error",2),f([v()],x.prototype,"tilesUnavailable",2),f([v()],x.prototype,"expanded",2);customElements.get("translink-trip-map-dialog")||customElements.define("translink-trip-map-dialog",x);var G=3,Ne=12,ue=12,fe=5,Ue=60,at=[{value:"grouped",label:"Grouped by stop"},{value:"combined",label:"Combined by time"}],st=[{value:"chronological",label:"Chronological"},{value:"balanced",label:"Balance stops"},{value:"route",label:"Group routes"},{value:"realtime",label:"Realtime first"}],nt=[{value:"both",label:"Countdown and clock"},{value:"countdown",label:"Countdown only"},{value:"clock",label:"Clock only"}],lt=[{value:"compact",label:"+7 min"},{value:"text",label:"7 min late"}],ct=[{value:"show",label:"Show in schedule order"},{value:"move",label:"Move below active departures"},{value:"hide",label:"Hide"}],dt=[{value:"comfortable",label:"Comfortable"},{value:"compact",label:"Compact"},{value:"minimal",label:"Minimal"}],pt=[{value:"official",label:"Official route colors"},{value:"theme",label:"Theme primary color"},{value:"monochrome",label:"Monochrome"}],ht=[{value:"multiple",label:"Allow multiple routes"},{value:"single",label:"One route at a time"}],ut=[{value:"show",label:"Show in configured order"},{value:"move",label:"Move to bottom"},{value:"hide",label:"Hide"}],ft=[{value:"primary",label:"Theme primary"},{value:"surface",label:"Card surface"},{value:"transparent",label:"Transparent"}],mt=[{value:"accent",label:"Accent"},{value:"plain",label:"Plain"},{value:"compact",label:"Compact"}];function gt(a,t=Date.now()){return Math.max(0,Math.round((new Date(a).getTime()-t)/6e4))}function bt(a,t=Date.now()){let e=gt(a,t);return e===0?"Now":`${e} min`}function he(a,t){let e=t?.time_format==="12"?!0:t?.time_format==="24"?!1:void 0;return new Intl.DateTimeFormat(t?.language,{hour:"numeric",hour12:e,minute:"2-digit"}).format(new Date(a))}var E=class extends b{constructor(){super(...arguments);this.collapsedStops=new Set;this.selectedRoutes=new Set;this.initializedStops=new Set}static async getConfigElement(){return document.createElement("translink-schedule-card-editor")}static getStubConfig(e,o=[]){return{entity:Pe(e,o)??"",view:"grouped",departures_per_stop:G}}getGridOptions(){return{columns:12,min_columns:6}}setConfig(e){if(!e.entity)throw new Error("A TransLink Schedule entity is required");let o=e.route_filter_selection_mode??"multiple";this.config?.entity!==e.entity?(this.collapsedStops=new Set,this.initializedStops.clear(),this.resetRouteFilter()):(this.config?.show_route_filter&&e.show_route_filter!==!0||this.config?.route_filter_selection_mode!==o)&&this.resetRouteFilter(),this.config={view:"grouped",departures_per_stop:G,max_departures:ue,time_display:"both",show_scheduled_time:!0,delay_threshold_minutes:1,delay_format:"compact",density:"comfortable",empty_stop_behavior:"show",cancelled_behavior:"show",route_color_mode:"official",show_route_filter:!1,route_filter_reset_minutes:fe,route_filter_selection_mode:"multiple",route_filter_show_counts:!1,combined_order:"chronological",show_header:!0,show_brand:!0,header_style:"primary",stop_heading_style:"accent",show_clock:!0,show_alerts:!0,show_stop_codes:!0,show_realtime_status:!1,show_stale_warning:!1,stale_after_minutes:3,...e},this.selectedRoutes.size>0&&this.scheduleRouteFilterReset()}connectedCallback(){super.connectedCallback(),this.ticker=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){this.ticker!==void 0&&window.clearInterval(this.ticker),this.clearRouteFilterResetTimer(),super.disconnectedCallback()}render(){if(!this.config||!this.hass)return c;let e=this.hass.states[this.config.entity];if(!e)return d`<ha-card><div class="message error">
        Entity ${this.config.entity} was not found.
      </div></ha-card>`;let o=e.attributes.stops??[],i=e.attributes.departures??[],r=i.length?i:o.flatMap(m=>m.departures),s=ze(r),n=this.activeSelectedRoutes(s),l=e.attributes.alerts??[],h=this.config.title??e.attributes.board_name??"TransLink departures",u=e.attributes.last_updated,p=this.config.show_stale_warning&&Oe(u,this.config.stale_after_minutes??3),g=[`density-${this.config.density}`,`header-${this.config.header_style}`,`routes-${this.config.route_color_mode}`,`stops-${this.config.stop_heading_style}`].join(" ");return d`
      <ha-card class=${g}>
        ${this.config.show_header?d`<header>
              <div class="header-title">
                ${this.config.header_icon?d`<ha-icon
                      .icon=${this.config.header_icon}
                      aria-hidden="true"
                    ></ha-icon>`:c}
                <div>
                  ${this.config.show_brand?d`<div class="eyebrow">TransLink</div>`:c}
                  <h1>${h}</h1>
                </div>
              </div>
              ${this.config.show_clock?d`<div class="clock">${he(new Date().toISOString(),this.hass.locale)}</div>`:c}
            </header>`:c}
        ${this.config.show_alerts&&l.length?d`<div class="alerts">
              ${l.map(m=>d`<div>
                  <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
                  <span>
                    <strong>${m.header}</strong>
                    ${m.description?d`<small>${m.description}</small>`:c}
                  </span>
                </div>`)}
            </div>`:c}
        ${p?d`<div class="stale" role="status">
              <ha-icon icon="mdi:cloud-alert" aria-hidden="true"></ha-icon>
              Realtime data has not updated recently.
            </div>`:c}
        ${this.config.show_route_filter&&s.length>0?this.renderRouteFilter(s,n):c}
        <main>
          ${this.config.view==="combined"?this.renderCombined(i,o,n):this.renderGrouped(o,n)}
        </main>
      </ha-card>
    `}renderRouteFilter(e,o){let i=this.config?.route_filter_show_counts===!0,r=e.reduce((s,n)=>s+n.count,0);return d`
      <nav class="route-filter" aria-label="Filter departures by route">
        <button
          type="button"
          class="route-filter-chip all"
          aria-pressed=${String(o.size===0)}
          @click=${()=>this.selectAllRoutes()}
        >
          All${i?d` <span>${r}</span>`:c}
        </button>
        ${e.map(s=>{let n=o.has(s.name),l=this.config?.route_color_mode==="official"&&n?[s.color?`background:#${s.color}`:"",s.textColor?`color:#${s.textColor}`:""].filter(Boolean).join(";"):"";return d`
            <button
              type="button"
              class="route-filter-chip"
              style=${l}
              aria-label="Filter route ${s.name}"
              aria-pressed=${String(n)}
              @click=${()=>this.toggleRoute(s.name)}
            >
              ${s.name}${i?d` <span>${s.count}</span>`:c}
            </button>
          `})}
      </nav>
    `}renderGrouped(e,o){let i=this.config?.empty_stop_behavior??(this.config?.hide_empty_stops?"hide":"show"),r=e.map(n=>({stop:n,departures:le(ce(n.departures,o),this.config?.cancelled_behavior??"show","chronological",[n.stop_id])}));i==="hide"?r=r.filter(({departures:n})=>n.length>0):i==="move"&&r.sort((n,l)=>+(n.departures.length===0)-+(l.departures.length===0));let s=r.map(({stop:n,departures:l})=>{let h=this.isStopCollapsed(n),u=n.departures_per_stop??this.config?.departures_per_stop??G;return d`
        <section class=${h?"collapsed":""}>
          <button
            class="stop-heading"
            type="button"
            aria-expanded=${String(!h)}
            @click=${()=>this.toggleStop(n.stop_id)}
          >
            <span class="stop-title">
              <ha-icon
                icon=${h?"mdi:chevron-right":"mdi:chevron-down"}
                aria-hidden="true"
              ></ha-icon>
              ${n.display_name||n.stop_name}
            </span>
            ${this.config?.show_stop_codes!==!1&&n.show_stop_code!==!1&&n.stop_code?d`<span class="stop-code">#${n.stop_code}</span>`:c}
          </button>
          ${h?c:l.length?l.slice(0,u).map(p=>this.renderDeparture(p,!1)):d`<div class="empty-stop">No upcoming departures</div>`}
        </section>
      `});return s.length?s:d`<div class="message">No upcoming departures.</div>`}renderCombined(e,o,i){let r=le(ce(e,i),this.config?.cancelled_behavior??"show",this.config?.combined_order??"chronological",o.map(s=>s.stop_id));return r.length===0?d`<div class="message">No upcoming departures.</div>`:d`
      <section>
        ${r.slice(0,this.config?.max_departures??ue).map(s=>this.renderDeparture(s,!0))}
      </section>
    `}renderDeparture(e,o){let i=this.config?.route_color_mode==="official"?[e.route_color?`background:#${e.route_color}`:"",e.route_text_color?`color:#${e.route_text_color}`:""].filter(Boolean).join(";"):"",r=Me(e,this.config?.delay_threshold_minutes),s=this.config?.time_display!=="clock",n=this.config?.time_display!=="countdown",l=e.destination||e.route_long_name,h=e.cancelled?"cancelled":r.delayed?`${r.delayMinutes} minutes late`:e.realtime?"live prediction":"scheduled",u=this.config?.delay_format==="text"?`${r.delayMinutes} min late`:`+${r.delayMinutes} min`;return d`
      <div
        class="departure ${e.cancelled?"cancelled":""}"
        role="button"
        tabindex="0"
        aria-label="Route ${e.route_name} to ${l}, ${h}. Open route map."
        @click=${()=>this.openTripMap(e)}
        @keydown=${p=>this.departureKeydown(p,e)}
      >
        <span class="route" style=${i}>${e.route_name}</span>
        <div class="destination">
          <strong>${l}</strong>
          ${o?d`<small>${e.stop_name}</small>`:c}
        </div>
        <div class="timing">
          ${e.cancelled?d`<strong>Cancelled</strong>`:s?d`<strong>${bt(e.estimated_time)}</strong>`:c}
          ${n?d`<small class="time-details ${s?"":"clock-only"}">
                ${r.scheduledTime&&this.config?.show_scheduled_time!==!1?d`<s>${he(r.scheduledTime,this.hass?.locale)}</s>`:c}
                <span class=${r.delayed?"predicted-time":""}>
                  ${he(r.displayTime,this.hass?.locale)}
                </span>
              </small>`:c}
          <small class="status-details">
            ${r.delayMinutes!==void 0?d`<span class="delay">${u}</span>`:c}
            ${this.config?.show_realtime_status?d`<span class="realtime ${e.realtime?"live":""}">
                  ${e.realtime?"Live":"Scheduled"}
                </span>`:c}
          </small>
        </div>
      </div>
    `}openTripMap(e){if(!this.hass||!this.config)return;document.querySelector("translink-trip-map-dialog")?.remove();let i=this.hass.states[this.config.entity]?.attributes.config_entry_id,r=document.createElement("translink-trip-map-dialog");r.hass=this.hass,r.entryId=typeof i=="string"?i:"",r.departure=e,document.body.append(r)}departureKeydown(e,o){e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),this.openTripMap(o))}isStopCollapsed(e){return this.initializedStops.has(e.stop_id)||(this.initializedStops.add(e.stop_id),e.collapsed&&this.collapsedStops.add(e.stop_id)),this.collapsedStops.has(e.stop_id)}toggleStop(e){let o=new Set(this.collapsedStops);o.has(e)?o.delete(e):o.add(e),this.collapsedStops=o}activeSelectedRoutes(e){let o=new Set(e.map(r=>r.name)),i=new Set([...this.selectedRoutes].filter(r=>o.has(r)));if(i.size!==this.selectedRoutes.size){this.selectedRoutes.clear();for(let r of i)this.selectedRoutes.add(r);i.size===0&&this.clearRouteFilterResetTimer()}return i}selectAllRoutes(){this.resetRouteFilter()}toggleRoute(e){let o=new Set(this.selectedRoutes);this.config?.route_filter_selection_mode==="single"?o.size===1&&o.has(e)?o.clear():(o.clear(),o.add(e)):o.has(e)?o.delete(e):o.add(e),this.selectedRoutes=o,o.size>0?this.scheduleRouteFilterReset():this.clearRouteFilterResetTimer()}resetRouteFilter(){this.clearRouteFilterResetTimer(),this.selectedRoutes.size>0&&(this.selectedRoutes=new Set)}scheduleRouteFilterReset(){this.clearRouteFilterResetTimer();let e=this.config?.route_filter_reset_minutes??fe;e<=0||(this.routeFilterResetTimer=window.setTimeout(()=>this.resetRouteFilter(),e*6e4))}clearRouteFilterResetTimer(){this.routeFilterResetTimer!==void 0&&(window.clearTimeout(this.routeFilterResetTimer),this.routeFilterResetTimer=void 0)}static{this.styles=C`
    :host {
      display: block;
      height: 100%;
      min-height: 0;
      width: 100%;
    }
    ha-card {
      background: var(--ha-card-background, var(--card-background-color));
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }
    header {
      align-items: center;
      background: var(--primary-color);
      color: var(--text-primary-color);
      display: flex;
      flex: 0 0 auto;
      justify-content: space-between;
      padding: 16px 20px;
    }
    .header-title, .stop-title {
      align-items: center;
      display: flex;
      gap: 8px;
    }
    .header-surface header {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
    }
    .header-transparent header {
      background: transparent;
      color: var(--primary-text-color);
    }
    .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; opacity: .8; text-transform: uppercase; }
    h1 { font-size: 20px; line-height: 1.2; margin: 2px 0 0; }
    .clock { font-size: 18px; font-variant-numeric: tabular-nums; font-weight: 600; }
    .alerts { background: var(--warning-color, #ff9800); color: #111; flex: 0 0 auto; padding: 8px 16px; }
    .alerts > div { align-items: flex-start; display: flex; gap: 8px; }
    .alerts > div + div { margin-top: 8px; }
    .alerts span { display: flex; flex-direction: column; }
    .alerts small { color: inherit; }
    .stale {
      align-items: center;
      background: var(--warning-color, #ff9800);
      color: #111;
      display: flex;
      flex: 0 0 auto;
      font-size: 12px;
      gap: 8px;
      padding: 7px 16px;
    }
    .route-filter {
      background: color-mix(in srgb, var(--card-background-color), var(--primary-color) 4%);
      border-bottom: 1px solid var(--divider-color);
      display: flex;
      flex: 0 0 auto;
      gap: 7px;
      overflow-x: auto;
      padding: 9px 12px;
      scrollbar-width: thin;
    }
    .route-filter-chip {
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--primary-text-color);
      cursor: pointer;
      flex: 0 0 auto;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      min-width: 38px;
      padding: 6px 11px;
    }
    .route-filter-chip[aria-pressed="true"] {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }
    .route-filter-chip:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .route-filter-chip span {
      color: inherit;
      font-size: 10px;
      margin-left: 3px;
      opacity: .78;
    }
    .routes-theme .route-filter-chip[aria-pressed="true"] {
      background: var(--primary-color) !important;
      color: var(--text-primary-color) !important;
    }
    .routes-monochrome .route-filter-chip[aria-pressed="true"] {
      background: var(--primary-text-color) !important;
      color: var(--card-background-color) !important;
    }
    main {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      padding: 4px 0;
    }
    section + section { border-top: 1px solid var(--divider-color); }
    .stop-heading {
      align-items: baseline;
      background: color-mix(in srgb, var(--card-background-color), var(--primary-color) 7%);
      border: 0;
      color: var(--primary-text-color);
      cursor: pointer;
      display: flex;
      font-family: inherit;
      font-size: 14px;
      font-weight: 700;
      justify-content: space-between;
      padding: 9px 16px;
      text-align: left;
      width: 100%;
    }
    .stop-heading:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
    .stop-title ha-icon { --mdc-icon-size: 17px; }
    .stops-plain .stop-heading { background: transparent; }
    .stops-compact .stop-heading {
      background: transparent;
      font-size: 12px;
      padding-block: 5px;
    }
    .stop-code { color: var(--secondary-text-color); font-size: 12px; font-weight: 500; }
    .departure {
      align-items: center;
      cursor: pointer;
      display: grid;
      gap: 12px;
      grid-template-columns: minmax(42px, auto) 1fr auto;
      min-height: 48px;
      padding: 6px 16px;
    }
    .departure:hover {
      background: color-mix(
        in srgb,
        var(--card-background-color),
        var(--primary-color) 6%
      );
    }
    .departure:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .departure + .departure { border-top: 1px solid var(--divider-color); }
    .route {
      background: var(--primary-color);
      border-radius: 5px;
      color: var(--text-primary-color);
      font-size: 13px;
      font-weight: 800;
      min-width: 30px;
      padding: 5px 7px;
      text-align: center;
    }
    .routes-theme .route {
      background: var(--primary-color) !important;
      color: var(--text-primary-color) !important;
    }
    .routes-monochrome .route {
      background: var(--secondary-background-color) !important;
      color: var(--primary-text-color) !important;
    }
    .destination, .timing { display: flex; flex-direction: column; min-width: 0; }
    .destination strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    small { color: var(--secondary-text-color); font-size: 11px; }
    .timing { align-items: flex-end; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .time-details { align-items: baseline; display: flex; gap: 5px; }
    .clock-only { font-size: 14px; font-weight: 700; }
    .status-details { align-items: baseline; display: flex; gap: 5px; }
    .predicted-time, .delay { color: var(--error-color); }
    .realtime {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 0 4px;
    }
    .realtime.live { color: var(--success-color, var(--primary-color)); }
    .cancelled .destination strong { text-decoration: line-through; }
    .empty-stop, .message { color: var(--secondary-text-color); padding: 16px; }
    .error { color: var(--error-color); }
    .density-compact .departure { min-height: 40px; padding-block: 3px; }
    .density-compact .stop-heading { padding-block: 6px; }
    .density-minimal .departure {
      gap: 8px;
      min-height: 34px;
      padding-block: 2px;
    }
    .density-minimal .route { padding-block: 3px; }
    .density-minimal .destination small { display: none; }
    @media (max-width: 450px) {
      .departure { gap: 8px; padding-inline: 12px; }
      header { padding-inline: 16px; }
    }
  `}};f([_({attribute:!1})],E.prototype,"hass",2),f([v()],E.prototype,"config",2),f([v()],E.prototype,"collapsedStops",2),f([v()],E.prototype,"selectedRoutes",2);var L=class extends b{setConfig(t){this.config=t}render(){return this.config?d`
      <div class="form">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity}
          .includeDomains=${["sensor"]}
          label="Entity"
          data-key="entity"
          @value-changed=${this.valueChanged}
        ></ha-entity-picker>
        <ha-textfield
          .value=${this.config.title??""}
          label="Title"
          data-key="title"
          @input=${this.valueChanged}
        ></ha-textfield>
        ${this.selectField("view","Layout",this.config.view??"grouped",at)}
        ${this.selectField("combined_order","Combined ordering",this.config.combined_order??"chronological",st)}
        <ha-textfield
          type="number"
          min="1"
          max=${Ne}
          .value=${String(this.config.departures_per_stop??G)}
          label="Departures per stop"
          data-key="departures_per_stop"
          data-min="1"
          data-max=${Ne}
          @input=${this.numberChanged}
        ></ha-textfield>
        <ha-textfield
          type="number"
          min="1"
          max="50"
          .value=${String(this.config.max_departures??ue)}
          label="Maximum combined departures"
          data-key="max_departures"
          data-min="1"
          data-max="50"
          @input=${this.numberChanged}
        ></ha-textfield>

        <h3>Timing and status</h3>
        ${this.selectField("time_display","Time display",this.config.time_display??"both",nt)}
        <ha-textfield
          type="number"
          min="1"
          max="30"
          .value=${String(this.config.delay_threshold_minutes??1)}
          label="Delay threshold (minutes)"
          data-key="delay_threshold_minutes"
          data-min="1"
          data-max="30"
          @input=${this.numberChanged}
        ></ha-textfield>
        ${this.selectField("delay_format","Delay label",this.config.delay_format??"compact",lt)}
        ${this.selectField("cancelled_behavior","Cancelled departures",this.config.cancelled_behavior??"show",ct)}
        ${this.booleanField("show_scheduled_time","Show struck-through scheduled time",this.config.show_scheduled_time!==!1)}
        ${this.booleanField("show_realtime_status","Show Live/Scheduled labels",this.config.show_realtime_status===!0)}
        ${this.booleanField("show_stale_warning","Warn when realtime data is stale",this.config.show_stale_warning===!0)}
        <ha-textfield
          type="number"
          min="2"
          max="30"
          .value=${String(this.config.stale_after_minutes??3)}
          label="Stale warning after (minutes)"
          data-key="stale_after_minutes"
          data-min="2"
          data-max="30"
          @input=${this.numberChanged}
        ></ha-textfield>

        <h3>Appearance</h3>
        ${this.selectField("density","Row density",this.config.density??"comfortable",dt)}
        ${this.selectField("route_color_mode","Route badge colors",this.config.route_color_mode??"official",pt)}
        ${this.selectField("empty_stop_behavior","Stops without departures",this.config.empty_stop_behavior??(this.config.hide_empty_stops?"hide":"show"),ut)}
        ${this.booleanField("show_stop_codes","Show stop numbers",this.config.show_stop_codes!==!1)}

        <h3>Route filter</h3>
        ${this.booleanField("show_route_filter","Show route filter",this.config.show_route_filter===!0)}
        ${this.config.show_route_filter?d`
              ${this.selectField("route_filter_selection_mode","Route selection",this.config.route_filter_selection_mode??"multiple",ht)}
              ${this.booleanField("route_filter_show_counts","Show departure counts",this.config.route_filter_show_counts===!0)}
              <ha-textfield
                type="number"
                min="0"
                max=${Ue}
                .value=${String(this.config.route_filter_reset_minutes??fe)}
                label="Reset to All after (minutes, 0 = never)"
                data-key="route_filter_reset_minutes"
                data-min="0"
                data-max=${Ue}
                @input=${this.numberChanged}
              ></ha-textfield>
            `:c}

        <h3>Header</h3>
        ${this.booleanField("show_header","Show header",this.config.show_header!==!1)}
        ${this.booleanField("show_brand","Show TransLink label",this.config.show_brand!==!1)}
        ${this.booleanField("show_clock","Show current time",this.config.show_clock!==!1)}
        ${this.selectField("header_style","Header colors",this.config.header_style??"primary",ft)}
        ${this.selectField("stop_heading_style","Stop heading style",this.config.stop_heading_style??"accent",mt)}
        <ha-textfield
          .value=${this.config.header_icon??""}
          label="Header icon (for example mdi:bus)"
          data-key="header_icon"
          @input=${this.valueChanged}
        ></ha-textfield>
        <ha-formfield label="Show service notices">
          <ha-switch
            .checked=${this.config.show_alerts!==!1}
            data-key="show_alerts"
            @change=${this.booleanChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `:c}selectField(t,e,o,i){return d`
      <ha-select
        .label=${e}
        .value=${o}
        .options=${i}
        data-key=${t}
        @selected=${this.valueChanged}
      ></ha-select>
    `}booleanField(t,e,o){return d`
      <ha-formfield label=${e}>
        <ha-switch
          .checked=${o}
          data-key=${t}
          @change=${this.booleanChanged}
        ></ha-switch>
      </ha-formfield>
    `}valueChanged(t){if(!this.config)return;let e=t.currentTarget,o=e.dataset.key,r=t.detail?.value??e.value;this.config={...this.config,[o]:r},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}booleanChanged(t){if(!this.config)return;let e=t.currentTarget,o=e.dataset.key;this.config={...this.config,[o]:e.checked},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}numberChanged(t){if(!this.config)return;let e=t.currentTarget,o=Number.parseInt(e.value,10);if(!Number.isFinite(o))return;let i=e.dataset.key,r=Number.parseInt(e.dataset.min??"1",10),s=Number.parseInt(e.dataset.max??"12",10);this.config={...this.config,[i]:Math.min(s,Math.max(r,o))},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}static{this.styles=C`
    .form { display: grid; gap: 16px; padding: 8px 0; }
    h3 {
      border-bottom: 1px solid var(--divider-color);
      font-size: 14px;
      margin: 8px 0 0;
      padding-bottom: 6px;
    }
  `}};f([_({attribute:!1})],L.prototype,"hass",2),f([v()],L.prototype,"config",2);customElements.get("translink-schedule-card")||customElements.define("translink-schedule-card",E);customElements.get("translink-schedule-card-editor")||customElements.define("translink-schedule-card-editor",L);window.customCards=window.customCards??[];window.customCards.some(a=>a.type==="translink-schedule-card")||window.customCards.push({type:"translink-schedule-card",name:"TransLink Schedule Card",description:"Upcoming departures from multiple TransLink stops.",preview:!0});export{E as TransLinkScheduleCard,L as TransLinkScheduleCardEditor,bt as countdownLabel};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
