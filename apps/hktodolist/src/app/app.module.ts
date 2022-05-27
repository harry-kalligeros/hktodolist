import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { TodoListModule } from '../todo-list/todo-list.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, CoreModule, WidgetsModule, TodoListModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
