import { ModalService } from './../modal.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormControlDirective } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-question-creator',
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.css']
})
export class QuestionCreatorComponent implements OnInit {
 
  inputBoxBaseName = 'inputbox';
  inputBoxCounter = 1;
  addInputBoxs = [ this.inputBoxNameCreator(this.inputBoxCounter)];
  questionForm = new FormGroup({
    question: new FormControl(''),
    inputbox1: new FormControl('')
  });
  constructor(private modalService: ModalService) {}

  ngOnInit() {
    console.log(this.inputBoxNameCreator(this.inputBoxCounter));
  }

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
  ngSubmit(data){
    console.log(data);
    this.removeModal();
  }
  removeModal() {
    this.modalService.destroy();
  }
}
