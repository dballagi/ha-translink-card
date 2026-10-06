var Te=Object.defineProperty;var Pe=Object.getOwnPropertyDescriptor;var w=(o,e,t,s)=>{for(var i=s>1?void 0:s?Pe(e,t):e,r=o.length-1,n;r>=0;r--)(n=o[r])&&(i=(s?n(e,t,i):n(i))||i);return s&&i&&Te(e,t,i),i};var L=globalThis,I=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),ce=new WeakMap,E=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(I&&e===void 0){let s=t!==void 0&&t.length===1;s&&(e=ce.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ce.set(t,e))}return e}toString(){return this.cssText}},de=o=>new E(typeof o=="string"?o:o+"",void 0,G),z=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((s,i,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new E(t,o,G)},he=(o,e)=>{if(I)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let s=document.createElement("style"),i=L.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,o.appendChild(s)}},K=I?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let s of e.cssRules)t+=s.cssText;return de(t)})(o):o;var{is:De,defineProperty:Ne,getOwnPropertyDescriptor:Me,getOwnPropertyNames:He,getOwnPropertySymbols:Ue,getPrototypeOf:Re}=Object,j=globalThis,pe=j.trustedTypes,Le=pe?pe.emptyScript:"",Ie=j.reactiveElementPolyfillSupport,k=(o,e)=>o,O={toAttribute(o,e){switch(e){case Boolean:o=o?Le:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},F=(o,e)=>!De(o,e),ue={attribute:!0,type:String,converter:O,reflect:!1,useDefault:!1,hasChanged:F};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ue){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Ne(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){let{get:i,set:r}=Me(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){let l=i?.call(this);r?.call(this,n),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ue}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;let e=Re(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){let t=this.properties,s=[...He(t),...Ue(t)];for(let i of s)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[t,s]of this.elementProperties){let i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let s=new Set(e.flat(1/0).reverse());for(let i of s)t.unshift(K(i))}else e!==void 0&&t.push(K(e));return t}static _$Eu(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return he(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){let s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:O).toAttribute(t,s.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){let s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:O;this._$Em=i;let l=n.fromAttribute(t,r.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){if(e!==void 0){let n=this.constructor;if(i===!1&&(r=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??F)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:n}=r,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,r,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[k("elementProperties")]=new Map,f[k("finalized")]=new Map,Ie?.({ReactiveElement:f}),(j.reactiveElementVersions??=[]).push("2.1.2");var te=globalThis,me=o=>o,q=te.trustedTypes,fe=q?q.createPolicy("lit-html",{createHTML:o=>o}):void 0,be="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,xe="?"+y,ze=`<${xe}>`,b=document,P=()=>b.createComment(""),D=o=>o===null||typeof o!="object"&&typeof o!="function",se=Array.isArray,je=o=>se(o)||typeof o?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,_e=/>/g,v=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ye=/'/g,ve=/"/g,we=/^(?:script|style|textarea|title)$/i,ie=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),d=ie(1),dt=ie(2),ht=ie(3),x=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),$e=new WeakMap,$=b.createTreeWalker(b,129);function Se(o,e){if(!se(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return fe!==void 0?fe.createHTML(e):e}var Fe=(o,e)=>{let t=o.length-1,s=[],i,r=e===2?"<svg>":e===3?"<math>":"",n=T;for(let l=0;l<t;l++){let a=o[l],h,p,u=-1,m=0;for(;m<a.length&&(n.lastIndex=m,p=n.exec(a),p!==null);)m=n.lastIndex,n===T?p[1]==="!--"?n=ge:p[1]!==void 0?n=_e:p[2]!==void 0?(we.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=v):p[3]!==void 0&&(n=v):n===v?p[0]===">"?(n=i??T,u=-1):p[1]===void 0?u=-2:(u=n.lastIndex-p[2].length,h=p[1],n=p[3]===void 0?v:p[3]==='"'?ve:ye):n===ve||n===ye?n=v:n===ge||n===_e?n=T:(n=v,i=void 0);let _=n===v&&o[l+1].startsWith("/>")?" ":"";r+=n===T?a+ze:u>=0?(s.push(h),a.slice(0,u)+be+a.slice(u)+y+_):a+y+(u===-2?l:_)}return[Se(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},N=class o{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,n=0,l=e.length-1,a=this.parts,[h,p]=Fe(e,t);if(this.el=o.createElement(h,s),$.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=$.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let u of i.getAttributeNames())if(u.endsWith(be)){let m=p[n++],_=i.getAttribute(u).split(y),R=/([.?@])?(.*)/.exec(m);a.push({type:1,index:r,name:R[2],strings:_,ctor:R[1]==="."?X:R[1]==="?"?Z:R[1]==="@"?Q:A}),i.removeAttribute(u)}else u.startsWith(y)&&(a.push({type:6,index:r}),i.removeAttribute(u));if(we.test(i.tagName)){let u=i.textContent.split(y),m=u.length-1;if(m>0){i.textContent=q?q.emptyScript:"";for(let _=0;_<m;_++)i.append(u[_],P()),$.nextNode(),a.push({type:2,index:++r});i.append(u[m],P())}}}else if(i.nodeType===8)if(i.data===xe)a.push({type:2,index:r});else{let u=-1;for(;(u=i.data.indexOf(y,u+1))!==-1;)a.push({type:7,index:r}),u+=y.length-1}r++}}static createElement(e,t){let s=b.createElement("template");return s.innerHTML=e,s}};function S(o,e,t=o,s){if(e===x)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl,r=D(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,t,s)),s!==void 0?(t._$Co??=[])[s]=i:t._$Cl=i),i!==void 0&&(e=S(o,i._$AS(o,e.values),i,s)),e}var J=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??b).importNode(t,!0);$.currentNode=i;let r=$.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new M(r,r.nextSibling,this,e):a.type===1?h=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(h=new ee(r,this,e)),this._$AV.push(h),a=s[++l]}n!==a?.index&&(r=$.nextNode(),n++)}return $.currentNode=b,i}p(e){let t=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},M=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),D(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):je(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=N.createElement(Se(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{let r=new J(i,this),n=r.u(this.options);r.p(t),this.T(n),this._$AH=r}}_$AC(e){let t=$e.get(e.strings);return t===void 0&&$e.set(e.strings,t=new N(e)),t}k(e){se(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,s,i=0;for(let r of e)i===t.length?t.push(s=new o(this.O(P()),this.O(P()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let s=me(e).nextSibling;me(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},A=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(e,t=this,s,i){let r=this.strings,n=!1;if(r===void 0)e=S(this,e,t,0),n=!D(e)||e!==this._$AH&&e!==x,n&&(this._$AH=e);else{let l=e,a,h;for(e=r[0],a=0;a<r.length-1;a++)h=S(this,l[s+a],t,a),h===x&&(h=this._$AH[a]),n||=!D(h)||h!==this._$AH[a],h===c?e=c:e!==c&&(e+=(h??"")+r[a+1]),this._$AH[a]=h}n&&!i&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},X=class extends A{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}},Z=class extends A{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}},Q=class extends A{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??c)===x)return;let s=this._$AH,i=e===c&&s!==c||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ee=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}};var qe=te.litHtmlPolyfillSupport;qe?.(N,M),(te.litHtmlVersions??=[]).push("3.3.3");var Ae=(o,e,t)=>{let s=t?.renderBefore??e,i=s._$litPart$;if(i===void 0){let r=t?.renderBefore??null;s._$litPart$=i=new M(e.insertBefore(P(),r),r,void 0,t??{})}return i._$AI(o),i};var oe=globalThis,g=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};g._$litElement$=!0,g.finalized=!0,oe.litElementHydrateSupport?.({LitElement:g});var Be=oe.litElementPolyfillSupport;Be?.({LitElement:g});(oe.litElementVersions??=[]).push("4.2.2");var We={attribute:!0,type:String,converter:O,reflect:!1,hasChanged:F},Ve=(o=We,e,t)=>{let{kind:s,metadata:i}=t,r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(t.name,o),s==="accessor"){let{name:n}=t;return{set(l){let a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,o,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(s==="setter"){let{name:n}=t;return function(l){let a=this[n];e.call(this,l),this.requestUpdate(n,a,o,!0,l)}}throw Error("Unsupported decorator location: "+s)};function H(o){return(e,t)=>typeof t=="object"?Ve(o,e,t):((s,i,r)=>{let n=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),n?Object.getOwnPropertyDescriptor(i,r):void 0})(o,e,t)}function B(o){return H({...o,state:!0,attribute:!1})}function re(o,e){return new Date(o.estimated_time).getTime()-new Date(e.estimated_time).getTime()}function Ge(o,e){let t=new Map;for(let i of e)t.set(i,[]);for(let i of o){let r=t.get(i.stop_id)??[];r.push(i),t.set(i.stop_id,r)}let s=[];for(;[...t.values()].some(i=>i.length>0);)for(let i of t.values()){let r=i.shift();r&&s.push(r)}return s}function ne(o,e,t,s){let i=e==="hide"?o.filter(r=>!r.cancelled):[...o];return t==="balanced"?i=Ge(i,s):t==="route"?i.sort((r,n)=>r.route_name.localeCompare(n.route_name,void 0,{numeric:!0})||re(r,n)):t==="realtime"?i.sort((r,n)=>Number(n.realtime)-Number(r.realtime)||re(r,n)):i.sort(re),e==="move"&&i.sort((r,n)=>Number(r.cancelled)-Number(n.cancelled)),i}function Ce(o,e,t=Date.now()){return o?t-new Date(o).getTime()>e*6e4:!0}function Ee(o,e=1){let t=!o.cancelled&&o.delay_seconds>=e*60;return{delayed:t,displayTime:o.cancelled?o.scheduled_time:o.estimated_time,scheduledTime:t?o.scheduled_time:void 0,delayMinutes:t?Math.round(o.delay_seconds/60):void 0}}function ke(o,e=[]){return[...new Set([...e,...Object.keys(o.states)])].find(s=>{let i=o.states[s]?.attributes;return Array.isArray(i?.stops)&&Array.isArray(i?.departures)})}var V=3,Oe=12,le=12,Ke=[{value:"grouped",label:"Grouped by stop"},{value:"combined",label:"Combined by time"}],Ye=[{value:"chronological",label:"Chronological"},{value:"balanced",label:"Balance stops"},{value:"route",label:"Group routes"},{value:"realtime",label:"Realtime first"}],Je=[{value:"both",label:"Countdown and clock"},{value:"countdown",label:"Countdown only"},{value:"clock",label:"Clock only"}],Xe=[{value:"compact",label:"+7 min"},{value:"text",label:"7 min late"}],Ze=[{value:"show",label:"Show in schedule order"},{value:"move",label:"Move below active departures"},{value:"hide",label:"Hide"}],Qe=[{value:"comfortable",label:"Comfortable"},{value:"compact",label:"Compact"},{value:"minimal",label:"Minimal"}],et=[{value:"official",label:"Official route colors"},{value:"theme",label:"Theme primary color"},{value:"monochrome",label:"Monochrome"}],tt=[{value:"show",label:"Show in configured order"},{value:"move",label:"Move to bottom"},{value:"hide",label:"Hide"}],st=[{value:"primary",label:"Theme primary"},{value:"surface",label:"Card surface"},{value:"transparent",label:"Transparent"}],it=[{value:"accent",label:"Accent"},{value:"plain",label:"Plain"},{value:"compact",label:"Compact"}];function ot(o,e=Date.now()){return Math.max(0,Math.round((new Date(o).getTime()-e)/6e4))}function ae(o,e){let t=e?.time_format==="12"?!0:e?.time_format==="24"?!1:void 0;return new Intl.DateTimeFormat(e?.language,{hour:"numeric",hour12:t,minute:"2-digit"}).format(new Date(o))}var C=class extends g{constructor(){super(...arguments);this.collapsedStops=new Set;this.initializedStops=new Set}static async getConfigElement(){return document.createElement("translink-schedule-card-editor")}static getStubConfig(t,s=[]){return{entity:ke(t,s)??"",view:"grouped",departures_per_stop:V}}getGridOptions(){return{columns:12,min_columns:6}}setConfig(t){if(!t.entity)throw new Error("A TransLink Schedule entity is required");this.config={view:"grouped",departures_per_stop:V,max_departures:le,time_display:"both",show_scheduled_time:!0,delay_threshold_minutes:1,delay_format:"compact",density:"comfortable",empty_stop_behavior:"show",cancelled_behavior:"show",route_color_mode:"official",combined_order:"chronological",show_header:!0,show_brand:!0,header_style:"primary",stop_heading_style:"accent",show_clock:!0,show_alerts:!0,show_stop_codes:!0,show_realtime_status:!1,show_stale_warning:!1,stale_after_minutes:3,...t}}connectedCallback(){super.connectedCallback(),this.ticker=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){this.ticker!==void 0&&window.clearInterval(this.ticker),super.disconnectedCallback()}render(){if(!this.config||!this.hass)return c;let t=this.hass.states[this.config.entity];if(!t)return d`<ha-card><div class="message error">
        Entity ${this.config.entity} was not found.
      </div></ha-card>`;let s=t.attributes.stops??[],i=t.attributes.departures??[],r=t.attributes.alerts??[],n=this.config.title??t.attributes.board_name??"TransLink departures",l=t.attributes.last_updated,a=this.config.show_stale_warning&&Ce(l,this.config.stale_after_minutes??3),h=[`density-${this.config.density}`,`header-${this.config.header_style}`,`routes-${this.config.route_color_mode}`,`stops-${this.config.stop_heading_style}`].join(" ");return d`
      <ha-card class=${h}>
        ${this.config.show_header?d`<header>
              <div class="header-title">
                ${this.config.header_icon?d`<ha-icon
                      .icon=${this.config.header_icon}
                      aria-hidden="true"
                    ></ha-icon>`:c}
                <div>
                  ${this.config.show_brand?d`<div class="eyebrow">TransLink</div>`:c}
                  <h1>${n}</h1>
                </div>
              </div>
              ${this.config.show_clock?d`<div class="clock">${ae(new Date().toISOString(),this.hass.locale)}</div>`:c}
            </header>`:c}
        ${this.config.show_alerts&&r.length?d`<div class="alerts">
              ${r.map(p=>d`<div>
                  <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
                  <span>
                    <strong>${p.header}</strong>
                    ${p.description?d`<small>${p.description}</small>`:c}
                  </span>
                </div>`)}
            </div>`:c}
        ${a?d`<div class="stale" role="status">
              <ha-icon icon="mdi:cloud-alert" aria-hidden="true"></ha-icon>
              Realtime data has not updated recently.
            </div>`:c}
        <main>
          ${this.config.view==="combined"?this.renderCombined(i,s):this.renderGrouped(s)}
        </main>
      </ha-card>
    `}renderGrouped(t){let s=this.config?.empty_stop_behavior??(this.config?.hide_empty_stops?"hide":"show"),i=t.map(n=>({stop:n,departures:ne(n.departures,this.config?.cancelled_behavior??"show","chronological",[n.stop_id])}));s==="hide"?i=i.filter(({departures:n})=>n.length>0):s==="move"&&i.sort((n,l)=>+(n.departures.length===0)-+(l.departures.length===0));let r=i.map(({stop:n,departures:l})=>{let a=this.isStopCollapsed(n),h=n.departures_per_stop??this.config?.departures_per_stop??V;return d`
        <section class=${a?"collapsed":""}>
          <button
            class="stop-heading"
            type="button"
            aria-expanded=${String(!a)}
            @click=${()=>this.toggleStop(n.stop_id)}
          >
            <span class="stop-title">
              <ha-icon
                icon=${a?"mdi:chevron-right":"mdi:chevron-down"}
                aria-hidden="true"
              ></ha-icon>
              ${n.display_name||n.stop_name}
            </span>
            ${this.config?.show_stop_codes!==!1&&n.show_stop_code!==!1&&n.stop_code?d`<span class="stop-code">#${n.stop_code}</span>`:c}
          </button>
          ${a?c:l.length?l.slice(0,h).map(p=>this.renderDeparture(p,!1)):d`<div class="empty-stop">No upcoming departures</div>`}
        </section>
      `});return r.length?r:d`<div class="message">No upcoming departures.</div>`}renderCombined(t,s){let i=ne(t,this.config?.cancelled_behavior??"show",this.config?.combined_order??"chronological",s.map(r=>r.stop_id));return i.length===0?d`<div class="message">No upcoming departures.</div>`:d`
      <section>
        ${i.slice(0,this.config?.max_departures??le).map(r=>this.renderDeparture(r,!0))}
      </section>
    `}renderDeparture(t,s){let i=this.config?.route_color_mode==="official"?[t.route_color?`background:#${t.route_color}`:"",t.route_text_color?`color:#${t.route_text_color}`:""].filter(Boolean).join(";"):"",r=Ee(t,this.config?.delay_threshold_minutes),n=this.config?.time_display!=="clock",l=this.config?.time_display!=="countdown",a=t.destination||t.route_long_name,h=t.cancelled?"cancelled":r.delayed?`${r.delayMinutes} minutes late`:t.realtime?"live prediction":"scheduled",p=this.config?.delay_format==="text"?`${r.delayMinutes} min late`:`+${r.delayMinutes} min`;return d`
      <div
        class="departure ${t.cancelled?"cancelled":""}"
        role="group"
        aria-label="Route ${t.route_name} to ${a}, ${h}"
      >
        <span class="route" style=${i}>${t.route_name}</span>
        <div class="destination">
          <strong>${a}</strong>
          ${s?d`<small>${t.stop_name}</small>`:c}
        </div>
        <div class="timing">
          ${t.cancelled?d`<strong>Cancelled</strong>`:n?d`<strong>${ot(t.estimated_time)} min</strong>`:c}
          ${l?d`<small class="time-details ${n?"":"clock-only"}">
                ${r.scheduledTime&&this.config?.show_scheduled_time!==!1?d`<s>${ae(r.scheduledTime,this.hass?.locale)}</s>`:c}
                <span class=${r.delayed?"predicted-time":""}>
                  ${ae(r.displayTime,this.hass?.locale)}
                </span>
              </small>`:c}
          <small class="status-details">
            ${r.delayMinutes!==void 0?d`<span class="delay">${p}</span>`:c}
            ${this.config?.show_realtime_status?d`<span class="realtime ${t.realtime?"live":""}">
                  ${t.realtime?"Live":"Scheduled"}
                </span>`:c}
          </small>
        </div>
      </div>
    `}isStopCollapsed(t){return this.initializedStops.has(t.stop_id)||(this.initializedStops.add(t.stop_id),t.collapsed&&this.collapsedStops.add(t.stop_id)),this.collapsedStops.has(t.stop_id)}toggleStop(t){let s=new Set(this.collapsedStops);s.has(t)?s.delete(t):s.add(t),this.collapsedStops=s}static{this.styles=z`
    :host { display: block; }
    ha-card {
      background: var(--ha-card-background, var(--card-background-color));
      overflow: hidden;
    }
    header {
      align-items: center;
      background: var(--primary-color);
      color: var(--text-primary-color);
      display: flex;
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
    .alerts { background: var(--warning-color, #ff9800); color: #111; padding: 8px 16px; }
    .alerts > div { align-items: flex-start; display: flex; gap: 8px; }
    .alerts > div + div { margin-top: 8px; }
    .alerts span { display: flex; flex-direction: column; }
    .alerts small { color: inherit; }
    .stale {
      align-items: center;
      background: var(--warning-color, #ff9800);
      color: #111;
      display: flex;
      font-size: 12px;
      gap: 8px;
      padding: 7px 16px;
    }
    main { padding: 4px 0; }
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
      display: grid;
      gap: 12px;
      grid-template-columns: minmax(42px, auto) 1fr auto;
      min-height: 48px;
      padding: 6px 16px;
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
  `}};w([H({attribute:!1})],C.prototype,"hass",2),w([B()],C.prototype,"config",2),w([B()],C.prototype,"collapsedStops",2);var U=class extends g{setConfig(e){this.config=e}render(){return this.config?d`
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
        ${this.selectField("view","Layout",this.config.view??"grouped",Ke)}
        ${this.selectField("combined_order","Combined ordering",this.config.combined_order??"chronological",Ye)}
        <ha-textfield
          type="number"
          min="1"
          max=${Oe}
          .value=${String(this.config.departures_per_stop??V)}
          label="Departures per stop"
          data-key="departures_per_stop"
          data-min="1"
          data-max=${Oe}
          @input=${this.numberChanged}
        ></ha-textfield>
        <ha-textfield
          type="number"
          min="1"
          max="50"
          .value=${String(this.config.max_departures??le)}
          label="Maximum combined departures"
          data-key="max_departures"
          data-min="1"
          data-max="50"
          @input=${this.numberChanged}
        ></ha-textfield>

        <h3>Timing and status</h3>
        ${this.selectField("time_display","Time display",this.config.time_display??"both",Je)}
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
        ${this.selectField("delay_format","Delay label",this.config.delay_format??"compact",Xe)}
        ${this.selectField("cancelled_behavior","Cancelled departures",this.config.cancelled_behavior??"show",Ze)}
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
        ${this.selectField("density","Row density",this.config.density??"comfortable",Qe)}
        ${this.selectField("route_color_mode","Route badge colors",this.config.route_color_mode??"official",et)}
        ${this.selectField("empty_stop_behavior","Stops without departures",this.config.empty_stop_behavior??(this.config.hide_empty_stops?"hide":"show"),tt)}
        ${this.booleanField("show_stop_codes","Show stop numbers",this.config.show_stop_codes!==!1)}

        <h3>Header</h3>
        ${this.booleanField("show_header","Show header",this.config.show_header!==!1)}
        ${this.booleanField("show_brand","Show TransLink label",this.config.show_brand!==!1)}
        ${this.booleanField("show_clock","Show current time",this.config.show_clock!==!1)}
        ${this.selectField("header_style","Header colors",this.config.header_style??"primary",st)}
        ${this.selectField("stop_heading_style","Stop heading style",this.config.stop_heading_style??"accent",it)}
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
    `:c}selectField(e,t,s,i){return d`
      <ha-select
        .label=${t}
        .value=${s}
        .options=${i}
        data-key=${e}
        @selected=${this.valueChanged}
      ></ha-select>
    `}booleanField(e,t,s){return d`
      <ha-formfield label=${t}>
        <ha-switch
          .checked=${s}
          data-key=${e}
          @change=${this.booleanChanged}
        ></ha-switch>
      </ha-formfield>
    `}valueChanged(e){if(!this.config)return;let t=e.currentTarget,s=t.dataset.key,r=e.detail?.value??t.value;this.config={...this.config,[s]:r},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}booleanChanged(e){if(!this.config)return;let t=e.currentTarget,s=t.dataset.key;this.config={...this.config,[s]:t.checked},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}numberChanged(e){if(!this.config)return;let t=e.currentTarget,s=Number.parseInt(t.value,10);if(!Number.isFinite(s))return;let i=t.dataset.key,r=Number.parseInt(t.dataset.min??"1",10),n=Number.parseInt(t.dataset.max??"12",10);this.config={...this.config,[i]:Math.min(n,Math.max(r,s))},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}static{this.styles=z`
    .form { display: grid; gap: 16px; padding: 8px 0; }
    h3 {
      border-bottom: 1px solid var(--divider-color);
      font-size: 14px;
      margin: 8px 0 0;
      padding-bottom: 6px;
    }
  `}};w([H({attribute:!1})],U.prototype,"hass",2),w([B()],U.prototype,"config",2);customElements.get("translink-schedule-card")||customElements.define("translink-schedule-card",C);customElements.get("translink-schedule-card-editor")||customElements.define("translink-schedule-card-editor",U);window.customCards=window.customCards??[];window.customCards.some(o=>o.type==="translink-schedule-card")||window.customCards.push({type:"translink-schedule-card",name:"TransLink Schedule Card",description:"Upcoming departures from multiple TransLink stops.",preview:!0});export{C as TransLinkScheduleCard,U as TransLinkScheduleCardEditor};
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
