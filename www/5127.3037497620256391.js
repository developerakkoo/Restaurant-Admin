"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5127],{5127:(S,p,d)=>{d.r(p),d.d(p,{OrdersPageModule:()=>G});var _=d(177),m=d(4341),a=d(4488),h=d(8986),c=d(467),e=d(4438),v=d(4796);function y(n,s){1&n&&(e.j41(0,"ion-text",19)(1,"h1"),e.EFF(2," No Orders Found! "),e.k0s()())}function b(n,s){if(1&n){const t=e.RV6();e.j41(0,"ion-badge",33),e.bIt("click",function(){e.eBV(t);const i=e.XpG().$implicit,o=e.XpG(2);return e.Njj(o.presentActionSheet(i._id))}),e.EFF(1,"Accept Order"),e.k0s()}}function O(n,s){if(1&n&&(e.j41(0,"ion-select-option",36),e.EFF(1),e.k0s()),2&n){const t=s.$implicit;e.Y8G("value",t._id),e.R7$(),e.Lme("",t.firstName," ",t.lastName,"")}}function F(n,s){if(1&n){const t=e.RV6();e.j41(0,"ion-select",34),e.bIt("ionChange",function(i){e.eBV(t);const o=e.XpG().$implicit,l=e.XpG(2);return e.Njj(l.assignDriverEvent(i,o._id))}),e.DNE(1,O,2,3,"ion-select-option",35),e.k0s()}if(2&n){const t=e.XpG(3);e.R7$(),e.Y8G("ngForOf",t.drivers)}}function x(n,s){1&n&&(e.j41(0,"ion-badge",37),e.EFF(1,"New"),e.k0s())}function j(n,s){1&n&&(e.j41(0,"ion-badge",38),e.EFF(1,"Delivered"),e.k0s())}function k(n,s){1&n&&(e.j41(0,"ion-badge",39),e.EFF(1,"Delivery Assigned"),e.k0s())}function D(n,s){if(1&n&&(e.j41(0,"p",41),e.EFF(1),e.k0s()),2&n){const t=e.XpG(2).$implicit;e.R7$(),e.Lme(" ",null==t||null==t.deliveryboyDetails[0]?null:t.deliveryboyDetails[0].firstName," ",null==t||null==t.deliveryboyDetails[0]?null:t.deliveryboyDetails[0].lastName,"")}}function A(n,s){if(1&n&&(e.j41(0,"div"),e.DNE(1,D,2,2,"p",40),e.k0s()),2&n){const t=e.XpG().$implicit;e.R7$(),e.Y8G("ngIf",2===(null==t?null:t.orderStatus))}}function E(n,s){1&n&&(e.j41(0,"ion-badge",42),e.EFF(1,"Rejected"),e.k0s())}function P(n,s){1&n&&(e.j41(0,"ion-badge",43),e.EFF(1,"On the way"),e.k0s())}function I(n,s){if(1&n){const t=e.RV6();e.j41(0,"tr")(1,"th"),e.EFF(2),e.k0s(),e.j41(3,"th"),e.EFF(4),e.nI1(5,"date"),e.k0s(),e.j41(6,"th"),e.EFF(7),e.k0s(),e.j41(8,"th"),e.EFF(9),e.k0s(),e.j41(10,"th"),e.EFF(11),e.nI1(12,"currency"),e.k0s(),e.j41(13,"th")(14,"ion-badge",24),e.bIt("click",function(){const i=e.eBV(t).$implicit,o=e.XpG(2);return e.Njj(o.openDetailsPage(i._id))}),e.EFF(15,"View"),e.k0s(),e.DNE(16,b,2,0,"ion-badge",25)(17,F,2,1,"ion-select",26),e.k0s(),e.j41(18,"th"),e.DNE(19,x,2,0,"ion-badge",27)(20,j,2,0,"ion-badge",28)(21,k,2,0,"ion-badge",29)(22,A,2,1,"div",30)(23,E,2,0,"ion-badge",31)(24,P,2,0,"ion-badge",32),e.k0s()()}if(2&n){const t=s.$implicit;e.R7$(2),e.JRh(t.orderId),e.R7$(2),e.JRh(e.i5U(5,13,t.createdAt,"fullDate")),e.R7$(3),e.JRh(null==t||null==t.user?null:t.user.name),e.R7$(2),e.JRh(null==t||null==t.userAddress?null:t.userAddress.address),e.R7$(2),e.JRh(e.i5U(12,16,null==t||null==t.priceDetails?null:t.priceDetails.totalAmountToPay,"INR")),e.R7$(5),e.Y8G("ngIf",4===(null==t?null:t.orderStatus)),e.R7$(),e.Y8G("ngIf",4===(null==t?null:t.orderStatus)),e.R7$(2),e.Y8G("ngIf",0===(null==t?null:t.orderStatus)),e.R7$(),e.Y8G("ngIf",3===(null==t?null:t.orderStatus)),e.R7$(),e.Y8G("ngIf",2===(null==t?null:t.orderStatus)),e.R7$(),e.Y8G("ngIf",(null==t?null:t.deliveryboyDetails.length)>0),e.R7$(),e.Y8G("ngIf",5===(null==t?null:t.orderStatus)),e.R7$(),e.Y8G("ngIf",4===(null==t?null:t.orderStatus))}}function R(n,s){if(1&n&&(e.j41(0,"div",20)(1,"table",21)(2,"thead")(3,"tr")(4,"th",22),e.EFF(5,"#ID"),e.k0s(),e.j41(6,"th",22),e.EFF(7,"Date"),e.k0s(),e.j41(8,"th",22),e.EFF(9,"Customer name"),e.k0s(),e.j41(10,"th",22),e.EFF(11,"Address"),e.k0s(),e.j41(12,"th",22),e.EFF(13,"Amount"),e.k0s(),e.j41(14,"th",22),e.EFF(15,"Action"),e.k0s(),e.j41(16,"th",22),e.EFF(17,"Status"),e.k0s()()(),e.j41(18,"tbody"),e.DNE(19,I,25,19,"tr",23),e.k0s()()()),2&n){const t=e.XpG();e.R7$(19),e.Y8G("ngForOf",t.orders)}}const C=[{path:"",component:(()=>{var n;class s{constructor(r,i,o,l){this.auth=r,this.router=i,this.actionSheetController=o,this.loadingController=l,this.orders=[],this.drivers=[],this.query="",this.status="",this.startDate="",this.endDate=""}ngOnInit(){}onSearchChange(r){console.log(r.detail.value),this.query=r.detail.value,this.getAllOrders(),this.getAllDeliveryBoys()}ionViewDidEnter(){this.getAllOrders(),this.getAllDeliveryBoys()}filterEvent(r){console.log(r.detail.value),this.status=r.detail.value,this.getAllOrders(),this.getAllDeliveryBoys()}setDateEvent(r,i){console.log(r.detail.value),console.log(i);let o=r.detail.value;"s"===i?(console.log("Set Start Date"),this.startDate=o):"e"===i&&(console.log("Set End Date"),this.endDate=o),this.getAllOrders(),console.log(this.startDate),console.log(this.endDate)}getAllDeliveryBoys(){var r=this;return(0,c.A)(function*(){var i;r.auth.getAllDeliveryBoys(r.query,1,50,"","","").subscribe({next:(i=(0,c.A)(function*(o){console.log(o),r.drivers=o.data.content}),function(l){return i.apply(this,arguments)}),error:function(){var i=(0,c.A)(function*(o){console.log(o.error)});return function(l){return i.apply(this,arguments)}}()})})()}getAllOrders(){var r=this;return(0,c.A)(function*(){var i;r.auth.getAllOrders(r.query,1,50,r.status,"",r.startDate,r.endDate).subscribe({next:(i=(0,c.A)(function*(o){console.log(o),r.orders=o.data.content}),function(l){return i.apply(this,arguments)}),error:function(){var i=(0,c.A)(function*(o){console.log(o.error)});return function(l){return i.apply(this,arguments)}}()})})()}acceptOrder(r){var o,i=this;this.auth.AcceptRejectOrder(r,4).subscribe({next:(o=(0,c.A)(function*(l){console.log(l),i.getAllOrders()}),function(u){return o.apply(this,arguments)}),error:function(){var o=(0,c.A)(function*(l){console.log(l.error)});return function(u){return o.apply(this,arguments)}}()})}rejectOrder(r){var o,i=this;this.auth.AcceptRejectOrder(r,5).subscribe({next:(o=(0,c.A)(function*(l){console.log(l),i.getAllOrders()}),function(u){return o.apply(this,arguments)}),error:function(){var o=(0,c.A)(function*(l){console.log(l.error)});return function(u){return o.apply(this,arguments)}}()})}presentActionSheet(r){var i=this;return(0,c.A)(function*(){yield(yield i.actionSheetController.create({header:"Albums",buttons:[{text:"Accept",role:"",icon:"checkmark",handler:()=>{console.log("Delete clicked"),i.acceptOrder(r)}},{text:"Reject",icon:"trash",handler:()=>{console.log("Share clicked"),i.rejectOrder(r)}},{text:"Cancel",icon:"close",role:"cancel",handler:()=>{console.log("Cancel clicked")}}]})).present()})()}viewNotifications(){}assignDriverEvent(r,i){var o=this;console.log(r.detail.value),console.log(i);let l=r.detail.value;var u;console.log(l.length),1==l.length?this.auth.assignDeliveryBoy(i,r.detail.value).subscribe({next:(u=(0,c.A)(function*(g){console.log(g),o.getAllOrders(),o.getAllDeliveryBoys()}),function(f){return u.apply(this,arguments)}),error:function(){var u=(0,c.A)(function*(g){console.log(g.error)});return function(f){return u.apply(this,arguments)}}()}):this.auth.assignMultipleDeliveryBoy(i,r.detail.value).subscribe({next:function(){var u=(0,c.A)(function*(g){console.log(g),o.getAllOrders(),o.getAllDeliveryBoys()});return function(f){return u.apply(this,arguments)}}(),error:function(){var u=(0,c.A)(function*(g){console.log(g.error)});return function(f){return u.apply(this,arguments)}}()})}downloadExcelSheet(){}openDetailsPage(r){console.log(r),this.router.navigate(["folder","orders","view",r])}}return(n=s).\u0275fac=function(r){return new(r||n)(e.rXU(v.u),e.rXU(h.Ix),e.rXU(a.GD),e.rXU(a.Xi))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-orders"]],decls:33,vars:5,consts:[[1,"ion-no-border",3,"translucent"],["color","primary","slot","end","fill","clear",3,"click"],["slot","icon-only","name","notifications-circle-outline"],["slot","icon-only","name","chatbox-ellipses-outline"],["mode","ios","placeholder","Search here","inputmode","decimal","type","decimal","showCancelButton","always",3,"ionChange","debounce"],[3,"fullscreen"],["color","primary","class","ion-text-center",4,"ngIf"],[1,"ion-padding"],["value","All","fill","outline","interface","popover","placeholder","Select Status",2,"width","200px","--height","40px",3,"ionChange"],["value",""],["value","0"],["value","5"],["value","2"],["value","4"],["value","3"],["type","date","label","Start Date","labelPlacement","stacked","fill","outline","placeholder","Awesome Input",1,"ion-margin-start",2,"width","200px","--height","40px",3,"ionChange"],["type","date","label","End Date","labelPlacement","stacked","fill","outline","placeholder","Awesome Input",1,"ion-margin-start",2,"width","200px","--height","40px",3,"ionChange"],["expand","block",1,"ion-margin-start",3,"click"],["class","table-responsive",4,"ngIf"],["color","primary",1,"ion-text-center"],[1,"table-responsive"],[1,"table"],["scope","col"],[4,"ngFor","ngForOf"],["color","danger","mode","ios",1,"ion-padding",3,"click"],["class","ion-padding","color","success","mode","ios",3,"click",4,"ngIf"],["fill","outline","multiple","true","placeholder","Select Driver",3,"ionChange",4,"ngIf"],["class","ion-padding","color","primary","mode","ios",4,"ngIf"],["class","ion-padding","color","success","mode","ios",4,"ngIf"],["class","ion-padding","color","tertiary","mode","ios",4,"ngIf"],[4,"ngIf"],["class","ion-padding","color","danger","mode","ios",4,"ngIf"],["class","ion-padding","color","warning","mode","ios",4,"ngIf"],["color","success","mode","ios",1,"ion-padding",3,"click"],["fill","outline","multiple","true","placeholder","Select Driver",3,"ionChange"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["color","primary","mode","ios",1,"ion-padding"],["color","success","mode","ios",1,"ion-padding"],["color","tertiary","mode","ios",1,"ion-padding"],["style","font-size: 14px; text-align: center; text-decoration: underline;",4,"ngIf"],[2,"font-size","14px","text-align","center","text-decoration","underline"],["color","danger","mode","ios",1,"ion-padding"],["color","warning","mode","ios",1,"ion-padding"]],template:function(r,i){1&r&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Orders"),e.k0s(),e.j41(4,"ion-button",1),e.bIt("click",function(){return i.viewNotifications()}),e.nrm(5,"ion-icon",2),e.k0s(),e.j41(6,"ion-button",1),e.bIt("click",function(){return i.viewNotifications()}),e.nrm(7,"ion-icon",3),e.k0s()(),e.j41(8,"ion-searchbar",4),e.bIt("ionChange",function(l){return i.onSearchChange(l)}),e.k0s()(),e.j41(9,"ion-content",5),e.DNE(10,y,3,0,"ion-text",6),e.j41(11,"ion-list",7)(12,"ion-list-header")(13,"ion-label"),e.EFF(14,"Orders Below"),e.k0s(),e.j41(15,"ion-select",8),e.bIt("ionChange",function(l){return i.filterEvent(l)}),e.j41(16,"ion-select-option",9),e.EFF(17,"All"),e.k0s(),e.j41(18,"ion-select-option",10),e.EFF(19,"New Order"),e.k0s(),e.j41(20,"ion-select-option",11),e.EFF(21,"Rejected"),e.k0s(),e.j41(22,"ion-select-option",12),e.EFF(23,"Delivery Boy Assigned"),e.k0s(),e.j41(24,"ion-select-option",13),e.EFF(25,"On the Way"),e.k0s(),e.j41(26,"ion-select-option",14),e.EFF(27,"Delivered"),e.k0s()(),e.j41(28,"ion-input",15),e.bIt("ionChange",function(l){return i.setDateEvent(l,"s")}),e.k0s(),e.j41(29,"ion-input",16),e.bIt("ionChange",function(l){return i.setDateEvent(l,"e")}),e.k0s(),e.j41(30,"ion-button",17),e.bIt("click",function(){return i.downloadExcelSheet()}),e.EFF(31," Export "),e.k0s()()(),e.DNE(32,R,20,1,"div",18),e.k0s()),2&r&&(e.Y8G("translucent",!0),e.R7$(8),e.Y8G("debounce",250),e.R7$(),e.Y8G("fullscreen",!1),e.R7$(),e.Y8G("ngIf",0==i.orders.length),e.R7$(22),e.Y8G("ngIf",i.orders.length>0))},dependencies:[_.Sq,_.bT,a.In,a.Jm,a.W9,a.eU,a.iq,a.$w,a.he,a.nf,a.AF,a.S1,a.Nm,a.Ip,a.IO,a.BC,a.ai,a.Je,a.Gw,_.oe,_.vh],styles:[".top-container[_ngcontent-%COMP%]{width:100vw;height:auto;display:flex;flex-direction:row;justify-content:space-between;align-items:center;background-color:#00f}.title-div[_ngcontent-%COMP%]{width:20vw}.container[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;gap:10px;align-items:center;width:auto}ion-select[_ngcontent-%COMP%]{min-width:200px;--max-width: 400px}.badge[_ngcontent-%COMP%]{height:57px;width:149px;border-radius:8px;display:flex;justify-content:center;align-items:center}.badge[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%]{background-color:#f5dbe0;color:#ff5b5b}"]}),s})()},{path:"view/:id",loadChildren:()=>d.e(4347).then(d.bind(d,4347)).then(n=>n.ViewPageModule)}];let $=(()=>{var n;class s{}return(n=s).\u0275fac=function(r){return new(r||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[h.iI.forChild(C),h.iI]}),s})(),G=(()=>{var n;class s{}return(n=s).\u0275fac=function(r){return new(r||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[_.MD,m.YN,a.bv,$]}),s})()}}]);