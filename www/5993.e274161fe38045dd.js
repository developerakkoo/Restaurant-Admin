"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5993],{5993:(v,c,i)=>{i.r(c),i.d(c,{AddPageModule:()=>y});var p=i(177),r=i(4341),n=i(4488),f=i(8986),m=i(467),e=i(4438),h=i(4796);const g=[{path:"",component:(()=>{var t;class d{constructor(o,l,a,s){this.formBuilder=o,this.auth=l,this.loadingController=a,this.toastController=s,this.isLoading=!1,this.imageSrc=null,this.form=this.formBuilder.group({firstName:[,[r.k0.required]],lastName:[,[r.k0.required]],fatherName:[,[r.k0.required]],bloodGroup:[,[r.k0.required]],dateOfBirth:[,[r.k0.required]],address:[,[r.k0.required]],languages:[["marthi, hindi"],[r.k0.required]],phoneNumber:["",[r.k0.required,r.k0.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]})}ngOnInit(){}presentToast(o,l,a,s){var P=this;return(0,m.A)(function*(){(yield P.toastController.create({message:o,duration:l,color:a,position:s})).present()})()}onFileSelected(o){var l;const a=null===(l=o.target.files)||void 0===l?void 0:l[0];if(this.file=a,a){const s=new FileReader;s.onload=()=>{this.imageSrc=s.result},s.readAsDataURL(a)}}onSubmit(){var l,o=this;this.form.valid&&(console.log(this.form.value),this.auth.registerDeliveryBoy(this.form.value).subscribe({next:(l=(0,m.A)(function*(a){console.log(a),o.presentToast("delivery partner registered",2e3,"success","top")}),function(s){return l.apply(this,arguments)}),error:function(){var l=(0,m.A)(function*(a){console.log(a.error),o.presentToast("Something went wrong",2e3,"danger","top")});return function(s){return l.apply(this,arguments)}}()}))}}return(t=d).\u0275fac=function(o){return new(o||t)(e.rXU(r.ok),e.rXU(h.u),e.rXU(n.Xi),e.rXU(n.K_))},t.\u0275cmp=e.VBU({type:t,selectors:[["app-add"]],decls:33,vars:4,consts:[[3,"translucent"],["slot","start"],[3,"fullscreen"],["fixed",""],["size","6"],["color","medium"],[3,"formGroup"],["type","text","placeholder","Please enter your first name","formControlName","firstName","fill","outline","labelPlacement","stacked","label","First Name"],["type","text","placeholder","Please enter your last name","formControlName","lastName","fill","outline","labelPlacement","stacked","label","Last Name"],["type","text","placeholder","Please enter your father's name","formControlName","fatherName","fill","outline","labelPlacement","stacked","label","Father's Name"],["type","date","formControlName","dateOfBirth","fill","outline","labelPlacement","stacked","label","Date of Birth"],["type","text","placeholder","Please enter your blood group","formControlName","bloodGroup","fill","outline","labelPlacement","stacked","label","Blood Group"],["type","text","placeholder","Please enter your first name","formControlName","address","fill","outline","labelPlacement","stacked","label","Address"],["type","text","placeholder","Please enter your first name","formControlName","languages","fill","outline","labelPlacement","stacked","label","Language"],["type","text","placeholder","Please enter your first name","formControlName","phoneNumber","fill","outline","labelPlacement","stacked","label","Phone Number"],["expand","block","mode","ios","color","primary","type","submit",3,"click","disabled"]],template:function(o,l){1&o&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Register New Delivery Boy"),e.k0s(),e.j41(4,"ion-buttons",1),e.nrm(5,"ion-back-button"),e.k0s()()(),e.j41(6,"ion-content",2)(7,"ion-grid",3)(8,"ion-row")(9,"ion-col",4)(10,"ion-label",5),e.EFF(11," Enter the details below so we can get to know and serve you better. "),e.k0s(),e.EFF(12," auth/partner/register "),e.j41(13,"form",6),e.nrm(14,"br")(15,"ion-input",7)(16,"br")(17,"ion-input",8)(18,"br")(19,"ion-input",9)(20,"br")(21,"ion-input",10)(22,"br")(23,"ion-input",11)(24,"br")(25,"ion-input",12)(26,"br")(27,"ion-input",13)(28,"br")(29,"ion-input",14),e.k0s(),e.j41(30,"ion-button",15),e.bIt("click",function(){return l.onSubmit()}),e.EFF(31," Next "),e.k0s()(),e.nrm(32,"ion-col",4),e.k0s()()()),2&o&&(e.Y8G("translucent",!0),e.R7$(6),e.Y8G("fullscreen",!0),e.R7$(7),e.Y8G("formGroup",l.form),e.R7$(17),e.Y8G("disabled",l.form.invalid))},dependencies:[r.qT,r.BC,r.cb,r.j4,r.JD,n.Jm,n.QW,n.hU,n.W9,n.lO,n.eU,n.$w,n.he,n.ln,n.BC,n.ai,n.Gw,n.el]}),d})()}];let b=(()=>{var t;class d{}return(t=d).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[f.iI.forChild(g),f.iI]}),d})(),y=(()=>{var t;class d{}return(t=d).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[p.MD,r.X1,r.YN,n.bv,b]}),d})()}}]);