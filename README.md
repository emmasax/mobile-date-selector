# A jQuery plugin for mobile date input

An intuitive date picker for mobile devices.

[View the demo page](http://emmasax.github.io/mobile-date-selector/)

## What is this all about?

* Use in conjunction with a single input field for desktop
* The three select boxes will populate your original input field
* [Configuration options](http://emmasax.github.io/mobile-date-selector/options.html)

## How do I use it?
### Step 1: Include files

At it's simplest you just need the jQuery library and the mobileDateSelection Javascript file:

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="[your-path]/mobile-date-selection.js"></script>

There is also a basic theme:

    <link rel="stylesheet" href="[your-path]/mobile-date-selection.css" />

### Step 2: Add a class

Add a class of "datepicker" to your input field:

    <input type="text" value="" class="datepicker" />

### Step 3: Initialise the plugin
    $(function() {
        $('.datepicker').mobileDateSelection();
    });

## To do list

1. Make a stand-alone demo

2. Ability to enable test mode
A flag to output the date to the screen for debugging purposes.

3. Tidy up plugin code!
