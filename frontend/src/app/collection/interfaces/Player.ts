import { Position } from "./Position";
import { Team } from "./Team";

export interface Player{
  name:string;
  postition:Position,
  team: Team
  nacionality : string;
}
