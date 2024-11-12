import Bool "mo:base/Bool";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
    // Define the Sight type
    public type Sight = {
        id: Nat;
        name: Text;
        completed: Bool;
    };

    private stable var nextId : Nat = 0;
    private stable var sightsEntries : [(Nat, Sight)] = [];
    
    private var sights = HashMap.HashMap<Nat, Sight>(0, Nat.equal, Hash.hash);

    // Initialize the hashmap after upgrade
    system func postupgrade() {
        sights := HashMap.fromIter<Nat, Sight>(sightsEntries.vals(), 0, Nat.equal, Hash.hash);
    };

    // Save the hashmap before upgrade
    system func preupgrade() {
        sightsEntries := Iter.toArray(sights.entries());
    };

    // Add a new sight
    public func addSight(name : Text) : async Sight {
        let sight : Sight = {
            id = nextId;
            name = name;
            completed = false;
        };
        sights.put(nextId, sight);
        nextId += 1;
        sight
    };

    // Toggle sight completion status
    public func toggleSight(id : Nat) : async ?Sight {
        switch (sights.get(id)) {
            case (null) { null };
            case (?sight) {
                let updatedSight : Sight = {
                    id = sight.id;
                    name = sight.name;
                    completed = not sight.completed;
                };
                sights.put(id, updatedSight);
                ?updatedSight
            };
        }
    };

    // Get all sights
    public query func getAllSights() : async [Sight] {
        Iter.toArray(sights.vals())
    };
}
