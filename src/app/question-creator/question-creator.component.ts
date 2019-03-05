import { HttpClient } from '@angular/common/http';
import { ModalService } from './../modal.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormControlDirective } from '../../../node_modules/@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-question-creator',
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.css']
})
export class QuestionCreatorComponent {
  @Input('roomid') roomid;
  inputBoxBaseName = 'inputbox';
  inputBoxCounter = 1;
  addInputBoxs = [this.inputBoxNameCreator(this.inputBoxCounter)];
  questionForm = new FormGroup({
    question: new FormControl(''),
    inputbox1: new FormControl('')
  });
  constructor(private modalService: ModalService, private httpClient: HttpClient) { }
  onKeypress(event) {
    if (this.inputBoxNameCreator(this.inputBoxCounter) === event.target.name) {
      ++this.inputBoxCounter;
      this.questionForm.addControl(this.inputBoxNameCreator(this.inputBoxCounter), new FormControl(''))
      this.addInputBoxs = this.addInputBoxs
        .concat(this.inputBoxNameCreator(this.inputBoxCounter));
    }
  }

  inputBoxNameCreator(count) {
    return `${this.inputBoxBaseName}${count}`;
  }
  ngSubmit(data) {
    const choices = [];
    for (let a = 1; a <= this.inputBoxCounter; a++) {
      if (data.value[this.inputBoxNameCreator(a)] !== ''){
        choices.push(data.value[this.inputBoxNameCreator(a)])
      }
    }
    this.httpClient.post(`${environment.minorityBackendUrl}/sendquestions/${this.roomid}`,
      { 'question': data.value.question, 'choices': choices }).subscribe();
    this.removeModal();
  }
  removeModal() {
    this.modalService.destroy();
  }
}
