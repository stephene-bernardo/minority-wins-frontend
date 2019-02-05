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
  questionIdToChoice;
  questions
  choicesPoll
  constructor(private route: ActivatedRoute, private modalService: ModalService, private httpClient: HttpClient) {
    this.questionIdToChoice = new Map();
    this.questions = []
    this.choicesPoll = []
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['roomid'];
      const ws = new WebSocket(`ws://localhost:8080/${this.id }`);

      ws.addEventListener('message', (event: MessageEvent) => {
        let data = JSON.parse(event.data);
        if (data && data.population) {
          this.population = data.population;
        } else if(data && data.isEndWaiting) {
          this.isWaitingForOtherAnswer = false;
          this.isWaitingForQuestion = true;
          console.log(data)
          this.choicesPoll = [...this.choicesPoll, data];
        } else {
          this.isWaitingForQuestion = false;
          this.question = data;
          console.log(`${this.question['uid']} `)
          this.questions = [...this.questions, data]
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
    this.questionIdToChoice.set(this.question['uid'], choice);

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isMinority(choices, answer){
    let lowest = new Map();
    let counter;
    for(let choice of choices){
      if(counter > choice.count || !counter){
        counter = choice.count;
      }
      if(lowest.has(choice.count)){
        lowest.get(choice.count).push(choice.choice)
      } else {
        lowest.set(choice.count, [choice.choice])
      }
    }
    return lowest.get(counter).includes(answer);
  }
}
