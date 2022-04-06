"use strict";(self.webpackChunkfilacalc=self.webpackChunkfilacalc||[]).push([[239],{13433:function(e,n,t){t.r(n),t.d(n,{default:function(){return c}});var r=t(94649),o=t(67294),a=t(23314),m=t(82747),i=t(77104),l=t(64593),s=t(48903),u=t(85893);function c(){var e=(0,r.TA)({initialValues:{nozzle:null,hotend:null,nozzleDiameter:.4,filamentDiameter:1.75,customNozzleDiameter:0,customNozzleLength:0,customMeltZoneDiameter:0,customMeltZoneLength:0,layerHeight:.2,extrusionWidth:.3,printSpeed:50},onSubmit:(0,o.useCallback)((function(e){var n="custom"!==e.nozzle?(0,s.AF)(e.nozzle):{diameter:e.customNozzleDiameter,length:e.customNozzleLength},t="custom"!==e.hotend?(0,s.Q)(e.hotend):{meltZoneDiameter:e.customMeltZoneDiameter,meltZoneLength:e.customMeltZoneLength},r=Math.PI*Math.pow(n.diameter/2,2)*n.length,o=Math.PI*Math.pow(t.meltZoneDiameter/2,2)*t.meltZoneLength,a=r+o,m=e.extrusionWidth*e.layerHeight*e.printSpeed;console.dir("".concat(r.toFixed(2)," mm^3 + ").concat(o.toFixed(2)," mm^3 = ").concat(a.toFixed(2)," mm^3")),console.dir("".concat(m," mm^3/s"))}),[])}),n=e.values,t=e.handleChange,c=e.handleSubmit,d=e.setFieldValue,h=(0,o.useCallback)((function(e){return d("nozzle",e)}),[d]),Z=(0,o.useCallback)((function(e){return d("hotend",e)}),[d]),x="Select One",j="Select One";return n.hotend&&(x="custom"===n.hotend?"Custom":n.hotend),n.nozzle&&(j="custom"===n.nozzle?"Custom":n.nozzle),(0,u.jsxs)(o.Fragment,{children:[(0,u.jsx)(l.q,{title:"Volumetric Flow Optimization"}),(0,u.jsx)("h1",{children:"Volumetric Flow Optimization"}),(0,u.jsxs)(a.Z,{onSubmit:c,children:[(0,u.jsx)("h3",{children:"Hotend"}),(0,u.jsxs)(a.Z.Group,{children:[(0,u.jsx)(a.Z.Label,{children:"Type"}),(0,u.jsxs)(m.Z,{onSelect:Z,children:[(0,u.jsx)(m.Z.Toggle,{variant:"primary",children:x}),(0,u.jsxs)(m.Z.Menu,{children:[s.bA.map((function(e){return(0,u.jsx)(m.Z.Item,{eventKey:e.name,children:e.name},e.name)})),(0,u.jsx)(m.Z.Item,{eventKey:"custom",value:"custom",children:"Custom"})]})]})]}),"custom"===n.hotend&&(0,u.jsxs)(o.Fragment,{children:[(0,u.jsxs)(a.Z.Group,{children:[(0,u.jsx)(a.Z.Label,{children:"Length (mm)"}),(0,u.jsx)(a.Z.Control,{type:"number",name:"customMeltZoneLength",value:n.customMeltZoneLength,onChange:t})]}),(0,u.jsxs)(a.Z.Group,{children:[(0,u.jsx)(a.Z.Label,{children:"Diameter (mm)"}),(0,u.jsx)(a.Z.Control,{type:"number",name:"customMeltZoneDiameter",value:n.customMeltZoneDiameter,onChange:t})]})]}),(0,u.jsx)("h3",{children:"Nozzle"}),(0,u.jsxs)(a.Z.Group,{children:[(0,u.jsx)(a.Z.Label,{children:"Type"}),(0,u.jsxs)(m.Z,{onSelect:h,children:[(0,u.jsx)(m.Z.Toggle,{variant:"primary",children:j}),(0,u.jsxs)(m.Z.Menu,{children:[s.OK.map((function(e){return(0,u.jsx)(m.Z.Item,{eventKey:e.name,children:e.name},e.name)})),(0,u.jsx)(m.Z.Item,{eventKey:"custom",value:"custom",children:"Custom"})]})]})]}),"custom"===n.nozzle&&(0,u.jsxs)(o.Fragment,{children:[(0,u.jsxs)(a.Z.Group,{children:[(0,u.jsx)(a.Z.Label,{children:"Interior Diameter (mm)"}),(0,u.jsx)(a.Z.Control,{type:"number",name:"customNozzleDiameter",value:n.customNozzleDiameter,onChange:t})]}),(0,u.jsxs)(a.Z.Group,{children:[(0,u.jsx)(a.Z.Label,{children:"Interior Length (mm)"}),(0,u.jsx)(a.Z.Control,{type:"number",name:"customNozzleLength",value:n.customNozzleLength,onChange:t})]})]}),(0,u.jsxs)(a.Z.Group,{children:[(0,u.jsx)(a.Z.Label,{children:"Diameter (mm)"}),(0,u.jsx)(a.Z.Control,{type:"number",name:"nozzleDiameter",value:n.nozzleDiameter,onChange:t})]}),(0,u.jsx)("h3",{children:"Slicing Parameters"}),(0,u.jsxs)(a.Z.Group,{children:[(0,u.jsx)(a.Z.Label,{children:"Layer Height (mm)"}),(0,u.jsx)(a.Z.Control,{type:"number",name:"layerHeight",value:n.layerHeight,onChange:t})]}),(0,u.jsxs)(a.Z.Group,{children:[(0,u.jsx)(a.Z.Label,{children:"Extrusion Width (mm)"}),(0,u.jsx)(a.Z.Control,{type:"number",name:"extrusionWidth",value:n.extrusionWidth,onChange:t})]}),(0,u.jsxs)(a.Z.Group,{children:[(0,u.jsx)(a.Z.Label,{children:"Print Speed (mm/s)"}),(0,u.jsx)(a.Z.Control,{type:"number",name:"printSpeed",value:n.printSpeed,onChange:t})]}),(0,u.jsx)(a.Z.Group,{children:(0,u.jsx)(i.Z,{variant:"primary",type:"submit",className:"mt-4",children:"Calculate"})})]})]})}},48903:function(e,n,t){t.d(n,{AF:function(){return u},Kl:function(){return h},NC:function(){return i},OK:function(){return s},Q:function(){return d},Ut:function(){return l},ZM:function(){return a},bA:function(){return c},j1:function(){return o},lO:function(){return Z},w5:function(){return m}});var r=t(71002),o=function(e){if("object"===("undefined"==typeof window?"undefined":(0,r.Z)(window))){var n=e.toString(),t=new Blob(["(".concat(n,")()")]);return new Worker(URL.createObjectURL(t))}},a=[{brand:"3D Solutech",mass:173},{brand:"Amazon Basics",mass:248},{brand:"Amolen",mass:190},{brand:"Atomic Filament",mass:306},{brand:"Colorfabb",mass:236},{brand:"eSun",mass:224},{brand:"Inland",mass:225},{brand:"Hatchbox",mass:225},{brand:"Overture",mass:237},{brand:"PolyMaker",mass:220},{brand:"Prusament",mass:201},{brand:"ProtoPasta",mass:70},{brand:"StrongHero3D",mass:151},{brand:"SunLu",mass:133},{brand:"ZYLtech",mass:179}],m=function(e){return a.find((function(n){return n.brand===e}))},i=[{name:"PLA",density:1.24},{name:"ABS",density:1.04},{name:"PETG",density:1.27},{name:"Nylon",density:1.52},{name:"TPU",density:1.21},{name:"PC",density:1.3},{name:"CF",density:1.3},{name:"HIPS",density:1.03},{name:"PVA",density:1.23},{name:"ASA",density:1.05},{name:"PP",density:.9},{name:"POM",density:1.4},{name:"PMMA",density:1.18}],l=function(e){return i.find((function(n){return n.name===e}))},s=[{name:"Mk8",diameter:2.4,length:13},{name:"Mk10",diameter:4,length:13},{name:"Volcano 1.75mm",diameter:2,length:21},{name:"Volcano 3mm",diameter:3.2,length:21}],u=function(e){return s.find((function(n){return n.name===e}))},c=[{name:"Ender 3",meltZoneDiameter:2,meltZoneLength:25},{name:"Volcano",meltZoneDiameter:6,meltZoneLength:19}],d=function(e){return c.find((function(n){return n.name===e}))},h=[1.8,.9,7.5],Z=[1.25,1,12,16,25,1.41111,1.27,1.5875]}}]);