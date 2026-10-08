import{b as m}from"./chunks/chunk-GFBGSF4Y.js";var j=globalThis,B=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),_e=new WeakMap,z=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(B&&e===void 0){let o=t!==void 0&&t.length===1;o&&(e=_e.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&_e.set(t,e))}return e}toString(){return this.cssText}},q=i=>new z(typeof i=="string"?i:i+"",void 0,Z),E=(i,...e)=>{let t=i.length===1?i[0]:e.reduce((o,r,a)=>o+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[a+1],i[0]);return new z(t,i,Z)},be=(i,e)=>{if(B)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let o=document.createElement("style"),r=j.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=t.cssText,i.appendChild(o)}},Q=B?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(let o of e.cssRules)t+=o.cssText;return q(t)})(i):i;var{is:Ie,defineProperty:je,getOwnPropertyDescriptor:Be,getOwnPropertyNames:qe,getOwnPropertySymbols:Ke,getPrototypeOf:Ve}=Object,K=globalThis,ve=K.trustedTypes,We=ve?ve.emptyScript:"",Ge=K.reactiveElementPolyfillSupport,P=(i,e)=>i,M={toAttribute(i,e){switch(e){case Boolean:i=i?We:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},V=(i,e)=>!Ie(i,e),ye={attribute:!0,type:String,converter:M,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),K.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ye){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let o=Symbol(),r=this.getPropertyDescriptor(e,o,t);r!==void 0&&je(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){let{get:r,set:a}=Be(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:r,set(s){let n=r?.call(this);a?.call(this,s),this.requestUpdate(e,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ye}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let e=Ve(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let t=this.properties,o=[...qe(t),...Ke(t)];for(let r of o)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[o,r]of t)this.elementProperties.set(o,r)}this._$Eh=new Map;for(let[t,o]of this.elementProperties){let r=this._$Eu(t,o);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let r of o)t.unshift(Q(r))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){let o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return be(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){let o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===!0){let a=(o.converter?.toAttribute!==void 0?o.converter:M).toAttribute(t,o.type);this._$Em=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){let o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let a=o.getPropertyOptions(r),s=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:M;this._$Em=r;let n=s.fromAttribute(t,a.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,o,r=!1,a){if(e!==void 0){let s=this.constructor;if(r===!1&&(a=this[e]),o??=s.getPropertyOptions(e),!((o.hasChanged??V)(a,t)||o.useDefault&&o.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:r,wrapped:a},s){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),a!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[r,a]of o){let{wrapped:s}=a,n=this[r];s!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,a,n)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[P("elementProperties")]=new Map,y[P("finalized")]=new Map,Ge?.({ReactiveElement:y}),(K.reactiveElementVersions??=[]).push("2.1.2");var se=globalThis,xe=i=>i,W=se.trustedTypes,we=W?W.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ee="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,Te="?"+w,Xe=`<${Te}>`,S=document,N=()=>S.createComment(""),U=i=>i===null||typeof i!="object"&&typeof i!="function",ne=Array.isArray,Je=i=>ne(i)||typeof i?.[Symbol.iterator]=="function",ee=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$e=/-->/g,ke=/>/g,$=RegExp(`>|${ee}(?:([^\\s"'>=/]+)(${ee}*=${ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Se=/'/g,Ce=/"/g,Re=/^(?:script|style|textarea|title)$/i,le=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),l=le(1),Et=le(2),Tt=le(3),C=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),Ae=new WeakMap,k=S.createTreeWalker(S,129);function Oe(i,e){if(!ne(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return we!==void 0?we.createHTML(e):e}var Ye=(i,e)=>{let t=i.length-1,o=[],r,a=e===2?"<svg>":e===3?"<math>":"",s=D;for(let n=0;n<t;n++){let d=i[n],h,u,p=-1,g=0;for(;g<d.length&&(s.lastIndex=g,u=s.exec(d),u!==null);)g=s.lastIndex,s===D?u[1]==="!--"?s=$e:u[1]!==void 0?s=ke:u[2]!==void 0?(Re.test(u[2])&&(r=RegExp("</"+u[2],"g")),s=$):u[3]!==void 0&&(s=$):s===$?u[0]===">"?(s=r??D,p=-1):u[1]===void 0?p=-2:(p=s.lastIndex-u[2].length,h=u[1],s=u[3]===void 0?$:u[3]==='"'?Ce:Se):s===Ce||s===Se?s=$:s===$e||s===ke?s=D:(s=$,r=void 0);let f=s===$&&i[n+1].startsWith("/>")?" ":"";a+=s===D?d+Xe:p>=0?(o.push(h),d.slice(0,p)+Ee+d.slice(p)+w+f):d+w+(p===-2?n:f)}return[Oe(i,a+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},F=class i{constructor({strings:e,_$litType$:t},o){let r;this.parts=[];let a=0,s=0,n=e.length-1,d=this.parts,[h,u]=Ye(e,t);if(this.el=i.createElement(h,o),k.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=k.nextNode())!==null&&d.length<n;){if(r.nodeType===1){if(r.hasAttributes())for(let p of r.getAttributeNames())if(p.endsWith(Ee)){let g=u[s++],f=r.getAttribute(p).split(w),I=/([.?@])?(.*)/.exec(g);d.push({type:1,index:a,name:I[2],strings:f,ctor:I[1]==="."?oe:I[1]==="?"?ie:I[1]==="@"?re:R}),r.removeAttribute(p)}else p.startsWith(w)&&(d.push({type:6,index:a}),r.removeAttribute(p));if(Re.test(r.tagName)){let p=r.textContent.split(w),g=p.length-1;if(g>0){r.textContent=W?W.emptyScript:"";for(let f=0;f<g;f++)r.append(p[f],N()),k.nextNode(),d.push({type:2,index:++a});r.append(p[g],N())}}}else if(r.nodeType===8)if(r.data===Te)d.push({type:2,index:a});else{let p=-1;for(;(p=r.data.indexOf(w,p+1))!==-1;)d.push({type:7,index:a}),p+=w.length-1}a++}}static createElement(e,t){let o=S.createElement("template");return o.innerHTML=e,o}};function T(i,e,t=i,o){if(e===C)return e;let r=o!==void 0?t._$Co?.[o]:t._$Cl,a=U(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),a===void 0?r=void 0:(r=new a(i),r._$AT(i,t,o)),o!==void 0?(t._$Co??=[])[o]=r:t._$Cl=r),r!==void 0&&(e=T(i,r._$AS(i,e.values),r,o)),e}var te=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:o}=this._$AD,r=(e?.creationScope??S).importNode(t,!0);k.currentNode=r;let a=k.nextNode(),s=0,n=0,d=o[0];for(;d!==void 0;){if(s===d.index){let h;d.type===2?h=new L(a,a.nextSibling,this,e):d.type===1?h=new d.ctor(a,d.name,d.strings,this,e):d.type===6&&(h=new ae(a,this,e)),this._$AV.push(h),d=o[++n]}s!==d?.index&&(a=k.nextNode(),s++)}return k.currentNode=S,r}p(e){let t=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},L=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=T(this,e,t),U(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Je(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=F.createElement(Oe(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(t);else{let a=new te(r,this),s=a.u(this.options);a.p(t),this.T(s),this._$AH=a}}_$AC(e){let t=Ae.get(e.strings);return t===void 0&&Ae.set(e.strings,t=new F(e)),t}k(e){ne(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,o,r=0;for(let a of e)r===t.length?t.push(o=new i(this.O(N()),this.O(N()),this,this.options)):o=t[r],o._$AI(a),r++;r<t.length&&(this._$AR(o&&o._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let o=xe(e).nextSibling;xe(e).remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,r,a){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=c}_$AI(e,t=this,o,r){let a=this.strings,s=!1;if(a===void 0)e=T(this,e,t,0),s=!U(e)||e!==this._$AH&&e!==C,s&&(this._$AH=e);else{let n=e,d,h;for(e=a[0],d=0;d<a.length-1;d++)h=T(this,n[o+d],t,d),h===C&&(h=this._$AH[d]),s||=!U(h)||h!==this._$AH[d],h===c?e=c:e!==c&&(e+=(h??"")+a[d+1]),this._$AH[d]=h}s&&!r&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},oe=class extends R{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}},ie=class extends R{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}},re=class extends R{constructor(e,t,o,r,a){super(e,t,o,r,a),this.type=5}_$AI(e,t=this){if((e=T(this,e,t,0)??c)===C)return;let o=this._$AH,r=e===c&&o!==c||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==c&&(o===c||r);r&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ae=class{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){T(this,e)}};var Ze=se.litHtmlPolyfillSupport;Ze?.(F,L),(se.litHtmlVersions??=[]).push("3.3.3");var ze=(i,e,t)=>{let o=t?.renderBefore??e,r=o._$litPart$;if(r===void 0){let a=t?.renderBefore??null;o._$litPart$=r=new L(e.insertBefore(N(),a),a,void 0,t??{})}return r._$AI(i),r};var de=globalThis,_=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ze(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}};_._$litElement$=!0,_.finalized=!0,de.litElementHydrateSupport?.({LitElement:_});var Qe=de.litElementPolyfillSupport;Qe?.({LitElement:_});(de.litElementVersions??=[]).push("4.2.2");var et={attribute:!0,type:String,converter:M,reflect:!1,hasChanged:V},tt=(i=et,e,t)=>{let{kind:o,metadata:r}=t,a=globalThis.litPropertyMetadata.get(r);if(a===void 0&&globalThis.litPropertyMetadata.set(r,a=new Map),o==="setter"&&((i=Object.create(i)).wrapped=!0),a.set(t.name,i),o==="accessor"){let{name:s}=t;return{set(n){let d=e.get.call(this);e.set.call(this,n),this.requestUpdate(s,d,i,!0,n)},init(n){return n!==void 0&&this.C(s,void 0,i,n),n}}}if(o==="setter"){let{name:s}=t;return function(n){let d=this[s];e.call(this,n),this.requestUpdate(s,d,i,!0,n)}}throw Error("Unsupported decorator location: "+o)};function x(i){return(e,t)=>typeof t=="object"?tt(i,e,t):((o,r,a)=>{let s=r.hasOwnProperty(a);return r.constructor.createProperty(a,o),s?Object.getOwnPropertyDescriptor(r,a):void 0})(i,e,t)}function b(i){return x({...i,state:!0,attribute:!1})}function ce(i,e){return new Date(i.estimated_time).getTime()-new Date(e.estimated_time).getTime()}function ot(i,e){let t=new Map;for(let r of e)t.set(r,[]);for(let r of i){let a=t.get(r.stop_id)??[];a.push(r),t.set(r.stop_id,a)}let o=[];for(;[...t.values()].some(r=>r.length>0);)for(let r of t.values()){let a=r.shift();a&&o.push(a)}return o}function pe(i,e,t,o){let r=e==="hide"?i.filter(a=>!a.cancelled):[...i];return t==="balanced"?r=ot(r,o):t==="route"?r.sort((a,s)=>a.route_name.localeCompare(s.route_name,void 0,{numeric:!0})||ce(a,s)):t==="realtime"?r.sort((a,s)=>Number(s.realtime)-Number(a.realtime)||ce(a,s)):r.sort(ce),e==="move"&&r.sort((a,s)=>Number(a.cancelled)-Number(s.cancelled)),r}function Pe(i){let e=new Map;for(let t of i){let o=t.route_name.trim();if(!o)continue;let r=e.get(o);r?r.count+=1:e.set(o,{name:o,count:1,color:t.route_color,textColor:t.route_text_color})}return[...e.values()].sort((t,o)=>t.name.localeCompare(o.name,void 0,{numeric:!0,sensitivity:"base"}))}function X(i,e){return e.size===0?i:i.filter(t=>e.has(t.route_name.trim()))}function Me(i,e,t=Date.now()){return i?t-new Date(i).getTime()>e*6e4:!0}function De(i,e=1){let t=!i.cancelled&&i.delay_seconds>=e*60;return{delayed:t,displayTime:i.cancelled?i.scheduled_time:i.estimated_time,scheduledTime:t?i.scheduled_time:void 0,delayMinutes:t?Math.round(i.delay_seconds/60):void 0}}function Ne(i,e=[]){return[...new Set([...e,...Object.keys(i.states)])].find(o=>{let r=i.states[o]?.attributes;return Array.isArray(r?.stops)})}var Ue=`/* required styles */\r
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
`;function rt(i){return`/api/map_tiles/raster/{z}/{x}/{y}.png?token=${encodeURIComponent(i)}`}var he="#0698E4",at="#0479B5",st="#757575",ue="#FFFFFF",nt=`
  <div class="translink-map-bus-marker" aria-hidden="true">
    <ha-icon icon="mdi:bus"></ha-icon>
  </div>
`,v=class extends _{constructor(){super(...arguments);this.entryId="";this.tilesUnavailable=!1;this.expanded=!1;this.handleKeydown=t=>{t.key==="Escape"&&this.close()}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleKeydown)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeydown),this.map?.remove(),super.disconnectedCallback()}firstUpdated(){this.load()}updated(){this.data&&!this.map&&!this.error&&requestAnimationFrame(()=>void this.createMap())}render(){let t=this.departure?.destination||this.departure?.route_long_name||"";return l`
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
              <h2 id="trip-map-title">${t}</h2>
            </div>
            <button
              type="button"
              aria-label="Close route map"
              @click=${this.closeClicked}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          ${this.error?l`<div class="state error" role="alert">
                <ha-icon icon="mdi:map-marker-alert"></ha-icon>
                <div>
                  <strong>Route map unavailable</strong>
                  <span>${this.error}</span>
                </div>
              </div>`:this.data?l`
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
                        ${this.data.vehicle?.timestamp?l`<small>
                              Last reported
                              ${this.positionAge(this.data.vehicle.timestamp)}
                            </small>`:this.data.vehicle_error?l`<small>${this.data.vehicle_error}</small>`:c}
                      </span>
                    </div>
                    ${this.tilesUnavailable?l`<small class="tile-warning">
                          Basemap tiles could not be loaded. Route geometry is
                          still shown.
                        </small>`:c}
                  </footer>
                `:l`<div class="state" role="status">
                  <ha-circular-progress active></ha-circular-progress>
                  Loading planned route and vehicle position...
                </div>`}
        </section>
      </div>
    `}async load(){if(!this.hass?.callApi||!this.departure||!this.entryId){this.error="This departure is missing map identity data.";return}let t=new URLSearchParams({entry_id:this.entryId,trip_id:this.departure.trip_id,stop_id:this.departure.stop_id});try{let[o,r]=await Promise.all([this.hass.callApi("GET",`translink_schedule/trip-map?${t}`),this.loadMapTilesToken()]);this.mapTilesToken=r,this.data=o}catch(o){this.error=o instanceof Error?o.message:"Unable to load map data."}}async loadMapTilesToken(){if(this.hass?.connection)try{return(await this.hass.connection.sendMessagePromise({type:"map_tiles/access_token"})).token}catch{return}}async createMap(){let t=this.renderRoot.querySelector(".map");if(!(!t||!this.data||this.map))try{let r=(await import("./chunks/leaflet-src-ECJ6RXIK.js")).default;if(!this.isConnected||this.map)return;this.leaflet=r;let a=this.data.shape.map(s=>[s.latitude,s.longitude]);this.map=r.map(t,{attributionControl:!0,zoomControl:!0}),this.mapTilesToken?r.tileLayer(rt(this.mapTilesToken),{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxNativeZoom:19,maxZoom:20}).on("tileerror",()=>{this.tilesUnavailable=!0}).addTo(this.map):this.tilesUnavailable=!0,r.polyline(a,{color:at,opacity:1,weight:8,lineCap:"round",lineJoin:"round"}).addTo(this.map),r.polyline(a,{color:he,opacity:1,weight:6,lineCap:"round",lineJoin:"round"}).addTo(this.map),this.addPoint(this.data.shape[0],"Route start",{color:he,fillColor:ue,radius:6,weight:3}),this.addPoint(this.data.boarding_stop,`Board at ${this.data.boarding_stop.name}`,{color:ue,fillColor:he,radius:7,weight:3}),this.addPoint(this.data.destination_point,this.data.destination,{color:st,fillColor:ue,radius:8,weight:3}),this.data.vehicle&&r.marker([this.data.vehicle.latitude,this.data.vehicle.longitude],{icon:r.divIcon({className:"translink-map-bus-icon",html:nt,iconAnchor:[20,20],iconSize:[40,40],tooltipAnchor:[0,-20]}),keyboard:!0,title:this.vehicleLabel(this.data)}).bindTooltip(this.vehicleLabel(this.data)).addTo(this.map),this.map.fitBounds(r.latLngBounds(a),{padding:[24,24]})}catch(o){this.error=o instanceof Error?`Unable to initialize route map: ${o.message}`:"Unable to initialize route map."}}addPoint(t,o,r){let a=this.leaflet;a&&a.circleMarker([t.latitude,t.longitude],{className:"translink-map-node",color:r.color,fillColor:r.fillColor,fillOpacity:1,radius:r.radius,weight:r.weight}).bindTooltip(o).addTo(this.map)}vehicleLabel(t){let o=t.vehicle?.vehicle_label??t.vehicle?.vehicle_id;return o?`Bus ${o}`:"Last reported bus position"}positionAge(t){let o=Math.max(0,Math.round((Date.now()-new Date(t).getTime())/1e3));return o<60?`${o} sec ago`:`${Math.round(o/60)} min ago`}backdropClicked(t){t.target===t.currentTarget&&this.close()}toggleExpanded(){this.expanded=!this.expanded,this.updateComplete.then(()=>this.refitMap())}headerKeydown(t){t.target===t.currentTarget&&(t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),this.toggleExpanded()))}refitMap(){if(!this.map||!this.leaflet||!this.data)return;let t=this.leaflet.latLngBounds(this.data.shape.map(o=>[o.latitude,o.longitude]));this.map.invalidateSize(),this.map.fitBounds(t,{padding:[24,24]})}closeClicked(t){t.stopPropagation(),this.close()}close(){this.remove()}static{this.styles=[q(Ue),E`
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
    `]}};m([x({attribute:!1})],v.prototype,"hass",2),m([x()],v.prototype,"entryId",2),m([x({attribute:!1})],v.prototype,"departure",2),m([b()],v.prototype,"data",2),m([b()],v.prototype,"error",2),m([b()],v.prototype,"tilesUnavailable",2),m([b()],v.prototype,"expanded",2);customElements.get("translink-trip-map-dialog")||customElements.define("translink-trip-map-dialog",v);var Y=3,Fe=12,me=12,fe=5,Le=60,lt=[{value:"grouped",label:"Grouped by stop"},{value:"combined",label:"Combined by time"}],dt=[{value:"chronological",label:"Chronological"},{value:"balanced",label:"Balance stops"},{value:"route",label:"Group routes"},{value:"realtime",label:"Realtime first"}],ct=[{value:"both",label:"Countdown and clock"},{value:"countdown",label:"Countdown only"},{value:"clock",label:"Clock only"}],pt=[{value:"compact",label:"+7 min"},{value:"text",label:"7 min late"}],ht=[{value:"show",label:"Show in schedule order"},{value:"move",label:"Move below active departures"},{value:"hide",label:"Hide"}],ut=[{value:"comfortable",label:"Comfortable"},{value:"compact",label:"Compact"},{value:"minimal",label:"Minimal"}],mt=[{value:"official",label:"Official route colors"},{value:"theme",label:"Theme primary color"},{value:"monochrome",label:"Monochrome"}],ft=[{value:"multiple",label:"Allow multiple routes"},{value:"single",label:"One route at a time"}],gt=[{value:"show",label:"Show in configured order"},{value:"move",label:"Move to bottom"},{value:"hide",label:"Hide"}],_t=[{value:"primary",label:"Theme primary"},{value:"surface",label:"Card surface"},{value:"transparent",label:"Transparent"}],bt=[{value:"clock",label:"Current time"},{value:"next_departure",label:"Next departure"},{value:"hidden",label:"Hidden"}],vt=[{value:"countdown",label:"Countdown"},{value:"clock",label:"Clock time"},{value:"both",label:"Countdown and clock time"}],yt=[{value:"accent",label:"Accent"},{value:"plain",label:"Plain"},{value:"compact",label:"Compact"}];function ge(i){return{...i,title:i.layout?.title??i.title,view:i.layout?.view??i.view,combined_order:i.layout?.combined_order??i.combined_order,departures_per_stop:i.layout?.departures_per_stop??i.departures_per_stop,max_departures:i.layout?.max_departures??i.max_departures,time_display:i.timing?.time_display??i.time_display,show_scheduled_time:i.timing?.show_scheduled_time??i.show_scheduled_time,delay_threshold_minutes:i.timing?.delay_threshold_minutes??i.delay_threshold_minutes,delay_format:i.timing?.delay_format??i.delay_format,cancelled_behavior:i.timing?.cancelled_behavior??i.cancelled_behavior,show_realtime_status:i.timing?.show_realtime_status??i.show_realtime_status,show_stale_warning:i.timing?.show_stale_warning??i.show_stale_warning,stale_after_minutes:i.timing?.stale_after_minutes??i.stale_after_minutes,density:i.appearance?.density??i.density,route_color_mode:i.appearance?.route_color_mode??i.route_color_mode,empty_stop_behavior:i.appearance?.empty_stop_behavior??i.empty_stop_behavior,stop_heading_style:i.appearance?.stop_heading_style??i.stop_heading_style,show_stop_codes:i.appearance?.show_stop_codes??i.show_stop_codes,show_route_filter:i.route_filter?.show??i.show_route_filter,route_filter_selection_mode:i.route_filter?.selection_mode??i.route_filter_selection_mode,route_filter_show_counts:i.route_filter?.show_counts??i.route_filter_show_counts,route_filter_reset_minutes:i.route_filter?.reset_minutes??i.route_filter_reset_minutes,show_header:i.header?.show??i.show_header,show_brand:i.header?.show_brand??i.show_brand,header_time_mode:i.header?.time_mode??i.header_time_mode,header_next_departure_format:i.header?.next_departure_format??i.header_next_departure_format,header_style:i.header?.style??i.header_style,header_icon:i.header?.icon??i.header_icon,show_alerts:i.header?.show_alerts??i.show_alerts,layout:void 0,timing:void 0,appearance:void 0,route_filter:void 0,header:void 0}}function O(i){return Object.fromEntries(Object.entries(i).filter(([,e])=>e!==void 0))}function xt(i){let e=ge(i),t=O({title:e.title,view:e.view,combined_order:e.combined_order,departures_per_stop:e.departures_per_stop,max_departures:e.max_departures}),o=O({time_display:e.time_display,show_scheduled_time:e.show_scheduled_time,delay_threshold_minutes:e.delay_threshold_minutes,delay_format:e.delay_format,cancelled_behavior:e.cancelled_behavior,show_realtime_status:e.show_realtime_status,show_stale_warning:e.show_stale_warning,stale_after_minutes:e.stale_after_minutes}),r=O({density:e.density,route_color_mode:e.route_color_mode,empty_stop_behavior:e.empty_stop_behavior??(e.hide_empty_stops?"hide":void 0),stop_heading_style:e.stop_heading_style,show_stop_codes:e.show_stop_codes}),a=O({show:e.show_route_filter,selection_mode:e.route_filter_selection_mode,show_counts:e.route_filter_show_counts,reset_minutes:e.route_filter_reset_minutes}),s=O({show:e.show_header,show_brand:e.show_brand,time_mode:e.header_time_mode??(e.show_clock===void 0?void 0:e.show_clock?"clock":"hidden"),next_departure_format:e.header_next_departure_format,style:e.header_style,icon:e.header_icon,show_alerts:e.show_alerts});return{type:e.type,entity:e.entity,...Object.keys(t).length>0?{layout:t}:{},...Object.keys(o).length>0?{timing:o}:{},...Object.keys(r).length>0?{appearance:r}:{},...Object.keys(a).length>0?{route_filter:a}:{},...Object.keys(s).length>0?{header:s}:{}}}function wt(i,e=Date.now()){return Math.max(0,Math.round((new Date(i).getTime()-e)/6e4))}function He(i,e=Date.now()){let t=wt(i,e);return t===0?"Now":`${t} min`}function $t(i,e){return X(i,e).filter(t=>!t.cancelled).sort((t,o)=>new Date(t.estimated_time).getTime()-new Date(o.estimated_time).getTime())[0]}function J(i,e){let t=e?.time_format==="12"?!0:e?.time_format==="24"?!1:void 0;return new Intl.DateTimeFormat(e?.language,{hour:"numeric",hour12:t,minute:"2-digit"}).format(new Date(i))}var A=class extends _{constructor(){super(...arguments);this.collapsedStops=new Set;this.selectedRoutes=new Set;this.initializedStops=new Set}static async getConfigElement(){return document.createElement("translink-schedule-card-editor")}static getStubConfig(t,o=[]){return{entity:Ne(t,o)??"",layout:{view:"grouped",departures_per_stop:Y}}}getGridOptions(){return{columns:12,min_columns:6}}setConfig(t){if(!t.entity)throw new Error("A TransLink Schedule entity is required");let o=ge(t),r=o.route_filter_selection_mode??"multiple",a=o.header_time_mode??(o.show_clock===!1?"hidden":"clock");this.config?.entity!==o.entity?(this.collapsedStops=new Set,this.initializedStops.clear(),this.resetRouteFilter()):(this.config?.show_route_filter&&o.show_route_filter!==!0||this.config?.route_filter_selection_mode!==r)&&this.resetRouteFilter(),this.config={view:"grouped",departures_per_stop:Y,max_departures:me,time_display:"both",show_scheduled_time:!0,delay_threshold_minutes:1,delay_format:"compact",density:"comfortable",empty_stop_behavior:"show",cancelled_behavior:"show",route_color_mode:"official",show_route_filter:!1,route_filter_reset_minutes:fe,route_filter_selection_mode:"multiple",route_filter_show_counts:!1,combined_order:"chronological",show_header:!0,show_brand:!0,header_style:"primary",stop_heading_style:"accent",header_next_departure_format:"countdown",show_clock:!0,show_alerts:!0,show_stop_codes:!0,show_realtime_status:!1,show_stale_warning:!1,stale_after_minutes:3,...O(o),type:o.type,entity:o.entity,header_time_mode:a},this.selectedRoutes.size>0&&this.scheduleRouteFilterReset()}connectedCallback(){super.connectedCallback(),this.ticker=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){this.ticker!==void 0&&window.clearInterval(this.ticker),this.clearRouteFilterResetTimer(),super.disconnectedCallback()}render(){if(!this.config||!this.hass)return c;let t=this.hass.states[this.config.entity];if(!t)return l`<ha-card><div class="message error">
        Entity ${this.config.entity} was not found.
      </div></ha-card>`;let o=t.attributes.stops??[],r=o.flatMap(f=>f.departures),a=Pe(r),s=this.activeSelectedRoutes(a),n=$t(r,s),d=t.attributes.alerts??[],h=this.config.title??t.attributes.board_name??"TransLink departures",u=t.attributes.last_updated,p=this.config.show_stale_warning&&Me(u,this.config.stale_after_minutes??3),g=[`density-${this.config.density}`,`header-${this.config.header_style}`,`routes-${this.config.route_color_mode}`,`stops-${this.config.stop_heading_style}`].join(" ");return l`
      <ha-card class=${g}>
        ${this.config.show_header?l`<header>
              <div class="header-title">
                ${this.config.header_icon?l`<ha-icon
                      .icon=${this.config.header_icon}
                      aria-hidden="true"
                    ></ha-icon>`:c}
                <div>
                  ${this.config.show_brand?l`<div class="eyebrow">TransLink</div>`:c}
                  <h1>${h}</h1>
                </div>
              </div>
              ${this.renderHeaderTime(n)}
            </header>`:c}
        ${this.config.show_alerts&&d.length?l`<div class="alerts">
              ${d.map(f=>l`<div>
                  <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
                  <span>
                    <strong>${f.header}</strong>
                    ${f.description?l`<small>${f.description}</small>`:c}
                  </span>
                </div>`)}
            </div>`:c}
        ${p?l`<div class="stale" role="status">
              <ha-icon icon="mdi:cloud-alert" aria-hidden="true"></ha-icon>
              Realtime data has not updated recently.
            </div>`:c}
        ${this.config.show_route_filter&&a.length>0?this.renderRouteFilter(a,s):c}
        <main>
          ${this.config.view==="combined"?this.renderCombined(r,o,s):this.renderGrouped(o,s)}
        </main>
      </ha-card>
    `}renderHeaderTime(t){let o=this.config?.header_time_mode??"clock";if(o==="hidden")return c;if(o==="clock")return l`<div class="clock">
        ${J(new Date().toISOString(),this.hass?.locale)}
      </div>`;if(!t)return l`<div
        class="header-time next-departure"
        aria-label="No upcoming departures"
      >
        <small>Next</small>
        <strong>—</strong>
      </div>`;let r=He(t.estimated_time),a=J(t.estimated_time,this.hass?.locale),s=this.config?.header_next_departure_format??"countdown",n=`Next departure route ${t.route_name} to ${t.destination||t.route_long_name}, ${r}, at ${a}`;return l`<div
      class="header-time next-departure"
      aria-label=${n}
    >
      <small>Next</small>
      ${s==="clock"?l`<strong>${a}</strong>`:l`
            <strong>${r}</strong>
            ${s==="both"?l`<span>${a}</span>`:c}
          `}
    </div>`}renderRouteFilter(t,o){let r=this.config?.route_filter_show_counts===!0,a=t.reduce((s,n)=>s+n.count,0);return l`
      <nav class="route-filter" aria-label="Filter departures by route">
        <button
          type="button"
          class="route-filter-chip all"
          aria-pressed=${String(o.size===0)}
          @click=${()=>this.selectAllRoutes()}
        >
          All${r?l` <span>${a}</span>`:c}
        </button>
        ${t.map(s=>{let n=o.has(s.name),d=this.config?.route_color_mode==="official"&&n?[s.color?`background:#${s.color}`:"",s.textColor?`color:#${s.textColor}`:""].filter(Boolean).join(";"):"";return l`
            <button
              type="button"
              class="route-filter-chip"
              style=${d}
              aria-label="Filter route ${s.name}"
              aria-pressed=${String(n)}
              @click=${()=>this.toggleRoute(s.name)}
            >
              ${s.name}${r?l` <span>${s.count}</span>`:c}
            </button>
          `})}
      </nav>
    `}renderGrouped(t,o){let r=this.config?.empty_stop_behavior??(this.config?.hide_empty_stops?"hide":"show"),a=t.map(n=>({stop:n,departures:pe(X(n.departures,o),this.config?.cancelled_behavior??"show","chronological",[n.stop_id])}));r==="hide"?a=a.filter(({departures:n})=>n.length>0):r==="move"&&a.sort((n,d)=>+(n.departures.length===0)-+(d.departures.length===0));let s=a.map(({stop:n,departures:d})=>{let h=this.isStopCollapsed(n),u=n.departures_per_stop??this.config?.departures_per_stop??Y;return l`
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
            ${this.config?.show_stop_codes!==!1&&n.show_stop_code!==!1&&n.stop_code?l`<span class="stop-code">#${n.stop_code}</span>`:c}
          </button>
          ${h?c:d.length?d.slice(0,u).map(p=>this.renderDeparture(p,!1)):l`<div class="empty-stop">No upcoming departures</div>`}
        </section>
      `});return s.length?s:l`<div class="message">No upcoming departures.</div>`}renderCombined(t,o,r){let a=pe(X(t,r),this.config?.cancelled_behavior??"show",this.config?.combined_order??"chronological",o.map(s=>s.stop_id));return a.length===0?l`<div class="message">No upcoming departures.</div>`:l`
      <section>
        ${a.slice(0,this.config?.max_departures??me).map(s=>this.renderDeparture(s,!0))}
      </section>
    `}renderDeparture(t,o){let r=this.config?.route_color_mode==="official"?[t.route_color?`background:#${t.route_color}`:"",t.route_text_color?`color:#${t.route_text_color}`:""].filter(Boolean).join(";"):"",a=De(t,this.config?.delay_threshold_minutes),s=this.config?.time_display!=="clock",n=this.config?.time_display!=="countdown",d=t.destination||t.route_long_name,h=t.cancelled?"cancelled":a.delayed?`${a.delayMinutes} minutes late`:t.realtime?"live prediction":"scheduled",u=this.config?.delay_format==="text"?`${a.delayMinutes} min late`:`+${a.delayMinutes} min`;return l`
      <div
        class="departure ${t.cancelled?"cancelled":""}"
        role="button"
        tabindex="0"
        aria-label="Route ${t.route_name} to ${d}, ${h}. Open route map."
        @click=${()=>this.openTripMap(t)}
        @keydown=${p=>this.departureKeydown(p,t)}
      >
        <span class="route" style=${r}>${t.route_name}</span>
        <div class="destination">
          <strong>${d}</strong>
          ${o?l`<small>${t.stop_name}</small>`:c}
        </div>
        <div class="timing">
          ${t.cancelled?l`<strong>Cancelled</strong>`:s?l`<strong>${He(t.estimated_time)}</strong>`:c}
          ${n?l`<small class="time-details ${s?"":"clock-only"}">
                ${a.scheduledTime&&this.config?.show_scheduled_time!==!1?l`<s>${J(a.scheduledTime,this.hass?.locale)}</s>`:c}
                <span class=${a.delayed?"predicted-time":""}>
                  ${J(a.displayTime,this.hass?.locale)}
                </span>
              </small>`:c}
          <small class="status-details">
            ${a.delayMinutes!==void 0?l`<span class="delay">${u}</span>`:c}
            ${this.config?.show_realtime_status?l`<span class="realtime ${t.realtime?"live":""}">
                  ${t.realtime?"Live":"Scheduled"}
                </span>`:c}
          </small>
        </div>
      </div>
    `}openTripMap(t){if(!this.hass||!this.config)return;document.querySelector("translink-trip-map-dialog")?.remove();let r=this.hass.states[this.config.entity]?.attributes.config_entry_id,a=document.createElement("translink-trip-map-dialog");a.hass=this.hass,a.entryId=typeof r=="string"?r:"",a.departure=t,document.body.append(a)}departureKeydown(t,o){t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),this.openTripMap(o))}isStopCollapsed(t){return this.initializedStops.has(t.stop_id)||(this.initializedStops.add(t.stop_id),t.collapsed&&this.collapsedStops.add(t.stop_id)),this.collapsedStops.has(t.stop_id)}toggleStop(t){let o=new Set(this.collapsedStops);o.has(t)?o.delete(t):o.add(t),this.collapsedStops=o}activeSelectedRoutes(t){let o=new Set(t.map(a=>a.name)),r=new Set([...this.selectedRoutes].filter(a=>o.has(a)));if(r.size!==this.selectedRoutes.size){this.selectedRoutes.clear();for(let a of r)this.selectedRoutes.add(a);r.size===0&&this.clearRouteFilterResetTimer()}return r}selectAllRoutes(){this.resetRouteFilter()}toggleRoute(t){let o=new Set(this.selectedRoutes);this.config?.route_filter_selection_mode==="single"?o.size===1&&o.has(t)?o.clear():(o.clear(),o.add(t)):o.has(t)?o.delete(t):o.add(t),this.selectedRoutes=o,o.size>0?this.scheduleRouteFilterReset():this.clearRouteFilterResetTimer()}resetRouteFilter(){this.clearRouteFilterResetTimer(),this.selectedRoutes.size>0&&(this.selectedRoutes=new Set)}scheduleRouteFilterReset(){this.clearRouteFilterResetTimer();let t=this.config?.route_filter_reset_minutes??fe;t<=0||(this.routeFilterResetTimer=window.setTimeout(()=>this.resetRouteFilter(),t*6e4))}clearRouteFilterResetTimer(){this.routeFilterResetTimer!==void 0&&(window.clearTimeout(this.routeFilterResetTimer),this.routeFilterResetTimer=void 0)}static{this.styles=E`
    :host {
      display: block;
      height: 100%;
      min-height: 0;
      width: 100%;
    }
    ha-card {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
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
      align-items: center;
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
    .stop-code {
      color: var(--secondary-text-color);
      font-size: 12px;
      font-weight: 500;
      line-height: 1;
    }
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
  `}};m([x({attribute:!1})],A.prototype,"hass",2),m([b()],A.prototype,"config",2),m([b()],A.prototype,"collapsedStops",2),m([b()],A.prototype,"selectedRoutes",2);var H=class extends _{setConfig(e){this.config=ge(e)}render(){return this.config?l`
      <div class="card-config">
        <ha-entity-picker
          class="entity-picker"
          .hass=${this.hass}
          .value=${this.config.entity}
          .includeDomains=${["sensor"]}
          label="Entity"
          data-key="entity"
          @value-changed=${this.valueChanged}
        ></ha-entity-picker>
        ${this.editorPanel("Card & layout","Title, layout, ordering, and departure limits","mdi:view-dashboard-outline",l`
            <ha-textfield
              .value=${this.config.title??""}
              label="Title"
              data-key="title"
              @input=${this.valueChanged}
            ></ha-textfield>
            ${this.selectField("view","Layout",this.config.view??"grouped",lt)}
            ${this.selectField("combined_order","Combined ordering",this.config.combined_order??"chronological",dt)}
            <ha-textfield
              type="number"
              min="1"
              max=${Fe}
              .value=${String(this.config.departures_per_stop??Y)}
              label="Departures per stop"
              data-key="departures_per_stop"
              data-min="1"
              data-max=${Fe}
              @input=${this.numberChanged}
            ></ha-textfield>
            <ha-textfield
              type="number"
              min="1"
              max="50"
              .value=${String(this.config.max_departures??me)}
              label="Maximum combined departures"
              data-key="max_departures"
              data-min="1"
              data-max="50"
              @input=${this.numberChanged}
            ></ha-textfield>
          `)}
        ${this.editorPanel("Timing & status","Departure times, delays, cancellations, and realtime state","mdi:clock-outline",l`
            ${this.selectField("time_display","Time display",this.config.time_display??"both",ct)}
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
            ${this.selectField("delay_format","Delay label",this.config.delay_format??"compact",pt)}
            ${this.selectField("cancelled_behavior","Cancelled departures",this.config.cancelled_behavior??"show",ht)}
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
          `)}
        ${this.editorPanel("Appearance","Density, route colors, stops, and section headings","mdi:palette-outline",l`
            ${this.selectField("density","Row density",this.config.density??"comfortable",ut)}
            ${this.selectField("route_color_mode","Route badge colors",this.config.route_color_mode??"official",mt)}
            ${this.selectField("empty_stop_behavior","Stops without departures",this.config.empty_stop_behavior??(this.config.hide_empty_stops?"hide":"show"),gt)}
            ${this.selectField("stop_heading_style","Stop heading style",this.config.stop_heading_style??"accent",yt)}
            ${this.booleanField("show_stop_codes","Show stop numbers",this.config.show_stop_codes!==!1)}
          `)}
        ${this.editorPanel("Route filter","Interactive route selection and automatic reset","mdi:filter-variant",l`
            ${this.booleanField("show_route_filter","Show route filter",this.config.show_route_filter===!0)}
            ${this.config.show_route_filter?l`
                  ${this.selectField("route_filter_selection_mode","Route selection",this.config.route_filter_selection_mode??"multiple",ft)}
                  ${this.booleanField("route_filter_show_counts","Show departure counts",this.config.route_filter_show_counts===!0)}
                  <ha-textfield
                    type="number"
                    min="0"
                    max=${Le}
                    .value=${String(this.config.route_filter_reset_minutes??fe)}
                    label="Reset to All after (minutes, 0 = never)"
                    data-key="route_filter_reset_minutes"
                    data-min="0"
                    data-max=${Le}
                    @input=${this.numberChanged}
                  ></ha-textfield>
                `:c}
          `)}
        ${this.editorPanel("Header & notices","Title, right-side display, colors, icon, and service notices","mdi:card-text-outline",l`
            ${this.booleanField("show_header","Show header",this.config.show_header!==!1)}
            ${this.booleanField("show_brand","Show TransLink label",this.config.show_brand!==!1)}
            ${this.selectField("header_time_mode","Header right-side display",this.config.header_time_mode??(this.config.show_clock===!1?"hidden":"clock"),bt)}
            ${(this.config.header_time_mode??(this.config.show_clock===!1?"hidden":"clock"))==="next_departure"?this.selectField("header_next_departure_format","Next departure display",this.config.header_next_departure_format??"countdown",vt):c}
            ${this.selectField("header_style","Header colors",this.config.header_style??"primary",_t)}
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
          `)}
      </div>
    `:c}editorPanel(e,t,o,r){return l`
      <ha-expansion-panel
        outlined
        .header=${e}
        .secondary=${t}
        .leftChevron=${!1}
      >
        <ha-icon slot="leading-icon" .icon=${o}></ha-icon>
        <div class="panel-body">${r}</div>
      </ha-expansion-panel>
    `}selectField(e,t,o,r){return l`
      <ha-select
        .label=${t}
        .value=${o}
        .options=${r}
        data-key=${e}
        @selected=${this.valueChanged}
      ></ha-select>
    `}booleanField(e,t,o){return l`
      <ha-formfield label=${t}>
        <ha-switch
          .checked=${o}
          data-key=${e}
          @change=${this.booleanChanged}
        ></ha-switch>
      </ha-formfield>
    `}valueChanged(e){if(!this.config)return;let t=e.currentTarget,o=t.dataset.key,a=e.detail?.value??t.value;this.config={...this.config,[o]:a},this.emitConfigChanged()}booleanChanged(e){if(!this.config)return;let t=e.currentTarget,o=t.dataset.key;this.config={...this.config,[o]:t.checked},this.emitConfigChanged()}numberChanged(e){if(!this.config)return;let t=e.currentTarget,o=Number.parseInt(t.value,10);if(!Number.isFinite(o))return;let r=t.dataset.key,a=Number.parseInt(t.dataset.min??"1",10),s=Number.parseInt(t.dataset.max??"12",10);this.config={...this.config,[r]:Math.min(s,Math.max(a,o))},this.emitConfigChanged()}emitConfigChanged(){this.config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:xt(this.config)},bubbles:!0,composed:!0}))}static{this.styles=E`
    .card-config {
      display: flex;
      flex-direction: column;
      padding: 4px 0;
    }
    .entity-picker { margin: 8px 0; }
    ha-expansion-panel { margin: 8px 0; }
    .panel-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0 4px;
    }
  `}};m([x({attribute:!1})],H.prototype,"hass",2),m([b()],H.prototype,"config",2);customElements.get("translink-schedule-card")||customElements.define("translink-schedule-card",A);customElements.get("translink-schedule-card-editor")||customElements.define("translink-schedule-card-editor",H);window.customCards=window.customCards??[];window.customCards.some(i=>i.type==="translink-schedule-card")||window.customCards.push({type:"translink-schedule-card",name:"TransLink Schedule Card",description:"Upcoming departures from multiple TransLink stops.",preview:!0});export{A as TransLinkScheduleCard,H as TransLinkScheduleCardEditor,He as countdownLabel,ge as flattenCardConfig,$t as getNextDeparture,xt as groupCardConfig};
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
