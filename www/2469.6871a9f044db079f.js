"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2469],{2469:(C,P,r)=>{r.r(P),r.d(P,{PartnersPageModule:()=>j});var h=r(177),f=r(4341),i=r(4488),g=r(8986),u=r(467),e=r(4438),p=r(4796);function m(n,c){if(1&n){const a=e.RV6();e.j41(0,"th")(1,"ion-badge",16),e.bIt("click",function(){e.eBV(a);const l=e.XpG().$implicit,o=e.XpG();return e.Njj(o.openViewPage(l._id))}),e.EFF(2,"View"),e.k0s(),e.j41(3,"ion-badge",17),e.bIt("click",function(){e.eBV(a);const l=e.XpG().$implicit,o=e.XpG();return e.Njj(o.openLocationPage(l._id))}),e.EFF(4,"Add Hotel"),e.k0s(),e.j41(5,"ion-toggle",18),e.bIt("ionChange",function(){const l=e.eBV(a).$implicit,o=e.XpG(2);return e.Njj(o.openhotel(l))}),e.k0s()()}if(2&n){const a=c.$implicit;e.R7$(5),e.Y8G("enableOnOffLabels",!0)("checked",!0===a.isOnline)}}function F(n,c){if(1&n&&(e.j41(0,"tr")(1,"th"),e.EFF(2),e.nI1(3,"date"),e.k0s(),e.j41(4,"th"),e.EFF(5),e.k0s(),e.j41(6,"th"),e.EFF(7),e.k0s(),e.j41(8,"th"),e.EFF(9),e.k0s(),e.j41(10,"th"),e.EFF(11),e.k0s(),e.DNE(12,m,6,2,"th",15),e.k0s()),2&n){const a=c.$implicit;e.R7$(2),e.JRh(e.i5U(3,6,a.createdAt,"fullDate")),e.R7$(3),e.JRh(a.name),e.R7$(2),e.JRh(null==a||null==a.hotels[0]?null:a.hotels[0].hotelName),e.R7$(2),e.JRh(a.phoneNumber),e.R7$(2),e.JRh(a.email),e.R7$(),e.Y8G("ngForOf",a.hotels)}}const v=[{path:"",component:(()=>{var n;class c{constructor(t,l,o){this.auth=t,this.router=l,this.loadingController=o,this.partner=[],this.query="",this.status=0}ngOnInit(){}ionViewDidEnter(){this.getAllPartners()}segmentChanged(t){console.log(t.detail.value),this.status=t.detail.value,this.getAllPartners()}getAllPartners(){var t=this;return(0,u.A)(function*(){var l;t.auth.getAllPartners(t.query,1,50,"","",t.status).subscribe({next:(l=(0,u.A)(function*(o){console.log(o),t.partner=o.data.content}),function(s){return l.apply(this,arguments)}),error:function(){var l=(0,u.A)(function*(o){console.log(o.error)});return function(s){return l.apply(this,arguments)}}()})})()}onSearchChange(t){console.log(t.detail.value),this.query=t.detail.value,this.getAllPartners()}openPartnerRegisterPage(){this.router.navigate(["folder","partners","add"])}viewNotifications(){}openhotel(t){var o,l=this;console.log(t),!0===t.isOnline?this.auth.setHotelLiveStatus(0,t._id).subscribe({next:(o=(0,u.A)(function*(s){console.log(s),l.getAllPartners()}),function(d){return o.apply(this,arguments)}),error:function(){var o=(0,u.A)(function*(s){console.log(s)});return function(d){return o.apply(this,arguments)}}()}):!1===t.isOnline&&this.auth.setHotelLiveStatus(1,t._id).subscribe({next:function(){var o=(0,u.A)(function*(s){console.log(s),l.getAllPartners()});return function(d){return o.apply(this,arguments)}}(),error:function(){var o=(0,u.A)(function*(s){console.log(s)});return function(d){return o.apply(this,arguments)}}()})}closehotel(t){}openLocationPage(t){console.log(t),this.router.navigate(["folder","partners","map",t])}openAddDishPage(t){console.log(t),this.router.navigate(["folder","partners","dish"])}openViewPage(t){console.log(t),this.router.navigate(["folder","partners","view",t])}}return(n=c).\u0275fac=function(t){return new(t||n)(e.rXU(p.u),e.rXU(g.Ix),e.rXU(i.Xi))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-partners"]],decls:46,vars:4,consts:[[3,"translucent"],["color","primary","slot","end","fill","clear",3,"click"],["slot","icon-only","name","notifications-circle-outline"],["slot","icon-only","name","chatbox-ellipses-outline"],["mode","ios","placeholder","Search here","inputmode","decimal","type","decimal","showCancelButton","always",3,"ionChange","debounce"],[3,"fullscreen"],["size","6"],["lines","none"],["expand","block","fill","clear","shape","round",3,"click"],["value","0",3,"ionChange"],["value","0"],["value","1"],[1,"table-responsive"],[1,"table"],["scope","col"],[4,"ngFor","ngForOf"],["color","danger","mode","ios",1,"ion-padding",3,"click"],["color","primary","mode","ios",1,"ion-padding","ion-margin-start",3,"click"],["slot","end",1,"ion-margin-start",3,"ionChange","enableOnOffLabels","checked"]],template:function(t,l){1&t&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Partners"),e.k0s(),e.j41(4,"ion-button",1),e.bIt("click",function(){return l.viewNotifications()}),e.nrm(5,"ion-icon",2),e.k0s(),e.j41(6,"ion-button",1),e.bIt("click",function(){return l.viewNotifications()}),e.nrm(7,"ion-icon",3),e.k0s()(),e.j41(8,"ion-searchbar",4),e.bIt("ionChange",function(s){return l.onSearchChange(s)}),e.k0s()(),e.j41(9,"ion-content",5)(10,"ion-grid")(11,"ion-row")(12,"ion-col",6)(13,"ion-item",7)(14,"ion-label"),e.EFF(15,"Partners "),e.j41(16,"p"),e.EFF(17,"Your partenrs here"),e.k0s()()()(),e.j41(18,"ion-col",6)(19,"ion-button",8),e.bIt("click",function(){return l.openPartnerRegisterPage()}),e.EFF(20," Add new Partner "),e.k0s()()()(),e.j41(21,"ion-segment",9),e.bIt("ionChange",function(s){return l.segmentChanged(s)}),e.j41(22,"ion-segment-button",10)(23,"ion-label"),e.EFF(24,"Active"),e.k0s()(),e.j41(25,"ion-segment-button",11)(26,"ion-label"),e.EFF(27,"Blocked"),e.k0s()()(),e.j41(28,"div",12)(29,"table",13)(30,"thead")(31,"tr")(32,"th",14),e.EFF(33,"Date"),e.k0s(),e.j41(34,"th",14),e.EFF(35,"Partner name"),e.k0s(),e.j41(36,"th",14),e.EFF(37,"Restaurant name"),e.k0s(),e.j41(38,"th",14),e.EFF(39,"Phone No"),e.k0s(),e.j41(40,"th",14),e.EFF(41,"Email"),e.k0s(),e.j41(42,"th",14),e.EFF(43,"Action"),e.k0s()()(),e.j41(44,"tbody"),e.DNE(45,F,13,9,"tr",15),e.k0s()()()()),2&t&&(e.Y8G("translucent",!0),e.R7$(8),e.Y8G("debounce",250),e.R7$(),e.Y8G("fullscreen",!0),e.R7$(36),e.Y8G("ngForOf",l.partner))},dependencies:[h.Sq,i.In,i.Jm,i.hU,i.W9,i.lO,i.eU,i.iq,i.uz,i.he,i.ln,i.S1,i.Gp,i.eP,i.BC,i.BY,i.ai,i.hB,i.Je,i.Gw,h.vh],styles:[".top-container[_ngcontent-%COMP%]{width:100vw;height:auto;display:flex;flex-direction:row;justify-content:space-between;align-items:center;background-color:#00f}.title-div[_ngcontent-%COMP%]{width:20vw}.container[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;gap:10px;align-items:center;width:auto}ion-select[_ngcontent-%COMP%]{min-width:200px;--max-width: 400px}.badge[_ngcontent-%COMP%]{height:57px;width:149px;border-radius:8px;display:flex;justify-content:center;align-items:center}.badge[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%]{background-color:#f5dbe0;color:#ff5b5b}"]}),c})()},{path:"add",loadChildren:()=>r.e(2873).then(r.bind(r,2873)).then(n=>n.AddPageModule)},{path:"map/:id",loadChildren:()=>Promise.all([r.e(2076),r.e(4125)]).then(r.bind(r,4125)).then(n=>n.MapPageModule)},{path:"hotels/:lat/:lng",loadChildren:()=>Promise.all([r.e(2076),r.e(1067)]).then(r.bind(r,1067)).then(n=>n.HotelsPageModule)},{path:"dish",loadChildren:()=>r.e(1813).then(r.bind(r,1813)).then(n=>n.DishPageModule)},{path:"view/:id",loadChildren:()=>r.e(6489).then(r.bind(r,6489)).then(n=>n.ViewPageModule)}];let b=(()=>{var n;class c{}return(n=c).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[g.iI.forChild(v),g.iI]}),c})(),j=(()=>{var n;class c{}return(n=c).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[h.MD,f.YN,i.bv,b]}),c})()}}]);