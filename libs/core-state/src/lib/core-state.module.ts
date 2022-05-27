import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './todos/todos.effects';
import { TodosFacade } from './todos/todos.facade';
import { TasksEffects } from './tasks/tasks.effects';
import { TasksFacade } from './tasks/tasks.facade';
import { reducers } from './reducers';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../../apps/hktodolist/src/environments/environment';

const STORE_NAME = 'todo-store';
const storeConfig: RootStoreConfig<any, any> = {
	runtimeChecks: {
		strictActionImmutability: true,
		strictActionSerializability: true,
		strictStateImmutability: true,
		strictStateSerializability: true,
	},
};

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forRoot(reducers, storeConfig),
		EffectsModule.forRoot([TodosEffects, TasksEffects]),
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.production, // Restrict extension to log-only mode
			autoPause: true, // Pauses recording actions and state changes when the extension window is not open
		}),
	],
	providers: [TodosFacade, TasksFacade],
})
export class CoreStateModule {}
