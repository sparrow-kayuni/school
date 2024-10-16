import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parents',
  standalone: true,
  imports: [],
  templateUrl: './parents.component.html',
  styleUrl: './parents.component.css'
})
export class ParentsComponent implements OnInit{
  ngOnInit(): void {
    console.debug(`Parents componatent has been created`)
  }

}
