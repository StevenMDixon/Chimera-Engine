# ECS 


Entities
    Keep references 
        to ID
        to Parent Container

Systems
    Keep reference to
        registered Entities, those that match required and excluded components
    
Components
    Keep reference to Parent Entity
    Values for component

Systems hold reference to cached entities