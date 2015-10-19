
Ext.define('Racloop.view.HistoryViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.historyViewItem',
    xtype : 'historyViewItem',

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
            var drivingText = '';
            var recurringButton = '';
            var dateOfJourney = record.get("dateOfJourney");
            //var dateOfJourney = Ext.Date.add(dateUnadjusted, Ext.Date.MINUTE, dateUnadjusted.getTimezoneOffset());
            var day = Ext.Date.format(dateOfJourney, 'd');
            var month = Ext.Date.format(dateOfJourney, 'F');
            var time = Ext.Date.format(dateOfJourney, 'g:i A');
            var femaleOnlySearch = record.get("femaleOnlySearch");
            var myStatus = record.get("statusAsParent");
            var clockIcon = '';
            if(record.get('parentRecurringJourneyId')) {
                clockIcon = '<span class="timeCls">';
            }
            if(record.get("numberOfCopassengers")) {
                numberOfCopassengers = record.get("numberOfCopassengers");
            }
            if(record.get("isTaxi")) {
                drivingText = "Taxi";
            }
            else {
                drivingText = "Auto Rickshaw";
            }
            var statusMarkup = '<span class="card-label card-label-gray">' + drivingText + '</span>';
            if(femaleOnlySearch) statusMarkup = statusMarkup + '  <span class="card-label card-label-pink">Pink Ride</span>';
            if(!record.get('isRecurring')) {
                recurringButton = ' <button  class="racloop-btn racloop-btn-success racloop-btn-sm makeRecurringButton">Make Recurring</button>'
            }
            if(myStatus === "Cancelled") {
                statusMarkup = '<span class="card-label card-label-red">' + myStatus + '</span> ' + statusMarkup;
                recurringButton = '';
            }

            var html='<div class="card">\
            <div class="card-info">\
                <div class="card-date">\
                    <div class="card-day">'+day+'</div>\
                    <div class="card-month">'+month+'</div>\
                </div>\
                <div class="card-main">\
                    <div>\
                        <span class="card-time">'+ clockIcon + '</span>  '+time+'</span>\
                    </div>\
                    <div>\
                        '+statusMarkup+'\
                    </div>\
                </div>\
            </div>\
\
            <div class="card-footer">\
                <div class="card-footer-row">\
                    <span class="card-location-label">From : </span>\
                    <span class="card-location"> &nbsp;<span class="fromCls"> </span>'+record.get("from")+'</span>\
                </div>\
                <div class="card-footer-row">\
                    <span class="card-location-label">To : </span>\
                    <span class="card-location"> &nbsp;<span class="toCls"> </span>'+record.get("to")+' </span>\
                </div>\
                <div>\
                    <span class="card-control">\
                        '+recurringButton+' <button  class="racloop-btn racloop-btn-primary racloop-btn-sm searchAgainHistoryButton">Search Again</button>\
                     <button class="racloop-btn racloop-btn-primary racloop-btn-sm feedbackButton"> Feedback</button>\
                    </span>\
                </div>\
            </div>\
        </div>';
        me.down('#textCmp').setHtml(html);


        }

        me.callParent(arguments);
    },  
    initialize: function () {
        this.element.on({
            scope      : this,
            tap        : 'searchAgainHistoryButtonTapFired',
            delegate   : 'button.searchAgainHistoryButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'makeRecurringButtonTapFired',
            delegate   : 'button.makeRecurringButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'feedbackButtonTapFired',
            delegate   : 'button.feedbackButton'
        });
        this.callParent(arguments);

    },
    searchAgainHistoryButtonTapFired: function(e) {
        this.fireEvent('searchAgainHistoryButtonTap',this);
    },
    makeRecurringButtonTapFired: function(e) {
        this.fireEvent('makeRecurringButtonTap',this);
    },
    feedbackButtonTapFired: function(e) {
        this.fireEvent('feedbackButtonTap', this);
    }
});