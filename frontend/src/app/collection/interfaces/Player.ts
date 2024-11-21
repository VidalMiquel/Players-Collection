import { Position } from "../enums/Position";
import { Team } from "../enums/Team";

export interface Player{
  name:string;
  position:Position,
  team: Team
  nationality : string;
}
