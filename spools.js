"use strict";(self.webpackChunkfilacalc=self.webpackChunkfilacalc||[]).push([[15],{99304:function(e,n,t){t.r(n),t.d(n,{default:function(){return _}});var r=t(70885),a=t(4942),s=t(83863),i=t(38779),l=t(12902),o=t(51436),c=t(17625),d=t(38485),u=t(35823),h=t.n(u),m=t(67294),x=t(64809),p=t(34051),j=t(31555),f=t(39267),g=t(43489),b=t(2086),Z=t(77104),y=t(75147),v=t(27977),C=t(51479),k=t(64593),S=t(44586),w=t(19501),N=t(52394),F=t(45697),W=t.n(F),D=t(65694),L=t(9198),P=t.n(L),M=t(21881),R=t(23314),O=t(48903),T=t(85893);function G(e){var n=e.form,t=n.errors,r=n.values,a=n.handleChange,i=n.handleSubmit,o=n.setFieldValue,c=e.onHide,d=(0,m.useCallback)((function(e){return o("purchaseDate",(0,s.Z)(e))}),[o]),u=(0,m.useCallback)((function(e){return o("color",e.hex)}),[o]);return(0,T.jsx)(M.Z,{dialogClassName:"modal-90w",onHide:c,show:!0,children:(0,T.jsxs)(R.Z,{onSubmit:i,children:[(0,T.jsx)(M.Z.Header,{closeButton:!0,children:(0,T.jsxs)(M.Z.Title,{children:[r?"Edit":"Create"," a Spool"]})}),(0,T.jsxs)(M.Z.Body,{children:[(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Spool Name"}),(0,T.jsx)(R.Z.Control,{isInvalid:Boolean(t.name),name:"name",onChange:a,type:"text",value:r.name}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:t.name})]}),(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Filament Material"}),(0,T.jsxs)(R.Z.Select,{isInvalid:Boolean(t.material),name:"material",onChange:a,value:r.material,children:[O.NC.map((function(e){return(0,T.jsx)("option",{value:e.name,children:e.name},e.name)})),(0,T.jsx)("option",{value:"custom",children:"Custom"})]}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:t.material})]}),"custom"===r.material&&(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsxs)(R.Z.Label,{children:["Material Density (g/cm",(0,T.jsx)("sup",{children:"3"}),")"]}),(0,T.jsx)(R.Z.Control,{isInvalid:Boolean(t.materialDensity),name:"materialDensity",onChange:a,type:"number",value:r.materialDensity}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:t.materialDensity})]}),(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Color"}),(0,T.jsx)(R.Z.Control,{isInvalid:Boolean(t.color),name:"color",onChange:a,type:"text",value:r.color}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:t.color}),(0,T.jsx)(D.xS,{className:"my-2",color:r.color,onChange:u})]}),(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Net Weight (g)"}),(0,T.jsx)(R.Z.Control,{isInvalid:Boolean(t.netWeight),min:"0",name:"netWeight",onChange:a,type:"number",value:r.netWeight}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:t.netWeight})]}),(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Spool Weight (g)"}),(0,T.jsx)(R.Z.Control,{isInvalid:Boolean(t.spoolWeight),min:"0",name:"spoolWeight",onChange:a,type:"number",value:r.spoolWeight}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:t.spoolWeight})]}),(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Current Weight (g)"}),(0,T.jsx)(R.Z.Control,{isInvalid:Boolean(t.currentWeight),min:"0",name:"currentWeight",onChange:a,step:"0.01",type:"number",value:r.currentWeight}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:t.currentWeight}),(0,T.jsxs)(R.Z.Text,{className:"text-primary",children:[((r.currentWeight-r.spoolWeight)/r.netWeight*100).toFixed(2),"% remaining"]})]}),(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Filameter Diameter (mm)"}),(0,T.jsx)(R.Z.Control,{isInvalid:Boolean(t.filamentDiameter),min:"0",name:"filamentDiameter",onChange:a,step:"0.01",type:"number",value:r.filamentDiameter}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:t.filamentDiameter})]}),(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Purchase Date"}),(0,T.jsx)(R.Z.Control,{as:P(),isInvalid:Boolean(t.purchaseDate),onChange:d,selected:(0,l.default)(r.purchaseDate)}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:t.purchaseDate})]}),(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Purchase Cost"}),(0,T.jsx)(R.Z.Control,{isInvalid:Boolean(t.purchaseCost),min:"0",name:"purchaseCost",onChange:a,step:"0.01",type:"number",value:r.purchaseCost}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:t.purchaseCost})]})]}),(0,T.jsxs)(M.Z.Footer,{children:[(0,T.jsx)(Z.Z,{onClick:c,variant:"secondary",children:"Cancel"}),(0,T.jsx)(Z.Z,{type:"submit",variant:"primary",children:"Save"})]})]})})}G.propTypes={form:W().shape({errors:W().object.isRequired,values:W().object.isRequired,setFieldValue:W().func.isRequired,handleChange:W().func.isRequired,handleSubmit:W().func.isRequired}).isRequired,onHide:W().func.isRequired};var A=t(10682),q=t(36968),B=t(88375),I=t(70256),H=w.Ry({filamentLength:w.Rx().moreThan(0,"Filament length must be greater than zero."),copies:w.Rx().moreThan(0,"Copies must be greater than zero.")});function E(e){var n=e.spool,t=e.onHide,r=e.onSubmit,a=(0,d.TA)({initialValues:{filamentLength:0,copies:1},validationSchema:H,onSubmit:(0,m.useCallback)((function(e){var t=0,a=e.filamentLength*e.copies,s=Math.PI*Math.pow(n.filamentDiameter/2,2)*a;t="custom"!==n.material?s*(0,O.Ut)(n.material).density:s*n.materialDensity,r(t)}),[r,n])}),s=a.errors,i=a.values,l=a.handleChange,o=a.handleSubmit,c=a.setFieldValue,u=(0,I.Z)((function(e){return c("filamentLength",e.length.toFixed(2))})),h=u.loading,x=u.error,f=u.progress,g=u.handleChange;if(h)return(0,T.jsxs)(M.Z,{onHide:t,show:!0,children:[(0,T.jsx)(M.Z.Header,{children:(0,T.jsx)(M.Z.Title,{children:"Parsing your G-code..."})}),(0,T.jsx)(M.Z.Body,{children:(0,T.jsx)(A.Z,{children:(0,T.jsx)(p.Z,{children:(0,T.jsxs)(j.Z,{className:"text-center mb-4",children:[(0,T.jsx)(q.Z,{animation:"border",className:"my-3"}),(0,T.jsx)(C.Z,{animated:!0,now:f,variant:"primary"})]})})})})]});var b=i.filamentLength*i.copies,y="custom"===n.material?n.materialDensity:(0,O.Ut)(n.material).density,v=Math.PI*Math.pow(n.filamentDiameter/2,2)*b*y,k=(0,O.Hk)(n).length,S=k-b,w=S/k*100,N=v/n.netWeight*n.purchaseCost;return(0,T.jsx)(M.Z,{onHide:t,show:!0,children:(0,T.jsxs)(R.Z,{children:[(0,T.jsx)(M.Z.Header,{closeButton:!0,children:(0,T.jsxs)(M.Z.Title,{children:["Print from ",null==n?void 0:n.name]})}),(0,T.jsxs)(M.Z.Body,{children:[(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Select a G-code file"}),(0,T.jsx)(R.Z.Control,{isInvalid:x,onChange:g,type:"file"}),(0,T.jsx)(R.Z.Text,{className:"text-muted",children:"Files are parsed in your browser, not sent to a server."}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:"Unable to parse the selected file."})]}),(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Filament Length (m)"}),(0,T.jsx)(R.Z.Control,{isInvalid:Boolean(s.filamentLength),min:"0",name:"filamentLength",onChange:l,type:"number",value:i.filamentLength}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:s.filamentLength})]}),(0,T.jsxs)(R.Z.Group,{children:[(0,T.jsx)(R.Z.Label,{children:"Number of Copies"}),(0,T.jsx)(R.Z.Control,{isInvalid:Boolean(s.copies),min:"1",name:"copies",onChange:l,type:"number",value:i.copies}),(0,T.jsx)(R.Z.Control.Feedback,{type:"invalid",children:s.filamentLength})]}),S>0?(0,T.jsxs)(B.Z,{className:"mt-2",variant:"info",children:[(0,T.jsxs)("p",{children:["This print will consume ",b.toFixed(2)," ","meters of filament, leaving this much of the spool:"]}),(0,T.jsx)(C.Z,{label:"".concat(Math.round(w),"%"),now:w}),(0,T.jsxs)("p",{children:["The cost of the filament is ",N.toFixed(2),"."]})]}):(0,T.jsx)(B.Z,{className:"mt-2",variant:"danger",children:"The spool does not have enough filament remaining for this print!"})]}),(0,T.jsxs)(M.Z.Footer,{children:[(0,T.jsx)(Z.Z,{onClick:t,variant:"secondary",children:"Cancel"}),(0,T.jsx)(Z.Z,{disabled:S<=0,onClick:o,variant:"primary",children:"Print"})]})]})})}function z(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function V(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?z(Object(t),!0).forEach((function(n){(0,a.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):z(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}E.propTypes={onHide:W().func.isRequired,onSubmit:W().func.isRequired,spool:W().object.isRequired};var U=(0,m.forwardRef)((function(e,n){return(0,T.jsx)(c.G,V({forwardedRef:n},e))}));U.displayName="Icon";var K=w.Ry({name:w.Z_().required("Name must be provided."),material:w.Z_().required("Material must be provided."),materialDensity:w.Rx().moreThan(0,"Density must be greater than zero."),color:w.Z_().required("Color must be provided.").matches(/#[a-fA-F0-9]+/,"Color is invalid."),netWeight:w.Rx().required("Net weight must be provided.").moreThan(0,"Net weight must be greater than zero."),spoolWeight:w.Rx().required("Spool weight must be provided.").moreThan(0,"Spool weight must be greater than zero."),currentWeight:w.Rx().required("Current weight must be provided.").moreThan(0,"Current weight must be greater than zero."),filamentDiameter:w.Rx().required("Filament diameter must be provided.").moreThan(0,"Filament diameter must be greater than zero."),purchaseDate:w.Z_().required("Purchase date must be provided."),purchaseCost:w.Rx().required("Purchase cost must be provided.")});function _(){var e={name:"Spool",material:"PLA",materialDensity:1.24,color:"#000000",netWeight:1e3,spoolWeight:250,currentWeight:1250,filamentDiameter:1.75,purchaseDate:(0,s.Z)(new Date),purchaseCost:0},n=(0,m.useRef)(),t=(0,m.useState)(null),a=(0,r.Z)(t,2),u=a[0],w=a[1],F=(0,m.useState)(!1),W=(0,r.Z)(F,2),D=W[0],L=W[1],P=(0,m.useState)(!1),M=(0,r.Z)(P,2),R=M[0],A=M[1],q=(0,m.useState)(0),B=(0,r.Z)(q,2),I=B[0],H=B[1],z=(0,m.useState)(0),_=(0,r.Z)(z,2),J=_[0],Q=_[1],Y=(0,N.K)(),$=Y.spools,X=Y.findSpool,ee=Y.addSpool,ne=Y.updateSpool,te=Y.removeSpool,re=Y.setSpools,ae=(0,d.TA)({initialValues:e,validationSchema:K,onSubmit:function(e){u?ne(V({id:u},e)):ee(V({id:(0,S.Z)()},e)),L(!1)}}),se=ae.handleReset,ie=ae.setFieldValue,le=(0,m.useCallback)((function(){se(),L(!0),w(null)}),[L,w,se]),oe=(0,m.useCallback)((function(){if(u){var e=X(u);for(var n in e)Object.hasOwn(e,n)&&ie(n,e[n]);L(!0)}}),[L,ie,X,u]),ce=(0,m.useCallback)((function(){u&&confirm("Are you sure you want to delete this spool?")&&te(u)}),[te,u]),de=(0,m.useCallback)((function(){ee(V(V({},X(u)),{},{id:(0,S.Z)()}))}),[ee,X,u]),ue=(0,m.useCallback)((function(){u&&A(!0)}),[u,A]),he=(0,m.useCallback)((function(e){if(u){var n=X(u),t=Math.round(100*(n.currentWeight-e))/100;ne(V(V({},n),{},{currentWeight:t})),A(!1)}}),[X,ne,u]),me=(0,m.useCallback)((function(){n.current&&n.current.click()}),[n]),xe=(0,m.useCallback)((function(e){var n=(0,r.Z)(e.target.files,1)[0],t=new FileReader;t.onloadend=function(e){var n=e.target.result,t=JSON.parse(n);t&&alert("Are you sure you want to overwrite your current spool database?")&&(w(null),re(t))},t.readAsText(n)}),[w,re]),pe=(0,m.useCallback)((function(){return h()(JSON.stringify($),"filacalc-export-".concat((0,i.default)(Date.now(),"yyyy-MM-dd"),".json"))}),[$]),je=(0,m.useCallback)((function(){confirm("Are you sure you want to cancel?")&&L(!1)}),[L]),fe=(0,m.useCallback)((function(){return A(!1)}),[A]),ge=(0,m.useCallback)((function(e){return w((function(n){return n===e?null:e}))}),[w]);return(0,m.useEffect)((function(){H($.reduce((function(e,n){return e+n.netWeight}),0)),Q($.reduce((function(e,n){return e+(n.currentWeight-n.spoolWeight)}),0))}),[H,Q,$]),(0,T.jsxs)(m.Fragment,{children:[(0,T.jsx)(k.q,{title:"Spool Database"}),D&&(0,T.jsx)(G,{form:ae,onHide:je,show:D}),u&&R&&(0,T.jsx)(E,{onHide:fe,onSubmit:he,spool:X(u)}),(0,T.jsxs)(p.Z,{className:"mb-2",children:[(0,T.jsx)(j.Z,{md:9,children:(0,T.jsxs)("div",{className:"d-flex align-items-center",children:[(0,T.jsx)("h1",{className:"me-2",children:"Spool Database"}),(0,T.jsx)(f.Z,{overlay:(0,T.jsx)(g.Z,{children:"All data is saved to your browser's local storage."}),placement:"right",children:(0,T.jsx)(U,{icon:o.Fuz})})]})}),(0,T.jsxs)(j.Z,{className:"d-flex justify-content-end align-items-end",md:3,children:[(0,T.jsx)("input",{className:"d-none",onChange:xe,ref:n,type:"file"}),(0,T.jsxs)(b.Z,{children:[(0,T.jsxs)(Z.Z,{onClick:me,children:[(0,T.jsx)(c.G,{icon:o.cf$})," Import"]}),(0,T.jsxs)(Z.Z,{onClick:pe,children:[(0,T.jsx)(c.G,{icon:o.q7m})," Export"]})]})]})]}),(0,T.jsxs)("div",{className:"d-flex mb-2",children:[(0,T.jsxs)(b.Z,{children:[(0,T.jsxs)(Z.Z,{onClick:le,variant:"success",children:[(0,T.jsx)(c.G,{icon:o.KtF})," Add"]}),(0,T.jsxs)(Z.Z,{disabled:!u,onClick:oe,children:[(0,T.jsx)(c.G,{icon:o.TzT})," Edit"]}),(0,T.jsxs)(Z.Z,{disabled:!u,onClick:de,children:[(0,T.jsx)(c.G,{icon:o.WM4})," Clone"]}),(0,T.jsxs)(Z.Z,{disabled:!u,onClick:ce,variant:"danger",children:[(0,T.jsx)(c.G,{icon:o.$aW})," Remove"]})]}),(0,T.jsx)(b.Z,{className:"ms-auto",children:(0,T.jsxs)(Z.Z,{disabled:!u,onClick:ue,children:[(0,T.jsx)(c.G,{icon:o.wf8})," Print"]})})]}),(0,T.jsxs)(y.Z,{children:[(0,T.jsxs)("thead",{children:[(0,T.jsxs)("tr",{children:[(0,T.jsx)("th",{colSpan:5}),(0,T.jsx)("th",{className:"text-center",colSpan:3,children:"Remaining"})]}),(0,T.jsxs)("tr",{children:[(0,T.jsx)("th",{style:{width:"30%"},children:"Name"}),(0,T.jsx)("th",{children:"Material"}),(0,T.jsx)("th",{className:"text-center",children:"Purchased"}),(0,T.jsx)("th",{className:"text-end",children:"Net Weight"}),(0,T.jsx)("th",{className:"text-end",children:"Cost / kg"}),(0,T.jsx)("th",{className:"text-end",style:{width:"20%"},children:"%"}),(0,T.jsx)("th",{className:"text-end",children:"Mass"}),(0,T.jsx)("th",{className:"text-end",children:"Length"})]})]}),(0,T.jsxs)("tbody",{children:[!(null!=$&&$.length)&&(0,T.jsx)("tr",{children:(0,T.jsx)("td",{colSpan:7,children:"No spools."})}),$.map((function(e){var n=(0,O.Hk)(e),t=n.mass,r=n.length,a=u===e.id?"bg-dark text-light":"",s=(0,i.default)((0,l.default)(e.purchaseDate),"yyyy-MM-dd"),o="custom"===e.material?"Custom":e.material;return(0,T.jsxs)("tr",{className:a,onClick:function(){return ge(e.id)},children:[(0,T.jsx)("td",{children:(0,T.jsx)(v.Z,{bg:"",style:{color:(0,x.Qg)(e.color),backgroundColor:e.color},children:e.name})}),(0,T.jsx)("td",{children:o}),(0,T.jsx)("td",{className:"text-center",children:s}),(0,T.jsxs)("td",{className:"text-end",children:[e.netWeight," g"]}),(0,T.jsx)("td",{className:"text-end",children:Boolean(e.purchaseCost)&&(e.purchaseCost/e.netWeight*1e3).toFixed(2)}),(0,T.jsx)("td",{className:"text-end",children:(0,T.jsx)(C.Z,{className:"text-light",label:"".concat(Math.floor(t/e.netWeight*100),"%"),now:t/e.netWeight*100})}),(0,T.jsxs)("td",{className:"text-end",children:[t.toFixed(2)," g"]}),(0,T.jsxs)("td",{className:"text-end",children:[r.toFixed(2)," m"]})]},e.id)}))]}),(0,T.jsx)("tfoot",{children:(0,T.jsxs)("tr",{children:[(0,T.jsx)("td",{children:"Totals"}),(0,T.jsxs)("td",{className:"text-end",colSpan:3,children:[Math.round(I)," g"]}),(0,T.jsxs)("td",{className:"text-end",colSpan:3,children:[Math.round(J)," g"]}),(0,T.jsx)("td",{})]})})]})]})}},70256:function(e,n,t){t.d(n,{Z:function(){return l}});var r=t(70885),a=t(67294),s=()=>{const e=e=>{for(const[,,,n,t]of[...e.trim().matchAll(/(\s*(([XYZFEIJR])([0-9\-.]+))\s*)/g)])if("E"===n)return parseFloat(t);return 0};self.addEventListener("message",(({data:n})=>{const t=new FileReader;let r=0,a=0;t.addEventListener("load",(n=>{const t=n.target.result.split(/[\n]/g).filter((e=>/^G[1-3]/.test(e)));for(const[n,s]of t.entries()){r+=e(s);const i=Math.round(n/t.length*100);i!==a&&(postMessage({type:"progress",progress:i}),a=i)}r>0&&postMessage({type:"result",length:r/1e3})})),t.addEventListener("error",(()=>{postMessage({type:"error"})})),t.readAsText(n)}))},i=t(48903);function l(e){var n=(0,a.useMemo)((function(){return(0,i.j1)(s)}),[]),t=(0,a.useState)(!1),l=(0,r.Z)(t,2),o=l[0],c=l[1],d=(0,a.useState)(!1),u=(0,r.Z)(d,2),h=u[0],m=u[1],x=(0,a.useState)(0),p=(0,r.Z)(x,2),j=p[0],f=p[1],g=(0,a.useCallback)((function(n){var t=n.data;switch(t.type){case"progress":f(t.progress);break;case"result":e(t),m(!1),f(100);break;case"error":c(!0),m(!1)}}),[e,f,m,c]),b=(0,a.useCallback)((function(e){var t=(0,r.Z)(e.target.files,1)[0];if(!t||!t.name.endsWith(".gcode"))return c(!0),void m(!1);c(!1),m(!0),f(0),n.postMessage(t)}),[n]);return(0,a.useEffect)((function(){return n.addEventListener("message",g),function(){return n.removeEventListener("message",g)}})),{loading:h,error:o,progress:j,handleChange:b}}},48903:function(e,n,t){t.d(n,{AF:function(){return d},Hk:function(){return p},Kl:function(){return m},NC:function(){return l},OK:function(){return c},Q:function(){return h},Ut:function(){return o},ZM:function(){return s},bA:function(){return u},j1:function(){return a},lO:function(){return x},w5:function(){return i}});var r=t(71002),a=function(e){if("object"===("undefined"==typeof window?"undefined":(0,r.Z)(window))){var n=e.toString(),t=new Blob(["(".concat(n,")()")]);return new Worker(URL.createObjectURL(t))}},s=[{brand:"3D Solutech",mass:173},{brand:"Amazon Basics",mass:248},{brand:"Amolen",mass:190},{brand:"Atomic Filament",mass:306},{brand:"Colorfabb",mass:236},{brand:"eSun",mass:224},{brand:"Inland",mass:225},{brand:"Hatchbox",mass:225},{brand:"Overture",mass:237},{brand:"PolyMaker",mass:220},{brand:"Prusament",mass:201},{brand:"ProtoPasta",mass:70},{brand:"StrongHero3D",mass:151},{brand:"SunLu",mass:133},{brand:"ZYLtech",mass:179}],i=function(e){return s.find((function(n){return n.brand===e}))},l=[{name:"PLA",density:1.24},{name:"ABS",density:1.04},{name:"PETG",density:1.27},{name:"Nylon",density:1.52},{name:"TPU",density:1.21},{name:"PC",density:1.3},{name:"CF",density:1.3},{name:"HIPS",density:1.03},{name:"PVA",density:1.23},{name:"ASA",density:1.05},{name:"PP",density:.9},{name:"POM",density:1.4},{name:"PMMA",density:1.18}],o=function(e){return l.find((function(n){return n.name===e}))},c=[{name:"Mk8",diameter:2.4,length:13},{name:"Mk10",diameter:4,length:13},{name:"Volcano 1.75mm",diameter:2,length:21},{name:"Volcano 3mm",diameter:3.2,length:21}],d=function(e){return c.find((function(n){return n.name===e}))},u=[{name:"Ender 3",meltZoneDiameter:2,meltZoneLength:25},{name:"Volcano",meltZoneDiameter:6,meltZoneLength:19}],h=function(e){return u.find((function(n){return n.name===e}))},m=[1.8,.9,7.5],x=[1.25,1,12,16,25,1.41111,1.27,1.5875],p=function(e){var n=0,t=e.currentWeight-e.spoolWeight;return{mass:t,volume:n="custom"!==e.material?t/o(e.material).density:t/e.materialDensity,length:n/Math.PI/Math.pow(e.filamentDiameter/2,2),percent:t/e.netWeight*100}}}}]);