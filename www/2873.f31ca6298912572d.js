"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2873],{2873:(v,g,l)=>{l.r(g),l.d(g,{AddPageModule:()=>P});var p=l(177),r=l(4341),t=l(4488),f=l(8986),c=l(467),e=l(4438),h=l(4796);const b=[{path:"",component:(()=>{var o;class s{constructor(n,a,d,i,u){this.auth=n,this.loadingController=a,this.toastController=d,this.fb=i,this.router=u,this.form=this.fb.group({name:[,[r.k0.required]],email:[,[r.k0.required,r.k0.email]],phoneNumber:[,[r.k0.required]],password:[,[r.k0.required,r.k0.min(8)]]})}ngOnInit(){}presentToast(n,a,d,i){var u=this;return(0,c.A)(function*(){(yield u.toastController.create({message:n,duration:a,color:d,position:i})).present()})()}register(){var n=this;return(0,c.A)(function*(){let a=yield n.loadingController.create({message:"Logging In...",animated:!0});var d;n.form.valid&&(console.log(n.form.value),n.auth.registerPartner(n.form.value).subscribe({next:(d=(0,c.A)(function*(i){console.log(i),yield a.dismiss(),n.presentToast("Registered Successfully.",2e3,"success","bottom"),n.router.navigate([""])}),function(u){return d.apply(this,arguments)}),error:function(){var d=(0,c.A)(function*(i){console.log(i.error),yield a.dismiss(),n.presentToast(i.error.message,2e3,"danger","bottom")});return function(u){return d.apply(this,arguments)}}()}))})()}}return(o=s).\u0275fac=function(n){return new(n||o)(e.rXU(h.u),e.rXU(t.Xi),e.rXU(t.K_),e.rXU(r.ok),e.rXU(f.Ix))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-add"]],decls:29,vars:4,consts:[[3,"translucent"],["slot","start"],[1,"ion-padding","ion-margin-top",3,"fullscreen"],["fixed",""],["size","6"],[3,"formGroup"],["color","medium","labelPlacement","stacked","label","Full name","placeholder","Robin","fill","outline","type","text","formControlName","name",1,"animate__animated","animate__fadeIn"],["color","primary","slot","start","name","mail-outline","aria-hidden","true"],["color","medium","labelPlacement","stacked","label","Phone No","placeholder","+91XXXXXXXXXX","fill","outline","type","number","formControlName","phoneNumber",1,"animate__animated","animate__fadeIn"],["color","primary","slot","start","name","call-outline","aria-hidden","true"],["color","medium","labelPlacement","stacked","label","Email","placeholder","email@domain.com","fill","outline","type","email","formControlName","email",1,"animate__animated","animate__fadeIn"],["color","medium","labelPlacement","stacked","label","Password","type","password","fill","outline","formControlName","password",1,"animate__animated","animate__fadeIn"],["color","primary","slot","start","name","lock-closed-outline","aria-hidden","true"],["fill","clear","slot","end","aria-label","Show/hide"],["slot","icon-only","name","eye-outline","aria-hidden","true"],["fill","clear",1,"button-primary",3,"click","disabled"]],template:function(n,a){1&n&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Register new Partner"),e.k0s(),e.j41(4,"ion-buttons",1),e.nrm(5,"ion-back-button"),e.k0s()()(),e.j41(6,"ion-content",2)(7,"ion-grid",3)(8,"ion-row")(9,"ion-col",4)(10,"form",5)(11,"ion-input",6),e.nrm(12,"ion-icon",7),e.k0s(),e.nrm(13,"br"),e.j41(14,"ion-input",8),e.nrm(15,"ion-icon",9),e.k0s(),e.nrm(16,"br"),e.j41(17,"ion-input",10),e.nrm(18,"ion-icon",7),e.k0s(),e.nrm(19,"br"),e.j41(20,"ion-input",11),e.nrm(21,"ion-icon",12),e.j41(22,"ion-button",13),e.nrm(23,"ion-icon",14),e.k0s()(),e.nrm(24,"br"),e.j41(25,"ion-button",15),e.bIt("click",function(){return a.register()}),e.EFF(26," Register "),e.k0s(),e.nrm(27,"br"),e.k0s()(),e.nrm(28,"ion-col",4),e.k0s()()()),2&n&&(e.Y8G("translucent",!0),e.R7$(6),e.Y8G("fullscreen",!0),e.R7$(4),e.Y8G("formGroup",a.form),e.R7$(15),e.Y8G("disabled",a.form.invalid))},dependencies:[r.qT,r.BC,r.cb,r.j4,r.JD,t.Jm,t.QW,t.hU,t.W9,t.lO,t.eU,t.iq,t.$w,t.ln,t.BC,t.ai,t.su,t.Gw,t.el]}),s})()}];let y=(()=>{var o;class s{}return(o=s).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[f.iI.forChild(b),f.iI]}),s})(),P=(()=>{var o;class s{}return(o=s).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[p.MD,r.YN,r.X1,t.bv,y]}),s})()}}]);