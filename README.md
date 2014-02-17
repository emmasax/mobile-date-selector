# A jQuery plugin for mobile date input

## What is this all about?

* Solution to entering dates on mobile devices
* Single input date for desktop
* More intuitive dropdowns for mobile
* Dropdowns populate original input field
* [Configuration options](options.html)

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

# To do

## Ability to enable test mode
A flag to output the date to the screen for debugging purposes.
