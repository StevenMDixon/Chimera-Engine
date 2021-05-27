
# Command system

Need a way to script events in the game. I need a way to attach "scripts" to objects. 

## Ideas

- Scripts attached to items defined through loading entities from files
    - Users define actors in file to be loaded from a json file? Give them stats like location, names/unique_ids. Then a command script is loaded that references the unique ids, actors and the script can trigger events in the current scene. 

would need two files/objects 1 for actors, 1 for defined events

I imagine this coud play into a chat module later.

# Actor loader

Setup a module to load in actors from an actors file. Actors are stored in the actors module but accessible in the scene and can be addressed by name

Need to define a way to define scripts now

### What is a script

{
    scriptName: [
        {
            command:  
            target: 
            data: 
            block: 
        }
    ],
}

block keeps the other commands from completing until it is complete.

### how are scripts executed?

events trigger the script to be added -> the command module adds the commands to the appropriate actors
-> command system executes scripts 1 at a time?


### how are scripts assigned?

### wait, block
