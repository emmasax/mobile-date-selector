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

    &lt;script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"&gt;&lt;/script&gt;
    &lt;script src="[your-path]/mobile-date-selection.js"&gt;&lt;/script&gt;

There is also a basic theme:

    &lt;link rel="stylesheet" href="[your-path]/mobile-date-selection.css" /&gt;

### Step 2: Add a class

Add a class of "datepicker" to your input field:

    &lt;input type="text" value="" class="datepicker" /&gt;

### Step 3: Initialise the plugin
    $(function() {
        $('.datepicker').mobileDateSelection();
    });