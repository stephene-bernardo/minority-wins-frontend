import { QuestionCreatorComponent } from './../question-creator/question-creator.component';
import { ModalService } from './../modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Subscription } from '../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  id: string;
  sub: Subscription;
  constructor(private route: ActivatedRoute, private modalService: ModalService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params['roomid']);
      let ws = new WebSocket(`ws://localhost:8080/${params['roomid']}`);

      ws.addEventListener("message", (event: MessageEvent) => {
        console.log(event.data)
      })
    });
  }

  initLoginModal() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(QuestionCreatorComponent, inputs, {});
  }

  createQuestion() {
    this.initLoginModal();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
