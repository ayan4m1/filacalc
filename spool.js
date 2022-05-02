"use strict";(self.webpackChunkfilacalc=self.webpackChunkfilacalc||[]).push([[614],{60036:function(e,n,t){t.d(n,{Z:function(){return l}});var a=t(45697),r=t.n(a),i=t(88375),s=t(85893);function l(e){var n=e.errors;return null!=n&&n.length?(0,s.jsx)(i.Z,{className:"my-4",variant:"warning",children:(0,s.jsx)("ul",{className:"mb-0",children:n.map((function(e){return(0,s.jsx)("li",{children:e},e)}))})}):null}l.propTypes={errors:r().arrayOf(r().string).isRequired}},49306:function(e,n,t){t.d(n,{Z:function(){return u}});var a=t(45697),r=t.n(a),i=t(86025),s=t(34051),l=t(31555),o=t(85893);function u(e){var n=e.children,t=e.results,a=e.title,r=void 0===a?"Results":a;return n||t?(0,o.jsxs)(i.Z,{body:!0,className:"my-4",children:[(0,o.jsx)(i.Z.Title,{children:r}),(null==t?void 0:t.length)>0&&t.map((function(e,a){return(0,o.jsxs)(s.Z,{className:Boolean(n)&&a===t.length-1?"mb-4":null,children:[(0,o.jsx)(l.Z,{xs:2,children:(0,o.jsx)("strong",{children:e.label})}),(0,o.jsx)(l.Z,{xs:10,children:e.content})]},e.label)})),n]}):null}u.propTypes={children:r().node,results:r().arrayOf(r().shape({label:r().string.isRequired,content:r().oneOfType([r().node,r().string]).isRequired})),title:r().string}},32834:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var a=t(38485),r=t(67294),i=t(23314),s=t(64593),l=t(60036),o=t(49306),u=t(50882),m=t(52394),c=t(48903),d=t(85893);function h(){var e={material:"",customMaterialDensity:0,filamentDiameter:(0,m.K)().filamentDiameter,outerDiameter:0,spoolDiameter:0,spoolWidth:0},n=(0,u.Z)({initialValues:e,shouldShow:(0,r.useCallback)((function(e,n){return n.material||e.material||n.outerDiameter||n.spoolDiameter||n.spoolWidth}),[]),validate:(0,r.useCallback)((function(e){var n=[];return e.material||n.push("Select a material."),e.outerDiameter<=0&&n.push("Filament outer diameter must be greater than zero."),e.spoolDiameter<=0&&n.push("Spool diameter must be greater than zero."),e.spoolDiameter>e.outerDiameter&&n.push("Spool diameter should be less than filament outer diameter."),e.spoolWidth<=0&&n.push("Spool width must be greater than zero."),n}),[]),calculate:(0,r.useCallback)((function(e){var n="custom"!==e.material?(0,c.Ut)(e.material).density:parseFloat(e.customMaterialDensity),t=(Math.pow(e.outerDiameter,2)-Math.pow(e.spoolDiameter,2))*Math.PI*e.spoolWidth*.8/4/Math.pow(e.filamentDiameter,2)/1e3,a=Math.PI*Math.pow(e.filamentDiameter/2,2)*t,r=n*a;return[{label:"Length",content:"".concat(t.toFixed(2)," m")},{label:"Volume",content:(0,d.jsxs)("span",{children:[a.toFixed(2)," cm",(0,d.jsx)("sup",{children:"3"})]})},{label:"Mass",content:"".concat(r.toFixed(2)," g")}]}),[])}),t=n.formik,a=t.values,s=t.handleChange,h=t.handleBlur,p=n.results,f=n.errors;return(0,d.jsxs)(r.Fragment,{children:[(0,d.jsxs)(i.Z,{children:[(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsx)(i.Z.Label,{children:"Material"}),(0,d.jsxs)(i.Z.Select,{name:"material",onBlur:h,onChange:s,value:a.material,children:[(0,d.jsx)("option",{value:"",children:"Select One"}),c.NC.map((function(e){return(0,d.jsx)("option",{value:e.name,children:e.name},e.name)})),(0,d.jsx)("option",{value:"custom",children:"Custom"})]})]}),"custom"===a.material&&(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsxs)(i.Z.Label,{children:["Custom Material Density (g/cm",(0,d.jsx)("sup",{children:"3"}),")"]}),(0,d.jsx)(i.Z.Control,{min:"0",name:"customMaterialDensity",onChange:s,type:"number",value:a.customMaterialDensity})]}),(0,d.jsx)(i.Z.Label,{children:"Filament diameter (mm)"}),(0,d.jsx)(i.Z.Control,{min:"0",name:"filamentDiameter",onBlur:h,onChange:s,type:"number",value:a.filamentDiameter})]}),(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsx)(i.Z.Label,{children:"Outer diameter of filament on spool (mm)"}),(0,d.jsx)(i.Z.Control,{min:"0",name:"outerDiameter",onBlur:h,onChange:s,type:"number",value:a.outerDiameter})]}),(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsx)(i.Z.Label,{children:"Inner diameter of spool (mm)"}),(0,d.jsx)(i.Z.Control,{min:"0",name:"spoolDiameter",onBlur:h,onChange:s,type:"number",value:a.spoolDiameter})]}),(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsx)(i.Z.Label,{children:"Inner width of spool (mm)"}),(0,d.jsx)(i.Z.Control,{min:"0",name:"spoolWidth",onBlur:h,onChange:s,type:"number",value:a.spoolWidth})]})]}),(0,d.jsx)(l.Z,{errors:f}),(0,d.jsx)(o.Z,{results:p,title:"Remaining Filament"})]})}var p=t(51479);function f(){var e=(0,u.Z)({initialValues:{brand:"",material:"",filamentDiameter:1.75,netWeight:1e3,currentWeight:0,spoolWeight:0,materialDensity:0},shouldShow:(0,r.useCallback)((function(e,n){return n.brand||e.brand||n.material||e.material}),[]),validate:(0,r.useCallback)((function(e){var n=[];if(e.currentWeight<=0&&n.push("Current spool weight must be greater than zero."),e.netWeight<=0&&n.push("Net weight must be greater than zero"),e.brand){var t="custom"!==e.brand?(0,c.w5)(e.brand).mass:parseFloat(e.customSpoolMass);0===Math.max(0,e.currentWeight-t)&&n.push("Spool weight looks incorrect, it should be empty.")}else n.push("Select a brand.");return e.material||n.push("Select a material."),n}),[]),calculate:(0,r.useCallback)((function(e){"custom"!==e.brand&&(e.spoolWeight=(0,c.w5)(e.brand).mass);var n=(0,c.Hk)(e),t=n.mass,a=n.volume,r=n.length,i=n.percent,s="success";return i<=25?s="danger":i<=50&&(s="warning"),[{label:"Mass",content:(0,d.jsxs)("span",{children:[Math.round(t)," g"]})},{label:"Length",content:(0,d.jsxs)("span",{children:[r.toFixed(2)," m"]})},{label:"Volume",content:(0,d.jsxs)("span",{children:[a.toFixed(2)," cm",(0,d.jsx)("sup",{children:"3"})]})},{label:"Percentage",content:(0,d.jsx)(p.Z,{className:"text-light",label:"".concat(Math.round(i)," %"),now:i,variant:s})}]}),[])}),n=e.formik,t=n.values,a=n.handleChange,s=n.handleBlur,m=e.results,h=e.errors;return(0,d.jsxs)(r.Fragment,{children:[(0,d.jsxs)(i.Z,{children:[(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsx)(i.Z.Label,{children:"Brand"}),(0,d.jsxs)(i.Z.Select,{name:"brand",onBlur:s,onChange:a,value:t.brand,children:[(0,d.jsx)("option",{value:"",children:"Select One"}),c.ZM.map((function(e){return(0,d.jsx)("option",{value:e.brand,children:e.brand},e.brand)})),(0,d.jsx)("option",{value:"custom",children:"Custom"})]})]}),"custom"===t.brand&&(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsx)(i.Z.Label,{children:"Custom Spool Mass (g)"}),(0,d.jsx)(i.Z.Control,{name:"customSpoolMass",onChange:a,type:"number",value:t.customSpoolMass})]}),(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsx)(i.Z.Label,{children:"Material"}),(0,d.jsxs)(i.Z.Select,{name:"material",onBlur:s,onChange:a,value:t.material,children:[(0,d.jsx)("option",{value:"",children:"Select One"}),c.NC.map((function(e){return(0,d.jsx)("option",{value:e.name,children:e.name},e.name)})),(0,d.jsx)("option",{value:"custom",children:"Custom"})]})]}),"custom"===t.material&&(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsxs)(i.Z.Label,{children:["Custom Material Density (g/cm",(0,d.jsx)("sup",{children:"3"}),")"]}),(0,d.jsx)(i.Z.Control,{min:"0",name:"customMaterialDensity",onChange:a,type:"number",value:t.customMaterialDensity})]}),(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsx)(i.Z.Label,{children:"Filament Diameter (mm)"}),(0,d.jsx)(i.Z.Control,{min:"0",name:"filamentDiameter",onChange:a,type:"number",value:t.filamentDiameter})]}),(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsx)(i.Z.Label,{children:"Current Weight (g)"}),(0,d.jsx)(i.Z.Control,{min:"0",name:"currentWeight",onChange:a,type:"number",value:t.currentWeight})]}),(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsx)(i.Z.Label,{children:"Net Weight (g)"}),(0,d.jsx)(i.Z.Control,{min:"0",name:"netWeight",onChange:a,type:"number",value:t.netWeight})]})]}),(0,d.jsx)(l.Z,{errors:h}),(0,d.jsx)(o.Z,{results:m,title:"Remaining Filament"})]})}function b(){var e=(0,a.TA)({initialValues:{type:"weight"}}),n=e.values,t=e.handleChange;return(0,d.jsxs)(r.Fragment,{children:[(0,d.jsx)(s.q,{title:"Spool Usage"}),(0,d.jsx)("h1",{children:"Spool Usage"}),(0,d.jsx)("p",{children:"Use this calculator to determine the amount of filament remaining on a partially used spool. Select which type of measurements you would like to take below."}),(0,d.jsx)(i.Z,{children:(0,d.jsxs)(i.Z.Group,{children:[(0,d.jsx)(i.Z.Label,{children:"Type"}),(0,d.jsxs)(i.Z.Select,{name:"type",onChange:t,value:n.type,children:[(0,d.jsx)("option",{value:"weight",children:"Weight"}),(0,d.jsx)("option",{value:"dimensions",children:"Dimensions"})]})]})}),"weight"===n.type?(0,d.jsx)(f,{}):(0,d.jsx)(h,{})]})}},50882:function(e,n,t){t.d(n,{Z:function(){return s}});var a=t(70885),r=t(38485),i=t(67294);function s(e){var n=e.initialValues,t=e.calculate,s=e.shouldShow,l=e.validate,o=(0,i.useState)(null),u=(0,a.Z)(o,2),m=u[0],c=u[1],d=(0,i.useState)([]),h=(0,a.Z)(d,2),p=h[0],f=h[1],b=(0,r.TA)({initialValues:n}),x=b.values,g=b.touched;return(0,i.useEffect)((function(){if(!s(x,g))return f([]),void c(null);var e=l(x);e.length>0?(f(e),c(null)):(f([]),c(t(x)))}),[x,g,s,l,t,c]),{formik:b,results:m,errors:p}}},48903:function(e,n,t){t.d(n,{AF:function(){return m},Hk:function(){return f},Kl:function(){return h},NC:function(){return l},OK:function(){return u},Q:function(){return d},Ut:function(){return o},ZM:function(){return i},bA:function(){return c},j1:function(){return r},lO:function(){return p},w5:function(){return s}});var a=t(71002),r=function(e){if("object"===("undefined"==typeof window?"undefined":(0,a.Z)(window))){var n=e.toString(),t=new Blob(["(".concat(n,")()")]);return new Worker(URL.createObjectURL(t))}},i=[{brand:"3D Solutech",mass:173},{brand:"Amazon Basics",mass:248},{brand:"Amolen",mass:190},{brand:"Atomic Filament",mass:306},{brand:"Colorfabb",mass:236},{brand:"eSun",mass:224},{brand:"Inland",mass:225},{brand:"Hatchbox",mass:225},{brand:"Overture",mass:237},{brand:"PolyMaker",mass:220},{brand:"Prusament",mass:201},{brand:"ProtoPasta",mass:70},{brand:"StrongHero3D",mass:151},{brand:"SunLu",mass:133},{brand:"ZYLtech",mass:179}],s=function(e){return i.find((function(n){return n.brand===e}))},l=[{name:"PLA",density:1.24},{name:"ABS",density:1.04},{name:"PETG",density:1.27},{name:"Nylon",density:1.52},{name:"TPU",density:1.21},{name:"PC",density:1.3},{name:"CF",density:1.3},{name:"HIPS",density:1.03},{name:"PVA",density:1.23},{name:"ASA",density:1.05},{name:"PP",density:.9},{name:"POM",density:1.4},{name:"PMMA",density:1.18}],o=function(e){return l.find((function(n){return n.name===e}))},u=[{name:"Mk8",diameter:2.4,length:13},{name:"Mk10",diameter:4,length:13},{name:"Volcano 1.75mm",diameter:2,length:21},{name:"Volcano 3mm",diameter:3.2,length:21}],m=function(e){return u.find((function(n){return n.name===e}))},c=[{name:"Ender 3",meltZoneDiameter:2,meltZoneLength:25},{name:"Volcano",meltZoneDiameter:6,meltZoneLength:19}],d=function(e){return c.find((function(n){return n.name===e}))},h=[1.8,.9,7.5],p=[1.25,1,12,16,25,1.41111,1.27,1.5875],f=function(e){var n=0,t=e.currentWeight-e.spoolWeight;return{mass:t,volume:n="custom"!==e.material?t/o(e.material).density:t/e.materialDensity,length:n/Math.PI/Math.pow(e.filamentDiameter/2,2),percent:t/e.netWeight*100}}},88375:function(e,n,t){var a=t(94184),r=t.n(a),i=t(67294),s=t(14289),l=t(78146),o=t(23735),u=t(76792),m=t(41068),c=t(41485),d=t(39602),h=t(44680),p=t(85893);const f=(0,d.Z)("h4");f.displayName="DivStyledAsH4";const b=(0,h.Z)("alert-heading",{Component:f}),x=(0,h.Z)("alert-link",{Component:o.Z}),g={variant:"primary",show:!0,transition:m.Z,closeLabel:"Close alert"},j=i.forwardRef(((e,n)=>{const{bsPrefix:t,show:a,closeLabel:i,closeVariant:o,className:d,children:h,variant:f,onClose:b,dismissible:x,transition:g,...j}=(0,s.Ch)(e,{show:"onClose"}),v=(0,u.vE)(t,"alert"),Z=(0,l.Z)((e=>{b&&b(!1,e)})),y=!0===g?m.Z:g,C=(0,p.jsxs)("div",{role:"alert",...y?void 0:j,ref:n,className:r()(d,v,f&&`${v}-${f}`,x&&`${v}-dismissible`),children:[x&&(0,p.jsx)(c.Z,{onClick:Z,"aria-label":i,variant:o}),h]});return y?(0,p.jsx)(y,{unmountOnExit:!0,...j,ref:void 0,in:a,children:C}):a?C:null}));j.displayName="Alert",j.defaultProps=g,n.Z=Object.assign(j,{Link:x,Heading:b})},86025:function(e,n,t){t.d(n,{Z:function(){return D}});var a=t(94184),r=t.n(a),i=t(67294),s=t(76792),l=t(44680),o=t(39602),u=t(85893);const m=i.forwardRef((({bsPrefix:e,className:n,variant:t,as:a="img",...i},l)=>{const o=(0,s.vE)(e,"card-img");return(0,u.jsx)(a,{ref:l,className:r()(t?`${o}-${t}`:o,n),...i})}));m.displayName="CardImg";var c=m,d=t(49059);const h=i.forwardRef((({bsPrefix:e,className:n,as:t="div",...a},l)=>{const o=(0,s.vE)(e,"card-header"),m=(0,i.useMemo)((()=>({cardHeaderBsPrefix:o})),[o]);return(0,u.jsx)(d.Z.Provider,{value:m,children:(0,u.jsx)(t,{ref:l,...a,className:r()(n,o)})})}));h.displayName="CardHeader";var p=h;const f=(0,o.Z)("h5"),b=(0,o.Z)("h6"),x=(0,l.Z)("card-body"),g=(0,l.Z)("card-title",{Component:f}),j=(0,l.Z)("card-subtitle",{Component:b}),v=(0,l.Z)("card-link",{Component:"a"}),Z=(0,l.Z)("card-text",{Component:"p"}),y=(0,l.Z)("card-footer"),C=(0,l.Z)("card-img-overlay"),w=i.forwardRef((({bsPrefix:e,className:n,bg:t,text:a,border:i,body:l,children:o,as:m="div",...c},d)=>{const h=(0,s.vE)(e,"card");return(0,u.jsx)(m,{ref:d,...c,className:r()(n,h,t&&`bg-${t}`,a&&`text-${a}`,i&&`border-${i}`),children:l?(0,u.jsx)(x,{children:o}):o})}));w.displayName="Card",w.defaultProps={body:!1};var D=Object.assign(w,{Img:c,Title:g,Subtitle:j,Body:x,Link:v,Text:Z,Header:p,Footer:y,ImgOverlay:C})},51479:function(e,n,t){var a=t(94184),r=t.n(a),i=t(67294),s=t(76792),l=t(53439),o=t(85893);function u(e,n,t){const a=(e-n)/(t-n)*100;return Math.round(1e3*a)/1e3}function m({min:e,now:n,max:t,label:a,visuallyHidden:i,striped:s,animated:l,className:m,style:c,variant:d,bsPrefix:h,...p},f){return(0,o.jsx)("div",{ref:f,...p,role:"progressbar",className:r()(m,`${h}-bar`,{[`bg-${d}`]:d,[`${h}-bar-animated`]:l,[`${h}-bar-striped`]:l||s}),style:{width:`${u(n,e,t)}%`,...c},"aria-valuenow":n,"aria-valuemin":e,"aria-valuemax":t,children:i?(0,o.jsx)("span",{className:"visually-hidden",children:a}):a})}const c=i.forwardRef((({isChild:e,...n},t)=>{if(n.bsPrefix=(0,s.vE)(n.bsPrefix,"progress"),e)return m(n,t);const{min:a,now:u,max:c,label:d,visuallyHidden:h,striped:p,animated:f,bsPrefix:b,variant:x,className:g,children:j,...v}=n;return(0,o.jsx)("div",{ref:t,...v,className:r()(g,b),children:j?(0,l.UI)(j,(e=>(0,i.cloneElement)(e,{isChild:!0}))):m({min:a,now:u,max:c,label:d,visuallyHidden:h,striped:p,animated:f,bsPrefix:b,variant:x},t)})}));c.displayName="ProgressBar",c.defaultProps={min:0,max:100,animated:!1,isChild:!1,visuallyHidden:!1,striped:!1},n.Z=c},71002:function(e,n,t){function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}t.d(n,{Z:function(){return a}})}}]);