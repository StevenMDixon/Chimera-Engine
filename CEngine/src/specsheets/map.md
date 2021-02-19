# Map route

-> user defines settings
-> user defines scenes
    -> preload - user defines assets to load
    -> setup - user uses loaded assets to create entities
-> engine start
    -> loader loads global assets
    -> creates scenes
        -> using user provided scenes
        -> Event manager, ECS, Store
    -> loader load scene assets
-> engine run loop
    -> Update scene
    -> Render