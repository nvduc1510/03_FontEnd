import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  
  message: string = '';
  constructor(private router: Router){}
  
  ngOnInit() : void {
    this.message = history.state.notification;
    const messageFromHistory = history.state.notification;
    if (messageFromHistory) {
      // Lưu thông báo vào sessionStorage
      sessionStorage.setItem('message', messageFromHistory);
      this.message = messageFromHistory;
    } else {
      // Kiểm tra xem có thông báo trong sessionStorage không
      const messageFromSession = sessionStorage.getItem('message');
      if (messageFromSession) {
        this.message = messageFromSession;
      }
    }
  }
  navigateToList() {
    // Xóa thông báo từ sessionStorage
    sessionStorage.removeItem('message');
    // Chuyển hướng sang màn hình List
    this.router.navigate(['user/list']);
  }
}
