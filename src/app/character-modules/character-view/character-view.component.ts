import { Component, OnInit } from '@angular/core';
import { Character } from '../../character';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.scss']
})
export class CharacterViewComponent implements OnInit {

  character: Character = { _id: '', name: '', characterClass: '', characterRace: ''};
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.route.snapshot);
    this.getCharacterDetails(this.route.snapshot.params.id);
  }

  getCharacterDetails(id: any) {
    console.log(id);
    this.api.getCharacter(id)
      .subscribe((data: any) => {
        this.character = data;
        console.log(this.character);
        this.isLoadingResults = false;
      });
  }
  deleteCharacter(id: any) {
    this.isLoadingResults = true;
    this.api.deleteCharacter(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/characters']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
