import { Component, EventEmitter, Output } from '@angular/core';
import { Team } from '../../interfaces/Team';
import { Position } from '../../interfaces/Position';
import { Filter } from '../../interfaces/Filter';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      team: [Team.DEFAULT],
      position: [Position.DEFAULT]
    });
  }

  getValues(): Filter {
    return {
      team: this.filterForm.get('team')?.value,
      position: this.filterForm.get('position')?.value
    };
  }

  onSubmit() {
    const filterValues = this.getValues();
    this.filterChange.emit(filterValues);
  }
}
