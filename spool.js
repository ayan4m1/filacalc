"use strict";(self.webpackChunkfilacalc=self.webpackChunkfilacalc||[]).push([[614],{49306:function(e,n,t){t.d(n,{Z:function(){return c}});var r=t(45697),a=t.n(r),s=t(86025),i=t(34051),l=t(31555),o=t(85893);function c(e){var n=e.children,t=e.results,r=e.title,a=void 0===r?"Results":r;return(0,o.jsxs)(s.Z,{body:!0,className:"my-4",children:[(0,o.jsx)(s.Z.Title,{children:a}),t.map((function(e,r){return(0,o.jsxs)(i.Z,{className:Boolean(n)&&r===t.length-1?"mb-4":null,children:[(0,o.jsx)(l.Z,{xs:2,children:(0,o.jsx)("strong",{children:e.label})}),(0,o.jsx)(l.Z,{xs:10,children:e.content})]},e.label)})),n]})}c.propTypes={children:a().node,results:a().arrayOf(a().shape({label:a().string.isRequired,content:a().oneOfType([a().node,a().string]).isRequired})).isRequired,title:a().string}},83395:function(e,n,t){t.r(n),t.d(n,{default:function(){return u}});var r=t(94649),a=t(67294),s=t(23314),i=t(82747),l=t(88375),o=t(64593),c=t(49306),d=t(48903),m=t(85893);function u(){var e=(0,r.TA)({initialValues:{brand:null,material:null,diameter:1.75,netWeight:1e3,currentWeight:0,customSpoolMass:0,customMaterialDensity:0}}),n=e.values,t=e.handleChange,u=e.setFieldValue,h=(0,a.useCallback)((function(e){return u("brand",e)}),[u]),b=(0,a.useCallback)((function(e){return u("material",e)}),[u]),f=0,x=0,Z=0,j=0,g=!1;if((n.brand||n.customSpoolMass)&&(n.material||n.customMaterialDensity)){var p="custom"!==n.brand?(0,d.w5)(n.brand).mass:n.customSpoolMass,y="custom"!==n.material?(0,d.Ut)(n.material).density:n.customMaterialDensity;0===(f=Math.max(0,n.currentWeight-p))&&(g=!0),j=(Z=f/y)/(Math.PI*Math.pow(n.diameter/2,2)),n.netWeight>0&&(x=f/n.netWeight*100)}var v="Select One",C="Select One";return n.brand&&(v="custom"===n.brand?"Custom":n.brand),n.material&&(C="custom"===n.material?"Custom":n.material),(0,m.jsxs)(a.Fragment,{children:[(0,m.jsx)(o.q,{title:"Spool Usage"}),(0,m.jsx)("h1",{children:"Spool Usage"}),(0,m.jsxs)(s.Z,{children:[(0,m.jsxs)(s.Z.Group,{children:[(0,m.jsx)(s.Z.Label,{children:"Brand"}),(0,m.jsxs)(i.Z,{onSelect:h,children:[(0,m.jsx)(i.Z.Toggle,{variant:"primary",children:v}),(0,m.jsxs)(i.Z.Menu,{children:[d.ZM.map((function(e){return(0,m.jsx)(i.Z.Item,{eventKey:e.brand,children:e.brand},e.brand)})),(0,m.jsx)(i.Z.Item,{eventKey:"custom",children:"Custom"})]})]})]}),"custom"===n.brand&&(0,m.jsxs)(s.Z.Group,{children:[(0,m.jsx)(s.Z.Label,{children:"Custom Spool Mass (g)"}),(0,m.jsx)(s.Z.Control,{type:"number",name:"customSpoolMass",value:n.customSpoolMass,onChange:t})]}),(0,m.jsxs)(s.Z.Group,{children:[(0,m.jsx)(s.Z.Label,{children:"Material"}),(0,m.jsxs)(i.Z,{onSelect:b,children:[(0,m.jsx)(i.Z.Toggle,{variant:"primary",children:C}),(0,m.jsxs)(i.Z.Menu,{children:[d.NC.map((function(e){return(0,m.jsx)(i.Z.Item,{eventKey:e.name,children:e.name},e.name)})),(0,m.jsx)(i.Z.Item,{eventKey:"custom",children:"Custom"})]})]})]}),"custom"===n.material&&(0,m.jsxs)(s.Z.Group,{children:[(0,m.jsxs)(s.Z.Label,{children:["Custom Material Density (g/cm",(0,m.jsx)("sup",{children:"3"}),")"]}),(0,m.jsx)(s.Z.Control,{type:"number",name:"customMaterialDensity",value:n.customMaterialDensity,onChange:t})]}),(0,m.jsxs)(s.Z.Group,{children:[(0,m.jsx)(s.Z.Label,{children:"Filament Diameter (mm)"}),(0,m.jsx)(s.Z.Control,{type:"number",name:"diameter",onChange:t,value:n.diameter})]}),(0,m.jsxs)(s.Z.Group,{children:[(0,m.jsx)(s.Z.Label,{children:"Current Weight (g)"}),(0,m.jsx)(s.Z.Control,{type:"number",name:"currentWeight",onChange:t,value:n.currentWeight})]}),(0,m.jsxs)(s.Z.Group,{children:[(0,m.jsx)(s.Z.Label,{children:"Net Weight (g)"}),(0,m.jsx)(s.Z.Control,{type:"number",name:"netWeight",onChange:t,value:n.netWeight})]})]}),g&&(0,m.jsx)(l.Z,{className:"mt-4",variant:"warning",children:"Spool weight looks incorrect, it should be empty."}),f>0&&(0,m.jsx)(c.Z,{title:"Remaining Filament",results:[{label:"Mass",content:(0,m.jsxs)("span",{children:[Math.round(f)," g"]})},{label:"Percentage",content:(0,m.jsxs)("span",{children:[Math.round(x)," %"]})},{label:"Length",content:(0,m.jsxs)("span",{children:[j.toFixed(2)," m"]})},{label:"Volume",content:(0,m.jsxs)("span",{children:[Z.toFixed(2)," cm",(0,m.jsx)("sup",{children:"3"})]})}]})]})}},48903:function(e,n,t){t.d(n,{AF:function(){return d},Kl:function(){return h},NC:function(){return l},OK:function(){return c},Q:function(){return u},Ut:function(){return o},ZM:function(){return s},bA:function(){return m},j1:function(){return a},lO:function(){return b},w5:function(){return i}});var r=t(71002),a=function(e){if("object"===("undefined"==typeof window?"undefined":(0,r.Z)(window))){var n=e.toString(),t=new Blob(["(".concat(n,")()")]);return new Worker(URL.createObjectURL(t))}},s=[{brand:"3D Solutech",mass:173},{brand:"Amazon Basics",mass:248},{brand:"Amolen",mass:190},{brand:"Atomic Filament",mass:306},{brand:"Colorfabb",mass:236},{brand:"eSun",mass:224},{brand:"Inland",mass:225},{brand:"Hatchbox",mass:225},{brand:"Overture",mass:237},{brand:"PolyMaker",mass:220},{brand:"Prusament",mass:201},{brand:"ProtoPasta",mass:70},{brand:"StrongHero3D",mass:151},{brand:"SunLu",mass:133},{brand:"ZYLtech",mass:179}],i=function(e){return s.find((function(n){return n.brand===e}))},l=[{name:"PLA",density:1.24},{name:"ABS",density:1.04},{name:"PETG",density:1.27},{name:"Nylon",density:1.52},{name:"TPU",density:1.21},{name:"PC",density:1.3},{name:"CF",density:1.3},{name:"HIPS",density:1.03},{name:"PVA",density:1.23},{name:"ASA",density:1.05},{name:"PP",density:.9},{name:"POM",density:1.4},{name:"PMMA",density:1.18}],o=function(e){return l.find((function(n){return n.name===e}))},c=[{name:"Mk8",diameter:2.4,length:13},{name:"Mk10",diameter:4,length:13},{name:"Volcano 1.75mm",diameter:2,length:21},{name:"Volcano 3mm",diameter:3.2,length:21}],d=function(e){return c.find((function(n){return n.name===e}))},m=[{name:"Ender 3",meltZoneDiameter:2,meltZoneLength:25},{name:"Volcano",meltZoneDiameter:6,meltZoneLength:19}],u=function(e){return m.find((function(n){return n.name===e}))},h=[1.8,.9,7.5],b=[1.25,1,12,16,25,1.41111,1.27,1.5875]},88375:function(e,n,t){var r=t(94184),a=t.n(r),s=t(67294),i=t(14289),l=t(78146),o=t(23735),c=t(76792),d=t(41068),m=t(41485),u=t(39602),h=t(44680),b=t(85893);const f=(0,u.Z)("h4");f.displayName="DivStyledAsH4";const x=(0,h.Z)("alert-heading",{Component:f}),Z=(0,h.Z)("alert-link",{Component:o.Z}),j={variant:"primary",show:!0,transition:d.Z,closeLabel:"Close alert"},g=s.forwardRef(((e,n)=>{const{bsPrefix:t,show:r,closeLabel:s,closeVariant:o,className:u,children:h,variant:f,onClose:x,dismissible:Z,transition:j,...g}=(0,i.Ch)(e,{show:"onClose"}),p=(0,c.vE)(t,"alert"),y=(0,l.Z)((e=>{x&&x(!1,e)})),v=!0===j?d.Z:j,C=(0,b.jsxs)("div",{role:"alert",...v?void 0:g,ref:n,className:a()(u,p,f&&`${p}-${f}`,Z&&`${p}-dismissible`),children:[Z&&(0,b.jsx)(m.Z,{onClick:y,"aria-label":s,variant:o}),h]});return v?(0,b.jsx)(v,{unmountOnExit:!0,...g,ref:void 0,in:r,children:C}):r?C:null}));g.displayName="Alert",g.defaultProps=j,n.Z=Object.assign(g,{Link:Z,Heading:x})},86025:function(e,n,t){t.d(n,{Z:function(){return P}});var r=t(94184),a=t.n(r),s=t(67294),i=t(76792),l=t(44680),o=t(39602),c=t(85893);const d=s.forwardRef((({bsPrefix:e,className:n,variant:t,as:r="img",...s},l)=>{const o=(0,i.vE)(e,"card-img");return(0,c.jsx)(r,{ref:l,className:a()(t?`${o}-${t}`:o,n),...s})}));d.displayName="CardImg";var m=d,u=t(49059);const h=s.forwardRef((({bsPrefix:e,className:n,as:t="div",...r},l)=>{const o=(0,i.vE)(e,"card-header"),d=(0,s.useMemo)((()=>({cardHeaderBsPrefix:o})),[o]);return(0,c.jsx)(u.Z.Provider,{value:d,children:(0,c.jsx)(t,{ref:l,...r,className:a()(n,o)})})}));h.displayName="CardHeader";var b=h;const f=(0,o.Z)("h5"),x=(0,o.Z)("h6"),Z=(0,l.Z)("card-body"),j=(0,l.Z)("card-title",{Component:f}),g=(0,l.Z)("card-subtitle",{Component:x}),p=(0,l.Z)("card-link",{Component:"a"}),y=(0,l.Z)("card-text",{Component:"p"}),v=(0,l.Z)("card-footer"),C=(0,l.Z)("card-img-overlay"),M=s.forwardRef((({bsPrefix:e,className:n,bg:t,text:r,border:s,body:l,children:o,as:d="div",...m},u)=>{const h=(0,i.vE)(e,"card");return(0,c.jsx)(d,{ref:u,...m,className:a()(n,h,t&&`bg-${t}`,r&&`text-${r}`,s&&`border-${s}`),children:l?(0,c.jsx)(Z,{children:o}):o})}));M.displayName="Card",M.defaultProps={body:!1};var P=Object.assign(M,{Img:m,Title:j,Subtitle:g,Body:Z,Link:p,Text:y,Header:b,Footer:v,ImgOverlay:C})}}]);