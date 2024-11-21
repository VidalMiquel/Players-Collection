import { Nationality } from "../enums/Nationality";
import { Position } from "../enums/Position";
import { Team } from "../enums/Team";

export interface Filter {
  position: Position;
  team: Team;
  nationality: Nationality;
}
