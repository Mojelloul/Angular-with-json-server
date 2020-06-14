import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  ipiUrl="http://localhost:5000/tasks";

  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get<Task[]>(this.ipiUrl);
  }

  delete(id){
    return this.http.delete(`${this.ipiUrl}/${id}`);
  }

  persist(task){
    return this.http.post<Task>(this.ipiUrl,task);
  }

  complated(id,complated){
    return this.http.patch(`${this.ipiUrl}/${id}`,{complated:!complated})
  }

  update(task){
    return this.http.put(`${this.ipiUrl}/${task.id}`,task);
  }
}
