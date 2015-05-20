
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
            var dateOfJourney = record.get("dateOfJourney");
            //var dateOfJourney = Ext.Date.add(dateUnadjusted, Ext.Date.MINUTE, dateUnadjusted.getTimezoneOffset());
            var day = Ext.Date.format(dateOfJourney, 'd');
            var month = Ext.Date.format(dateOfJourney, 'F');
            var time = Ext.Date.format(dateOfJourney, 'g:i A');
            if(record.get("numberOfCopassengers")) {
                numberOfCopassengers = record.get("numberOfCopassengers");
            }
            if(record.get("isDriver")) {
                drivingText = "Car Owner";
            }
            else {
                drivingText = "Passenger";
            }

            var html='<div class="card">\
            <div class="card-info">\
                <div class="card-date">\
                    <div class="card-day">'+day+'</div>\
                    <div class="card-month">'+month+'</div>\
                </div>\
                <div class="card-main">\
                    <div>\
                        <span class="card-time"> <span class="timeCls"></span>  '+time+'</span>\
                        <div>\
                            <span class="card-control">\
                                <button  class="racloop-btn racloop-btn-primary searchAgainHistoryButton"><span class="searchCls"></span> Search Again</button>\
                            </span>\
                        </div>\
                    </div>\
                    <div>\
                        <span class="card-label card-label-blue">'+drivingText+'</span>\
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
        this.callParent(arguments);

    },
    searchAgainHistoryButtonTapFired: function(e) {
        this.fireEvent('searchAgainHistoryButtonTap',this);
    }
});