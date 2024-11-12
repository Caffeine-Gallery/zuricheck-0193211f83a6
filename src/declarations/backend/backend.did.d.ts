import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Sight { 'id' : bigint, 'name' : string, 'completed' : boolean }
export interface _SERVICE {
  'addSight' : ActorMethod<[string], Sight>,
  'getAllSights' : ActorMethod<[], Array<Sight>>,
  'toggleSight' : ActorMethod<[bigint], [] | [Sight]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
