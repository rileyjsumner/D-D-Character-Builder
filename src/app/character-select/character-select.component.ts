import { Component, OnInit } from '@angular/core';
import { Character } from '../character';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.scss'],
})
export class CharacterSelectComponent implements OnInit {
  private character: Character = {
    id: 1,
    name: 'Glynbalar'
  };

  constructor() {}

  ngOnInit(): void {
  }

}
