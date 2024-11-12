export const idlFactory = ({ IDL }) => {
  const Sight = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'completed' : IDL.Bool,
  });
  return IDL.Service({
    'addSight' : IDL.Func([IDL.Text], [Sight], []),
    'getAllSights' : IDL.Func([], [IDL.Vec(Sight)], ['query']),
    'toggleSight' : IDL.Func([IDL.Nat], [IDL.Opt(Sight)], []),
  });
};
export const init = ({ IDL }) => { return []; };
