
# Command system

Need a way to script events in the game. I need a way to attach "scripts" to objects. 

## Ideas

- Scripts attached to items defined through loading entities from files
    - Users define actors in file to be loaded from a json file? Give them stats like location, names/unique_ids. Then a command script is loaded that references the unique ids, actors and the script can trigger events in the current scene. 

would need two files/objects 1 for actors, 1 for defined events

I imagine this coud play into a chat module later.

