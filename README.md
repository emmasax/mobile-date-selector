# jQuery plugin for mobile date input

[View the demo page](http://emmasax.github.io/mobile-date-selector/)
 
## What is this all about?

* A simple and intuitive date picker for mobile devices
* HTML5 input type date is not widely supported
* Enabled when HTML5 input type date is not detected (can be overridden)
* Three select boxes will populate your original date field
* Contains a built in valid date checker, for example 31 February 2016 is invalid
* Many [configuration options](http://emmasax.github.io/mobile-date-selector/options.html) are available

## How do I use it?

### Step 1: Include files

At it's simplest you just need the jQuery library and the mobileDateSelector Javascript file:

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="[your-path]/jquery.mobiledateselector.min.js"></script>

There is an optional basic theme (the plugin will work without this):

    <link rel="stylesheet" href="[your-path]/mobile-date-selector.css" />

### Step 2: Add a class

Add a class to your date field, e.g. 'datepicker':

    <input type="date" value="" class="datepicker" />

### Step 3: Initialise the plugin

Using the class you chose in step 2:

    $(function() {
      $('.datepicker').mobileDateSelector();
    });

View the [configuration options](http://emmasax.github.io/mobile-date-selector/options.html)

## Questions & suggestions?

Feel free to submit them via GitHub's issue tracker.