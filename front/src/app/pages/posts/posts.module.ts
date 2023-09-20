import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import {PostsRoutingModule} from "./posts-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import { DetailComponent } from './components/detail/detail.component';
import { CreateComponent } from './components/create/create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    CreateComponent
  ],
    imports: [
        PostsRoutingModule,
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatTooltipModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class PostsModule { }
