import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-upload-new-scan',
  templateUrl: './upload-new-scan.component.html',
  styleUrls: ['./upload-new-scan.component.css']
})
export class UploadNewScanComponent implements OnInit {
  isLoading: boolean = false;
  testUser: User;
  user: User;
  constructor(private tokenStorage: TokenStorageService, private userService: UserService, private route: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    this.userService.getUserById(this.user.id).subscribe( then => {
      if (then.roles[0] != 'ROLE_ADMIN'){
        this.route.navigate(['/home']);
      }
    })

  }
  StartCrawlerForLastScan() {
    this.isLoading = true;
    this.adminService.CrawleruploadNewScan().subscribe(then => {
      this.adminService.readCsvMangaInfoForUploadNewScan().subscribe( data => {
        this.isLoading = false;
      }, err=> {
      })
    })
  }

}
