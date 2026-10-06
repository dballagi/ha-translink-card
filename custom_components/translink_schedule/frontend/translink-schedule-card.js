var Te=Object.defineProperty;var De=Object.getOwnPropertyDescriptor;var w=(o,e,t,i)=>{for(var s=i>1?void 0:i?De(e,t):e,a=o.length-1,r;a>=0;a--)(r=o[a])&&(s=(i?r(e,t,s):r(s))||s);return i&&s&&Te(e,t,s),s};var L=globalThis,z=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),ce=new WeakMap,E=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(z&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=ce.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ce.set(t,e))}return e}toString(){return this.cssText}},de=o=>new E(typeof o=="string"?o:o+"",void 0,G),j=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,s,a)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[a+1],o[0]);return new E(t,o,G)},he=(o,e)=>{if(z)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=L.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},K=z?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return de(t)})(o):o;var{is:Me,defineProperty:Ne,getOwnPropertyDescriptor:Ue,getOwnPropertyNames:He,getOwnPropertySymbols:Oe,getPrototypeOf:Re}=Object,q=globalThis,pe=q.trustedTypes,Le=pe?pe.emptyScript:"",ze=q.reactiveElementPolyfillSupport,k=(o,e)=>o,P={toAttribute(o,e){switch(e){case Boolean:o=o?Le:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},I=(o,e)=>!Me(o,e),ue={attribute:!0,type:String,converter:P,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ue){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Ne(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:a}=Ue(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:s,set(r){let l=s?.call(this);a?.call(this,r),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ue}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;let e=Re(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){let t=this.properties,i=[...He(t),...Oe(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(K(s))}else e!==void 0&&t.push(K(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return he(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:P).toAttribute(t,i.type);this._$Em=e,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let a=i.getPropertyOptions(s),r=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:P;this._$Em=s;let l=r.fromAttribute(t,a.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(e,t,i,s=!1,a){if(e!==void 0){let r=this.constructor;if(s===!1&&(a=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??I)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),a!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,a]of i){let{wrapped:r}=a,l=this[s];r!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,a,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[k("elementProperties")]=new Map,g[k("finalized")]=new Map,ze?.({ReactiveElement:g}),(q.reactiveElementVersions??=[]).push("2.1.2");var te=globalThis,me=o=>o,B=te.trustedTypes,ge=B?B.createPolicy("lit-html",{createHTML:o=>o}):void 0,be="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,xe="?"+v,je=`<${xe}>`,b=document,D=()=>b.createComment(""),M=o=>o===null||typeof o!="object"&&typeof o!="function",ie=Array.isArray,qe=o=>ie(o)||typeof o?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,_e=/>/g,y=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ve=/'/g,ye=/"/g,we=/^(?:script|style|textarea|title)$/i,se=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),d=se(1),et=se(2),tt=se(3),x=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),$e=new WeakMap,$=b.createTreeWalker(b,129);function Ae(o,e){if(!ie(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ge!==void 0?ge.createHTML(e):e}var Ie=(o,e)=>{let t=o.length-1,i=[],s,a=e===2?"<svg>":e===3?"<math>":"",r=T;for(let l=0;l<t;l++){let n=o[l],h,p,u=-1,m=0;for(;m<n.length&&(r.lastIndex=m,p=r.exec(n),p!==null);)m=r.lastIndex,r===T?p[1]==="!--"?r=fe:p[1]!==void 0?r=_e:p[2]!==void 0?(we.test(p[2])&&(s=RegExp("</"+p[2],"g")),r=y):p[3]!==void 0&&(r=y):r===y?p[0]===">"?(r=s??T,u=-1):p[1]===void 0?u=-2:(u=r.lastIndex-p[2].length,h=p[1],r=p[3]===void 0?y:p[3]==='"'?ye:ve):r===ye||r===ve?r=y:r===fe||r===_e?r=T:(r=y,s=void 0);let _=r===y&&o[l+1].startsWith("/>")?" ":"";a+=r===T?n+je:u>=0?(i.push(h),n.slice(0,u)+be+n.slice(u)+v+_):n+v+(u===-2?l:_)}return[Ae(o,a+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},N=class o{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,r=0,l=e.length-1,n=this.parts,[h,p]=Ie(e,t);if(this.el=o.createElement(h,i),$.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=$.nextNode())!==null&&n.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(be)){let m=p[r++],_=s.getAttribute(u).split(v),R=/([.?@])?(.*)/.exec(m);n.push({type:1,index:a,name:R[2],strings:_,ctor:R[1]==="."?Z:R[1]==="?"?Q:R[1]==="@"?Y:C}),s.removeAttribute(u)}else u.startsWith(v)&&(n.push({type:6,index:a}),s.removeAttribute(u));if(we.test(s.tagName)){let u=s.textContent.split(v),m=u.length-1;if(m>0){s.textContent=B?B.emptyScript:"";for(let _=0;_<m;_++)s.append(u[_],D()),$.nextNode(),n.push({type:2,index:++a});s.append(u[m],D())}}}else if(s.nodeType===8)if(s.data===xe)n.push({type:2,index:a});else{let u=-1;for(;(u=s.data.indexOf(v,u+1))!==-1;)n.push({type:7,index:a}),u+=v.length-1}a++}}static createElement(e,t){let i=b.createElement("template");return i.innerHTML=e,i}};function A(o,e,t=o,i){if(e===x)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,a=M(e)?void 0:e._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=A(o,s._$AS(o,e.values),s,i)),e}var X=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??b).importNode(t,!0);$.currentNode=s;let a=$.nextNode(),r=0,l=0,n=i[0];for(;n!==void 0;){if(r===n.index){let h;n.type===2?h=new U(a,a.nextSibling,this,e):n.type===1?h=new n.ctor(a,n.name,n.strings,this,e):n.type===6&&(h=new ee(a,this,e)),this._$AV.push(h),n=i[++l]}r!==n?.index&&(a=$.nextNode(),r++)}return $.currentNode=b,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},U=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=A(this,e,t),M(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=N.createElement(Ae(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let a=new X(s,this),r=a.u(this.options);a.p(t),this.T(r),this._$AH=a}}_$AC(e){let t=$e.get(e.strings);return t===void 0&&$e.set(e.strings,t=new N(e)),t}k(e){ie(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let a of e)s===t.length?t.push(i=new o(this.O(D()),this.O(D()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=me(e).nextSibling;me(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(e,t=this,i,s){let a=this.strings,r=!1;if(a===void 0)e=A(this,e,t,0),r=!M(e)||e!==this._$AH&&e!==x,r&&(this._$AH=e);else{let l=e,n,h;for(e=a[0],n=0;n<a.length-1;n++)h=A(this,l[i+n],t,n),h===x&&(h=this._$AH[n]),r||=!M(h)||h!==this._$AH[n],h===c?e=c:e!==c&&(e+=(h??"")+a[n+1]),this._$AH[n]=h}r&&!s&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Z=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}},Q=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}},Y=class extends C{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){if((e=A(this,e,t,0)??c)===x)return;let i=this._$AH,s=e===c&&i!==c||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ee=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){A(this,e)}};var Be=te.litHtmlPolyfillSupport;Be?.(N,U),(te.litHtmlVersions??=[]).push("3.3.3");var Ce=(o,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let a=t?.renderBefore??null;i._$litPart$=s=new U(e.insertBefore(D(),a),a,void 0,t??{})}return s._$AI(o),s};var oe=globalThis,f=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ce(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};f._$litElement$=!0,f.finalized=!0,oe.litElementHydrateSupport?.({LitElement:f});var Fe=oe.litElementPolyfillSupport;Fe?.({LitElement:f});(oe.litElementVersions??=[]).push("4.2.2");var We={attribute:!0,type:String,converter:P,reflect:!1,hasChanged:I},Ve=(o=We,e,t)=>{let{kind:i,metadata:s}=t,a=globalThis.litPropertyMetadata.get(s);if(a===void 0&&globalThis.litPropertyMetadata.set(s,a=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),a.set(t.name,o),i==="accessor"){let{name:r}=t;return{set(l){let n=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,n,o,!0,l)},init(l){return l!==void 0&&this.C(r,void 0,o,l),l}}}if(i==="setter"){let{name:r}=t;return function(l){let n=this[r];e.call(this,l),this.requestUpdate(r,n,o,!0,l)}}throw Error("Unsupported decorator location: "+i)};function H(o){return(e,t)=>typeof t=="object"?Ve(o,e,t):((i,s,a)=>{let r=s.hasOwnProperty(a);return s.constructor.createProperty(a,i),r?Object.getOwnPropertyDescriptor(s,a):void 0})(o,e,t)}function F(o){return H({...o,state:!0,attribute:!1})}function ae(o,e){return new Date(o.estimated_time).getTime()-new Date(e.estimated_time).getTime()}function Ge(o,e){let t=new Map;for(let s of e)t.set(s,[]);for(let s of o){let a=t.get(s.stop_id)??[];a.push(s),t.set(s.stop_id,a)}let i=[];for(;[...t.values()].some(s=>s.length>0);)for(let s of t.values()){let a=s.shift();a&&i.push(a)}return i}function re(o,e,t,i){let s=e==="hide"?o.filter(a=>!a.cancelled):[...o];return t==="balanced"?s=Ge(s,i):t==="route"?s.sort((a,r)=>a.route_name.localeCompare(r.route_name,void 0,{numeric:!0})||ae(a,r)):t==="realtime"?s.sort((a,r)=>Number(r.realtime)-Number(a.realtime)||ae(a,r)):s.sort(ae),e==="move"&&s.sort((a,r)=>Number(a.cancelled)-Number(r.cancelled)),s}function Se(o,e,t=Date.now()){return o?t-new Date(o).getTime()>e*6e4:!0}function Ee(o,e=1){let t=!o.cancelled&&o.delay_seconds>=e*60;return{delayed:t,displayTime:o.cancelled?o.scheduled_time:o.estimated_time,scheduledTime:t?o.scheduled_time:void 0,delayMinutes:t?Math.round(o.delay_seconds/60):void 0}}function ke(o,e=[]){return[...new Set([...e,...Object.keys(o.states)])].find(i=>{let s=o.states[i]?.attributes;return Array.isArray(s?.stops)&&Array.isArray(s?.departures)})}var V=3,Pe=12,le=12;function Ke(o,e=Date.now()){return Math.max(0,Math.round((new Date(o).getTime()-e)/6e4))}function ne(o,e){let t=e?.time_format==="12"?!0:e?.time_format==="24"?!1:void 0;return new Intl.DateTimeFormat(e?.language,{hour:"numeric",hour12:t,minute:"2-digit"}).format(new Date(o))}var S=class extends f{constructor(){super(...arguments);this.collapsedStops=new Set;this.initializedStops=new Set}static async getConfigElement(){return document.createElement("translink-schedule-card-editor")}static getStubConfig(t,i=[]){return{entity:ke(t,i)??"",view:"grouped",departures_per_stop:V}}setConfig(t){if(!t.entity)throw new Error("A TransLink Schedule entity is required");this.config={view:"grouped",departures_per_stop:V,max_departures:le,time_display:"both",show_scheduled_time:!0,delay_threshold_minutes:1,delay_format:"compact",density:"comfortable",empty_stop_behavior:"show",cancelled_behavior:"show",route_color_mode:"official",combined_order:"chronological",show_header:!0,show_brand:!0,header_style:"primary",stop_heading_style:"accent",show_clock:!0,show_alerts:!0,show_stop_codes:!0,show_realtime_status:!1,show_stale_warning:!1,stale_after_minutes:3,...t}}connectedCallback(){super.connectedCallback(),this.ticker=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){this.ticker!==void 0&&window.clearInterval(this.ticker),super.disconnectedCallback()}render(){if(!this.config||!this.hass)return c;let t=this.hass.states[this.config.entity];if(!t)return d`<ha-card><div class="message error">
        Entity ${this.config.entity} was not found.
      </div></ha-card>`;let i=t.attributes.stops??[],s=t.attributes.departures??[],a=t.attributes.alerts??[],r=this.config.title??t.attributes.board_name??"TransLink departures",l=t.attributes.last_updated,n=this.config.show_stale_warning&&Se(l,this.config.stale_after_minutes??3),h=[`density-${this.config.density}`,`header-${this.config.header_style}`,`routes-${this.config.route_color_mode}`,`stops-${this.config.stop_heading_style}`].join(" ");return d`
      <ha-card class=${h}>
        ${this.config.show_header?d`<header>
              <div class="header-title">
                ${this.config.header_icon?d`<ha-icon
                      .icon=${this.config.header_icon}
                      aria-hidden="true"
                    ></ha-icon>`:c}
                <div>
                  ${this.config.show_brand?d`<div class="eyebrow">TransLink</div>`:c}
                  <h1>${r}</h1>
                </div>
              </div>
              ${this.config.show_clock?d`<div class="clock">${ne(new Date().toISOString(),this.hass.locale)}</div>`:c}
            </header>`:c}
        ${this.config.show_alerts&&a.length?d`<div class="alerts">
              ${a.map(p=>d`<div>
                  <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
                  <span>
                    <strong>${p.header}</strong>
                    ${p.description?d`<small>${p.description}</small>`:c}
                  </span>
                </div>`)}
            </div>`:c}
        ${n?d`<div class="stale" role="status">
              <ha-icon icon="mdi:cloud-alert" aria-hidden="true"></ha-icon>
              Realtime data has not updated recently.
            </div>`:c}
        <main>
          ${this.config.view==="combined"?this.renderCombined(s,i):this.renderGrouped(i)}
        </main>
      </ha-card>
    `}renderGrouped(t){let i=this.config?.empty_stop_behavior??(this.config?.hide_empty_stops?"hide":"show"),s=t.map(r=>({stop:r,departures:re(r.departures,this.config?.cancelled_behavior??"show","chronological",[r.stop_id])}));i==="hide"?s=s.filter(({departures:r})=>r.length>0):i==="move"&&s.sort((r,l)=>+(r.departures.length===0)-+(l.departures.length===0));let a=s.map(({stop:r,departures:l})=>{let n=this.isStopCollapsed(r),h=r.departures_per_stop??this.config?.departures_per_stop??V;return d`
        <section class=${n?"collapsed":""}>
          <button
            class="stop-heading"
            type="button"
            aria-expanded=${String(!n)}
            @click=${()=>this.toggleStop(r.stop_id)}
          >
            <span class="stop-title">
              <ha-icon
                icon=${n?"mdi:chevron-right":"mdi:chevron-down"}
                aria-hidden="true"
              ></ha-icon>
              ${r.display_name||r.stop_name}
            </span>
            ${this.config?.show_stop_codes!==!1&&r.show_stop_code!==!1&&r.stop_code?d`<span class="stop-code">#${r.stop_code}</span>`:c}
          </button>
          ${n?c:l.length?l.slice(0,h).map(p=>this.renderDeparture(p,!1)):d`<div class="empty-stop">No upcoming departures</div>`}
        </section>
      `});return a.length?a:d`<div class="message">No upcoming departures.</div>`}renderCombined(t,i){let s=re(t,this.config?.cancelled_behavior??"show",this.config?.combined_order??"chronological",i.map(a=>a.stop_id));return s.length===0?d`<div class="message">No upcoming departures.</div>`:d`
      <section>
        ${s.slice(0,this.config?.max_departures??le).map(a=>this.renderDeparture(a,!0))}
      </section>
    `}renderDeparture(t,i){let s=this.config?.route_color_mode==="official"?[t.route_color?`background:#${t.route_color}`:"",t.route_text_color?`color:#${t.route_text_color}`:""].filter(Boolean).join(";"):"",a=Ee(t,this.config?.delay_threshold_minutes),r=this.config?.time_display!=="clock",l=this.config?.time_display!=="countdown",n=t.destination||t.route_long_name,h=t.cancelled?"cancelled":a.delayed?`${a.delayMinutes} minutes late`:t.realtime?"live prediction":"scheduled",p=this.config?.delay_format==="text"?`${a.delayMinutes} min late`:`+${a.delayMinutes} min`;return d`
      <div
        class="departure ${t.cancelled?"cancelled":""}"
        role="group"
        aria-label="Route ${t.route_name} to ${n}, ${h}"
      >
        <span class="route" style=${s}>${t.route_name}</span>
        <div class="destination">
          <strong>${n}</strong>
          ${i?d`<small>${t.stop_name}</small>`:c}
        </div>
        <div class="timing">
          ${t.cancelled?d`<strong>Cancelled</strong>`:r?d`<strong>${Ke(t.estimated_time)} min</strong>`:c}
          ${l?d`<small class="time-details ${r?"":"clock-only"}">
                ${a.scheduledTime&&this.config?.show_scheduled_time!==!1?d`<s>${ne(a.scheduledTime,this.hass?.locale)}</s>`:c}
                <span class=${a.delayed?"predicted-time":""}>
                  ${ne(a.displayTime,this.hass?.locale)}
                </span>
              </small>`:c}
          <small class="status-details">
            ${a.delayMinutes!==void 0?d`<span class="delay">${p}</span>`:c}
            ${this.config?.show_realtime_status?d`<span class="realtime ${t.realtime?"live":""}">
                  ${t.realtime?"Live":"Scheduled"}
                </span>`:c}
          </small>
        </div>
      </div>
    `}isStopCollapsed(t){return this.initializedStops.has(t.stop_id)||(this.initializedStops.add(t.stop_id),t.collapsed&&this.collapsedStops.add(t.stop_id)),this.collapsedStops.has(t.stop_id)}toggleStop(t){let i=new Set(this.collapsedStops);i.has(t)?i.delete(t):i.add(t),this.collapsedStops=i}static{this.styles=j`
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
  `}};w([H({attribute:!1})],S.prototype,"hass",2),w([F()],S.prototype,"config",2),w([F()],S.prototype,"collapsedStops",2);var O=class extends f{setConfig(e){this.config=e}render(){return this.config?d`
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
        <ha-select
          .value=${this.config.view??"grouped"}
          label="Layout"
          data-key="view"
          @value-changed=${this.valueChanged}
          @closed=${e=>e.stopPropagation()}
        >
          <ha-list-item value="grouped">Grouped by stop</ha-list-item>
          <ha-list-item value="combined">Combined by time</ha-list-item>
        </ha-select>
        <ha-select
          .value=${this.config.combined_order??"chronological"}
          label="Combined ordering"
          data-key="combined_order"
          @value-changed=${this.valueChanged}
          @closed=${e=>e.stopPropagation()}
        >
          <ha-list-item value="chronological">Chronological</ha-list-item>
          <ha-list-item value="balanced">Balance stops</ha-list-item>
          <ha-list-item value="route">Group routes</ha-list-item>
          <ha-list-item value="realtime">Realtime first</ha-list-item>
        </ha-select>
        <ha-textfield
          type="number"
          min="1"
          max=${Pe}
          .value=${String(this.config.departures_per_stop??V)}
          label="Departures per stop"
          data-key="departures_per_stop"
          data-min="1"
          data-max=${Pe}
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
        <ha-select
          .value=${this.config.time_display??"both"}
          label="Time display"
          data-key="time_display"
          @value-changed=${this.valueChanged}
          @closed=${e=>e.stopPropagation()}
        >
          <ha-list-item value="both">Countdown and clock</ha-list-item>
          <ha-list-item value="countdown">Countdown only</ha-list-item>
          <ha-list-item value="clock">Clock only</ha-list-item>
        </ha-select>
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
        <ha-select
          .value=${this.config.delay_format??"compact"}
          label="Delay label"
          data-key="delay_format"
          @value-changed=${this.valueChanged}
          @closed=${e=>e.stopPropagation()}
        >
          <ha-list-item value="compact">+7 min</ha-list-item>
          <ha-list-item value="text">7 min late</ha-list-item>
        </ha-select>
        <ha-select
          .value=${this.config.cancelled_behavior??"show"}
          label="Cancelled departures"
          data-key="cancelled_behavior"
          @value-changed=${this.valueChanged}
          @closed=${e=>e.stopPropagation()}
        >
          <ha-list-item value="show">Show in schedule order</ha-list-item>
          <ha-list-item value="move">Move below active departures</ha-list-item>
          <ha-list-item value="hide">Hide</ha-list-item>
        </ha-select>
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
        <ha-select
          .value=${this.config.density??"comfortable"}
          label="Row density"
          data-key="density"
          @value-changed=${this.valueChanged}
          @closed=${e=>e.stopPropagation()}
        >
          <ha-list-item value="comfortable">Comfortable</ha-list-item>
          <ha-list-item value="compact">Compact</ha-list-item>
          <ha-list-item value="minimal">Minimal</ha-list-item>
        </ha-select>
        <ha-select
          .value=${this.config.route_color_mode??"official"}
          label="Route badge colors"
          data-key="route_color_mode"
          @value-changed=${this.valueChanged}
          @closed=${e=>e.stopPropagation()}
        >
          <ha-list-item value="official">Official route colors</ha-list-item>
          <ha-list-item value="theme">Theme primary color</ha-list-item>
          <ha-list-item value="monochrome">Monochrome</ha-list-item>
        </ha-select>
        <ha-select
          .value=${this.config.empty_stop_behavior??(this.config.hide_empty_stops?"hide":"show")}
          label="Stops without departures"
          data-key="empty_stop_behavior"
          @value-changed=${this.valueChanged}
          @closed=${e=>e.stopPropagation()}
        >
          <ha-list-item value="show">Show in configured order</ha-list-item>
          <ha-list-item value="move">Move to bottom</ha-list-item>
          <ha-list-item value="hide">Hide</ha-list-item>
        </ha-select>
        ${this.booleanField("show_stop_codes","Show stop numbers",this.config.show_stop_codes!==!1)}

        <h3>Header</h3>
        ${this.booleanField("show_header","Show header",this.config.show_header!==!1)}
        ${this.booleanField("show_brand","Show TransLink label",this.config.show_brand!==!1)}
        ${this.booleanField("show_clock","Show current time",this.config.show_clock!==!1)}
        <ha-select
          .value=${this.config.header_style??"primary"}
          label="Header colors"
          data-key="header_style"
          @value-changed=${this.valueChanged}
          @closed=${e=>e.stopPropagation()}
        >
          <ha-list-item value="primary">Theme primary</ha-list-item>
          <ha-list-item value="surface">Card surface</ha-list-item>
          <ha-list-item value="transparent">Transparent</ha-list-item>
        </ha-select>
        <ha-select
          .value=${this.config.stop_heading_style??"accent"}
          label="Stop heading style"
          data-key="stop_heading_style"
          @value-changed=${this.valueChanged}
          @closed=${e=>e.stopPropagation()}
        >
          <ha-list-item value="accent">Accent</ha-list-item>
          <ha-list-item value="plain">Plain</ha-list-item>
          <ha-list-item value="compact">Compact</ha-list-item>
        </ha-select>
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
    `:c}booleanField(e,t,i){return d`
      <ha-formfield label=${t}>
        <ha-switch
          .checked=${i}
          data-key=${e}
          @change=${this.booleanChanged}
        ></ha-switch>
      </ha-formfield>
    `}valueChanged(e){if(!this.config)return;let t=e.currentTarget,i=t.dataset.key,a=e.detail?.value??t.value;this.config={...this.config,[i]:a},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}booleanChanged(e){if(!this.config)return;let t=e.currentTarget,i=t.dataset.key;this.config={...this.config,[i]:t.checked},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}numberChanged(e){if(!this.config)return;let t=e.currentTarget,i=Number.parseInt(t.value,10);if(!Number.isFinite(i))return;let s=t.dataset.key,a=Number.parseInt(t.dataset.min??"1",10),r=Number.parseInt(t.dataset.max??"12",10);this.config={...this.config,[s]:Math.min(r,Math.max(a,i))},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}static{this.styles=j`
    .form { display: grid; gap: 16px; padding: 8px 0; }
    h3 {
      border-bottom: 1px solid var(--divider-color);
      font-size: 14px;
      margin: 8px 0 0;
      padding-bottom: 6px;
    }
  `}};w([H({attribute:!1})],O.prototype,"hass",2),w([F()],O.prototype,"config",2);customElements.get("translink-schedule-card")||customElements.define("translink-schedule-card",S);customElements.get("translink-schedule-card-editor")||customElements.define("translink-schedule-card-editor",O);window.customCards=window.customCards??[];window.customCards.some(o=>o.type==="translink-schedule-card")||window.customCards.push({type:"translink-schedule-card",name:"TransLink Schedule Card",description:"Upcoming departures from multiple TransLink stops.",preview:!0});export{S as TransLinkScheduleCard,O as TransLinkScheduleCardEditor};
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
