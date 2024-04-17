import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AdminAuthService } from '../service/admin-auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

interface ApiResponse {
  userData: UserData[];
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  mobile: number;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  constructor(
    private adminService: AdminAuthService,
    private service: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  userlist: UserData[] = [];
  dataSource = new MatTableDataSource<UserData>(this.userlist); // Use MatTableDataSource

  ngOnInit() {
    console.log('ngOnInit called');
    this.loadUser();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadUser() {
    this.adminService.getUser().subscribe(
      (res: any) => {
        console.log(res)
        const typedResponse = res as ApiResponse;
        this.userlist = typedResponse.userData;
        this.dataSource.data = this.userlist;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error in API call:', error);
      }
    );
  }

  displayedColumns: string[] = ['name', 'email', 'mobile', 'status', 'action'];

  logout(): void {
    this.service.logout();
  }
  updateUser(id: any) {
    // Fetch the user details by id from the userlist
    const user = this.userlist.find(u => u._id === id);
  
    if (user) {
      // Open the update form with user details as placeholders
      const dialogRef = this.dialog.open(UpdateComponent, {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '50%',
        data: {
          usercode: id,
          userDetails: user, // Pass the user details to the update form
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.loadUser()
      });
    }
    
  }
  
  addUser() {
    this.router.navigate(['/adduser']);
  }

  deleteUser(id: any) {
    // Open a confirmation dialog before proceeding with deletion
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this user?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.userDelete(id).subscribe();
        this.loadUser();
      }
    });
  }

  onSearchInputChange(event:any){
    
    this.adminService.userSerach(event.target.value).subscribe((res) => {
    
      const typedResponse = res as ApiResponse;
        this.userlist = typedResponse.userData;
        this.dataSource.data = this.userlist;
        this.dataSource.paginator = this.paginator;
      
    });
    
  }
}
