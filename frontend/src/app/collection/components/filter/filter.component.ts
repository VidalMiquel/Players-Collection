import { Component, EventEmitter, Output } from '@angular/core';
import { Team } from '../../enums/Team';
import { Position } from '../../enums/Position';
import { Filter } from '../../interfaces/Filter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Nationality } from '../../enums/Nationality';

@Component({
  selector: 'collection-filter',
  templateUrl: './filter.component.html',
  styles: ``
})
export class FilterComponent {

  @Output() filterChange = new EventEmitter<Filter>();
  filterForm: FormGroup;
  teams = Object.values(Team);
  positions = Object.values(Position);
  nationalities = Object.values(Nationality);

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      team: [Team.DEFAULT],
      position: [Position.DEFAULT],
      nationality: [Nationality.DEFAULT]
    });
  }

  get currentFilter(): Filter {
    return this.filterForm.value as Filter;
  }

  onSubmit() {
    const filterValues = this.currentFilter;
    this.filterChange.emit(filterValues);
  }
}
