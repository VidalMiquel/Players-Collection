import { Position } from "./Position";
import { Team } from "./Team";

export interface Player{
  name:string;
  position:Position,
  team: Team
  nacionality : string;
}
