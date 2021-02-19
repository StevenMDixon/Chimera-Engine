# ECS

the entity component system handles entities as a store
    - creates a ecs system for each scene
        - seperate system lists for each scene?
        - global systems? used for all scenes
            - controller system
            - collision system
            - Pixi Systems?
            - user defined systems


# Event system

creates an event system for each scene
    - events are passed only into current scene
    - global system events?

# Store 

creates a store for each scene
    - scenes have access to global scene if needed
    
# Scenes
scenes are the main component of the engine

required functionality:

1. Store
    keep track of variables and settings
2. ECS
    entity system to manage items
        - Create entities 
        - Delete entities
        - Add systems
        - remove systems
3. Loader
    can be user defined if needed
4. Event Manager for local 
    event manager receives events for global items

