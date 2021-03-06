/**
 * MobileDateSelector v0.0.1 - 
 * http://emmasax.github.io/mobile-date-selector/ - An intuitive date picker for mobile devices.
 *
 * Copyright 2014, Emma Patricios - http://punkchip.com
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
;(function ( $, window, document, undefined ) {

	var pluginName = "mobileDateSelector";

	function Plugin ( element, options ) {
    defaults = {
      // options
      showBlanks: true,
      errorMessage: "Sorry, that is not a valid date.",
      selectorClass: "mds-" + $(element).attr('class').replace(/\s/g, '-') + "-" + $(element).index(),
      longMonths: true,
      numYears: 10,
      startYear: (new Date).getFullYear(),
      breakPoint: 568,
      selectWrapper: "",
      forcePlugin: false,
      demoMode: false,
    
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
      yearsSelect: ""
    };
		this.element = element;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;

    // check if we're going to use the plugin or not
    var i = document.createElement("input");
    i.setAttribute("type", "date");

    if(this.settings.forcePlugin || i.type == "text") {
      this.init();
    } 
	}

	Plugin.prototype = {
		init: function () {
		  
      var $window = $(window),
          base = this;

      // set up years
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
      this.settings.daysSelect = '<label for="day">Date</label><select id="mds-day">' + daysOptions + '</select>';
      this.settings.monthsSelect = '<label for="month">Month</label><select id="mds-month">' + monthsOptions + '</select>';
      this.settings.yearsSelect = '<label for="year">Year</label><select id="mds-year">' + yearsOptions + '</select>';

      
      $window.resize(function() {
        base.addToPage(base.element, base.settings);
      })
      this.addToPage(this.element, this.settings);

	  },
		addToPage: function () {
      var mobileDateSelector = $('.' + this.settings.selectorClass),
          elementLabel = $('label[for=' + $(this.element).attr('id') + ']'),
          base = this,
          $window = $(window);
          
      if ($window.width() < this.settings.breakPoint) {
        if(mobileDateSelector.length == 0) {
          elementLabel.hide();
          if(!this.settings.demoMode) {
            $(this.element).hide();
          }
          $(this.element).after('<ul class="mds-mobile-date ' + this.settings.selectorClass + '"><li>' + this.settings.daysSelect + '</li><li>' + this.settings.monthsSelect + '</li><li>' + this.settings.yearsSelect + '</li></ul>');
          
          if(this.settings.selectWrapper != '') {
            $('#mds-day').wrap("<div class='" + this.settings.selectWrapper + "'></div>");
            $('#mds-month').wrap("<div class='" + this.settings.selectWrapper + "'></div>");
            $('#mds-year').wrap("<div class='" + this.settings.selectWrapper + "'></div>");            
          }
          
          $('.' + this.settings.selectorClass + ' select#mds-day').on('change', function() {
            base.buildDayDate(base.element, base.settings);
          });
          $('.' + this.settings.selectorClass + ' select#mds-month').on('change', function() {
            base.buildMonthDate(base.element, base.settings);
          });
          $('.' + this.settings.selectorClass + ' select#mds-year').on('change', function() {
            base.buildYearDate(base.element, base.settings);
          });
        }
      }
      else {
        if(mobileDateSelector.length > 0) {              
          $(this.element).show();
          elementLabel.show();
          mobileDateSelector.remove();
          $('.' + this.settings.selectorClass + '-error').remove();
        }
      }
      
		},
    buildDayDate: function() {
      this.settings.day = $('.' + this.settings.selectorClass + ' select#mds-day').find(":selected").val();
      if(this.settings.day < 10) this.settings.day = '0'+this.settings.day;
      this.setDate();
    },

    buildMonthDate: function() {
      this.settings.month = $('.' + this.settings.selectorClass + ' select#mds-month').find(":selected").text();
      this.settings.monthNumber = $('.' + this.settings.selectorClass + ' select#mds-month').find(":selected").val();
      if(this.settings.monthNumber < 10) this.settings.monthNumber = '0'+this.settings.monthNumber;
      this.setDate();
    },

    buildYearDate: function() {
      this.settings.year = $('.' + this.settings.selectorClass + ' select#mds-year').find(":selected").text();
      this.setDate();
    },

    setDate: function() {
      this.settings.wholeDate = this.settings.year + "-" + this.settings.monthNumber + "-" + this.settings.day;
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
      var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
      if ( (!(y % 4) && y % 100) || !(y % 400)) {
        daysInMonth[1] = 29;
      }
      return d <= daysInMonth[--m]
    }      
	};

	$.fn[ pluginName ] = function ( options ) {
  	this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
  	});

		return this;
	};

})( jQuery, window, document );