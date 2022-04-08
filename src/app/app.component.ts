import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  public mode = 'list';
  public todos : Todo[] = [];  
  public titlePage: string = 'Minhas tarefas';
  public form : FormGroup;
  
  constructor(private fb : FormBuilder) {
 
    this.form = this.fb.group({

      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  clear(){

    this.form.reset();
  }

  add(){

    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  remover(todo : Todo){
    
    const index = this.todos.indexOf(todo);
    if(index !== -1)
      this.todos.splice(index,1);

    this.save();
  }

  concluir(todo : Todo){
    todo.done = true;
    this.save();
  }

  refazer(todo : Todo){
    todo.done = false;
    this.save();
  }

  save(){
    //Converte o objeto JSON em uma string
    const data = JSON.stringify(this.todos);

    localStorage.setItem('todos',data);
    this.mode ='list';
  }

  load(){

   const data = localStorage.getItem('todos')
   if(data != null)
      this.todos = JSON.parse(data);
      
  }

  changeMode(mode :string){
   this.mode = mode;
  }
}
