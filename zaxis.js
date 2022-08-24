"use strict";(self.webpackChunkfilacalc=self.webpackChunkfilacalc||[]).push([[595],{6377:function(e,r,t){t.d(r,{y:function(){return m}});var n=t(7625),s=t(5697),a=t.n(s),i=t(7294),l=t(8375),o=t(6025),c=t(4051),d=t(1555),h=t(4593),u=t(5893);const m=e=>{let{children:r}=e;return(0,u.jsx)(i.Fragment,{children:r})},p=e=>{let{children:r}=e;return Boolean(r)&&(0,u.jsx)("div",{className:"my-4",children:r})},g=e=>{let{title:r,icon:t,children:s}=e;return(0,u.jsxs)(i.Fragment,{children:[Boolean(r)&&(0,u.jsx)(h.q,{title:r}),(0,u.jsxs)("h1",{children:[Boolean(t)&&(0,u.jsx)(n.G,{icon:t,size:"2x"}),Boolean(r)&&` ${r}`]}),s]})},x=e=>{let{errors:r}=e;return null!=r&&r.length?(0,u.jsx)(l.Z,{className:"my-4",variant:"warning",children:(0,u.jsx)("ul",{className:"mb-0",children:r.map((e=>(0,u.jsx)("li",{children:e},e)))})}):null},b=e=>{let{title:r="Results",results:t,children:n}=e;return n||null!=t&&t.length?(0,u.jsxs)(o.Z,{body:!0,className:"my-4",children:[(0,u.jsx)(o.Z.Title,{children:r}),Boolean(null==t?void 0:t.length)&&t.map(((e,r)=>(0,u.jsxs)(c.Z,{className:Boolean(n)&&r===t.length-1?"mb-4":null,children:[(0,u.jsx)(d.Z,{sm:4,xs:2,children:(0,u.jsx)("strong",{children:e.label})}),(0,u.jsx)(d.Z,{sm:8,xs:10,children:e.content})]},e.label))),n]}):null};m.propTypes={children:a().node.isRequired},p.propTypes={children:a().node},g.propTypes={children:a().node,icon:a().oneOfType([a().string,a().object]),title:a().string},x.propTypes={errors:a().arrayOf(a().string.isRequired)},b.propTypes={title:a().string,results:a().oneOfType([a().arrayOf(a().object.isRequired),a().object.isRequired]),children:a().node},m.Errors=x,m.Heading=g,m.Results=b,m.Description=p},5284:function(e,r,t){t.r(r),t.d(r,{default:function(){return d}});var n=t(7294),s=t(3314),a=t(5147),i=t(6377),l=t(882),o=t(8903),c=t(5893);function d(){const{formik:{values:e,handleChange:r},errors:t,results:d}=(0,l.Z)({initialValues:{layerHeight:.2,stepAngle:1.8,customStepAngle:0,leadscrewPitch:1.25,customLeadscrewPitch:0,printHeight:100},shouldShow:(0,n.useCallback)((()=>!0),[]),validate:(0,n.useCallback)((e=>{const r=[];return e.stepAngle<=0&&r.push("Step angle must be greater than zero."),e.leadscrewPitch<=0&&r.push("Leadscrew pitch must be greater than zero."),e.layerHeight<=0&&r.push("Layer height must be greater than zero."),r}),[]),calculate:(0,n.useCallback)((e=>{const r=[],t=parseFloat("custom"===e.stepAngle?e.customStepAngle:e.stepAngle),n=parseFloat("custom"===e.leadscrewPitch?e.customLeadscrewPitch:e.leadscrewPitch)/(360/t),s=e.layerHeight/n,a=Math.floor(s)===s;if(!a){r.push({height:Math.floor(s)*n,steps:Math.floor(s),error:0});let t=s/n-Math.floor(s/n),a="-";t>.5&&(t=1-t,a="+"),t*=e.printHeight/e.layerHeight/100,r.push({height:s*n,steps:s,error:`${a}${t.toFixed(4)}`}),r.push({height:Math.ceil(s)*n,steps:Math.ceil(s),error:0})}return{results:[{label:"Divisibility Check",content:a?(0,c.jsx)("p",{className:"text-success",children:"Your layer height is evenly divisible by your step height!"}):(0,c.jsx)("p",{className:"text-danger",children:"Your layer height is not evenly divisible by your step height!"})},{label:"Minimum Step Height",content:`${n.toFixed(6)}mm`}],layerHeights:r,evenlyDivisible:a,printHeight:e.printHeight}}),[])});return(0,c.jsxs)(i.y,{children:[(0,c.jsx)(i.y.Heading,{title:"Z-Axis Calibration"}),(0,c.jsxs)(i.y.Description,{children:[(0,c.jsx)("p",{children:"Use this calculator to calibrate your layer heights based on your Z-axis hardware."}),(0,c.jsx)("p",{children:"The goal is to use a layer height which is evenly divisble by the smallest amount of motion your Z-axis is capable of producing."}),(0,c.jsx)("p",{children:"If you do not do this, you can expect to see various print issues, especially with tall prints as the error is cumulative."})]}),(0,c.jsxs)(s.Z,{children:[(0,c.jsxs)(s.Z.Group,{children:[(0,c.jsx)(s.Z.Label,{children:"Motor Step Angle (°)"}),(0,c.jsxs)(s.Z.Select,{name:"stepAngle",onChange:r,value:e.stepAngle,children:[o.Kl.map((e=>(0,c.jsx)("option",{value:e,children:e},e))),(0,c.jsx)("option",{value:"custom",children:"Custom"})]})]}),"custom"===e.stepAngle&&(0,c.jsxs)(s.Z.Group,{children:[(0,c.jsx)(s.Z.Label,{children:"Custom Step Angle (°)"}),(0,c.jsx)(s.Z.Control,{name:"customStepAngle",onChange:r,type:"number",value:e.customStepAngle})]}),(0,c.jsxs)(s.Z.Group,{children:[(0,c.jsx)(s.Z.Label,{children:"Leadscrew Pitch (mm/rev)"}),(0,c.jsxs)(s.Z.Select,{name:"leadscrewPitch",onChange:r,value:e.leadscrewPitch,children:[o.lO.map((e=>(0,c.jsx)("option",{value:e,children:e},e))),(0,c.jsx)("option",{value:"custom",children:"Custom"})]})]}),"custom"===e.leadscrewPitch&&(0,c.jsxs)(s.Z.Group,{children:[(0,c.jsx)(s.Z.Label,{children:"Leadscrew Pitch (mm/rev)"}),(0,c.jsx)(s.Z.Control,{name:"leadscrewPitch",onChange:r,type:"number",value:e.leadscrewPitch})]}),(0,c.jsxs)(s.Z.Group,{children:[(0,c.jsx)(s.Z.Label,{children:"Layer Height (mm)"}),(0,c.jsx)(s.Z.Control,{name:"layerHeight",onChange:r,type:"number",value:e.layerHeight})]}),(0,c.jsxs)(s.Z.Group,{children:[(0,c.jsx)(s.Z.Label,{children:"Print Height (mm)"}),(0,c.jsx)(s.Z.Control,{name:"printHeight",onChange:r,type:"number",value:e.printHeight}),(0,c.jsx)(s.Z.Text,{className:"text-muted",children:"This is used to calculate accumulated error if layer height is not evenly divisible by minimum step height."})]})]}),(0,c.jsx)(i.y.Errors,{errors:t}),Boolean(d)&&(0,c.jsx)(i.y.Results,{results:d.results,children:!d.evenlyDivisible&&(0,c.jsxs)(a.Z,{children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:"Layer Height"}),(0,c.jsx)("th",{children:"Number of Steps"}),(0,c.jsxs)("th",{children:["Error over ",d.printHeight/10,"cm"]})]})}),(0,c.jsx)("tbody",{children:d.layerHeights.map((e=>(0,c.jsxs)("tr",{children:[(0,c.jsxs)("td",{className:e.steps%1==0?"text-success":"text-danger",children:[e.height.toFixed(4)," mm"]}),(0,c.jsx)("td",{children:e.steps}),(0,c.jsxs)("td",{children:[e.error," mm"]})]},e.height)))})]})})]})}},882:function(e,r,t){t.d(r,{Z:function(){return a}});var n=t(8485),s=t(7294);function a(e){let{initialValues:r,calculate:t,shouldShow:a,validate:i}=e;const[l,o]=(0,s.useState)(null),[c,d]=(0,s.useState)([]),h=(0,n.TA)({initialValues:r}),{values:u,touched:m}=h;return(0,s.useEffect)((()=>{if(!a(u,m))return d([]),void o(null);const e=i(u);e.length>0?(d(e),o(null)):(d([]),o(t(u)))}),[u,m,a,i,t,o]),{formik:h,results:l,errors:c}}},8903:function(e,r,t){t.d(r,{AF:function(){return c},Hk:function(){return p},Kl:function(){return u},NC:function(){return i},OK:function(){return o},Q:function(){return h},Ut:function(){return l},ZM:function(){return s},bA:function(){return d},j1:function(){return n},lO:function(){return m},w5:function(){return a}});const n=e=>{if("object"!=typeof window)return;const r=e.toString(),t=new Blob([`(${r})()`]);return new Worker(URL.createObjectURL(t))},s=[{brand:"3D Solutech",mass:173},{brand:"Amazon Basics",mass:248},{brand:"Amolen",mass:190},{brand:"Atomic Filament",mass:306},{brand:"Colorfabb",mass:236},{brand:"eSun",mass:224},{brand:"Inland",mass:225},{brand:"Hatchbox",mass:225},{brand:"Overture - Plastic",mass:237},{brand:"Overture - Cardboard",mass:177},{brand:"PolyMaker",mass:220},{brand:"Prusament",mass:201},{brand:"ProtoPasta",mass:70},{brand:"StrongHero3D",mass:151},{brand:"SunLu",mass:133},{brand:"ZYLtech",mass:179}],a=e=>s.find((r=>r.brand===e)),i=[{name:"PLA",density:1.24},{name:"ABS",density:1.04},{name:"PETG",density:1.27},{name:"Nylon",density:1.52},{name:"TPU",density:1.21},{name:"PC",density:1.3},{name:"CF",density:1.3},{name:"HIPS",density:1.03},{name:"PVA",density:1.23},{name:"ASA",density:1.05},{name:"PP",density:.9},{name:"POM",density:1.4},{name:"PMMA",density:1.18}],l=e=>i.find((r=>r.name===e)),o=[{name:"Mk8",diameter:2.4,length:13},{name:"Mk10",diameter:4,length:13},{name:"Volcano 1.75mm",diameter:2,length:21},{name:"Volcano 3mm",diameter:3.2,length:21}],c=e=>o.find((r=>r.name===e)),d=[{name:"Ender 3",meltZoneDiameter:2,meltZoneLength:25},{name:"Volcano",meltZoneDiameter:6,meltZoneLength:19}],h=e=>d.find((r=>r.name===e)),u=[1.8,.9,7.5],m=[1.25,1,12,16,25,1.41111,1.27,1.5875],p=e=>{let r=0;const t=e.currentWeight-e.spoolWeight;r="custom"!==e.material?t/l(e.material).density:t/e.materialDensity;return{mass:t,volume:r,length:r/Math.PI/Math.pow(e.filamentDiameter/2,2),percent:t/e.netWeight*100}}},8375:function(e,r,t){var n=t(4184),s=t.n(n),a=t(7294),i=t(4289),l=t(8146),o=t(3735),c=t(6792),d=t(1068),h=t(1485),u=t(9602),m=t(4680),p=t(5893);const g=(0,u.Z)("h4");g.displayName="DivStyledAsH4";const x=(0,m.Z)("alert-heading",{Component:g}),b=(0,m.Z)("alert-link",{Component:o.Z}),y={variant:"primary",show:!0,transition:d.Z,closeLabel:"Close alert"},f=a.forwardRef(((e,r)=>{const{bsPrefix:t,show:n,closeLabel:a,closeVariant:o,className:u,children:m,variant:g,onClose:x,dismissible:b,transition:y,...f}=(0,i.Ch)(e,{show:"onClose"}),j=(0,c.vE)(t,"alert"),v=(0,l.Z)((e=>{x&&x(!1,e)})),Z=!0===y?d.Z:y,C=(0,p.jsxs)("div",{role:"alert",...Z?void 0:f,ref:r,className:s()(u,j,g&&`${j}-${g}`,b&&`${j}-dismissible`),children:[b&&(0,p.jsx)(h.Z,{onClick:v,"aria-label":a,variant:o}),m]});return Z?(0,p.jsx)(Z,{unmountOnExit:!0,...f,ref:void 0,in:n,children:C}):n?C:null}));f.displayName="Alert",f.defaultProps=y,r.Z=Object.assign(f,{Link:b,Heading:x})},6025:function(e,r,t){t.d(r,{Z:function(){return w}});var n=t(4184),s=t.n(n),a=t(7294),i=t(6792),l=t(4680),o=t(9602),c=t(5893);const d=a.forwardRef((({bsPrefix:e,className:r,variant:t,as:n="img",...a},l)=>{const o=(0,i.vE)(e,"card-img");return(0,c.jsx)(n,{ref:l,className:s()(t?`${o}-${t}`:o,r),...a})}));d.displayName="CardImg";var h=d,u=t(9059);const m=a.forwardRef((({bsPrefix:e,className:r,as:t="div",...n},l)=>{const o=(0,i.vE)(e,"card-header"),d=(0,a.useMemo)((()=>({cardHeaderBsPrefix:o})),[o]);return(0,c.jsx)(u.Z.Provider,{value:d,children:(0,c.jsx)(t,{ref:l,...n,className:s()(r,o)})})}));m.displayName="CardHeader";var p=m;const g=(0,o.Z)("h5"),x=(0,o.Z)("h6"),b=(0,l.Z)("card-body"),y=(0,l.Z)("card-title",{Component:g}),f=(0,l.Z)("card-subtitle",{Component:x}),j=(0,l.Z)("card-link",{Component:"a"}),v=(0,l.Z)("card-text",{Component:"p"}),Z=(0,l.Z)("card-footer"),C=(0,l.Z)("card-img-overlay"),P=a.forwardRef((({bsPrefix:e,className:r,bg:t,text:n,border:a,body:l,children:o,as:d="div",...h},u)=>{const m=(0,i.vE)(e,"card");return(0,c.jsx)(d,{ref:u,...h,className:s()(r,m,t&&`bg-${t}`,n&&`text-${n}`,a&&`border-${a}`),children:l?(0,c.jsx)(b,{children:o}):o})}));P.displayName="Card",P.defaultProps={body:!1};var w=Object.assign(P,{Img:h,Title:y,Subtitle:f,Body:b,Link:j,Text:v,Header:p,Footer:Z,ImgOverlay:C})},5147:function(e,r,t){var n=t(4184),s=t.n(n),a=t(7294),i=t(6792),l=t(5893);const o=a.forwardRef((({bsPrefix:e,className:r,striped:t,bordered:n,borderless:a,hover:o,size:c,variant:d,responsive:h,...u},m)=>{const p=(0,i.vE)(e,"table"),g=s()(r,p,d&&`${p}-${d}`,c&&`${p}-${c}`,t&&`${p}-${"string"==typeof t?`striped-${t}`:"striped"}`,n&&`${p}-bordered`,a&&`${p}-borderless`,o&&`${p}-hover`),x=(0,l.jsx)("table",{...u,className:g,ref:m});if(h){let e=`${p}-responsive`;return"string"==typeof h&&(e=`${e}-${h}`),(0,l.jsx)("div",{className:e,children:x})}return x}));r.Z=o}}]);