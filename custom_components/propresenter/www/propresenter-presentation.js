var ProPresenterPresentationCard=(function(b){"use strict";var Ze=Object.defineProperty;var Je=(b,f,v)=>f in b?Ze(b,f,{enumerable:!0,configurable:!0,writable:!0,value:v}):b[f]=v;var h=(b,f,v)=>Je(b,typeof f!="symbol"?f+"":f,v);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ve;const f=globalThis,v=f.ShadowRoot&&(f.ShadyCSS===void 0||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),X=new WeakMap;let ee=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(v&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=X.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&X.set(e,t))}return t}toString(){return this.cssText}};const we=n=>new ee(typeof n=="string"?n:n+"",void 0,j),Pe=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,s,r)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new ee(e,n,j)},Se=(n,t)=>{if(v)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=f.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},te=v?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return we(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:xe,defineProperty:Ae,getOwnPropertyDescriptor:Te,getOwnPropertyNames:Ue,getOwnPropertySymbols:ke,getPrototypeOf:Me}=Object,$=globalThis,ie=$.trustedTypes,Ce=ie?ie.emptyScript:"",B=$.reactiveElementPolyfillSupport,C=(n,t)=>n,D={toAttribute(n,t){switch(t){case Boolean:n=n?Ce:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},se=(n,t)=>!xe(n,t),ne={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:se};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);let U=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ne){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Ae(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=Te(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){const l=s==null?void 0:s.call(this);r==null||r.call(this,a),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ne}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=Me(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,i=[...Ue(e),...ke(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(te(s))}else t!==void 0&&e.push(te(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Se(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var r;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const a=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:D).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){var r,a;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),o=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:D;this._$Em=s;const d=o.fromAttribute(e,l.type);this[s]=d??((a=this._$Ej)==null?void 0:a.get(s))??d,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){var a;if(t!==void 0){const l=this.constructor;if(s===!1&&(r=this[t]),i??(i=l.getPropertyOptions(t)),!((i.hasChanged??se)(r,e)||i.useDefault&&i.reflect&&r===((a=this._$Ej)==null?void 0:a.get(t))&&!this.hasAttribute(l._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,a]of s){const{wrapped:l}=a,o=this[r];l!==!0||this._$AL.has(r)||o===void 0||this.C(r,void 0,a,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[C("elementProperties")]=new Map,U[C("finalized")]=new Map,B==null||B({ReactiveElement:U}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis,re=n=>n,H=E.trustedTypes,ae=H?H.createPolicy("lit-html",{createHTML:n=>n}):void 0,oe="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,le="?"+w,Ee=`<${le}>`,P=document,q=()=>P.createComment(""),R=n=>n===null||typeof n!="object"&&typeof n!="function",K=Array.isArray,qe=n=>K(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",W=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,de=/-->/g,he=/>/g,S=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ue=/'/g,ce=/"/g,_e=/^(?:script|style|textarea|title)$/i,Re=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),p=Re(1),k=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),pe=new WeakMap,x=P.createTreeWalker(P,129);function me(n,t){if(!K(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ae!==void 0?ae.createHTML(t):t}const Ie=(n,t)=>{const e=n.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",a=I;for(let l=0;l<e;l++){const o=n[l];let d,c,u=-1,m=0;for(;m<o.length&&(a.lastIndex=m,c=a.exec(o),c!==null);)m=a.lastIndex,a===I?c[1]==="!--"?a=de:c[1]!==void 0?a=he:c[2]!==void 0?(_e.test(c[2])&&(s=RegExp("</"+c[2],"g")),a=S):c[3]!==void 0&&(a=S):a===S?c[0]===">"?(a=s??I,u=-1):c[1]===void 0?u=-2:(u=a.lastIndex-c[2].length,d=c[1],a=c[3]===void 0?S:c[3]==='"'?ce:ue):a===ce||a===ue?a=S:a===de||a===he?a=I:(a=S,s=void 0);const g=a===S&&n[l+1].startsWith("/>")?" ":"";r+=a===I?o+Ee:u>=0?(i.push(d),o.slice(0,u)+oe+o.slice(u)+w+g):o+w+(u===-2?l:g)}return[me(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class O{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0;const l=t.length-1,o=this.parts,[d,c]=Ie(t,e);if(this.el=O.createElement(d,i),x.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=x.nextNode())!==null&&o.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(oe)){const m=c[a++],g=s.getAttribute(u).split(w),y=/([.?@])?(.*)/.exec(m);o.push({type:1,index:r,name:y[2],strings:g,ctor:y[1]==="."?Le:y[1]==="?"?Ne:y[1]==="@"?He:V}),s.removeAttribute(u)}else u.startsWith(w)&&(o.push({type:6,index:r}),s.removeAttribute(u));if(_e.test(s.tagName)){const u=s.textContent.split(w),m=u.length-1;if(m>0){s.textContent=H?H.emptyScript:"";for(let g=0;g<m;g++)s.append(u[g],q()),x.nextNode(),o.push({type:2,index:++r});s.append(u[m],q())}}}else if(s.nodeType===8)if(s.data===le)o.push({type:2,index:r});else{let u=-1;for(;(u=s.data.indexOf(w,u+1))!==-1;)o.push({type:7,index:r}),u+=w.length-1}r++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function M(n,t,e=n,i){var a,l;if(t===k)return t;let s=i!==void 0?(a=e._$Co)==null?void 0:a[i]:e._$Cl;const r=R(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=M(n,s._$AS(n,t.values),s,i)),t}class Oe{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??P).importNode(e,!0);x.currentNode=s;let r=x.nextNode(),a=0,l=0,o=i[0];for(;o!==void 0;){if(a===o.index){let d;o.type===2?d=new L(r,r.nextSibling,this,t):o.type===1?d=new o.ctor(r,o.name,o.strings,this,t):o.type===6&&(d=new Ve(r,this,t)),this._$AV.push(d),o=i[++l]}a!==(o==null?void 0:o.index)&&(r=x.nextNode(),a++)}return x.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class L{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),R(t)?t===_||t==null||t===""?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):qe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==_&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=O.createElement(me(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(e);else{const a=new Oe(s,this),l=a.u(this.options);a.p(e),this.T(l),this._$AH=a}}_$AC(t){let e=pe.get(t.strings);return e===void 0&&pe.set(t.strings,e=new O(t)),e}k(t){K(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new L(this.O(q()),this.O(q()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){const s=re(t).nextSibling;re(t).remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class V{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}_$AI(t,e=this,i,s){const r=this.strings;let a=!1;if(r===void 0)t=M(this,t,e,0),a=!R(t)||t!==this._$AH&&t!==k,a&&(this._$AH=t);else{const l=t;let o,d;for(t=r[0],o=0;o<r.length-1;o++)d=M(this,l[i+o],e,o),d===k&&(d=this._$AH[o]),a||(a=!R(d)||d!==this._$AH[o]),d===_?t=_:t!==_&&(t+=(d??"")+r[o+1]),this._$AH[o]=d}a&&!s&&this.j(t)}j(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Le extends V{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_?void 0:t}}class Ne extends V{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==_)}}class He extends V{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??_)===k)return;const i=this._$AH,s=t===_&&i!==_||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==_&&(i===_||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ve{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const F=E.litHtmlPolyfillSupport;F==null||F(O,L),(E.litHtmlVersions??(E.litHtmlVersions=[])).push("3.3.3");const ze=(n,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const r=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new L(t.insertBefore(q(),r),r,void 0,e??{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class N extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ze(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return k}}N._$litElement$=!0,N.finalized=!0,(ve=A.litElementHydrateSupport)==null||ve.call(A,{LitElement:N});const Q=A.litElementPolyfillSupport;Q==null||Q({LitElement:N}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.2");const G={grid:{label:"Grid",tokens:{"--pp-card-radius":"18px","--pp-card-padding":"14px","--pp-gap":"10px","--pp-tile-radius":"12px","--pp-accent":"var(--primary-color, #03a9f4)","--pp-muted":"var(--secondary-text-color, #727272)","--pp-surface":"var(--card-background-color, var(--ha-card-background, #fff))","--pp-tile-surface":"color-mix(in srgb, var(--pp-surface) 92%, var(--pp-accent))"}}};function je(n){const t=G[n??"grid"]??G.grid;return Object.entries(t.tokens).map(([e,i])=>`${e}: ${i};`).join(" ")}const Z="Home Assistant could not complete the request",z={media_player_entity:null,design:"grid",columns:"auto",browser_height:560,internal_scroll:!0,thumbnail_quality:400,show_group_labels:!0,show_slide_labels:!0,show_slide_numbers:!0,show_notes:!1,read_only:!1,confirm_trigger:!1,follow_live:!0};function Be(n){if(!n||typeof n.entity!="string"||!n.entity)throw new Error("You must select a ProPresenter active-presentation sensor");const t=typeof n.browser_height=="number"&&Number.isFinite(n.browser_height)?Math.min(1200,Math.max(240,Math.round(n.browser_height))):z.browser_height;return{...z,...n,design:n.design&&n.design in{grid:!0}?n.design:"grid",browser_height:t,internal_scroll:n.internal_scroll!==!1,media_player_entity:typeof n.media_player_entity=="string"&&n.media_player_entity.trim()?n.media_player_entity.trim():null}}function J(n){var e;const t=(e=n==null?void 0:n.state)==null?void 0:e.toLowerCase();return t==="playing"||t==="paused"?t:null}function T(n){var i,s;if(!J(n))return!1;const t=(i=n==null?void 0:n.attributes)==null?void 0:i.media_content_type;if(typeof t=="string"&&t.trim())return t.toLowerCase()==="video";const e=(s=n==null?void 0:n.attributes)==null?void 0:s.media_title;return typeof e=="string"&&!!e.trim()}function ge(n){const t=typeof n=="number"?n:Number(n);if(!Number.isFinite(t)||t<0)return null;const e=Math.floor(t),i=Math.floor(e/3600),s=Math.floor(e%3600/60),r=e%60;return i?`${i}:${String(s).padStart(2,"0")}:${String(r).padStart(2,"0")}`:`${s}:${String(r).padStart(2,"0")}`}function De(n,t,e,i){return n===t&&(!e||e===i)}function Ke(n,t,e){return!n&&t&&!e}function fe(n){const t=(n==null?void 0:n.attributes)??{};return[t.presentation_uuid??"",t.metadata_revision??"",t.metadata_available??!1].join("|")}function We(n,t,e,i,s){return`/api/propresenter/thumbnail/${encodeURIComponent(n)}/${encodeURIComponent(t)}/${e}?quality=${encodeURIComponent(i)}&revision=${encodeURIComponent(s)}`}function Fe(n,t,e,i){if(!e||!i)throw new Error("A current presentation UUID and metadata revision are required");return{entity_id:n,slide_index:t,expected_presentation_uuid:e,expected_metadata_revision:i}}function Qe(n,t,e,i,s,r){if(!t||!e||i===null||i<0||!s||!r)throw new Error("A current playlist UUID, item key, item index, presentation UUID, and playlist revision are required");return{entity_id:n,playlist_uuid:t,item_key:e,item_index:i,presentation_uuid:s,expected_playlist_revision:r}}function ye(n){if(n instanceof Error&&n.message)return n.message;if(typeof n=="string"&&n.trim())return n;if(!n||typeof n!="object")return Z;const t=n;if(t.error&&t.error!==n){const s=ye(t.error);if(s!==Z)return s}const e=[t.message,t.detail,t.reason].find(s=>typeof s=="string"&&s.trim().length>0),i=[t.code,t.error_code].find(s=>typeof s=="string"&&s.trim().length>0);return e&&i&&!e.toLowerCase().startsWith(i.toLowerCase())?`${i}: ${e}`:e||i||Z}class Y extends N{constructor(){super(...arguments);h(this,"_config",{entity:"",...z});h(this,"_hass");h(this,"_metadata",null);h(this,"_metadataPromise",null);h(this,"_metadataRequestKey","");h(this,"_metadataRequestSequence",0);h(this,"_playlists",[]);h(this,"_playlistPromise",null);h(this,"_playlistRequestKey","__initial__");h(this,"_playlistRequestSequence",0);h(this,"_playlistRevision",null);h(this,"_lastPlaylistStatePointer","__initial__");h(this,"_selectedPlaylistUuid",null);h(this,"_selectedItemKey",null);h(this,"_selectedPresentationUuid",null);h(this,"_thumbnailUrls",new Map);h(this,"_thumbnailStates",new Map);h(this,"_thumbnailQueue",[]);h(this,"_thumbnailActive",0);h(this,"_thumbnailControllers",new Set);h(this,"_intersectionObserver");h(this,"_followingLive",!0);h(this,"_pendingIndex",null);h(this,"_pendingTimer");h(this,"_pendingPlaylistPresentationUuid",null);h(this,"_playlistPendingTimer");h(this,"_mediaPendingCommand",null);h(this,"_mediaCommandTimer");h(this,"_mediaPendingSeek",!1);h(this,"_mediaSeekTarget",null);h(this,"_mediaSeekValue",null);h(this,"_mediaSeekTimer");h(this,"_mediaTransportOverride",null);h(this,"_mediaSnapshot",null);h(this,"_error",null);h(this,"_statusMessage","");h(this,"_lastStatePointer","");h(this,"_lastCurrentIndex",null);h(this,"_refresh",()=>{Promise.all([this._loadPlaylists(!0),this._loadMetadata(!0)])});h(this,"_handleMediaSeekInput",e=>{const i=this._numberAttribute(e.target.value);i!==null&&(this._mediaSeekValue=i,this.requestUpdate())});h(this,"_handleMediaSeekChange",e=>{const i=this._numberAttribute(e.target.value);i!==null&&this._seekMedia(i)});h(this,"_handlePlaylistChange",e=>{const i=e.target.value;this._selectedPlaylistUuid=i||null,this._selectedItemKey=null,this._selectedPresentationUuid&&(this._selectedPresentationUuid=null,this._metadataRequestSequence+=1,this._metadata=null,this._metadataRequestKey="",this._clearThumbnailUrls(),this._followingLive=!0,this._loadMetadata(!1)),this._error=null,this._statusMessage="",this.requestUpdate()});h(this,"_handleItemChange",e=>{const i=e.target.value,s=this._playlists.find(a=>a.uuid===this._selectedPlaylistUuid),r=s==null?void 0:s.items.find(a=>a.key===i);r&&(this._selectedItemKey=r.key,this._selectedPresentationUuid=r.presentation_uuid,this._followingLive=!1,this._metadataRequestSequence+=1,this._metadata=null,this._metadataRequestKey="",this._clearThumbnailUrls(),this._error=null,this._statusMessage="",this._loadMetadata(!1),this.requestUpdate())});h(this,"_returnToLive",()=>{this._selectedPlaylistUuid=null,this._selectedItemKey=null,this._selectedPresentationUuid=null,this._followingLive=!0,this._metadataRequestSequence+=1,this._metadata=null,this._metadataRequestKey="",this._clearThumbnailUrls(),this._loadMetadata(!1),this.requestUpdate()});h(this,"_toggleFollow",()=>{this._followingLive=!this._followingLive,this._followingLive&&this._scrollToActive(),this.requestUpdate()})}set hass(e){var u;const i=this._state(),s=this._mediaPlayerState();this._hass=e;const r=this._state(),a=this._mediaPlayerState();this._reconcileMediaTransport(a),this._reconcileMediaSeek(this._mediaViewState());const l=this._playlistPointer(r);l!==this._lastPlaylistStatePointer&&(this._lastPlaylistStatePointer=l,(l!==this._playlistRequestKey||!this._playlists.length)&&!this._playlistPromise&&this._loadPlaylists(!1));const o=fe(r);o!==this._lastStatePointer&&(this._lastStatePointer=o,this._selectedPresentationUuid?this.requestUpdate():(this._metadata=null,this._clearThumbnailUrls(),this._loadMetadata(!1)));const d=this._currentIndex(r),c=this._stringAttribute((u=r==null?void 0:r.attributes)==null?void 0:u.presentation_uuid);this._pendingPlaylistPresentationUuid&&c===this._pendingPlaylistPresentationUuid&&this._confirmPlaylistSwitch(),d!==this._lastCurrentIndex&&(this._lastCurrentIndex=d,this._pendingIndex===d&&this._clearPending("Live cue confirmed"),this._followingLive&&this._scrollToActive()),(i!==r||s!==a)&&this.requestUpdate()}get hass(){return this._hass}setConfig(e){this._config=Be(e),this._followingLive=this._config.follow_live??!0,this._metadataRequestSequence+=1,this._playlistRequestSequence+=1,this._metadataRequestKey="",this._playlistRequestKey="__initial__",this._playlistRevision=null,this._lastPlaylistStatePointer="__initial__",this._playlists=[],this._selectedPlaylistUuid=null,this._selectedItemKey=null,this._selectedPresentationUuid=null,this._pendingPlaylistPresentationUuid=null,this._playlistPendingTimer!==void 0&&(window.clearTimeout(this._playlistPendingTimer),this._playlistPendingTimer=void 0),this._clearMediaCommandTimer(),this._mediaPendingCommand=null,this._clearMediaSeekTimer(),this._mediaPendingSeek=!1,this._mediaSeekTarget=null,this._mediaSeekValue=null,this._mediaTransportOverride=null,this._mediaSnapshot=null,this._clearThumbnailUrls(),this._error=null,this.requestUpdate()}getCardSize(){return 5}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"sensor",integration:"propresenter"}}},{name:"media_player_entity",selector:{entity:{domain:"media_player",integration:"propresenter"}}},{name:"design",selector:{select:{options:Object.entries(G).map(([e,i])=>({value:e,label:i.label}))}}},{name:"columns",selector:{select:{options:[{value:"auto",label:"Responsive"},{value:2,label:"2 columns"},{value:3,label:"3 columns"},{value:4,label:"4 columns"},{value:5,label:"5 columns"}]}}},{name:"browser_height",selector:{number:{min:240,max:1200,step:20,mode:"box"}}},{name:"internal_scroll",selector:{boolean:{}}},{name:"thumbnail_quality",selector:{select:{options:[{value:200,label:"Fast (200)"},{value:400,label:"Balanced (400)"},{value:800,label:"Detailed (800)"}]}}},{name:"show_group_labels",selector:{boolean:{}}},{name:"show_slide_labels",selector:{boolean:{}}},{name:"show_slide_numbers",selector:{boolean:{}}},{name:"show_notes",selector:{boolean:{}}},{name:"read_only",selector:{boolean:{}}},{name:"confirm_trigger",selector:{boolean:{}}},{name:"follow_live",selector:{boolean:{}}}]}}static getStubConfig(){return{type:"custom:propresenter-presentation",entity:""}}connectedCallback(){super.connectedCallback(),this._intersectionObserver=new IntersectionObserver(e=>{for(const i of e)if(i.isIntersecting){const s=Number(i.target.dataset.slideIndex);Number.isInteger(s)&&this._queueThumbnail(s)}})}disconnectedCallback(){var e;(e=this._intersectionObserver)==null||e.disconnect(),this._clearThumbnailUrls(),this._pendingTimer!==void 0&&window.clearTimeout(this._pendingTimer),this._playlistPendingTimer!==void 0&&window.clearTimeout(this._playlistPendingTimer),this._clearMediaCommandTimer(),this._mediaPendingCommand=null,this._clearMediaSeekTimer(),this._mediaPendingSeek=!1,this._mediaSeekTarget=null,this._mediaSeekValue=null,this._mediaTransportOverride=null,this._mediaSnapshot=null,super.disconnectedCallback()}updated(e){super.updated(e),this._intersectionObserver&&(this.renderRoot.querySelectorAll("[data-slide-index]").forEach(i=>{var s;(s=this._intersectionObserver)==null||s.observe(i)}),this._followingLive&&this._scrollToActive())}render(){var c,u,m,g,y;const e=this._state(),i=(e==null?void 0:e.attributes)??{},s=typeof i.slide_layer_active=="boolean"?i.slide_layer_active:((c=this._metadata)==null?void 0:c.slide_layer_active)??!0,r=((u=this._metadata)==null?void 0:u.presentation_name)??(e!=null&&e.state&&!["unknown","unavailable"].includes(e.state)?e.state:this._stringAttribute(i.presentation_name)??this._stringAttribute(i.friendly_name)??"ProPresenter"),a=((m=this._metadata)==null?void 0:m.groups)??[],l=this._config.columns==="auto"||this._config.columns===void 0?"auto-fit":String(this._config.columns),o=this._config.browser_height??z.browser_height,d=`${je(this._config.design)} --pp-columns: ${l}; --pp-browser-height: ${o}px;`;return p`
      <article class="card" style=${d}>
        <div class="toolbar">
          <div class="heading">
            <h2>${r}</h2>
            <p class="subtitle">${this._subtitle(i)}</p>
          </div>
          <div class="toolbar-actions">
            <button @click=${this._toggleFollow} title="Follow the live cue">
              ${this._followingLive?"Following":"Browse"}
            </button>
            <button @click=${this._refresh} title="Refresh presentation metadata">↻</button>
          </div>
        </div>
        ${this._renderMediaHeader()}
        ${s?_:p`<div class="banner warning">Output cleared · the active cue is still shown below</div>`}
        ${this._error?p`<div class="banner error">${this._error.message}</div>`:_}
        ${this._statusMessage?p`<div class="banner">${this._statusMessage}</div>`:_}
        ${this._renderPlaylistPicker()}
        ${this._selectedPresentationUuid?p`<div class="banner browse-note">
              <span>Browsing playlist item · live output is unchanged</span>
              <button @click=${this._returnToLive}>Live</button>
            </div>`:_}
        ${((g=this._metadata)==null?void 0:g.protocol_version)!==void 0&&this._metadata.protocol_version!==1?p`<div class="banner error">This card needs a newer integration protocol.</div>`:_}
        ${a.length?p`<div
              class=${this._config.internal_scroll===!1?"slide-browser no-scroll":"slide-browser"}
              role="region"
              aria-label="Presentation slides"
            ><div class="groups">${a.map($e=>p`
              <section>
                ${this._config.show_group_labels?p`<h3 class="group-title">${$e.label}</h3>`:_}
                <div class="grid">
                  ${$e.slides.map(Ge=>this._renderSlide(Ge))}
                </div>
              </section>
            `)}</div></div>`:p`<p class="muted">${((y=this._metadata)==null?void 0:y.metadata_available)===!1||!this._metadata?"Loading presentation slides…":"No active presentation"}</p>`}
      </article>
    `}_renderMediaHeader(){const e=this._mediaViewState();if(!T(e))return _;const i=J(e),s=(e==null?void 0:e.attributes)??{},r=this._stringAttribute(s.media_title)??"Video",a=this._numberAttribute(s.media_position),l=this._numberAttribute(s.media_duration),o=l!==null&&l>0?Math.min(l,Math.max(0,this._mediaSeekValue??a??0)):null,d=this._mediaPendingCommand,c=!this._config.read_only&&!this._isEditorPreview(),u=!!d||this._mediaPendingSeek,m=d?d==="media_play"?"Sending play…":"Sending pause…":this._mediaPendingSeek?"Sending seek…":i==="playing"?"Playing":"Paused",g=i==="playing"?"media_pause":"media_play",y=i==="playing"?"Pause video":"Play video";return p`
      <section class="media-header" aria-label="ProPresenter video playback">
        <div class="media-header-top">
          <div class="media-heading">
            <p class="media-kicker">Video playback</p>
            <strong class="media-title">${r}</strong>
            <p class="media-meta">${m}</p>
          </div>
          ${c?p`<div class="media-actions">
                <button
                  class="media-icon-button"
                  @click=${()=>this._mediaPlayerCommand(g)}
                  ?disabled=${u}
                  aria-label=${y}
                  title=${y}
                ><ha-icon icon=${i==="playing"?"mdi:pause":"mdi:play"}></ha-icon></button>
              </div>`:_}
        </div>
        ${o!==null?p`<div class="media-progress">
              <span class="media-time">${ge(o)}</span>
              <input
                type="range"
                min="0"
                max=${l}
                step="1"
                .value=${String(o)}
                @input=${this._handleMediaSeekInput}
                @change=${this._handleMediaSeekChange}
                ?disabled=${!c||u}
                aria-label="Video position"
              />
              <span class="media-time">${ge(l)}</span>
            </div>`:_}
      </section>
    `}_renderSlide(e){var d,c;const i=this._stringAttribute((c=(d=this._state())==null?void 0:d.attributes)==null?void 0:c.presentation_uuid),s=De(e.index,this._currentIndex(this._state()),this._selectedPresentationUuid,i),r=e.enabled===!1,a=Ke(this._config.read_only??!1,!r,this._isEditorPreview()),l=`tile ${s?"active":""} ${r?"disabled":""}`,o=p`
      <div class="thumbnail" data-slide-index=${e.index}>
        ${this._thumbnailUrls.has(e.index)?p`<img src=${this._thumbnailUrls.get(e.index)} alt=${e.label} />`:p`<span>${this._thumbnailPlaceholder(e.index)}</span>`}
      </div>
      <div class="tile-content">
        ${this._config.show_slide_labels?p`<span class="tile-label">${e.label}</span>`:_}
        ${this._config.show_slide_numbers?p`<span class="tile-index">Slide ${e.index+1}${r?" · disabled":""}</span>`:_}
        ${this._config.show_notes&&e.notes?p`<span class="notes">${e.notes}</span>`:_}
      </div>
      ${this._pendingIndex===e.index?p`<span class="pending">Pending</span>`:_}
    `;return a?p`<button id=${this._slideId(e.index)} class=${l} @click=${()=>this._trigger(e)}>${o}</button>`:p`<div id=${this._slideId(e.index)} class=${l} aria-disabled="true">${o}</div>`}async _loadMetadata(e){if(!this._hass||!this._config.entity)return;const i=this._state(),s=this._selectedPresentationUuid,r=s?`selected|${s}`:fe(i);if(r===this._metadataRequestKey&&this._metadataPromise)return this._metadataPromise;if(!e&&r===this._metadataRequestKey)return;this._metadataRequestKey=r;const a=++this._metadataRequestSequence,l=(async()=>{try{const o={type:s?"propresenter/get_presentation":"propresenter/get_active_presentation",entity_id:this._config.entity,refresh:e};s&&(o.presentation_uuid=s);const d=await this._hass.callWS(o);if(a!==this._metadataRequestSequence)return;if(d.protocol_version!==1){this._error={message:"The integration and card protocol versions do not match"};return}this._clearThumbnailUrls(),this._metadata=d,this._error=null,this._statusMessage="",this.requestUpdate()}catch(o){if(a!==this._metadataRequestSequence)return;this._error={message:this._errorMessage(o)},this.requestUpdate()}})();this._metadataPromise=l;try{await l}finally{this._metadataPromise===l&&(this._metadataPromise=null)}}_queueThumbnail(e){var i;!((i=this._metadata)!=null&&i.metadata_available)||this._thumbnailUrls.has(e)||this._thumbnailStates.get(e)==="loading"||this._thumbnailStates.get(e)==="loaded"||(this._thumbnailStates.set(e,"loading"),this._thumbnailQueue.push(e),this._drainThumbnailQueue())}_drainThumbnailQueue(){for(;this._thumbnailActive<4&&this._thumbnailQueue.length;){const e=this._thumbnailQueue.shift();this._thumbnailActive+=1,this._fetchThumbnail(e).finally(()=>{this._thumbnailActive-=1,this._drainThumbnailQueue()})}}async _fetchThumbnail(e){const i=this._metadata;if(!(i!=null&&i.metadata_available)||!i.presentation_uuid||!i.metadata_revision){this._thumbnailStates.set(e,"error");return}const s=We(this._config.entity,i.presentation_uuid,e,this._config.thumbnail_quality??400,i.metadata_revision),r=`${i.presentation_uuid}|${i.metadata_revision}`,a=new AbortController;this._thumbnailControllers.add(a);try{const l=await this._hass.callWS({type:"auth/sign_path",path:s,expires:60}),o=l.path??l.signed_path;if(!o)throw new Error("Home Assistant did not return a signed thumbnail path");const d=await fetch(this._hass.hassUrl(o),{credentials:"same-origin",signal:a.signal});if(d.status===401||d.status===403){const c=await this._hass.callWS({type:"auth/sign_path",path:s,expires:60}),u=c.path??c.signed_path;if(!u)throw new Error("Thumbnail authorization expired");const m=await fetch(this._hass.hassUrl(u),{credentials:"same-origin",signal:a.signal});if(!m.ok)throw new Error(`Thumbnail request failed (${m.status})`);this._setThumbnailUrl(e,URL.createObjectURL(await m.blob()),r);return}if(!d.ok)throw d.status===409&&await this._loadMetadata(!0),new Error(`Thumbnail request failed (${d.status})`);this._setThumbnailUrl(e,URL.createObjectURL(await d.blob()),r)}catch(l){if(a.signal.aborted)return;this._thumbnailStates.set(e,"error"),this._error={message:this._errorMessage(l)},this.requestUpdate()}finally{this._thumbnailControllers.delete(a)}}_setThumbnailUrl(e,i,s){const r=this._metadata?`${this._metadata.presentation_uuid}|${this._metadata.metadata_revision}`:"";if(!this.isConnected||r!==s){URL.revokeObjectURL(i);return}const a=this._thumbnailUrls.get(e);a&&URL.revokeObjectURL(a),this._thumbnailUrls.set(e,i),this._thumbnailStates.set(e,"loaded"),this.requestUpdate()}async _trigger(e){if(this._config.read_only||e.enabled===!1||this._isEditorPreview()||!this._hass||this._config.confirm_trigger&&!window.confirm(`Trigger “${e.label}”?`))return;const i=this._metadata;if(!(i!=null&&i.presentation_uuid)||!i.metadata_revision){this._error={message:"Refresh the presentation before triggering a slide"},this.requestUpdate();return}this._pendingIndex=e.index,this._statusMessage="Command pending · waiting for live confirmation",this._error=null,this.requestUpdate();try{await this._hass.callService("propresenter","trigger_slide",Fe(this._config.entity,e.index,i.presentation_uuid,i.metadata_revision)),this._pendingTimer=window.setTimeout(()=>{this._pendingIndex===e.index&&(this._pendingIndex=null,this._statusMessage="Trigger sent, but live confirmation is unavailable",this.requestUpdate())},5e3)}catch(s){this._pendingIndex=null,this._statusMessage="";const r=this._errorMessage(s),a=/stale|changed|revision|uuid/i.test(r);this._error={message:a?"The presentation changed; refreshing slides":`Trigger failed: ${r}`,stale:a},this.requestUpdate(),a&&await this._loadMetadata(!0)}}async _mediaPlayerCommand(e){const i=this._config.media_player_entity;if(!(!i||this._config.read_only||this._isEditorPreview()||!this._hass||this._mediaPendingSeek||!T(this._mediaViewState()))){this._clearMediaCommandTimer(),this._mediaPendingCommand=e,this._error=null,this._statusMessage=e==="media_play"?"Video play command pending":"Video pause command pending",this.requestUpdate();try{await this._hass.callService("media_player",e,{entity_id:i}),this._mediaTransportOverride=e==="media_play"?"playing":"paused",this._captureMediaSnapshot(this._mediaPlayerState());const s=e==="media_play"?"Video play command sent":"Video pause command sent";this._statusMessage=s,this._mediaCommandTimer=window.setTimeout(()=>{this._statusMessage===s&&(this._statusMessage="",this.requestUpdate()),this._mediaCommandTimer=void 0},2500)}catch(s){this._statusMessage="",this._error={message:`Video command failed: ${this._errorMessage(s)}`}}finally{this._mediaPendingCommand=null,this.requestUpdate()}}}async _seekMedia(e){var l;const i=this._config.media_player_entity,s=this._mediaViewState(),r=this._numberAttribute((l=s==null?void 0:s.attributes)==null?void 0:l.media_duration);if(!i||this._config.read_only||this._isEditorPreview()||!this._hass||this._mediaPendingSeek||!T(s)||r===null||r<=0)return;const a=Math.min(r,Math.max(0,e));this._clearMediaSeekTimer(),this._mediaPendingSeek=!0,this._mediaSeekTarget=a,this._mediaSeekValue=a,this._error=null,this._statusMessage="Video seek command pending",this.requestUpdate();try{await this._hass.callService("media_player","media_seek",{entity_id:i,seek_position:a});const o="Video seek command sent";this._statusMessage=o,this._mediaSeekTimer=window.setTimeout(()=>{this._mediaSeekTarget=null,this._mediaSeekValue=null,this._statusMessage="",this._mediaSeekTimer=void 0,this.requestUpdate()},5e3)}catch(o){this._clearMediaSeekTimer(),this._mediaSeekTarget=null,this._mediaSeekValue=null,this._statusMessage="",this._error={message:`Video seek failed: ${this._errorMessage(o)}`}}finally{this._mediaPendingSeek=!1,this.requestUpdate()}}_renderPlaylistPicker(){var l,o;if(!this._playlists.length)return _;const e=this._playlists.find(d=>d.uuid===this._selectedPlaylistUuid),i=(e==null?void 0:e.items)??[],s=i.find(d=>d.key===this._selectedItemKey),r=this._stringAttribute((o=(l=this._state())==null?void 0:l.attributes)==null?void 0:o.presentation_uuid),a=!!(s&&s.presentation_uuid!==r&&!this._config.read_only&&!this._isEditorPreview());return p`
      <div class="playlist-picker">
        <select
          aria-label="ProPresenter playlist"
          .value=${this._selectedPlaylistUuid??""}
          @change=${this._handlePlaylistChange}
        >
          <option value="">Choose playlist…</option>
          ${this._playlists.map(d=>p`<option value=${d.uuid}>${d.name}</option>`)}
        </select>
        <select
          aria-label="ProPresenter playlist item"
          .value=${this._selectedItemKey??""}
          ?disabled=${!e}
          @change=${this._handleItemChange}
        >
          <option value="">Choose presentation…</option>
          ${i.map(d=>p`<option value=${d.key}>
              ${d.path?`${d.path} · `:""}${d.name}${d.presentation_uuid===r?" · LIVE":""}
            </option>`)}
        </select>
      </div>
      ${a?p`<div class="playlist-actions">
            <button
              @click=${this._makeSelectedPlaylistItemLive}
              ?disabled=${!!this._pendingPlaylistPresentationUuid}
              title="Enter this playlist item in ProPresenter"
            >
              ${this._pendingPlaylistPresentationUuid?"Entering…":"Enter"}
            </button>
          </div>`:_}
    `}async _makeSelectedPlaylistItemLive(){var a,l;if(this._config.read_only||this._isEditorPreview()||!this._hass||!this._selectedPlaylistUuid||!this._selectedItemKey)return;const e=this._playlists.find(o=>o.uuid===this._selectedPlaylistUuid),i=e==null?void 0:e.items.find(o=>o.key===this._selectedItemKey);if(!i)return;const s=this._stringAttribute((l=(a=this._state())==null?void 0:a.attributes)==null?void 0:l.presentation_uuid);if(i.presentation_uuid===s)return;if(!this._playlistRevision){this._error={message:"Refresh the playlist before switching live items"},this.requestUpdate();return}if(this._config.confirm_trigger&&!window.confirm(`Make “${i.name}” live in ProPresenter?`))return;const r=i.presentation_uuid;this._pendingPlaylistPresentationUuid=r,this._statusMessage="Playlist switch pending · waiting for live confirmation",this._error=null,this.requestUpdate();try{if(await this._hass.callService("propresenter","trigger_playlist_item",Qe(this._config.entity,this._selectedPlaylistUuid,i.key,i.index,r,this._playlistRevision)),this._pendingPlaylistPresentationUuid!==r)return;this._returnToLive(),this._statusMessage="Playlist switch sent · waiting for live confirmation",this._playlistPendingTimer=window.setTimeout(()=>{this._pendingPlaylistPresentationUuid===r&&(this._pendingPlaylistPresentationUuid=null,this._playlistPendingTimer=void 0,this._statusMessage="Playlist switch sent, but live confirmation is unavailable",this.requestUpdate())},5e3),this.requestUpdate()}catch(o){this._pendingPlaylistPresentationUuid=null,this._playlistPendingTimer!==void 0&&(window.clearTimeout(this._playlistPendingTimer),this._playlistPendingTimer=void 0),this._statusMessage="";const d=this._errorMessage(o),c=/stale|changed|revision|playlist|item/i.test(d);this._error={message:c?"The playlist changed; refreshing playlist items":`Playlist switch failed: ${d}`,stale:c},this.requestUpdate(),c&&await this._loadPlaylists(!0)}}async _loadPlaylists(e){if(!this._hass||!this._config.entity)return;if(this._playlistPromise)return this._playlistPromise;const i=this._playlistPointer(this._state());if(!e&&this._playlists.length&&i===this._playlistRequestKey)return;const s=++this._playlistRequestSequence,r=(async()=>{try{const a=await this._hass.callWS({type:"propresenter/get_presentation_playlists",entity_id:this._config.entity,refresh:e});if(s!==this._playlistRequestSequence)return;if(!a||a.protocol_version!==1){this._error={message:"The integration and card protocol versions do not match"};return}this._playlists=Array.isArray(a.playlists)?a.playlists.filter(l=>!!(l!=null&&l.uuid)&&Array.isArray(l.items)):[],this._playlistRevision=a.playlist_revision,this._playlistRequestKey=a.playlist_revision??i,this._selectedPresentationUuid&&!this._playlists.some(l=>l.items.some(o=>o.presentation_uuid===this._selectedPresentationUuid))&&this._returnToLive(),this.requestUpdate()}catch(a){if(s!==this._playlistRequestSequence)return;this._error={message:this._errorMessage(a)},this._playlistRequestKey="",this._playlistRevision=null,this.requestUpdate()}})();this._playlistPromise=r;try{await r}finally{this._playlistPromise===r&&(this._playlistPromise=null)}}_scrollToActive(){const e=this._currentIndex(this._state());e!==null&&queueMicrotask(()=>{const i=this.renderRoot.querySelector(`#${this._slideId(e)}`);if(!i)return;const s=this.renderRoot.querySelector(".slide-browser");if(!s||this._config.internal_scroll===!1){i.scrollIntoView({behavior:"smooth",block:"nearest"});return}const r=s.getBoundingClientRect(),a=i.getBoundingClientRect(),l=a.top-r.top+s.scrollTop,o=l+a.height,d=s.scrollTop,c=d+s.clientHeight,u=12;l<d?s.scrollTo({top:Math.max(0,l-u),behavior:"smooth"}):o>c&&s.scrollTo({top:Math.min(s.scrollHeight-s.clientHeight,o-s.clientHeight+u),behavior:"smooth"})})}_clearPending(e){this._pendingIndex=null,this._statusMessage=e,this._pendingTimer!==void 0&&window.clearTimeout(this._pendingTimer),this._pendingTimer=void 0,this.requestUpdate()}_confirmPlaylistSwitch(){this._pendingPlaylistPresentationUuid&&(this._pendingPlaylistPresentationUuid=null,this._playlistPendingTimer!==void 0&&(window.clearTimeout(this._playlistPendingTimer),this._playlistPendingTimer=void 0),this._returnToLive(),this._statusMessage="Live playlist item confirmed",this.requestUpdate())}_clearThumbnailUrls(){for(const e of this._thumbnailControllers)e.abort();this._thumbnailControllers.clear();for(const e of this._thumbnailUrls.values())URL.revokeObjectURL(e);this._thumbnailUrls.clear(),this._thumbnailStates.clear(),this._thumbnailQueue=[]}_clearMediaCommandTimer(){this._mediaCommandTimer!==void 0&&(window.clearTimeout(this._mediaCommandTimer),this._mediaCommandTimer=void 0)}_clearMediaSeekTimer(){this._mediaSeekTimer!==void 0&&(window.clearTimeout(this._mediaSeekTimer),this._mediaSeekTimer=void 0)}_reconcileMediaTransport(e){var a,l,o,d;const i=this._stringAttribute((a=e==null?void 0:e.attributes)==null?void 0:a.media_content_type);if((i==null?void 0:i.toLowerCase())==="image"){this._mediaTransportOverride=null,this._mediaSnapshot=null;return}const s=this._stringAttribute((l=e==null?void 0:e.attributes)==null?void 0:l.media_title),r=this._stringAttribute((d=(o=this._mediaSnapshot)==null?void 0:o.attributes)==null?void 0:d.media_title);this._mediaTransportOverride&&s&&r&&s!==r&&(this._mediaTransportOverride=null),T(e)?(this._captureMediaSnapshot(e),J(e)===this._mediaTransportOverride&&(this._mediaTransportOverride=null)):this._mediaTransportOverride||(this._mediaSnapshot=null)}_captureMediaSnapshot(e){!e||!T(e)||(this._mediaSnapshot={state:e.state,attributes:{...e.attributes??{}}})}_mediaViewState(){var s;const e=this._mediaPlayerState();return!this._mediaTransportOverride||!(T(e)?e:this._mediaSnapshot)?e:{state:this._mediaTransportOverride,attributes:{...((s=this._mediaSnapshot)==null?void 0:s.attributes)??{},...(e==null?void 0:e.attributes)??{},media_content_type:"video"}}}_reconcileMediaSeek(e){var s;if(this._mediaSeekTarget===null)return;if(!T(e)){this._clearMediaSeekTimer(),this._mediaPendingSeek=!1,this._mediaSeekTarget=null,this._mediaSeekValue=null;return}const i=this._numberAttribute((s=e==null?void 0:e.attributes)==null?void 0:s.media_position);i===null||Math.abs(i-this._mediaSeekTarget)>1.5||(this._clearMediaSeekTimer(),this._mediaPendingSeek=!1,this._mediaSeekTarget=null,this._mediaSeekValue=null,this._statusMessage.startsWith("Video seek")&&(this._statusMessage=""))}_mediaPlayerState(){var i,s;const e=this._config.media_player_entity;return e?(s=(i=this._hass)==null?void 0:i.states)==null?void 0:s[e]:void 0}_state(){var e,i;return(i=(e=this._hass)==null?void 0:e.states)==null?void 0:i[this._config.entity]}_currentIndex(e){var s;const i=(s=e==null?void 0:e.attributes)==null?void 0:s.current_index;return typeof i=="number"?i:Number.isInteger(Number(i))?Number(i):null}_stringAttribute(e){return typeof e=="string"&&e?e:null}_numberAttribute(e){if(e==null||e==="")return null;const i=typeof e=="number"?e:Number(e);return Number.isFinite(i)?i:null}_subtitle(e){var l,o,d,c;if(this._selectedPresentationUuid){const u=this._stringAttribute((l=this._state())==null?void 0:l.state),m=(o=this._metadata)==null?void 0:o.slide_count;return["Browsing playlist item",m?`${m} slides`:"",u?`Live: ${u}`:""].filter(Boolean).join(" · ")}const i=this._currentIndex(this._state()),s=typeof((d=this._metadata)==null?void 0:d.slide_count)=="number"?this._metadata.slide_count:typeof e.slide_count=="number"?e.slide_count:null,r=this._stringAttribute(e.current_label)??((c=this._metadata)==null?void 0:c.current_slide_label);return[i!==null&&s!==null?`${i+1} / ${s}`:"",r].filter(Boolean).join(" · ")||"Waiting for ProPresenter"}_thumbnailPlaceholder(e){return this._thumbnailStates.get(e)==="error"?"Thumbnail unavailable":"Loading thumbnail…"}_playlistPointer(e){var i;return this._stringAttribute((i=e==null?void 0:e.attributes)==null?void 0:i.playlist_revision)??""}_slideId(e){return`propresenter-slide-${e}`}_isEditorPreview(){let e=this;for(;e;){if(e instanceof Element){const i=e.localName;if(i.includes("preview")||i.includes("editor"))return!0}e instanceof ShadowRoot?e=e.host:e=e.parentNode}return!1}_errorMessage(e){return ye(e)}}h(Y,"styles",Pe`
    :host {
      display: block;
      color: var(--primary-text-color);
    }

    .card {
      box-sizing: border-box;
      padding: var(--pp-card-padding);
      border-radius: var(--pp-card-radius);
      background: var(--pp-surface);
      overflow: hidden;
    }

    .toolbar,
    .status-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toolbar {
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .heading {
      min-width: 0;
    }

    h2,
    p {
      margin: 0;
    }

    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1.05rem;
    }

    .subtitle,
    .muted,
    .notes {
      color: var(--pp-muted);
      font-size: 0.78rem;
    }

    .toolbar-actions {
      display: flex;
      flex: 0 0 auto;
      gap: 6px;
    }

    .playlist-picker {
      display: grid;
      grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
      gap: 8px;
      margin-bottom: 12px;
    }

    .playlist-actions {
      display: flex;
      gap: 8px;
      margin: -4px 0 12px;
    }

    .media-header {
      display: grid;
      gap: 12px;
      margin: 0 0 12px;
      padding: 10px 12px;
      border: 1px solid color-mix(in srgb, var(--pp-accent) 25%, transparent);
      border-radius: 12px;
      background: color-mix(in srgb, var(--pp-accent) 10%, var(--pp-surface));
    }

    .media-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .media-heading {
      display: grid;
      min-width: 0;
      gap: 2px;
    }

    .media-kicker {
      color: var(--pp-accent);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .media-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.88rem;
    }

    .media-meta {
      color: var(--pp-muted);
      font-size: 0.75rem;
    }

    .media-actions {
      display: flex;
      flex: 0 0 auto;
      gap: 6px;
    }

    .media-actions button {
      min-width: 40px;
    }

    .media-icon-button {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border-radius: 50%;
      color: var(--text-primary-color, white);
      background: var(--pp-accent);
    }

    .media-icon-button ha-icon {
      --mdc-icon-size: 22px;
    }

    .media-progress {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
    }

    .media-progress input {
      width: 100%;
      margin: 0;
      accent-color: var(--pp-accent);
      cursor: pointer;
    }

    .media-progress input:disabled {
      cursor: wait;
      opacity: 0.62;
    }

    .media-time {
      min-width: 34px;
      color: var(--pp-muted);
      font-size: 0.7rem;
      font-variant-numeric: tabular-nums;
      text-align: center;
    }

    select {
      min-width: 0;
      border: 1px solid color-mix(in srgb, var(--primary-text-color) 18%, transparent);
      border-radius: 10px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      font: inherit;
      padding: 8px 10px;
    }

    .browse-note {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin: 0 0 10px;
    }

    button {
      border: 0;
      border-radius: 999px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      cursor: pointer;
      font: inherit;
      padding: 7px 10px;
    }

    button:hover {
      background: color-mix(in srgb, var(--pp-accent) 18%, transparent);
    }

    button:disabled {
      cursor: wait;
      opacity: 0.62;
    }

    .banner {
      border-radius: 10px;
      margin: 0 0 10px;
      padding: 8px 10px;
      font-size: 0.8rem;
    }

    .banner.warning {
      background: color-mix(in srgb, #ffb300 22%, transparent);
    }

    .banner.error {
      background: color-mix(in srgb, #f44336 18%, transparent);
    }

    .groups {
      display: grid;
      gap: 14px;
    }

    .slide-browser {
      max-height: var(--pp-browser-height);
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 4px;
      overscroll-behavior: contain;
      scrollbar-gutter: stable;
      -webkit-overflow-scrolling: touch;
    }

    .slide-browser.no-scroll {
      max-height: none;
      overflow: visible;
      padding-right: 0;
    }

    .group-title {
      margin: 0 0 7px;
      color: var(--pp-muted);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(var(--pp-columns), minmax(0, 1fr));
      gap: var(--pp-gap);
    }

    .tile {
      position: relative;
      min-width: 0;
      padding: 0;
      border: 2px solid transparent;
      border-radius: var(--pp-tile-radius);
      overflow: hidden;
      text-align: left;
      background: var(--pp-tile-surface);
    }

    .tile.active {
      border-color: var(--pp-accent);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--pp-accent) 35%, transparent);
    }

    .tile.disabled {
      cursor: not-allowed;
      filter: grayscale(0.5);
      opacity: 0.52;
    }

    .thumbnail {
      aspect-ratio: 16 / 9;
      display: grid;
      place-items: center;
      background: var(--secondary-background-color, #e8e8e8);
      color: var(--pp-muted);
      font-size: 0.75rem;
    }

    .thumbnail img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .tile-content {
      display: grid;
      gap: 2px;
      padding: 8px;
    }

    .tile-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.82rem;
      font-weight: 600;
    }

    .tile-index {
      color: var(--pp-muted);
      font-size: 0.7rem;
    }

    .pending {
      position: absolute;
      top: 7px;
      right: 7px;
      border-radius: 999px;
      padding: 3px 6px;
      background: var(--pp-accent);
      color: var(--text-primary-color, white);
      font-size: 0.68rem;
    }

    @media (max-width: 520px) {
      .playlist-picker {
        grid-template-columns: 1fr;
      }

      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `),customElements.get("propresenter-presentation")||customElements.define("propresenter-presentation",Y);const be=window.customCards??(window.customCards=[]);return be.some(n=>n.type==="propresenter-presentation")||be.push({type:"propresenter-presentation",name:"ProPresenter Presentation",description:"A dynamic, guarded ProPresenter slide browser",preview:!0,documentationURL:"https://github.com/media-dotcom/ha-propresenter"}),b.ProPresenterPresentationCard=Y,Object.defineProperty(b,Symbol.toStringTag,{value:"Module"}),b})({});
