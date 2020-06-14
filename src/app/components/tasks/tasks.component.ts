import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  searchText='';
  editForm=false;
  showForm=false;
  tasks: Task[]=[];
  resultTasks: Task[]=[];
  myTask:Task={
    label:'',
    complated:false
  }
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll().subscribe(tasks=>{
     this.resultTasks = this.tasks = tasks}
      )
  }

  deleteTask(id){
    this.taskService.delete(id).subscribe(()=>{
      this.tasks=this.tasks.filter(task => task.id != id)
    })
  }

  persistTask(){
    this.taskService.persist(this.myTask)
    .subscribe((task)=> {
      this.tasks = [task, ...this.tasks];
      this.resetTask();
      this.showForm=false;
    })
  }

  toggleCompleted(task){
    this.taskService.complated(task.id,task.complated)
      .subscribe(() => {
        task.complated = !task.complated;
    })
  }

  editTask(task){
    this.myTask=task;
    this.editForm= true;
    this.showForm=true;
  }

  updateTask(){
    this.taskService.update(this.myTask).subscribe(task=>{
      this.resetTask();
      this.editForm=false;
    })
  }

  searchTasks(){
    this.resultTasks=this.tasks.filter((task)=>task.label.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
  }

  showEdit(){
    this.showForm=!this.showForm;
    this.editForm= false;
    this.resetTask();
  }

  resetTask(){
    this.myTask={
      label:'',
      complated:false
    }
  }
}
