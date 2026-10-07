import{b as f}from"./chunks/chunk-GFBGSF4Y.js";var I=globalThis,j=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),me=new WeakMap,O=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(j&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=me.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&me.set(e,t))}return t}toString(){return this.cssText}},B=a=>new O(typeof a=="string"?a:a+"",void 0,Y),T=(a,...t)=>{let e=a.length===1?a[0]:t.reduce((i,o,r)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+a[r+1],a[0]);return new O(e,a,Y)},ge=(a,t)=>{if(j)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),o=I.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=e.cssText,a.appendChild(i)}},Z=j?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return B(e)})(a):a;var{is:Le,defineProperty:He,getOwnPropertyDescriptor:Ie,getOwnPropertyNames:je,getOwnPropertySymbols:Be,getPrototypeOf:qe}=Object,q=globalThis,be=q.trustedTypes,Ke=be?be.emptyScript:"",Ve=q.reactiveElementPolyfillSupport,M=(a,t)=>a,P={toAttribute(a,t){switch(t){case Boolean:a=a?Ke:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},K=(a,t)=>!Le(a,t),ve={attribute:!0,type:String,converter:P,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ve){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(t,i,e);o!==void 0&&He(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){let{get:o,set:r}=Ie(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:o,set(s){let n=o?.call(this);r?.call(this,s),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ve}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let t=qe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let e=this.properties,i=[...je(e),...Be(e)];for(let o of i)this.createProperty(o,e[o])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,o]of e)this.elementProperties.set(i,o)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let o=this._$Eu(e,i);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let o of i)e.unshift(Z(o))}else t!==void 0&&e.push(Z(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ge(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(o!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:P).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,o=i._$Eh.get(t);if(o!==void 0&&this._$Em!==o){let r=i.getPropertyOptions(o),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:P;this._$Em=o;let n=s.fromAttribute(e,r.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(t!==void 0){let s=this.constructor;if(o===!1&&(r=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??K)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),r!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[o,r]of i){let{wrapped:s}=r,n=this[o];s!==!0||this._$AL.has(o)||n===void 0||this.C(o,void 0,r,n)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[M("elementProperties")]=new Map,y[M("finalized")]=new Map,Ve?.({ReactiveElement:y}),(q.reactiveElementVersions??=[]).push("2.1.2");var ae=globalThis,xe=a=>a,V=ae.trustedTypes,_e=V?V.createPolicy("lit-html",{createHTML:a=>a}):void 0,Ae="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Ee="?"+w,We=`<${Ee}>`,A=document,N=()=>A.createComment(""),U=a=>a===null||typeof a!="object"&&typeof a!="function",se=Array.isArray,Ge=a=>se(a)||typeof a?.[Symbol.iterator]=="function",Q=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ye=/-->/g,$e=/>/g,k=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),we=/'/g,ke=/"/g,Ce=/^(?:script|style|textarea|title)$/i,ne=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),c=ne(1),St=ne(2),At=ne(3),E=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Se=new WeakMap,S=A.createTreeWalker(A,129);function Te(a,t){if(!se(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return _e!==void 0?_e.createHTML(t):t}var Xe=(a,t)=>{let e=a.length-1,i=[],o,r=t===2?"<svg>":t===3?"<math>":"",s=D;for(let n=0;n<e;n++){let l=a[n],h,u,p=-1,m=0;for(;m<l.length&&(s.lastIndex=m,u=s.exec(l),u!==null);)m=s.lastIndex,s===D?u[1]==="!--"?s=ye:u[1]!==void 0?s=$e:u[2]!==void 0?(Ce.test(u[2])&&(o=RegExp("</"+u[2],"g")),s=k):u[3]!==void 0&&(s=k):s===k?u[0]===">"?(s=o??D,p=-1):u[1]===void 0?p=-2:(p=s.lastIndex-u[2].length,h=u[1],s=u[3]===void 0?k:u[3]==='"'?ke:we):s===ke||s===we?s=k:s===ye||s===$e?s=D:(s=k,o=void 0);let b=s===k&&a[n+1].startsWith("/>")?" ":"";r+=s===D?l+We:p>=0?(i.push(h),l.slice(0,p)+Ae+l.slice(p)+w+b):l+w+(p===-2?n:b)}return[Te(a,r+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},F=class a{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,s=0,n=t.length-1,l=this.parts,[h,u]=Xe(t,e);if(this.el=a.createElement(h,i),S.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=S.nextNode())!==null&&l.length<n;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(Ae)){let m=u[s++],b=o.getAttribute(p).split(w),v=/([.?@])?(.*)/.exec(m);l.push({type:1,index:r,name:v[2],strings:b,ctor:v[1]==="."?te:v[1]==="?"?ie:v[1]==="@"?oe:z}),o.removeAttribute(p)}else p.startsWith(w)&&(l.push({type:6,index:r}),o.removeAttribute(p));if(Ce.test(o.tagName)){let p=o.textContent.split(w),m=p.length-1;if(m>0){o.textContent=V?V.emptyScript:"";for(let b=0;b<m;b++)o.append(p[b],N()),S.nextNode(),l.push({type:2,index:++r});o.append(p[m],N())}}}else if(o.nodeType===8)if(o.data===Ee)l.push({type:2,index:r});else{let p=-1;for(;(p=o.data.indexOf(w,p+1))!==-1;)l.push({type:7,index:r}),p+=w.length-1}r++}}static createElement(t,e){let i=A.createElement("template");return i.innerHTML=t,i}};function R(a,t,e=a,i){if(t===E)return t;let o=i!==void 0?e._$Co?.[i]:e._$Cl,r=U(t)?void 0:t._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(a),o._$AT(a,e,i)),i!==void 0?(e._$Co??=[])[i]=o:e._$Cl=o),o!==void 0&&(t=R(a,o._$AS(a,t.values),o,i)),t}var ee=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??A).importNode(e,!0);S.currentNode=o;let r=S.nextNode(),s=0,n=0,l=i[0];for(;l!==void 0;){if(s===l.index){let h;l.type===2?h=new L(r,r.nextSibling,this,t):l.type===1?h=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(h=new re(r,this,t)),this._$AV.push(h),l=i[++n]}s!==l?.index&&(r=S.nextNode(),s++)}return S.currentNode=A,o}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},L=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=R(this,t,e),U(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ge(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=F.createElement(Te(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{let r=new ee(o,this),s=r.u(this.options);r.p(e),this.T(s),this._$AH=r}}_$AC(t){let e=Se.get(t.strings);return e===void 0&&Se.set(t.strings,e=new F(t)),e}k(t){se(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,o=0;for(let r of t)o===e.length?e.push(i=new a(this.O(N()),this.O(N()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=xe(t).nextSibling;xe(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,o){let r=this.strings,s=!1;if(r===void 0)t=R(this,t,e,0),s=!U(t)||t!==this._$AH&&t!==E,s&&(this._$AH=t);else{let n=t,l,h;for(t=r[0],l=0;l<r.length-1;l++)h=R(this,n[i+l],e,l),h===E&&(h=this._$AH[l]),s||=!U(h)||h!==this._$AH[l],h===d?t=d:t!==d&&(t+=(h??"")+r[l+1]),this._$AH[l]=h}s&&!o&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},te=class extends z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},ie=class extends z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},oe=class extends z{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=R(this,t,e,0)??d)===E)return;let i=this._$AH,o=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==d&&(i===d||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},re=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}};var Je=ae.litHtmlPolyfillSupport;Je?.(F,L),(ae.litHtmlVersions??=[]).push("3.3.3");var Re=(a,t,e)=>{let i=e?.renderBefore??t,o=i._$litPart$;if(o===void 0){let r=e?.renderBefore??null;i._$litPart$=o=new L(t.insertBefore(N(),r),r,void 0,e??{})}return o._$AI(a),o};var le=globalThis,g=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Re(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};g._$litElement$=!0,g.finalized=!0,le.litElementHydrateSupport?.({LitElement:g});var Ye=le.litElementPolyfillSupport;Ye?.({LitElement:g});(le.litElementVersions??=[]).push("4.2.2");var Ze={attribute:!0,type:String,converter:P,reflect:!1,hasChanged:K},Qe=(a=Ze,t,e)=>{let{kind:i,metadata:o}=e,r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),i==="setter"&&((a=Object.create(a)).wrapped=!0),r.set(e.name,a),i==="accessor"){let{name:s}=e;return{set(n){let l=t.get.call(this);t.set.call(this,n),this.requestUpdate(s,l,a,!0,n)},init(n){return n!==void 0&&this.C(s,void 0,a,n),n}}}if(i==="setter"){let{name:s}=e;return function(n){let l=this[s];t.call(this,n),this.requestUpdate(s,l,a,!0,n)}}throw Error("Unsupported decorator location: "+i)};function $(a){return(t,e)=>typeof e=="object"?Qe(a,t,e):((i,o,r)=>{let s=o.hasOwnProperty(r);return o.constructor.createProperty(r,i),s?Object.getOwnPropertyDescriptor(o,r):void 0})(a,t,e)}function x(a){return $({...a,state:!0,attribute:!1})}function ce(a,t){return new Date(a.estimated_time).getTime()-new Date(t.estimated_time).getTime()}function et(a,t){let e=new Map;for(let o of t)e.set(o,[]);for(let o of a){let r=e.get(o.stop_id)??[];r.push(o),e.set(o.stop_id,r)}let i=[];for(;[...e.values()].some(o=>o.length>0);)for(let o of e.values()){let r=o.shift();r&&i.push(r)}return i}function de(a,t,e,i){let o=t==="hide"?a.filter(r=>!r.cancelled):[...a];return e==="balanced"?o=et(o,i):e==="route"?o.sort((r,s)=>r.route_name.localeCompare(s.route_name,void 0,{numeric:!0})||ce(r,s)):e==="realtime"?o.sort((r,s)=>Number(s.realtime)-Number(r.realtime)||ce(r,s)):o.sort(ce),t==="move"&&o.sort((r,s)=>Number(r.cancelled)-Number(s.cancelled)),o}function ze(a){let t=new Map;for(let e of a){let i=e.route_name.trim();if(!i)continue;let o=t.get(i);o?o.count+=1:t.set(i,{name:i,count:1,color:e.route_color,textColor:e.route_text_color})}return[...t.values()].sort((e,i)=>e.name.localeCompare(i.name,void 0,{numeric:!0,sensitivity:"base"}))}function G(a,t){return t.size===0?a:a.filter(e=>t.has(e.route_name.trim()))}function Oe(a,t,e=Date.now()){return a?e-new Date(a).getTime()>t*6e4:!0}function Me(a,t=1){let e=!a.cancelled&&a.delay_seconds>=t*60;return{delayed:e,displayTime:a.cancelled?a.scheduled_time:a.estimated_time,scheduledTime:e?a.scheduled_time:void 0,delayMinutes:e?Math.round(a.delay_seconds/60):void 0}}function Pe(a,t=[]){return[...new Set([...t,...Object.keys(a.states)])].find(i=>{let o=a.states[i]?.attributes;return Array.isArray(o?.stops)&&Array.isArray(o?.departures)})}var De=`/* required styles */\r
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
`;function it(a){return`/api/map_tiles/raster/{z}/{x}/{y}.png?token=${encodeURIComponent(a)}`}var pe="#0698E4",ot="#0479B5",rt="#757575",he="#FFFFFF",at=`
  <div class="translink-map-bus-marker" aria-hidden="true">
    <ha-icon icon="mdi:bus"></ha-icon>
  </div>
`,_=class extends g{constructor(){super(...arguments);this.entryId="";this.tilesUnavailable=!1;this.expanded=!1;this.handleKeydown=e=>{e.key==="Escape"&&this.close()}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleKeydown)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeydown),this.map?.remove(),super.disconnectedCallback()}firstUpdated(){this.load()}updated(){this.data&&!this.map&&!this.error&&requestAnimationFrame(()=>void this.createMap())}render(){let e=this.departure?.destination||this.departure?.route_long_name||"";return c`
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
          ${this.error?c`<div class="state error" role="alert">
                <ha-icon icon="mdi:map-marker-alert"></ha-icon>
                <div>
                  <strong>Route map unavailable</strong>
                  <span>${this.error}</span>
                </div>
              </div>`:this.data?c`
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
                        ${this.data.vehicle?.timestamp?c`<small>
                              Last reported
                              ${this.positionAge(this.data.vehicle.timestamp)}
                            </small>`:this.data.vehicle_error?c`<small>${this.data.vehicle_error}</small>`:d}
                      </span>
                    </div>
                    ${this.tilesUnavailable?c`<small class="tile-warning">
                          Basemap tiles could not be loaded. Route geometry is
                          still shown.
                        </small>`:d}
                  </footer>
                `:c`<div class="state" role="status">
                  <ha-circular-progress active></ha-circular-progress>
                  Loading planned route and vehicle position...
                </div>`}
        </section>
      </div>
    `}async load(){if(!this.hass?.callApi||!this.departure||!this.entryId){this.error="This departure is missing map identity data.";return}let e=new URLSearchParams({entry_id:this.entryId,trip_id:this.departure.trip_id,stop_id:this.departure.stop_id});try{let[i,o]=await Promise.all([this.hass.callApi("GET",`translink_schedule/trip-map?${e}`),this.loadMapTilesToken()]);this.mapTilesToken=o,this.data=i}catch(i){this.error=i instanceof Error?i.message:"Unable to load map data."}}async loadMapTilesToken(){if(this.hass?.connection)try{return(await this.hass.connection.sendMessagePromise({type:"map_tiles/access_token"})).token}catch{return}}async createMap(){let e=this.renderRoot.querySelector(".map");if(!(!e||!this.data||this.map))try{let o=(await import("./chunks/leaflet-src-ECJ6RXIK.js")).default;if(!this.isConnected||this.map)return;this.leaflet=o;let r=this.data.shape.map(s=>[s.latitude,s.longitude]);this.map=o.map(e,{attributionControl:!0,zoomControl:!0}),this.mapTilesToken?o.tileLayer(it(this.mapTilesToken),{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxNativeZoom:19,maxZoom:20}).on("tileerror",()=>{this.tilesUnavailable=!0}).addTo(this.map):this.tilesUnavailable=!0,o.polyline(r,{color:ot,opacity:1,weight:8,lineCap:"round",lineJoin:"round"}).addTo(this.map),o.polyline(r,{color:pe,opacity:1,weight:6,lineCap:"round",lineJoin:"round"}).addTo(this.map),this.addPoint(this.data.shape[0],"Route start",{color:pe,fillColor:he,radius:6,weight:3}),this.addPoint(this.data.boarding_stop,`Board at ${this.data.boarding_stop.name}`,{color:he,fillColor:pe,radius:7,weight:3}),this.addPoint(this.data.destination_point,this.data.destination,{color:rt,fillColor:he,radius:8,weight:3}),this.data.vehicle&&o.marker([this.data.vehicle.latitude,this.data.vehicle.longitude],{icon:o.divIcon({className:"translink-map-bus-icon",html:at,iconAnchor:[20,20],iconSize:[40,40],tooltipAnchor:[0,-20]}),keyboard:!0,title:this.vehicleLabel(this.data)}).bindTooltip(this.vehicleLabel(this.data)).addTo(this.map),this.map.fitBounds(o.latLngBounds(r),{padding:[24,24]})}catch(i){this.error=i instanceof Error?`Unable to initialize route map: ${i.message}`:"Unable to initialize route map."}}addPoint(e,i,o){let r=this.leaflet;r&&r.circleMarker([e.latitude,e.longitude],{className:"translink-map-node",color:o.color,fillColor:o.fillColor,fillOpacity:1,radius:o.radius,weight:o.weight}).bindTooltip(i).addTo(this.map)}vehicleLabel(e){let i=e.vehicle?.vehicle_label??e.vehicle?.vehicle_id;return i?`Bus ${i}`:"Last reported bus position"}positionAge(e){let i=Math.max(0,Math.round((Date.now()-new Date(e).getTime())/1e3));return i<60?`${i} sec ago`:`${Math.round(i/60)} min ago`}backdropClicked(e){e.target===e.currentTarget&&this.close()}toggleExpanded(){this.expanded=!this.expanded,this.updateComplete.then(()=>this.refitMap())}headerKeydown(e){e.target===e.currentTarget&&(e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),this.toggleExpanded()))}refitMap(){if(!this.map||!this.leaflet||!this.data)return;let e=this.leaflet.latLngBounds(this.data.shape.map(i=>[i.latitude,i.longitude]));this.map.invalidateSize(),this.map.fitBounds(e,{padding:[24,24]})}closeClicked(e){e.stopPropagation(),this.close()}close(){this.remove()}static{this.styles=[B(De),T`
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
    `]}};f([$({attribute:!1})],_.prototype,"hass",2),f([$()],_.prototype,"entryId",2),f([$({attribute:!1})],_.prototype,"departure",2),f([x()],_.prototype,"data",2),f([x()],_.prototype,"error",2),f([x()],_.prototype,"tilesUnavailable",2),f([x()],_.prototype,"expanded",2);customElements.get("translink-trip-map-dialog")||customElements.define("translink-trip-map-dialog",_);var J=3,Ne=12,ue=12,fe=5,Ue=60,st=[{value:"grouped",label:"Grouped by stop"},{value:"combined",label:"Combined by time"}],nt=[{value:"chronological",label:"Chronological"},{value:"balanced",label:"Balance stops"},{value:"route",label:"Group routes"},{value:"realtime",label:"Realtime first"}],lt=[{value:"both",label:"Countdown and clock"},{value:"countdown",label:"Countdown only"},{value:"clock",label:"Clock only"}],ct=[{value:"compact",label:"+7 min"},{value:"text",label:"7 min late"}],dt=[{value:"show",label:"Show in schedule order"},{value:"move",label:"Move below active departures"},{value:"hide",label:"Hide"}],pt=[{value:"comfortable",label:"Comfortable"},{value:"compact",label:"Compact"},{value:"minimal",label:"Minimal"}],ht=[{value:"official",label:"Official route colors"},{value:"theme",label:"Theme primary color"},{value:"monochrome",label:"Monochrome"}],ut=[{value:"multiple",label:"Allow multiple routes"},{value:"single",label:"One route at a time"}],ft=[{value:"show",label:"Show in configured order"},{value:"move",label:"Move to bottom"},{value:"hide",label:"Hide"}],mt=[{value:"primary",label:"Theme primary"},{value:"surface",label:"Card surface"},{value:"transparent",label:"Transparent"}],gt=[{value:"clock",label:"Current time"},{value:"next_departure",label:"Next departure"},{value:"hidden",label:"Hidden"}],bt=[{value:"countdown",label:"Countdown"},{value:"clock",label:"Clock time"},{value:"both",label:"Countdown and clock time"}],vt=[{value:"accent",label:"Accent"},{value:"plain",label:"Plain"},{value:"compact",label:"Compact"}];function xt(a,t=Date.now()){return Math.max(0,Math.round((new Date(a).getTime()-t)/6e4))}function Fe(a,t=Date.now()){let e=xt(a,t);return e===0?"Now":`${e} min`}function _t(a,t){return G(a,t).filter(e=>!e.cancelled).sort((e,i)=>new Date(e.estimated_time).getTime()-new Date(i.estimated_time).getTime())[0]}function X(a,t){let e=t?.time_format==="12"?!0:t?.time_format==="24"?!1:void 0;return new Intl.DateTimeFormat(t?.language,{hour:"numeric",hour12:e,minute:"2-digit"}).format(new Date(a))}var C=class extends g{constructor(){super(...arguments);this.collapsedStops=new Set;this.selectedRoutes=new Set;this.initializedStops=new Set}static async getConfigElement(){return document.createElement("translink-schedule-card-editor")}static getStubConfig(e,i=[]){return{entity:Pe(e,i)??"",view:"grouped",departures_per_stop:J}}getGridOptions(){return{columns:12,min_columns:6}}setConfig(e){if(!e.entity)throw new Error("A TransLink Schedule entity is required");let i=e.route_filter_selection_mode??"multiple",o=e.header_time_mode??(e.show_clock===!1?"hidden":"clock");this.config?.entity!==e.entity?(this.collapsedStops=new Set,this.initializedStops.clear(),this.resetRouteFilter()):(this.config?.show_route_filter&&e.show_route_filter!==!0||this.config?.route_filter_selection_mode!==i)&&this.resetRouteFilter(),this.config={view:"grouped",departures_per_stop:J,max_departures:ue,time_display:"both",show_scheduled_time:!0,delay_threshold_minutes:1,delay_format:"compact",density:"comfortable",empty_stop_behavior:"show",cancelled_behavior:"show",route_color_mode:"official",show_route_filter:!1,route_filter_reset_minutes:fe,route_filter_selection_mode:"multiple",route_filter_show_counts:!1,combined_order:"chronological",show_header:!0,show_brand:!0,header_style:"primary",stop_heading_style:"accent",header_next_departure_format:"countdown",show_clock:!0,show_alerts:!0,show_stop_codes:!0,show_realtime_status:!1,show_stale_warning:!1,stale_after_minutes:3,...e,header_time_mode:o},this.selectedRoutes.size>0&&this.scheduleRouteFilterReset()}connectedCallback(){super.connectedCallback(),this.ticker=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){this.ticker!==void 0&&window.clearInterval(this.ticker),this.clearRouteFilterResetTimer(),super.disconnectedCallback()}render(){if(!this.config||!this.hass)return d;let e=this.hass.states[this.config.entity];if(!e)return c`<ha-card><div class="message error">
        Entity ${this.config.entity} was not found.
      </div></ha-card>`;let i=e.attributes.stops??[],o=e.attributes.departures??[],r=o.length?o:i.flatMap(v=>v.departures),s=ze(r),n=this.activeSelectedRoutes(s),l=_t(r,n),h=e.attributes.alerts??[],u=this.config.title??e.attributes.board_name??"TransLink departures",p=e.attributes.last_updated,m=this.config.show_stale_warning&&Oe(p,this.config.stale_after_minutes??3),b=[`density-${this.config.density}`,`header-${this.config.header_style}`,`routes-${this.config.route_color_mode}`,`stops-${this.config.stop_heading_style}`].join(" ");return c`
      <ha-card class=${b}>
        ${this.config.show_header?c`<header>
              <div class="header-title">
                ${this.config.header_icon?c`<ha-icon
                      .icon=${this.config.header_icon}
                      aria-hidden="true"
                    ></ha-icon>`:d}
                <div>
                  ${this.config.show_brand?c`<div class="eyebrow">TransLink</div>`:d}
                  <h1>${u}</h1>
                </div>
              </div>
              ${this.renderHeaderTime(l)}
            </header>`:d}
        ${this.config.show_alerts&&h.length?c`<div class="alerts">
              ${h.map(v=>c`<div>
                  <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
                  <span>
                    <strong>${v.header}</strong>
                    ${v.description?c`<small>${v.description}</small>`:d}
                  </span>
                </div>`)}
            </div>`:d}
        ${m?c`<div class="stale" role="status">
              <ha-icon icon="mdi:cloud-alert" aria-hidden="true"></ha-icon>
              Realtime data has not updated recently.
            </div>`:d}
        ${this.config.show_route_filter&&s.length>0?this.renderRouteFilter(s,n):d}
        <main>
          ${this.config.view==="combined"?this.renderCombined(o,i,n):this.renderGrouped(i,n)}
        </main>
      </ha-card>
    `}renderHeaderTime(e){let i=this.config?.header_time_mode??"clock";if(i==="hidden")return d;if(i==="clock")return c`<div class="clock">
        ${X(new Date().toISOString(),this.hass?.locale)}
      </div>`;if(!e)return c`<div
        class="header-time next-departure"
        aria-label="No upcoming departures"
      >
        <small>Next</small>
        <strong>—</strong>
      </div>`;let o=Fe(e.estimated_time),r=X(e.estimated_time,this.hass?.locale),s=this.config?.header_next_departure_format??"countdown",n=`Next departure route ${e.route_name} to ${e.destination||e.route_long_name}, ${o}, at ${r}`;return c`<div
      class="header-time next-departure"
      aria-label=${n}
    >
      <small>Next</small>
      ${s==="clock"?c`<strong>${r}</strong>`:c`
            <strong>${o}</strong>
            ${s==="both"?c`<span>${r}</span>`:d}
          `}
    </div>`}renderRouteFilter(e,i){let o=this.config?.route_filter_show_counts===!0,r=e.reduce((s,n)=>s+n.count,0);return c`
      <nav class="route-filter" aria-label="Filter departures by route">
        <button
          type="button"
          class="route-filter-chip all"
          aria-pressed=${String(i.size===0)}
          @click=${()=>this.selectAllRoutes()}
        >
          All${o?c` <span>${r}</span>`:d}
        </button>
        ${e.map(s=>{let n=i.has(s.name),l=this.config?.route_color_mode==="official"&&n?[s.color?`background:#${s.color}`:"",s.textColor?`color:#${s.textColor}`:""].filter(Boolean).join(";"):"";return c`
            <button
              type="button"
              class="route-filter-chip"
              style=${l}
              aria-label="Filter route ${s.name}"
              aria-pressed=${String(n)}
              @click=${()=>this.toggleRoute(s.name)}
            >
              ${s.name}${o?c` <span>${s.count}</span>`:d}
            </button>
          `})}
      </nav>
    `}renderGrouped(e,i){let o=this.config?.empty_stop_behavior??(this.config?.hide_empty_stops?"hide":"show"),r=e.map(n=>({stop:n,departures:de(G(n.departures,i),this.config?.cancelled_behavior??"show","chronological",[n.stop_id])}));o==="hide"?r=r.filter(({departures:n})=>n.length>0):o==="move"&&r.sort((n,l)=>+(n.departures.length===0)-+(l.departures.length===0));let s=r.map(({stop:n,departures:l})=>{let h=this.isStopCollapsed(n),u=n.departures_per_stop??this.config?.departures_per_stop??J;return c`
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
            ${this.config?.show_stop_codes!==!1&&n.show_stop_code!==!1&&n.stop_code?c`<span class="stop-code">#${n.stop_code}</span>`:d}
          </button>
          ${h?d:l.length?l.slice(0,u).map(p=>this.renderDeparture(p,!1)):c`<div class="empty-stop">No upcoming departures</div>`}
        </section>
      `});return s.length?s:c`<div class="message">No upcoming departures.</div>`}renderCombined(e,i,o){let r=de(G(e,o),this.config?.cancelled_behavior??"show",this.config?.combined_order??"chronological",i.map(s=>s.stop_id));return r.length===0?c`<div class="message">No upcoming departures.</div>`:c`
      <section>
        ${r.slice(0,this.config?.max_departures??ue).map(s=>this.renderDeparture(s,!0))}
      </section>
    `}renderDeparture(e,i){let o=this.config?.route_color_mode==="official"?[e.route_color?`background:#${e.route_color}`:"",e.route_text_color?`color:#${e.route_text_color}`:""].filter(Boolean).join(";"):"",r=Me(e,this.config?.delay_threshold_minutes),s=this.config?.time_display!=="clock",n=this.config?.time_display!=="countdown",l=e.destination||e.route_long_name,h=e.cancelled?"cancelled":r.delayed?`${r.delayMinutes} minutes late`:e.realtime?"live prediction":"scheduled",u=this.config?.delay_format==="text"?`${r.delayMinutes} min late`:`+${r.delayMinutes} min`;return c`
      <div
        class="departure ${e.cancelled?"cancelled":""}"
        role="button"
        tabindex="0"
        aria-label="Route ${e.route_name} to ${l}, ${h}. Open route map."
        @click=${()=>this.openTripMap(e)}
        @keydown=${p=>this.departureKeydown(p,e)}
      >
        <span class="route" style=${o}>${e.route_name}</span>
        <div class="destination">
          <strong>${l}</strong>
          ${i?c`<small>${e.stop_name}</small>`:d}
        </div>
        <div class="timing">
          ${e.cancelled?c`<strong>Cancelled</strong>`:s?c`<strong>${Fe(e.estimated_time)}</strong>`:d}
          ${n?c`<small class="time-details ${s?"":"clock-only"}">
                ${r.scheduledTime&&this.config?.show_scheduled_time!==!1?c`<s>${X(r.scheduledTime,this.hass?.locale)}</s>`:d}
                <span class=${r.delayed?"predicted-time":""}>
                  ${X(r.displayTime,this.hass?.locale)}
                </span>
              </small>`:d}
          <small class="status-details">
            ${r.delayMinutes!==void 0?c`<span class="delay">${u}</span>`:d}
            ${this.config?.show_realtime_status?c`<span class="realtime ${e.realtime?"live":""}">
                  ${e.realtime?"Live":"Scheduled"}
                </span>`:d}
          </small>
        </div>
      </div>
    `}openTripMap(e){if(!this.hass||!this.config)return;document.querySelector("translink-trip-map-dialog")?.remove();let o=this.hass.states[this.config.entity]?.attributes.config_entry_id,r=document.createElement("translink-trip-map-dialog");r.hass=this.hass,r.entryId=typeof o=="string"?o:"",r.departure=e,document.body.append(r)}departureKeydown(e,i){e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),this.openTripMap(i))}isStopCollapsed(e){return this.initializedStops.has(e.stop_id)||(this.initializedStops.add(e.stop_id),e.collapsed&&this.collapsedStops.add(e.stop_id)),this.collapsedStops.has(e.stop_id)}toggleStop(e){let i=new Set(this.collapsedStops);i.has(e)?i.delete(e):i.add(e),this.collapsedStops=i}activeSelectedRoutes(e){let i=new Set(e.map(r=>r.name)),o=new Set([...this.selectedRoutes].filter(r=>i.has(r)));if(o.size!==this.selectedRoutes.size){this.selectedRoutes.clear();for(let r of o)this.selectedRoutes.add(r);o.size===0&&this.clearRouteFilterResetTimer()}return o}selectAllRoutes(){this.resetRouteFilter()}toggleRoute(e){let i=new Set(this.selectedRoutes);this.config?.route_filter_selection_mode==="single"?i.size===1&&i.has(e)?i.clear():(i.clear(),i.add(e)):i.has(e)?i.delete(e):i.add(e),this.selectedRoutes=i,i.size>0?this.scheduleRouteFilterReset():this.clearRouteFilterResetTimer()}resetRouteFilter(){this.clearRouteFilterResetTimer(),this.selectedRoutes.size>0&&(this.selectedRoutes=new Set)}scheduleRouteFilterReset(){this.clearRouteFilterResetTimer();let e=this.config?.route_filter_reset_minutes??fe;e<=0||(this.routeFilterResetTimer=window.setTimeout(()=>this.resetRouteFilter(),e*6e4))}clearRouteFilterResetTimer(){this.routeFilterResetTimer!==void 0&&(window.clearTimeout(this.routeFilterResetTimer),this.routeFilterResetTimer=void 0)}static{this.styles=T`
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
    .header-time {
      align-items: flex-end;
      display: flex;
      flex-direction: column;
      font-variant-numeric: tabular-nums;
      line-height: 1.1;
      white-space: nowrap;
    }
    .header-time small {
      color: inherit;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .1em;
      opacity: .78;
      text-transform: uppercase;
    }
    .header-time strong { font-size: 18px; }
    .header-time span { font-size: 11px; margin-top: 2px; opacity: .82; }
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
  `}};f([$({attribute:!1})],C.prototype,"hass",2),f([x()],C.prototype,"config",2),f([x()],C.prototype,"collapsedStops",2),f([x()],C.prototype,"selectedRoutes",2);var H=class extends g{setConfig(t){this.config=t}render(){return this.config?c`
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
        ${this.selectField("view","Layout",this.config.view??"grouped",st)}
        ${this.selectField("combined_order","Combined ordering",this.config.combined_order??"chronological",nt)}
        <ha-textfield
          type="number"
          min="1"
          max=${Ne}
          .value=${String(this.config.departures_per_stop??J)}
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
        ${this.selectField("time_display","Time display",this.config.time_display??"both",lt)}
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
        ${this.selectField("delay_format","Delay label",this.config.delay_format??"compact",ct)}
        ${this.selectField("cancelled_behavior","Cancelled departures",this.config.cancelled_behavior??"show",dt)}
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
        ${this.selectField("density","Row density",this.config.density??"comfortable",pt)}
        ${this.selectField("route_color_mode","Route badge colors",this.config.route_color_mode??"official",ht)}
        ${this.selectField("empty_stop_behavior","Stops without departures",this.config.empty_stop_behavior??(this.config.hide_empty_stops?"hide":"show"),ft)}
        ${this.booleanField("show_stop_codes","Show stop numbers",this.config.show_stop_codes!==!1)}

        <h3>Route filter</h3>
        ${this.booleanField("show_route_filter","Show route filter",this.config.show_route_filter===!0)}
        ${this.config.show_route_filter?c`
              ${this.selectField("route_filter_selection_mode","Route selection",this.config.route_filter_selection_mode??"multiple",ut)}
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
            `:d}

        <h3>Header</h3>
        ${this.booleanField("show_header","Show header",this.config.show_header!==!1)}
        ${this.booleanField("show_brand","Show TransLink label",this.config.show_brand!==!1)}
        ${this.selectField("header_time_mode","Header right-side display",this.config.header_time_mode??(this.config.show_clock===!1?"hidden":"clock"),gt)}
        ${(this.config.header_time_mode??(this.config.show_clock===!1?"hidden":"clock"))==="next_departure"?this.selectField("header_next_departure_format","Next departure display",this.config.header_next_departure_format??"countdown",bt):d}
        ${this.selectField("header_style","Header colors",this.config.header_style??"primary",mt)}
        ${this.selectField("stop_heading_style","Stop heading style",this.config.stop_heading_style??"accent",vt)}
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
    `:d}selectField(t,e,i,o){return c`
      <ha-select
        .label=${e}
        .value=${i}
        .options=${o}
        data-key=${t}
        @selected=${this.valueChanged}
      ></ha-select>
    `}booleanField(t,e,i){return c`
      <ha-formfield label=${e}>
        <ha-switch
          .checked=${i}
          data-key=${t}
          @change=${this.booleanChanged}
        ></ha-switch>
      </ha-formfield>
    `}valueChanged(t){if(!this.config)return;let e=t.currentTarget,i=e.dataset.key,r=t.detail?.value??e.value;this.config={...this.config,[i]:r},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}booleanChanged(t){if(!this.config)return;let e=t.currentTarget,i=e.dataset.key;this.config={...this.config,[i]:e.checked},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}numberChanged(t){if(!this.config)return;let e=t.currentTarget,i=Number.parseInt(e.value,10);if(!Number.isFinite(i))return;let o=e.dataset.key,r=Number.parseInt(e.dataset.min??"1",10),s=Number.parseInt(e.dataset.max??"12",10);this.config={...this.config,[o]:Math.min(s,Math.max(r,i))},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}static{this.styles=T`
    .form { display: grid; gap: 16px; padding: 8px 0; }
    h3 {
      border-bottom: 1px solid var(--divider-color);
      font-size: 14px;
      margin: 8px 0 0;
      padding-bottom: 6px;
    }
  `}};f([$({attribute:!1})],H.prototype,"hass",2),f([x()],H.prototype,"config",2);customElements.get("translink-schedule-card")||customElements.define("translink-schedule-card",C);customElements.get("translink-schedule-card-editor")||customElements.define("translink-schedule-card-editor",H);window.customCards=window.customCards??[];window.customCards.some(a=>a.type==="translink-schedule-card")||window.customCards.push({type:"translink-schedule-card",name:"TransLink Schedule Card",description:"Upcoming departures from multiple TransLink stops.",preview:!0});export{C as TransLinkScheduleCard,H as TransLinkScheduleCardEditor,Fe as countdownLabel,_t as getNextDeparture};
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
