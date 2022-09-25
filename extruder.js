"use strict";(self.webpackChunkfilacalc=self.webpackChunkfilacalc||[]).push([[988],{6377:function(e,r,n){n.d(r,{y:function(){return m}});var s=n(982),t=n(5697),a=n.n(t),i=n(7294),l=n(8375),o=n(6025),d=n(4051),u=n(1555),c=n(4593),h=n(5893);const m=e=>{let{children:r}=e;return(0,h.jsx)(i.Fragment,{children:r})},x=e=>{let{children:r}=e;return Boolean(r)&&(0,h.jsx)("div",{className:"my-4",children:r})},f=e=>{let{title:r,icon:n,children:t}=e;return(0,h.jsxs)(i.Fragment,{children:[Boolean(r)&&(0,h.jsx)(c.q,{title:r}),(0,h.jsxs)("h1",{children:[Boolean(n)&&(0,h.jsx)(s.G,{icon:n,size:"2x"}),Boolean(r)&&` ${r}`]}),t]})},p=e=>{let{errors:r}=e;return null!=r&&r.length?(0,h.jsx)(l.Z,{className:"my-4",variant:"warning",children:(0,h.jsx)("ul",{className:"mb-0",children:r.map((e=>(0,h.jsx)("li",{children:e},e)))})}):null},g=e=>{let{title:r="Results",results:n,children:s}=e;return s||null!=n&&n.length?(0,h.jsxs)(o.Z,{body:!0,className:"my-4",children:[(0,h.jsx)(o.Z.Title,{children:r}),Boolean(null==n?void 0:n.length)&&n.map(((e,r)=>(0,h.jsxs)(d.Z,{className:Boolean(s)&&r===n.length-1?"mb-4":null,children:[(0,h.jsx)(u.Z,{sm:4,xs:2,children:(0,h.jsx)("strong",{children:e.label})}),(0,h.jsx)(u.Z,{sm:8,xs:10,children:e.content})]},e.label))),s]}):null};m.propTypes={children:a().node.isRequired},x.propTypes={children:a().node},f.propTypes={children:a().node,icon:a().oneOfType([a().string,a().object]),title:a().string},p.propTypes={errors:a().arrayOf(a().string.isRequired)},g.propTypes={title:a().string,results:a().oneOfType([a().arrayOf(a().object.isRequired),a().object.isRequired]),children:a().node},m.Errors=p,m.Heading=f,m.Results=g,m.Description=x},5226:function(e,r,n){n.r(r),n.d(r,{default:function(){return v}});var s=n(7294),t=n(4184),a=n.n(t),i=(n(2473),n(8523)),l=n(5115),o=n(6792),d=n(8146),u=n(3716),c=n(7126),h=n(5893);const m=s.forwardRef((({bsPrefix:e,active:r,disabled:n,eventKey:s,className:t,variant:i,action:l,as:m,...x},f)=>{e=(0,o.vE)(e,"list-group-item");const[p,g]=(0,u.v)({key:(0,c.h)(s,x.href),active:r,...x}),j=(0,d.Z)((e=>{if(n)return e.preventDefault(),void e.stopPropagation();p.onClick(e)}));n&&void 0===x.tabIndex&&(x.tabIndex=-1,x["aria-disabled"]=!0);const b=m||(l?x.href?"a":"button":"div");return(0,h.jsx)(b,{ref:f,...x,...p,onClick:j,className:a()(t,e,g.isActive&&"active",n&&"disabled",i&&`${e}-${i}`,l&&`${e}-action`)})}));m.displayName="ListGroupItem";var x=m;const f=s.forwardRef(((e,r)=>{const{className:n,bsPrefix:s,variant:t,horizontal:d,numbered:u,as:c="div",...m}=(0,i.Ch)(e,{activeKey:"onSelect"}),x=(0,o.vE)(s,"list-group");let f;return d&&(f=!0===d?"horizontal":`horizontal-${d}`),(0,h.jsx)(l.Z,{ref:r,...m,as:c,className:a()(n,x,t&&`${x}-${t}`,f&&`${x}-${f}`,u&&`${x}-numbered`)})}));f.displayName="ListGroup";var p=Object.assign(f,{Item:x}),g=n(3314),j=n(6377),b=n(882);function v(){const{formik:{handleBlur:e,handleChange:r,values:n},errors:t,results:a}=(0,b.Z)({initialValues:{currentSteps:100,measuredOffset:0,extrusionLength:100,extrusionPadding:20},shouldShow:(0,s.useCallback)(((e,r)=>r.extrusionLength||r.measuredOffset),[]),validate:(0,s.useCallback)((e=>{const r=[];e.currentSteps<=0&&r.push("Current steps must be greater than zero."),e.extrusionLength<=0&&r.push("Extrusion length must be greater than zero.");return e.extrusionLength+e.extrusionPadding-e.measuredOffset<=0&&r.push("Inputs do not make sense."),r}),[]),calculate:(0,s.useCallback)((e=>{const r=e.extrusionLength+e.extrusionPadding-e.measuredOffset;return{stepsPerMm:e.currentSteps*e.extrusionLength/r}}),[])});return(0,h.jsxs)(j.y,{children:[(0,h.jsx)(j.y.Heading,{title:"Extruder Calibration"}),(0,h.jsxs)(j.y.Description,{children:[(0,h.jsx)("p",{children:"Use this calculator to calibrate your extruder steps per mm. This is a value which is either stored in EEPROM on the printer or specified in your G-code."}),(0,h.jsx)("p",{children:"It represents the number of step commands required to make the motor extrude 1mm of filament."}),(0,h.jsx)("p",{children:"If you modify any part of your extruder or are experiencing consistent under/over-extrusion with a clean nozzle, it's wise to re-calibrate this value."}),(0,h.jsxs)(p,{children:[(0,h.jsxs)(x,{children:[(0,h.jsx)("strong",{children:"1."})," Using calipers, measure your filament starting from where it enters the extruder. Measure to"," ",Math.ceil(n.extrusionLength+n.extrusionPadding),"mm and mark the filament there."]}),(0,h.jsxs)(x,{children:[(0,h.jsx)("strong",{children:"2."})," Manually extrude ",n.extrusionLength,"mm."]}),(0,h.jsxs)(x,{children:[(0,h.jsx)("strong",{children:"3."})," Using calipers, measure the distance from where the filament enters the extruder to the marking."]}),(0,h.jsxs)(x,{children:[(0,h.jsx)("strong",{children:"4."})," Enter the caliper reading into the final form field."]})]})]}),(0,h.jsxs)(g.Z,{children:[(0,h.jsxs)(g.Z.Group,{children:[(0,h.jsx)(g.Z.Label,{children:"Current Steps per mm"}),(0,h.jsx)(g.Z.Control,{min:"0",name:"currentSteps",onBlur:e,onChange:r,type:"number",value:n.currentSteps}),(0,h.jsx)(g.Z.Text,{className:"text-muted",children:"To find your current steps per mm, look in one of two places: your printer configuration menus or your slicer configuration. You should be able to find the extruder steps per mm that you are currently using in one of these places. If it is present in both, the value from your slicer takes precedence."})]}),(0,h.jsxs)(g.Z.Group,{children:[(0,h.jsx)(g.Z.Label,{children:"Extrusion Length (mm)"}),(0,h.jsx)(g.Z.Control,{min:"0",name:"extrusionLength",onBlur:e,onChange:r,type:"number",value:n.extrusionLength}),(0,h.jsx)(g.Z.Text,{className:"text-muted",children:"An extrusion length of 100mm allows for enough error to build up to give us an accurate final value and is recommended. The less filament you extrude, the less accurate your calibration will be."})]}),(0,h.jsxs)(g.Z.Group,{children:[(0,h.jsx)(g.Z.Label,{children:"Extrusion Padding (mm)"}),(0,h.jsx)(g.Z.Control,{min:"0",name:"extrusionPadding",onBlur:e,onChange:r,type:"number",value:n.extrusionPadding}),(0,h.jsx)(g.Z.Text,{className:"text-muted",children:"This is an arbitrary value."})]}),(0,h.jsxs)(g.Z.Group,{children:[(0,h.jsx)(g.Z.Label,{children:"Measured Length Between Extrusion and Marking (mm)"}),(0,h.jsx)(g.Z.Control,{min:"0",name:"measuredOffset",onBlur:e,onChange:r,type:"number",value:n.measuredOffset}),(0,h.jsx)(g.Z.Text,{className:"text-primary",children:"Enter your measurement here after following the steps above."})]})]}),(0,h.jsx)(j.y.Errors,{errors:t}),Boolean(a)&&(0,h.jsx)(j.y.Results,{children:(0,h.jsxs)("p",{children:["The corrected value is"," ",(0,h.jsxs)("strong",{children:[a.stepsPerMm.toFixed(2)," steps/mm."]})]})})]})}},882:function(e,r,n){n.d(r,{Z:function(){return a}});var s=n(8485),t=n(7294);function a(e){let{initialValues:r,calculate:n,shouldShow:a,validate:i}=e;const[l,o]=(0,t.useState)(null),[d,u]=(0,t.useState)([]),c=(0,s.TA)({initialValues:r}),{values:h,touched:m}=c;return(0,t.useEffect)((()=>{if(!a(h,m))return u([]),void o(null);const e=i(h);e.length>0?(u(e),o(null)):(u([]),o(n(h)))}),[h,m,a,i,n,o]),{formik:c,results:l,errors:d}}},8375:function(e,r,n){var s=n(4184),t=n.n(s),a=n(7294),i=n(8523),l=n(8146),o=n(3735),d=n(6792),u=n(1068),c=n(1485),h=n(9602),m=n(4680),x=n(5893);const f=(0,h.Z)("h4");f.displayName="DivStyledAsH4";const p=(0,m.Z)("alert-heading",{Component:f}),g=(0,m.Z)("alert-link",{Component:o.Z}),j={variant:"primary",show:!0,transition:u.Z,closeLabel:"Close alert"},b=a.forwardRef(((e,r)=>{const{bsPrefix:n,show:s,closeLabel:a,closeVariant:o,className:h,children:m,variant:f,onClose:p,dismissible:g,transition:j,...b}=(0,i.Ch)(e,{show:"onClose"}),v=(0,d.vE)(n,"alert"),y=(0,l.Z)((e=>{p&&p(!1,e)})),Z=!0===j?u.Z:j,C=(0,x.jsxs)("div",{role:"alert",...Z?void 0:b,ref:r,className:t()(h,v,f&&`${v}-${f}`,g&&`${v}-dismissible`),children:[g&&(0,x.jsx)(c.Z,{onClick:y,"aria-label":a,variant:o}),m]});return Z?(0,x.jsx)(Z,{unmountOnExit:!0,...b,ref:void 0,in:s,children:C}):s?C:null}));b.displayName="Alert",b.defaultProps=j,r.Z=Object.assign(b,{Link:g,Heading:p})},6025:function(e,r,n){n.d(r,{Z:function(){return k}});var s=n(4184),t=n.n(s),a=n(7294),i=n(6792),l=n(4680),o=n(9602),d=n(5893);const u=a.forwardRef((({bsPrefix:e,className:r,variant:n,as:s="img",...a},l)=>{const o=(0,i.vE)(e,"card-img");return(0,d.jsx)(s,{ref:l,className:t()(n?`${o}-${n}`:o,r),...a})}));u.displayName="CardImg";var c=u,h=n(9059);const m=a.forwardRef((({bsPrefix:e,className:r,as:n="div",...s},l)=>{const o=(0,i.vE)(e,"card-header"),u=(0,a.useMemo)((()=>({cardHeaderBsPrefix:o})),[o]);return(0,d.jsx)(h.Z.Provider,{value:u,children:(0,d.jsx)(n,{ref:l,...s,className:t()(r,o)})})}));m.displayName="CardHeader";var x=m;const f=(0,o.Z)("h5"),p=(0,o.Z)("h6"),g=(0,l.Z)("card-body"),j=(0,l.Z)("card-title",{Component:f}),b=(0,l.Z)("card-subtitle",{Component:p}),v=(0,l.Z)("card-link",{Component:"a"}),y=(0,l.Z)("card-text",{Component:"p"}),Z=(0,l.Z)("card-footer"),C=(0,l.Z)("card-img-overlay"),N=a.forwardRef((({bsPrefix:e,className:r,bg:n,text:s,border:a,body:l,children:o,as:u="div",...c},h)=>{const m=(0,i.vE)(e,"card");return(0,d.jsx)(u,{ref:h,...c,className:t()(r,m,n&&`bg-${n}`,s&&`text-${s}`,a&&`border-${a}`),children:l?(0,d.jsx)(g,{children:o}):o})}));N.displayName="Card",N.defaultProps={body:!1};var k=Object.assign(N,{Img:c,Title:j,Subtitle:b,Body:g,Link:v,Text:y,Header:x,Footer:Z,ImgOverlay:C})}}]);