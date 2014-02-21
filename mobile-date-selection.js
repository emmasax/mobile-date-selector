// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "mobileDateSelecti";

		// The actual plugin constructor
		function Plugin ( element, options ) {
      
    defaults = {
        // options
        showBlanks: true,
        errorMessage: "Sorry, that is not a valid date.",
        selectorClass: "mds-" + $(element).attr('class'),
        longMonths: true,
        numYears: 10,
        startYear: (new Date).getFullYear(),
        breakPoint: 568,
      
        // global variables
        day: "",
        month: "",
        year: "",
        monthNumber: "",
        wholeDate: "",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthsLong: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        years: [], 
        daysSelect: "",
        monthsSelect: "",
        yearsSelect: "",
        color: 'red'
      };
        
      
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		Plugin.prototype = {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.settings).
            
            $window = $(window);
            base = this;

            // set up years
            console.log(this.settings.showBlanks);
            
            if(this.settings.showBlanks) {
              this.settings.years.push("");
              this.settings.monthsShort.unshift("");
              this.settings.monthsLong.unshift("");
              this.settings.days.unshift("");
            }
            else {
              this.settings.years.push("Select");
              this.settings.monthsShort.unshift("Select");
              this.settings.monthsLong.unshift("Select");
              this.settings.days.unshift("Select");
            }
            
            for(i=0; i < this.settings.numYears; i++) {           
              this.settings.years.push(this.settings.startYear);
              this.settings.startYear++
            }

            // create dom
            var months = (this.settings.longMonths ? this.settings.monthsLong : this.settings.monthsShort);

            daysOptions = "", monthsOptions = "", yearsOptions = "";
            for(i=0; i < this.settings.days.length; i++) { 
              daysOptions += "<option>" + this.settings.days[i] + "</option>";
            }
            for(i=0; i < months.length; i++) { 
              monthsOptions += "<option value='" + i + "'>" + months[i] + "</option>";
            }
            for(i=0; i < this.settings.years.length; i++) { 
              yearsOptions += "<option>" + this.settings.years[i] + "</option>";
            }
            daysSelect = '<label for="day">Date</label><select id="day">' + daysOptions + '</select>';
            monthsSelect = '<label for="month">Month</label><select id="month">' + monthsOptions + '</select>';
            yearsSelect = '<label for="year">Year</label><select id="year">' + yearsOptions + '</select>';
            
            $window.resize(function() {
              base.addToPage(this.element, this.settings)
            })
            this.addToPage(this.element, this.settings)

				},
				addToPage: function () {
          var mobileDateSelector = $('.' + this.settings.selectorClass),
              elementLabel = $('label[for=' + $(this.element).attr('id') + ']'),
              base = this;
          
          if ($window.width() < this.settings.breakPoint) {
            if($('.'+this.settings.selectorClass).length == 0) {
              elementLabel.hide();
              $(this.element).hide().after('<ul class="mds-mobile-date ' + this.settings.selectorClass + '"><li>' + daysSelect + '</li><li>' + monthsSelect + '</li><li>' + yearsSelect + '</li></ul>');
                
              $('.' + this.settings.selectorClass + ' select#day').on('change', function() {
                base.buildDayDate(base.element, base.settings);
              });
              $('.' + this.settings.selectorClass + ' select#month').on('change', function() {
                base.buildMonthDate(base.element, base.settings);
              });
              $('.' + this.settings.selectorClass + ' select#year').on('change', function() {
                base.buildYearDate(base.element, base.settings);
              });
            }
          }
          else {
            $(this.element).show();
            elementLabel.show();
            mobileDateSelector.remove();
            $('.' + this.settings.selectorClass + '-error').remove();
          }
          
				},
        buildDayDate: function() {
          this.settings.day = $('.' + this.settings.selectorClass + ' select#day').find(":selected").val();
          this.setDate();
        },
    
        buildMonthDate: function() {
          this.settings.month = $('.' + this.settings.selectorClass + ' select#month').find(":selected").text();
          this.settings.monthNumber = $('.' + this.settings.selectorClass + ' select#month').find(":selected").val();
          this.setDate();
        },
    
        buildYearDate: function() {
          this.settings.year = $('.' + this.settings.selectorClass + ' select#year').find(":selected").text();
          this.setDate();
        },
    
        setDate: function() {
          this.settings.wholeDate = this.settings.day + " " + this.settings.month + " " + this.settings.year;
          $('.' + this.settings.selectorClass + '-error').remove();
          if( this.settings.day != '' && this.settings.month != '' && this.settings.year != '') {
            if(this.isValidDate(this.settings.day + " " + this.settings.monthNumber + " " + this.settings.year)) {
              $(this.element).val(this.settings.wholeDate);
            }
            else {
              $('.' + this.settings.selectorClass).after('<div class="' + this.settings.selectorClass + '-error">'+this.settings.errorMessage+'</div');
            }
          }
        },
    
        isValidDate: function(s) {
          var bits = s.split(' ');
          var y = bits[2], m  = bits[1], d = bits[0];
          console.log(y + " " + m + " " + d);
          var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
          if ( (!(y % 4) && y % 100) || !(y % 400)) {
            daysInMonth[1] = 29;
          }
          return d <= daysInMonth[--m]
        }
    
        
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});

				// chain jQuery functions
				return this;
		};

})( jQuery, window, document );
