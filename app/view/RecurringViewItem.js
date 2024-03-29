
Ext.define('Racloop.view.RecurringViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.recurringViewItem',
    xtype : 'recurringViewItem',

    config: {
        cls : 'journeyItem',
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'component',
            flex: 1,
            html: 'dummy',
            itemId: 'textCmp'            
        }]
    },

    updateRecord: function(record) {
        // Provide an implementation to update this container's child items
        var me = this;            
        if (record != null) {
            var numberOfCopassengers = 0;
            var matchedJourneyCount = 0;
            var requestedJourneyCount = 0;
            // var drivingText = '';
            var dateOfJourney = record.get("dateOfJourney");
            //var dateOfJourney = Ext.Date.add(dateUnadjusted, Ext.Date.MINUTE, dateUnadjusted.getTimezoneOffset());
            // var day = Ext.Date.format(dateOfJourney, 'd');
            // var month = Ext.Date.format(dateOfJourney, 'F');
            var time = Ext.Date.format(dateOfJourney, 'g:i A');
           
            var recurringDays = record.get("journeyRecurrence");
            recurringDays.sort();
            console.log("recurringDays : " + recurringDays.sort());
            var days = []; 
            var weekday=new Array(8);
            weekday[0]="None";
            weekday[1]="Monday";
            weekday[2]="Tuesday";
            weekday[3]="Wednesday";
            weekday[4]="Thursday";
            weekday[5]="Friday";
            weekday[6]="Saturday";
            weekday[7]="Sunday";
           
            for(var key in record.get("journeyRecurrence")){
                days.push(weekday[recurringDays[key]]);
            }
            var femaleOnlySearch = record.get("femaleOnlySearch");
            var status = '<span class="timeCls"></span>  '+time+'';
            if(femaleOnlySearch) status = status + '&nbsp;<span class="card-label card-label-pink">Pink Ride</span>'
            if(record.get("isTaxi")) {
                status = status + '&nbsp;<span class="card-label card-label-gray"> Taxi </span>'
            }
            else {
                status = status + '&nbsp;<span class="card-label card-label-gray"> Auto </span>'
            }    
            var html='<div class="card">\
            <div class="card-footer">\
                <div class="card-footer-row">\
                    <span class="card-location-label">Time : </span>\
                    <span class="card-location"> &nbsp; '+status+'</span>\
                </div>\
                <div class="card-footer-row">\
                    <span class="card-location-label">From : </span>\
                    <span class="card-location"> &nbsp;<span class="fromCls"> </span>'+record.get("from")+'</span>\
                </div>\
                <div class="card-footer-row">\
                    <span class="card-location-label">To : </span>\
                    <span class="card-location"> &nbsp;<span class="toCls"> </span>'+record.get("to")+' </span>\
                </div>\
                <div class="card-footer-row">\
                    <span class="card-location-label">Days : </span>\
                    <span class="card-location"> &nbsp;<span class="calendarCls"> </span>'+days.join(", ")+'</span>\
                </div>\
            </div>\
            <div>\
                <span class="card-control">\
                    <button  class="racloop-btn racloop-btn-danger racloop-btn-sm deleteRecurringButton">Delete</button>\
                </span>\
            </div>\
        </div>';
        me.down('#textCmp').setHtml(html);


        }

        me.callParent(arguments);
    },  
    initialize: function () {
        this.element.on({
            scope      : this,
            tap        : 'deleteRecurringButtonTapFired',
            delegate   : 'button.deleteRecurringButton'
        });
        this.callParent(arguments);

    },
    deleteRecurringButtonTapFired: function(e) {
        this.fireEvent('deleteRecurringButtonTap',this);
    }
});