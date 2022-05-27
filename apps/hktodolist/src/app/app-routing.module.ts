import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListContainerComponent } from './todo-list/todo-list-container/todo-list-container.component';
const routes: Routes = [
	{ path: 'home', component: TodoListContainerComponent },
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
