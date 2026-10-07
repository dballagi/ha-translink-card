var Ne=Object.defineProperty;var Me=Object.getOwnPropertyDescriptor;var v=(o,e,t,i)=>{for(var s=i>1?void 0:i?Me(e,t):e,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=(i?n(e,t,s):n(s))||s);return i&&s&&Ne(e,t,s),s};var z=globalThis,L=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),he=new WeakMap,E=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(L&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=he.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&he.set(t,e))}return e}toString(){return this.cssText}},pe=o=>new E(typeof o=="string"?o:o+"",void 0,G),I=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new E(t,o,G)},ue=(o,e)=>{if(L)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=z.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},K=L?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return pe(t)})(o):o;var{is:Ue,defineProperty:Fe,getOwnPropertyDescriptor:He,getOwnPropertyNames:ze,getOwnPropertySymbols:Le,getPrototypeOf:Ie}=Object,j=globalThis,me=j.trustedTypes,je=me?me.emptyScript:"",qe=j.reactiveElementPolyfillSupport,R=(o,e)=>o,k={toAttribute(o,e){switch(e){case Boolean:o=o?je:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},q=(o,e)=>!Ue(o,e),fe={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=fe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Fe(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:r}=He(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){let a=s?.call(this);r?.call(this,n),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??fe}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let e=Ie(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let t=this.properties,i=[...ze(t),...Le(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(K(s))}else e!==void 0&&t.push(K(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ue(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:k).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:k;this._$Em=s;let a=n.fromAttribute(t,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(e!==void 0){let n=this.constructor;if(s===!1&&(r=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??q)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:n}=r,a=this[s];n!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[R("elementProperties")]=new Map,g[R("finalized")]=new Map,qe?.({ReactiveElement:g}),(j.reactiveElementVersions??=[]).push("2.1.2");var te=globalThis,ge=o=>o,B=te.trustedTypes,_e=B?B.createPolicy("lit-html",{createHTML:o=>o}):void 0,we="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,Se="?"+y,Be=`<${Se}>`,x=document,O=()=>x.createComment(""),P=o=>o===null||typeof o!="object"&&typeof o!="function",ie=Array.isArray,We=o=>ie(o)||typeof o?.[Symbol.iterator]=="function",Y=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ye=/-->/g,ve=/>/g,b=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,$e=/"/g,Ae=/^(?:script|style|textarea|title)$/i,se=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),d=se(1),ft=se(2),gt=se(3),w=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),xe=new WeakMap,$=x.createTreeWalker(x,129);function Ce(o,e){if(!ie(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return _e!==void 0?_e.createHTML(e):e}var Ve=(o,e)=>{let t=o.length-1,i=[],s,r=e===2?"<svg>":e===3?"<math>":"",n=T;for(let a=0;a<t;a++){let l=o[a],p,u,h=-1,f=0;for(;f<l.length&&(n.lastIndex=f,u=n.exec(l),u!==null);)f=n.lastIndex,n===T?u[1]==="!--"?n=ye:u[1]!==void 0?n=ve:u[2]!==void 0?(Ae.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=b):u[3]!==void 0&&(n=b):n===b?u[0]===">"?(n=s??T,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?b:u[3]==='"'?$e:be):n===$e||n===be?n=b:n===ye||n===ve?n=T:(n=b,s=void 0);let m=n===b&&o[a+1].startsWith("/>")?" ":"";r+=n===T?l+Be:h>=0?(i.push(p),l.slice(0,h)+we+l.slice(h)+y+m):l+y+(h===-2?a:m)}return[Ce(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},D=class o{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,n=0,a=e.length-1,l=this.parts,[p,u]=Ve(e,t);if(this.el=o.createElement(p,i),$.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=$.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(we)){let f=u[n++],m=s.getAttribute(h).split(y),H=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:H[2],strings:m,ctor:H[1]==="."?J:H[1]==="?"?Z:H[1]==="@"?Q:C}),s.removeAttribute(h)}else h.startsWith(y)&&(l.push({type:6,index:r}),s.removeAttribute(h));if(Ae.test(s.tagName)){let h=s.textContent.split(y),f=h.length-1;if(f>0){s.textContent=B?B.emptyScript:"";for(let m=0;m<f;m++)s.append(h[m],O()),$.nextNode(),l.push({type:2,index:++r});s.append(h[f],O())}}}else if(s.nodeType===8)if(s.data===Se)l.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf(y,h+1))!==-1;)l.push({type:7,index:r}),h+=y.length-1}r++}}static createElement(e,t){let i=x.createElement("template");return i.innerHTML=e,i}};function A(o,e,t=o,i){if(e===w)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,r=P(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=A(o,s._$AS(o,e.values),s,i)),e}var X=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??x).importNode(t,!0);$.currentNode=s;let r=$.nextNode(),n=0,a=0,l=i[0];for(;l!==void 0;){if(n===l.index){let p;l.type===2?p=new N(r,r.nextSibling,this,e):l.type===1?p=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(p=new ee(r,this,e)),this._$AV.push(p),l=i[++a]}n!==l?.index&&(r=$.nextNode(),n++)}return $.currentNode=x,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},N=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=A(this,e,t),P(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):We(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(x.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=D.createElement(Ce(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let r=new X(s,this),n=r.u(this.options);r.p(t),this.T(n),this._$AH=r}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new D(e)),t}k(e){ie(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let r of e)s===t.length?t.push(i=new o(this.O(O()),this.O(O()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=ge(e).nextSibling;ge(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(e,t=this,i,s){let r=this.strings,n=!1;if(r===void 0)e=A(this,e,t,0),n=!P(e)||e!==this._$AH&&e!==w,n&&(this._$AH=e);else{let a=e,l,p;for(e=r[0],l=0;l<r.length-1;l++)p=A(this,a[i+l],t,l),p===w&&(p=this._$AH[l]),n||=!P(p)||p!==this._$AH[l],p===c?e=c:e!==c&&(e+=(p??"")+r[l+1]),this._$AH[l]=p}n&&!s&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},J=class extends C{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}},Z=class extends C{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}},Q=class extends C{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=A(this,e,t,0)??c)===w)return;let i=this._$AH,s=e===c&&i!==c||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ee=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){A(this,e)}};var Ge=te.litHtmlPolyfillSupport;Ge?.(D,N),(te.litHtmlVersions??=[]).push("3.3.3");var Ee=(o,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let r=t?.renderBefore??null;i._$litPart$=s=new N(e.insertBefore(O(),r),r,void 0,t??{})}return s._$AI(o),s};var oe=globalThis,_=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ee(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};_._$litElement$=!0,_.finalized=!0,oe.litElementHydrateSupport?.({LitElement:_});var Ke=oe.litElementPolyfillSupport;Ke?.({LitElement:_});(oe.litElementVersions??=[]).push("4.2.2");var Ye={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:q},Xe=(o=Ye,e,t)=>{let{kind:i,metadata:s}=t,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(t.name,o),i==="accessor"){let{name:n}=t;return{set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,o,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,o,a),a}}}if(i==="setter"){let{name:n}=t;return function(a){let l=this[n];e.call(this,a),this.requestUpdate(n,l,o,!0,a)}}throw Error("Unsupported decorator location: "+i)};function M(o){return(e,t)=>typeof t=="object"?Xe(o,e,t):((i,s,r)=>{let n=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),n?Object.getOwnPropertyDescriptor(s,r):void 0})(o,e,t)}function U(o){return M({...o,state:!0,attribute:!1})}function re(o,e){return new Date(o.estimated_time).getTime()-new Date(e.estimated_time).getTime()}function Je(o,e){let t=new Map;for(let s of e)t.set(s,[]);for(let s of o){let r=t.get(s.stop_id)??[];r.push(s),t.set(s.stop_id,r)}let i=[];for(;[...t.values()].some(s=>s.length>0);)for(let s of t.values()){let r=s.shift();r&&i.push(r)}return i}function ne(o,e,t,i){let s=e==="hide"?o.filter(r=>!r.cancelled):[...o];return t==="balanced"?s=Je(s,i):t==="route"?s.sort((r,n)=>r.route_name.localeCompare(n.route_name,void 0,{numeric:!0})||re(r,n)):t==="realtime"?s.sort((r,n)=>Number(n.realtime)-Number(r.realtime)||re(r,n)):s.sort(re),e==="move"&&s.sort((r,n)=>Number(r.cancelled)-Number(n.cancelled)),s}function Re(o){let e=new Map;for(let t of o){let i=t.route_name.trim();if(!i)continue;let s=e.get(i);s?s.count+=1:e.set(i,{name:i,count:1,color:t.route_color,textColor:t.route_text_color})}return[...e.values()].sort((t,i)=>t.name.localeCompare(i.name,void 0,{numeric:!0,sensitivity:"base"}))}function ae(o,e){return e.size===0?o:o.filter(t=>e.has(t.route_name.trim()))}function ke(o,e,t=Date.now()){return o?t-new Date(o).getTime()>e*6e4:!0}function Te(o,e=1){let t=!o.cancelled&&o.delay_seconds>=e*60;return{delayed:t,displayTime:o.cancelled?o.scheduled_time:o.estimated_time,scheduledTime:t?o.scheduled_time:void 0,delayMinutes:t?Math.round(o.delay_seconds/60):void 0}}function Oe(o,e=[]){return[...new Set([...e,...Object.keys(o.states)])].find(i=>{let s=o.states[i]?.attributes;return Array.isArray(s?.stops)&&Array.isArray(s?.departures)})}var V=3,Pe=12,ce=12,de=5,De=60,Ze=[{value:"grouped",label:"Grouped by stop"},{value:"combined",label:"Combined by time"}],Qe=[{value:"chronological",label:"Chronological"},{value:"balanced",label:"Balance stops"},{value:"route",label:"Group routes"},{value:"realtime",label:"Realtime first"}],et=[{value:"both",label:"Countdown and clock"},{value:"countdown",label:"Countdown only"},{value:"clock",label:"Clock only"}],tt=[{value:"compact",label:"+7 min"},{value:"text",label:"7 min late"}],it=[{value:"show",label:"Show in schedule order"},{value:"move",label:"Move below active departures"},{value:"hide",label:"Hide"}],st=[{value:"comfortable",label:"Comfortable"},{value:"compact",label:"Compact"},{value:"minimal",label:"Minimal"}],ot=[{value:"official",label:"Official route colors"},{value:"theme",label:"Theme primary color"},{value:"monochrome",label:"Monochrome"}],rt=[{value:"multiple",label:"Allow multiple routes"},{value:"single",label:"One route at a time"}],nt=[{value:"show",label:"Show in configured order"},{value:"move",label:"Move to bottom"},{value:"hide",label:"Hide"}],at=[{value:"primary",label:"Theme primary"},{value:"surface",label:"Card surface"},{value:"transparent",label:"Transparent"}],lt=[{value:"accent",label:"Accent"},{value:"plain",label:"Plain"},{value:"compact",label:"Compact"}];function ct(o,e=Date.now()){return Math.max(0,Math.round((new Date(o).getTime()-e)/6e4))}function le(o,e){let t=e?.time_format==="12"?!0:e?.time_format==="24"?!1:void 0;return new Intl.DateTimeFormat(e?.language,{hour:"numeric",hour12:t,minute:"2-digit"}).format(new Date(o))}var S=class extends _{constructor(){super(...arguments);this.collapsedStops=new Set;this.selectedRoutes=new Set;this.initializedStops=new Set}static async getConfigElement(){return document.createElement("translink-schedule-card-editor")}static getStubConfig(t,i=[]){return{entity:Oe(t,i)??"",view:"grouped",departures_per_stop:V}}getGridOptions(){return{columns:12,min_columns:6}}setConfig(t){if(!t.entity)throw new Error("A TransLink Schedule entity is required");let i=t.route_filter_selection_mode??"multiple";this.config?.entity!==t.entity?(this.collapsedStops=new Set,this.initializedStops.clear(),this.resetRouteFilter()):(this.config?.show_route_filter&&t.show_route_filter!==!0||this.config?.route_filter_selection_mode!==i)&&this.resetRouteFilter(),this.config={view:"grouped",departures_per_stop:V,max_departures:ce,time_display:"both",show_scheduled_time:!0,delay_threshold_minutes:1,delay_format:"compact",density:"comfortable",empty_stop_behavior:"show",cancelled_behavior:"show",route_color_mode:"official",show_route_filter:!1,route_filter_reset_minutes:de,route_filter_selection_mode:"multiple",route_filter_show_counts:!1,combined_order:"chronological",show_header:!0,show_brand:!0,header_style:"primary",stop_heading_style:"accent",show_clock:!0,show_alerts:!0,show_stop_codes:!0,show_realtime_status:!1,show_stale_warning:!1,stale_after_minutes:3,...t},this.selectedRoutes.size>0&&this.scheduleRouteFilterReset()}connectedCallback(){super.connectedCallback(),this.ticker=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){this.ticker!==void 0&&window.clearInterval(this.ticker),this.clearRouteFilterResetTimer(),super.disconnectedCallback()}render(){if(!this.config||!this.hass)return c;let t=this.hass.states[this.config.entity];if(!t)return d`<ha-card><div class="message error">
        Entity ${this.config.entity} was not found.
      </div></ha-card>`;let i=t.attributes.stops??[],s=t.attributes.departures??[],r=s.length?s:i.flatMap(m=>m.departures),n=Re(r),a=this.activeSelectedRoutes(n),l=t.attributes.alerts??[],p=this.config.title??t.attributes.board_name??"TransLink departures",u=t.attributes.last_updated,h=this.config.show_stale_warning&&ke(u,this.config.stale_after_minutes??3),f=[`density-${this.config.density}`,`header-${this.config.header_style}`,`routes-${this.config.route_color_mode}`,`stops-${this.config.stop_heading_style}`].join(" ");return d`
      <ha-card class=${f}>
        ${this.config.show_header?d`<header>
              <div class="header-title">
                ${this.config.header_icon?d`<ha-icon
                      .icon=${this.config.header_icon}
                      aria-hidden="true"
                    ></ha-icon>`:c}
                <div>
                  ${this.config.show_brand?d`<div class="eyebrow">TransLink</div>`:c}
                  <h1>${p}</h1>
                </div>
              </div>
              ${this.config.show_clock?d`<div class="clock">${le(new Date().toISOString(),this.hass.locale)}</div>`:c}
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
        ${h?d`<div class="stale" role="status">
              <ha-icon icon="mdi:cloud-alert" aria-hidden="true"></ha-icon>
              Realtime data has not updated recently.
            </div>`:c}
        ${this.config.show_route_filter&&n.length>0?this.renderRouteFilter(n,a):c}
        <main>
          ${this.config.view==="combined"?this.renderCombined(s,i,a):this.renderGrouped(i,a)}
        </main>
      </ha-card>
    `}renderRouteFilter(t,i){let s=this.config?.route_filter_show_counts===!0,r=t.reduce((n,a)=>n+a.count,0);return d`
      <nav class="route-filter" aria-label="Filter departures by route">
        <button
          type="button"
          class="route-filter-chip all"
          aria-pressed=${String(i.size===0)}
          @click=${()=>this.selectAllRoutes()}
        >
          All${s?d` <span>${r}</span>`:c}
        </button>
        ${t.map(n=>{let a=i.has(n.name),l=this.config?.route_color_mode==="official"&&a?[n.color?`background:#${n.color}`:"",n.textColor?`color:#${n.textColor}`:""].filter(Boolean).join(";"):"";return d`
            <button
              type="button"
              class="route-filter-chip"
              style=${l}
              aria-label="Filter route ${n.name}"
              aria-pressed=${String(a)}
              @click=${()=>this.toggleRoute(n.name)}
            >
              ${n.name}${s?d` <span>${n.count}</span>`:c}
            </button>
          `})}
      </nav>
    `}renderGrouped(t,i){let s=this.config?.empty_stop_behavior??(this.config?.hide_empty_stops?"hide":"show"),r=t.map(a=>({stop:a,departures:ne(ae(a.departures,i),this.config?.cancelled_behavior??"show","chronological",[a.stop_id])}));s==="hide"?r=r.filter(({departures:a})=>a.length>0):s==="move"&&r.sort((a,l)=>+(a.departures.length===0)-+(l.departures.length===0));let n=r.map(({stop:a,departures:l})=>{let p=this.isStopCollapsed(a),u=a.departures_per_stop??this.config?.departures_per_stop??V;return d`
        <section class=${p?"collapsed":""}>
          <button
            class="stop-heading"
            type="button"
            aria-expanded=${String(!p)}
            @click=${()=>this.toggleStop(a.stop_id)}
          >
            <span class="stop-title">
              <ha-icon
                icon=${p?"mdi:chevron-right":"mdi:chevron-down"}
                aria-hidden="true"
              ></ha-icon>
              ${a.display_name||a.stop_name}
            </span>
            ${this.config?.show_stop_codes!==!1&&a.show_stop_code!==!1&&a.stop_code?d`<span class="stop-code">#${a.stop_code}</span>`:c}
          </button>
          ${p?c:l.length?l.slice(0,u).map(h=>this.renderDeparture(h,!1)):d`<div class="empty-stop">No upcoming departures</div>`}
        </section>
      `});return n.length?n:d`<div class="message">No upcoming departures.</div>`}renderCombined(t,i,s){let r=ne(ae(t,s),this.config?.cancelled_behavior??"show",this.config?.combined_order??"chronological",i.map(n=>n.stop_id));return r.length===0?d`<div class="message">No upcoming departures.</div>`:d`
      <section>
        ${r.slice(0,this.config?.max_departures??ce).map(n=>this.renderDeparture(n,!0))}
      </section>
    `}renderDeparture(t,i){let s=this.config?.route_color_mode==="official"?[t.route_color?`background:#${t.route_color}`:"",t.route_text_color?`color:#${t.route_text_color}`:""].filter(Boolean).join(";"):"",r=Te(t,this.config?.delay_threshold_minutes),n=this.config?.time_display!=="clock",a=this.config?.time_display!=="countdown",l=t.destination||t.route_long_name,p=t.cancelled?"cancelled":r.delayed?`${r.delayMinutes} minutes late`:t.realtime?"live prediction":"scheduled",u=this.config?.delay_format==="text"?`${r.delayMinutes} min late`:`+${r.delayMinutes} min`;return d`
      <div
        class="departure ${t.cancelled?"cancelled":""}"
        role="group"
        aria-label="Route ${t.route_name} to ${l}, ${p}"
      >
        <span class="route" style=${s}>${t.route_name}</span>
        <div class="destination">
          <strong>${l}</strong>
          ${i?d`<small>${t.stop_name}</small>`:c}
        </div>
        <div class="timing">
          ${t.cancelled?d`<strong>Cancelled</strong>`:n?d`<strong>${ct(t.estimated_time)} min</strong>`:c}
          ${a?d`<small class="time-details ${n?"":"clock-only"}">
                ${r.scheduledTime&&this.config?.show_scheduled_time!==!1?d`<s>${le(r.scheduledTime,this.hass?.locale)}</s>`:c}
                <span class=${r.delayed?"predicted-time":""}>
                  ${le(r.displayTime,this.hass?.locale)}
                </span>
              </small>`:c}
          <small class="status-details">
            ${r.delayMinutes!==void 0?d`<span class="delay">${u}</span>`:c}
            ${this.config?.show_realtime_status?d`<span class="realtime ${t.realtime?"live":""}">
                  ${t.realtime?"Live":"Scheduled"}
                </span>`:c}
          </small>
        </div>
      </div>
    `}isStopCollapsed(t){return this.initializedStops.has(t.stop_id)||(this.initializedStops.add(t.stop_id),t.collapsed&&this.collapsedStops.add(t.stop_id)),this.collapsedStops.has(t.stop_id)}toggleStop(t){let i=new Set(this.collapsedStops);i.has(t)?i.delete(t):i.add(t),this.collapsedStops=i}activeSelectedRoutes(t){let i=new Set(t.map(r=>r.name)),s=new Set([...this.selectedRoutes].filter(r=>i.has(r)));if(s.size!==this.selectedRoutes.size){this.selectedRoutes.clear();for(let r of s)this.selectedRoutes.add(r);s.size===0&&this.clearRouteFilterResetTimer()}return s}selectAllRoutes(){this.resetRouteFilter()}toggleRoute(t){let i=new Set(this.selectedRoutes);this.config?.route_filter_selection_mode==="single"?i.size===1&&i.has(t)?i.clear():(i.clear(),i.add(t)):i.has(t)?i.delete(t):i.add(t),this.selectedRoutes=i,i.size>0?this.scheduleRouteFilterReset():this.clearRouteFilterResetTimer()}resetRouteFilter(){this.clearRouteFilterResetTimer(),this.selectedRoutes.size>0&&(this.selectedRoutes=new Set)}scheduleRouteFilterReset(){this.clearRouteFilterResetTimer();let t=this.config?.route_filter_reset_minutes??de;t<=0||(this.routeFilterResetTimer=window.setTimeout(()=>this.resetRouteFilter(),t*6e4))}clearRouteFilterResetTimer(){this.routeFilterResetTimer!==void 0&&(window.clearTimeout(this.routeFilterResetTimer),this.routeFilterResetTimer=void 0)}static{this.styles=I`
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
    .route-filter {
      background: color-mix(in srgb, var(--card-background-color), var(--primary-color) 4%);
      border-bottom: 1px solid var(--divider-color);
      display: flex;
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
  `}};v([M({attribute:!1})],S.prototype,"hass",2),v([U()],S.prototype,"config",2),v([U()],S.prototype,"collapsedStops",2),v([U()],S.prototype,"selectedRoutes",2);var F=class extends _{setConfig(e){this.config=e}render(){return this.config?d`
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
        ${this.selectField("view","Layout",this.config.view??"grouped",Ze)}
        ${this.selectField("combined_order","Combined ordering",this.config.combined_order??"chronological",Qe)}
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
          .value=${String(this.config.max_departures??ce)}
          label="Maximum combined departures"
          data-key="max_departures"
          data-min="1"
          data-max="50"
          @input=${this.numberChanged}
        ></ha-textfield>

        <h3>Timing and status</h3>
        ${this.selectField("time_display","Time display",this.config.time_display??"both",et)}
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
        ${this.selectField("delay_format","Delay label",this.config.delay_format??"compact",tt)}
        ${this.selectField("cancelled_behavior","Cancelled departures",this.config.cancelled_behavior??"show",it)}
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
        ${this.selectField("density","Row density",this.config.density??"comfortable",st)}
        ${this.selectField("route_color_mode","Route badge colors",this.config.route_color_mode??"official",ot)}
        ${this.selectField("empty_stop_behavior","Stops without departures",this.config.empty_stop_behavior??(this.config.hide_empty_stops?"hide":"show"),nt)}
        ${this.booleanField("show_stop_codes","Show stop numbers",this.config.show_stop_codes!==!1)}

        <h3>Route filter</h3>
        ${this.booleanField("show_route_filter","Show route filter",this.config.show_route_filter===!0)}
        ${this.config.show_route_filter?d`
              ${this.selectField("route_filter_selection_mode","Route selection",this.config.route_filter_selection_mode??"multiple",rt)}
              ${this.booleanField("route_filter_show_counts","Show departure counts",this.config.route_filter_show_counts===!0)}
              <ha-textfield
                type="number"
                min="0"
                max=${De}
                .value=${String(this.config.route_filter_reset_minutes??de)}
                label="Reset to All after (minutes, 0 = never)"
                data-key="route_filter_reset_minutes"
                data-min="0"
                data-max=${De}
                @input=${this.numberChanged}
              ></ha-textfield>
            `:c}

        <h3>Header</h3>
        ${this.booleanField("show_header","Show header",this.config.show_header!==!1)}
        ${this.booleanField("show_brand","Show TransLink label",this.config.show_brand!==!1)}
        ${this.booleanField("show_clock","Show current time",this.config.show_clock!==!1)}
        ${this.selectField("header_style","Header colors",this.config.header_style??"primary",at)}
        ${this.selectField("stop_heading_style","Stop heading style",this.config.stop_heading_style??"accent",lt)}
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
    `:c}selectField(e,t,i,s){return d`
      <ha-select
        .label=${t}
        .value=${i}
        .options=${s}
        data-key=${e}
        @selected=${this.valueChanged}
      ></ha-select>
    `}booleanField(e,t,i){return d`
      <ha-formfield label=${t}>
        <ha-switch
          .checked=${i}
          data-key=${e}
          @change=${this.booleanChanged}
        ></ha-switch>
      </ha-formfield>
    `}valueChanged(e){if(!this.config)return;let t=e.currentTarget,i=t.dataset.key,r=e.detail?.value??t.value;this.config={...this.config,[i]:r},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}booleanChanged(e){if(!this.config)return;let t=e.currentTarget,i=t.dataset.key;this.config={...this.config,[i]:t.checked},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}numberChanged(e){if(!this.config)return;let t=e.currentTarget,i=Number.parseInt(t.value,10);if(!Number.isFinite(i))return;let s=t.dataset.key,r=Number.parseInt(t.dataset.min??"1",10),n=Number.parseInt(t.dataset.max??"12",10);this.config={...this.config,[s]:Math.min(n,Math.max(r,i))},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}static{this.styles=I`
    .form { display: grid; gap: 16px; padding: 8px 0; }
    h3 {
      border-bottom: 1px solid var(--divider-color);
      font-size: 14px;
      margin: 8px 0 0;
      padding-bottom: 6px;
    }
  `}};v([M({attribute:!1})],F.prototype,"hass",2),v([U()],F.prototype,"config",2);customElements.get("translink-schedule-card")||customElements.define("translink-schedule-card",S);customElements.get("translink-schedule-card-editor")||customElements.define("translink-schedule-card-editor",F);window.customCards=window.customCards??[];window.customCards.some(o=>o.type==="translink-schedule-card")||window.customCards.push({type:"translink-schedule-card",name:"TransLink Schedule Card",description:"Upcoming departures from multiple TransLink stops.",preview:!0});export{S as TransLinkScheduleCard,F as TransLinkScheduleCardEditor};
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
