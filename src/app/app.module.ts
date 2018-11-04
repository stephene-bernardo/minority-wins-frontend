import { DomService } from './dom.service';
import { ModalService } from './modal.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionCreatorComponent } from './question-creator/question-creator.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'room/:roomid', component: RoomComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    QuestionCreatorComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ModalService, DomService],
  bootstrap: [AppComponent],
  entryComponents: [
    QuestionCreatorComponent
  ]
})
export class AppModule { }
