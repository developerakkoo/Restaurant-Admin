"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5127],{5127:(I,h,g)=>{g.r(h),g.d(h,{OrdersPageModule:()=>D});var f=g(177),m=g(4341),s=g(4488),p=g(8986),c=g(467),e=g(4438),v=g(4796);function y(n,a){1&n&&(e.j41(0,"ion-text",18)(1,"h1"),e.EFF(2," No Orders Found! "),e.k0s()())}function F(n,a){if(1&n&&(e.j41(0,"ion-select-option",32),e.EFF(1),e.k0s()),2&n){const t=a.$implicit;e.Y8G("value",t._id),e.R7$(),e.Lme("",t.firstName," ",t.lastName,"")}}function O(n,a){if(1&n){const t=e.RV6();e.j41(0,"ion-select",30),e.bIt("ionChange",function(i){e.eBV(t);const o=e.XpG().$implicit,l=e.XpG(2);return e.Njj(l.assignDriverEvent(i,o._id))}),e.DNE(1,F,2,3,"ion-select-option",31),e.k0s()}if(2&n){const t=e.XpG(3);e.R7$(),e.Y8G("ngForOf",t.drivers)}}function b(n,a){1&n&&(e.j41(0,"ion-badge",33),e.EFF(1,"New"),e.k0s())}function j(n,a){1&n&&(e.j41(0,"ion-badge",34),e.EFF(1,"Delivered"),e.k0s())}function x(n,a){1&n&&(e.j41(0,"ion-badge",35),e.EFF(1,"Delivery Assigned"),e.k0s())}function A(n,a){1&n&&(e.j41(0,"ion-badge",36),e.EFF(1,"Rejected"),e.k0s())}function k(n,a){1&n&&(e.j41(0,"ion-badge",37),e.EFF(1,"On the way"),e.k0s())}function E(n,a){if(1&n){const t=e.RV6();e.j41(0,"tr")(1,"th"),e.EFF(2),e.k0s(),e.j41(3,"th"),e.EFF(4),e.nI1(5,"date"),e.k0s(),e.j41(6,"th"),e.EFF(7),e.k0s(),e.j41(8,"th"),e.EFF(9),e.k0s(),e.j41(10,"th"),e.EFF(11),e.nI1(12,"currency"),e.k0s(),e.j41(13,"th")(14,"ion-badge",23),e.bIt("click",function(){const i=e.eBV(t).$implicit,o=e.XpG(2);return e.Njj(o.presentActionSheet(i._id))}),e.EFF(15,"View"),e.k0s(),e.DNE(16,O,2,1,"ion-select",24),e.k0s(),e.j41(17,"th"),e.DNE(18,b,2,0,"ion-badge",25)(19,j,2,0,"ion-badge",26)(20,x,2,0,"ion-badge",27)(21,A,2,0,"ion-badge",28)(22,k,2,0,"ion-badge",29),e.k0s()()}if(2&n){const t=a.$implicit;e.R7$(2),e.JRh(t.orderId),e.R7$(2),e.JRh(e.i5U(5,11,t.createdAt,"fullDate")),e.R7$(3),e.JRh(null==t||null==t.user?null:t.user.name),e.R7$(2),e.JRh(null==t||null==t.userAddress?null:t.userAddress.address),e.R7$(2),e.JRh(e.i5U(12,14,null==t||null==t.priceDetails?null:t.priceDetails.totalAmountToPay,"INR")),e.R7$(5),e.Y8G("ngIf",4===(null==t?null:t.orderStatus)),e.R7$(2),e.Y8G("ngIf",0===(null==t?null:t.orderStatus)),e.R7$(),e.Y8G("ngIf",3===(null==t?null:t.orderStatus)),e.R7$(),e.Y8G("ngIf",2===(null==t?null:t.orderStatus)),e.R7$(),e.Y8G("ngIf",5===(null==t?null:t.orderStatus)),e.R7$(),e.Y8G("ngIf",4===(null==t?null:t.orderStatus))}}function P(n,a){if(1&n&&(e.j41(0,"div",19)(1,"table",20)(2,"thead")(3,"tr")(4,"th",21),e.EFF(5,"#ID"),e.k0s(),e.j41(6,"th",21),e.EFF(7,"Date"),e.k0s(),e.j41(8,"th",21),e.EFF(9,"Customer name"),e.k0s(),e.j41(10,"th",21),e.EFF(11,"Address"),e.k0s(),e.j41(12,"th",21),e.EFF(13,"Amount"),e.k0s(),e.j41(14,"th",21),e.EFF(15,"Action"),e.k0s(),e.j41(16,"th",21),e.EFF(17,"Status"),e.k0s()()(),e.j41(18,"tbody"),e.DNE(19,E,23,17,"tr",22),e.k0s()()()),2&n){const t=e.XpG();e.R7$(19),e.Y8G("ngForOf",t.orders)}}const R=[{path:"",component:(()=>{var n;class a{constructor(r,i,o){this.auth=r,this.actionSheetController=i,this.loadingController=o,this.orders=[],this.drivers=[],this.query="",this.status=""}ngOnInit(){}onSearchChange(r){console.log(r.detail.value),this.query=r.detail.value,this.getAllOrders(),this.getAllDeliveryBoys()}ionViewDidEnter(){this.getAllOrders(),this.getAllDeliveryBoys()}filterEvent(r){console.log(r.detail.value),this.status=r.detail.value,this.getAllOrders(),this.getAllDeliveryBoys()}getAllDeliveryBoys(){var r=this;return(0,c.A)(function*(){var i;r.auth.getAllDeliveryBoys(r.query,1,50,"","","").subscribe({next:(i=(0,c.A)(function*(o){console.log(o),r.drivers=o.data.content}),function(l){return i.apply(this,arguments)}),error:function(){var i=(0,c.A)(function*(o){console.log(o.error)});return function(l){return i.apply(this,arguments)}}()})})()}getAllOrders(){var r=this;return(0,c.A)(function*(){var i;r.auth.getAllOrders(r.query,1,50,r.status,"").subscribe({next:(i=(0,c.A)(function*(o){console.log(o),r.orders=o.data.content}),function(l){return i.apply(this,arguments)}),error:function(){var i=(0,c.A)(function*(o){console.log(o.error)});return function(l){return i.apply(this,arguments)}}()})})()}acceptOrder(r){var o,i=this;this.auth.AcceptRejectOrder(r,4).subscribe({next:(o=(0,c.A)(function*(l){console.log(l),i.getAllOrders()}),function(u){return o.apply(this,arguments)}),error:function(){var o=(0,c.A)(function*(l){console.log(l.error)});return function(u){return o.apply(this,arguments)}}()})}rejectOrder(r){var o,i=this;this.auth.AcceptRejectOrder(r,5).subscribe({next:(o=(0,c.A)(function*(l){console.log(l),i.getAllOrders()}),function(u){return o.apply(this,arguments)}),error:function(){var o=(0,c.A)(function*(l){console.log(l.error)});return function(u){return o.apply(this,arguments)}}()})}presentActionSheet(r){var i=this;return(0,c.A)(function*(){yield(yield i.actionSheetController.create({header:"Albums",buttons:[{text:"Accept",role:"",icon:"checkmark",handler:()=>{console.log("Delete clicked"),i.acceptOrder(r)}},{text:"Reject",icon:"trash",handler:()=>{console.log("Share clicked"),i.rejectOrder(r)}},{text:"Cancel",icon:"close",role:"cancel",handler:()=>{console.log("Cancel clicked")}}]})).present()})()}viewNotifications(){}assignDriverEvent(r,i){var o=this;console.log(r.detail.value),console.log(i);let l=r.detail.value;var u;console.log(l.length),1==l.length?this.auth.assignDeliveryBoy(i,r.detail.value).subscribe({next:(u=(0,c.A)(function*(d){console.log(d),o.getAllOrders(),o.getAllDeliveryBoys()}),function(_){return u.apply(this,arguments)}),error:function(){var u=(0,c.A)(function*(d){console.log(d.error)});return function(_){return u.apply(this,arguments)}}()}):this.auth.assignMultipleDeliveryBoy(i,r.detail.value).subscribe({next:function(){var u=(0,c.A)(function*(d){console.log(d),o.getAllOrders(),o.getAllDeliveryBoys()});return function(_){return u.apply(this,arguments)}}(),error:function(){var u=(0,c.A)(function*(d){console.log(d.error)});return function(_){return u.apply(this,arguments)}}()})}}return(n=a).\u0275fac=function(r){return new(r||n)(e.rXU(v.u),e.rXU(s.GD),e.rXU(s.Xi))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-orders"]],decls:36,vars:5,consts:[[3,"translucent"],["color","primary","slot","end","fill","clear",3,"click"],["slot","icon-only","name","notifications-circle-outline"],["slot","icon-only","name","chatbox-ellipses-outline"],["mode","ios","placeholder","Search here","inputmode","decimal","type","decimal","showCancelButton","always",3,"ionChange","debounce"],[3,"fullscreen"],["color","primary","class","ion-text-center",4,"ngIf"],["size","6"],["lines","none"],[1,"container"],["value","All","fill","outline","interface","popover","placeholder","Select Status",3,"ionChange"],["value",""],["value","0"],["value","5"],["value","2"],["value","4"],["value","3"],["class","table-responsive",4,"ngIf"],["color","primary",1,"ion-text-center"],[1,"table-responsive"],[1,"table"],["scope","col"],[4,"ngFor","ngForOf"],["color","danger","mode","ios",1,"ion-padding",3,"click"],["fill","outline","multiple","true","placeholder","Select Driver",3,"ionChange",4,"ngIf"],["class","ion-padding","color","primary","mode","ios",4,"ngIf"],["class","ion-padding","color","success","mode","ios",4,"ngIf"],["class","ion-padding","color","tertiary","mode","ios",4,"ngIf"],["class","ion-padding","color","danger","mode","ios",4,"ngIf"],["class","ion-padding","color","warning","mode","ios",4,"ngIf"],["fill","outline","multiple","true","placeholder","Select Driver",3,"ionChange"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["color","primary","mode","ios",1,"ion-padding"],["color","success","mode","ios",1,"ion-padding"],["color","tertiary","mode","ios",1,"ion-padding"],["color","danger","mode","ios",1,"ion-padding"],["color","warning","mode","ios",1,"ion-padding"]],template:function(r,i){1&r&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Orders"),e.k0s(),e.j41(4,"ion-button",1),e.bIt("click",function(){return i.viewNotifications()}),e.nrm(5,"ion-icon",2),e.k0s(),e.j41(6,"ion-button",1),e.bIt("click",function(){return i.viewNotifications()}),e.nrm(7,"ion-icon",3),e.k0s()(),e.j41(8,"ion-searchbar",4),e.bIt("ionChange",function(l){return i.onSearchChange(l)}),e.k0s()(),e.j41(9,"ion-content",5),e.DNE(10,y,3,0,"ion-text",6),e.j41(11,"ion-grid")(12,"ion-row")(13,"ion-col",7)(14,"ion-item",8)(15,"ion-label"),e.EFF(16,"Orders "),e.j41(17,"p"),e.EFF(18,"Your orders here"),e.k0s()()()(),e.j41(19,"ion-col",7)(20,"div",9)(21,"ion-item",8)(22,"ion-select",10),e.bIt("ionChange",function(l){return i.filterEvent(l)}),e.j41(23,"ion-select-option",11),e.EFF(24,"All"),e.k0s(),e.j41(25,"ion-select-option",12),e.EFF(26,"New Order"),e.k0s(),e.j41(27,"ion-select-option",13),e.EFF(28,"Rejected"),e.k0s(),e.j41(29,"ion-select-option",14),e.EFF(30,"Delivery Boy Assigned"),e.k0s(),e.j41(31,"ion-select-option",15),e.EFF(32,"On the Way"),e.k0s(),e.j41(33,"ion-select-option",16),e.EFF(34,"Delivered"),e.k0s()()()()()()(),e.DNE(35,P,20,1,"div",17),e.k0s()),2&r&&(e.Y8G("translucent",!0),e.R7$(8),e.Y8G("debounce",250),e.R7$(),e.Y8G("fullscreen",!1),e.R7$(),e.Y8G("ngIf",0==i.orders.length),e.R7$(25),e.Y8G("ngIf",i.orders.length>0))},dependencies:[f.Sq,f.bT,s.In,s.Jm,s.hU,s.W9,s.lO,s.eU,s.iq,s.uz,s.he,s.ln,s.S1,s.Nm,s.Ip,s.IO,s.BC,s.ai,s.Je,s.Gw,f.oe,f.vh],styles:[".top-container[_ngcontent-%COMP%]{width:100vw;height:auto;display:flex;flex-direction:row;justify-content:space-between;align-items:center;background-color:#00f}.title-div[_ngcontent-%COMP%]{width:20vw}.container[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;gap:10px;align-items:center;width:auto}ion-select[_ngcontent-%COMP%]{min-width:200px;--max-width: 400px}.badge[_ngcontent-%COMP%]{height:57px;width:149px;border-radius:8px;display:flex;justify-content:center;align-items:center}.badge[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%]{background-color:#f5dbe0;color:#ff5b5b}"]}),a})()}];let C=(()=>{var n;class a{}return(n=a).\u0275fac=function(r){return new(r||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[p.iI.forChild(R),p.iI]}),a})(),D=(()=>{var n;class a{}return(n=a).\u0275fac=function(r){return new(r||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[f.MD,m.YN,s.bv,C]}),a})()}}]);