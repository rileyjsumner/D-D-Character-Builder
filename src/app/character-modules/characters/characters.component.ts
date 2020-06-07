import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Character } from '../../character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'class', 'race', 'level'];
  data: Character[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCharacters()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
