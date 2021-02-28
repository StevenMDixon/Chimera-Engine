# Inputs

Games are no fun with out being able to use inputs...

## Ideas

    - each scene will need a input system
    - onclick key events will need to be declare once? sounds like a manager needs to be created...
    - anything can be a button or receive inputs... just add a component like Button/Controller...
    - we may need to build out the event system first

## example

- key press listener is created
- user pressed key
- key press is registered to all components in current scene listening for key presses (how?)
    - event? 
    - core registers to event listener for _input or _click type events? and passes those events to current scenes event manager?
- system updates all Entities/components based on inputs 
