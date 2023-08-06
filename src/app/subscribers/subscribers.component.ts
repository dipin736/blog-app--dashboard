import { Component,OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  subsriberArray:any
  constructor(private subscribers:SubscribersService){}

ngOnInit(): void {
  this.subscribers.getData().subscribe(val=>{
    this.subsriberArray=val;
  })
}

onDelete(id:any){
  this.subscribers.deleteData(id)
}
  
}
