import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  userChartOptions = {
	  animationEnabled: true,
    theme:"dark1",
	  title:{
		text: "Users Attention"
	  },
    width:350,
    colorSet:[ "#2F4F4F",
    "#008080",
    "#2E8B57",
    "#3CB371",
    "#90EE90"    ],
	  data: [{
    
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		indexLabel: "{name}",
		dataPoints: [
		  { y: 20, name: "Total Users" },
		  { y: 80, name: "Total Users" },
		
		]
	  }]
	}	
  boyChartOptions = {
	  animationEnabled: true,
   
	  title:{
		text: "Delivery Boy Attention"
	  },
    width:350,
	  data: [{
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		indexLabel: "{name}",
		dataPoints: [
		  { y: 20, name: "Total Users" },
		  { y: 80, name: "Total Users" },
		
		]
	  }]
	}

  partnerChartOptions = {
	  animationEnabled: true,
   
	  title:{
		text: "Partners Attention"
	  },
    width:350,
	  data: [{
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		indexLabel: "{name}",
		dataPoints: [
		  { y: 20, name: "Total Users" },
		  { y: 80, name: "Total Users" },
		
		]
	  }]
	}
  constructor(private menuController: MenuController,
              private loadingController: LoadingController,
              private toastController: ToastController,
              
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  onSearchChange(ev:any){
    console.log(ev.detail.value);
    
  }

  viewNotifications(){}
}
