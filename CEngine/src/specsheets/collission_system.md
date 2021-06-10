# Collision System

By default engine will provide collision detection of its own. using vectors and SAT collision Detection

## Calcalate by offset

instead of storing the boxes and updating them in the game loop, we can store the offsets and calculate the position based on the objects location.

offset + current pos = current polygon

## Collission 

on being detected a system event will be thrown for the collission.
It will be on the user to define the resolution system for collisions.


## SAT Collisions

requires center and 