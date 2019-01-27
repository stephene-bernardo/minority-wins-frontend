import { HttpClient } from '@angular/common/http';
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
  population=0;
  isWaitingForQuestion = true;
  question = {question: '', choices: []};
  isWaitingForOtherAnswer = false;
  constructor(private route: ActivatedRoute, private modalService: ModalService, private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['roomid'];
      const ws = new WebSocket(`ws://localhost:8080/${this.id }`);

      ws.addEventListener('message', (event: MessageEvent) => {
        let data = JSON.parse(event.data);
        if (data && data.population) {
          this.population = data.population;
        } else {
          this.isWaitingForQuestion = false;
          this.question = JSON.parse(event.data);
        }
      });
    });
  }

  initLoginModal() {
    const inputs = {roomid: this.id};
    this.modalService.init(QuestionCreatorComponent, inputs, {});
  }

  createQuestion() {
    this.initLoginModal();
  }

  onQuestionClick(choice) {
    this.httpClient.get(`http://localhost:8080/sendanswer/${this.id}/${this.question['uid']}/${choice}`)
      .subscribe();
    this.isWaitingForOtherAnswer  = true;
    console.log( this.question)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
