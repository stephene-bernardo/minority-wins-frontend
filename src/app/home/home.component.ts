import { RoomComponent } from './../room/room.component';
import { ModalService } from './../modal.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
// import { SampleComponent } from '../sample/sample.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private http: HttpClient) {}

  createroom() {
    this.http.get(`${environment.minorityBackendUrl}/createroom`).subscribe((res: { roomid: string }) => {
      this.router.navigate(['/room', res.roomid]);
    });
  }

  enterRoom(roomid){
    this.router.navigate(['/room', roomid])
  }

}
