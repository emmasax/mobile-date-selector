# jQuery plugin for mobile date input

[View the demo page](http://emmasax.github.io/mobile-date-selector/)
 
## What is this all about?

* A simple and intuitive date picker for mobile devices
* Useful if current date selector is a single input field
* Three select boxes will populate your original input field
* Contains a built in valid date checker
* [Configuration options](http://emmasax.github.io/mobile-date-selector/options.html)

## How do I use it?

### Step 1: Include files

At it's simplest you just need the jQuery library and the mobileDateSelector Javascript file:

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="[your-path]/jquery.mobiledateselector.min.js"></script>

There is an optional basic theme (the plugin will work without this):

    <link rel="stylesheet" href="[your-path]/mobile-date-selector.css" />

### Step 2: Add a class

Add a class your input field, e.g. 'datepicker':

    <input type="text" value="" class="datepicker" />

### Step 3: Initialise the plugin

Using the class you chose in step 2:

    $(function() {
      $('.datepicker').mobileDateSelector();
    });

View the [configuration options](http://emmasax.github.io/mobile-date-selector/options.html)

## Questions & suggestions?

Feel free to submit them via GitHub's issue tracker.