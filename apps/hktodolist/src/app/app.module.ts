import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { WidgetsModule } from './widgets/widgets.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { CoreStateModule } from '@hktodolist/core-state';
import { CoreDataModule } from '@hktodolist/core-data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CoreModule,
		WidgetsModule,
		TodoListModule,
		CoreStateModule,
		CoreDataModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
