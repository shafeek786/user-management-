import { Component,OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../service/snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { ImageService } from '../service/image.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFoodComponent } from '../add-food/add-food.component';
import * as Highcharts from 'highcharts/highstock'
import { Chart } from 'chart.js/auto';

interface ApiResponse {
  userData: UserData[];
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  mobile: number;
  image: string[];
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})


export class UserDashboardComponent implements OnInit{
  


  decodedToken: any;
  userName:any
  selectedFile: File | null = null;
  imageSrc:any
  constructor(
    private service: AuthService,
    private ngxSerive: NgxUiLoaderService,
    private snackbarservice: SnackbarService,
    private imageService:ImageService,
    private dialog:MatDialog
  ) {
    this.ngxSerive.start();
    const tokens: string | null = localStorage.getItem('token');
    if (tokens !== null) {
      
      this.decodedToken = jwtDecode(tokens);
      console.log(this.decodedToken.name)
      this.userName = this.decodedToken.name
    } else {
      console.error('Token not found in localStorage');
    }
  }
  ngOnInit(){
    this.loadUser()
    this.createChart()
   
  }
  loadUser() {
    this.service.getUserDetails().subscribe(
      (response: any) => {
        // Assuming userData is an array
        const user = response.userData; // Access the first user, adjust if needed
        console.log('Original URL:', user.image[0]);
        // Replace backslashes with forward slashes in the image URL
        this.imageSrc = user.image[0]
        console.log('Updated URL:', this.imageSrc);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  logout(): void {
    this.service.logout();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    const id = this.decodedToken.id
    console.log(this.decodedToken)
    if (this.selectedFile) {
      this.imageService.uploadImage(id,this.selectedFile).subscribe(
        (response) => {
          console.log("image")
          // Handle success
          this.imageSrc = response.userData.image
          console.log(this.imageSrc);
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
    }
  }
  addFood(id:any){
    this.dialog.open(AddFoodComponent,{
      width: '100%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms'
    })
  }

  createChart(): void {
    const ctx = document.getElementById('roundChart') as HTMLCanvasElement;
    const roundChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Label 1', 'Label 2'],
        datasets: [{
          data: [1950, 150, ], // Example data
          backgroundColor: ['purple', 'grey'], // Example colors
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
       cutout:'70%',
       plugins: {
        legend: {
          display: false, // Hide the default legend
        },
        title: {
          display: true,
         
          font: {
            size: 14,
          },
        },
        
      },
    },
    });
  }

 
  
}


