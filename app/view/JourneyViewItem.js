
Ext.define('Racloop.view.JourneyViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.JourneyDataItem',

    config: {
        cls : 'journeyItem',
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'component',
            flex: 1,
            html: 'name',
            itemId: 'textCmp'            
        },
        // , {
        //     xtype: 'component',
        //     flex: 2,

        //     html: 'name',
        //     itemId: 'locCmp'
        // // }, 
        // {
        //     xtype: "button",
        //     ui: "action",
        //     text: "Requests",
        //     action: 'Incoming',
        //     iconCls: 'bell',
        //     iconMask: true,
        //     margin : 5,
        //     //padding : 5,
        //     itemId: 'incomingCmp',
        //     hidden: true
        // },

        //     {
        //         xtype: "button",
        //         ui: "action",
        //         text: "Responses",
        //         action: 'Outgoing',
        //         iconCls: 'chat',
        //         iconMask: true,
        //         margin : 5,
        //         //padding : 5,
        //         itemId: 'outgoingCmp',
        //         hidden: true
        //     }
        ]
    },

    updateRecord: function(record) {
        // Provide an implementation to update this container's child items
        var me = this;            
        if (record != null) {
            var matchedJourneyCount = 0;
            var requestedJourneyCount = 0;
            var drivingText = '';
            var day=Ext.Date.format(record.get("dateOfJourney"), 'd');
            var month=Ext.Date.format(record.get("dateOfJourney"), 'F');
            var time=Ext.Date.format(record.get("dateOfJourney"), 'g:i A');
            if(record.get("numberOfIncomingRequests")) {
                matchedJourneyCount = record.get("numberOfIncomingRequests");
            }
            if(record.get("numberOfOutgoingRequests")) {
                requestedJourneyCount = record.get("numberOfOutgoingRequests");
            }
            //console.log("............... : " + record.get("isDriver"))
            if(record.get("isDriver")) {
                drivingText = "Driving";
            }
            else {
                drivingText = "Need Lift";
            }

            // me.down('#textCmp').setHtml('<div class="content"><div class="journeyDate">' + Ext.Date.format(record.get("dateOfJourney"), 'd F Y') + '</br>' + Ext.Date.format(record.get("dateOfJourney"), 'g:i A') + '   <span class="isDriver">' + drivingText + '</span></div></div>');
            // me.down('#locCmp').setHtml('</div></div><div class="journeycontent"><div class="name"><strong>From : </strong>' + record.get("fromPlace") + '</div><div class="name"><strong>To : </strong>' + record.get("toPlace") + '</div>');
            // me.down('#incomingCmp').setText("Requests (" + matchedJourneyCount + ")");
            // me.down('#outgoingCmp').setText("Responses (" + requestedJourneyCount + ")");

            var html='<div class="card">\
            <div class="card-info">\
                <div class="card-date">\
                    <div class="card-day">'+day+'</div>\
                    <div class="card-month">'+month+'</div>\
                </div>\
                <div class="card-main">\
                    <div>\
                        <span class="card-time">'+time+'</span>\
                        <span class="card-label card-label-gray">'+drivingText+'</span>\
                    </div>\
                    <div>\
                        <span class="card-control">\
                            <button  class="card-button card-button-blue incomingBtn"><span class="bell x-list-icon x-icon-mask"></span>Incoming('+matchedJourneyCount+')</button>\
                            <button  class="card-button card-button-blue outgoingBtn">Outgoing('+requestedJourneyCount+')</button>\
                        </span>\
                    </div>\
                </div>\
            </div>\
\
            <div class="card-footer">\
                <div class="card-footer-row">\
                    <span class="card-location-label">From :</span>\
                    <span class="card-location">'+record.get("fromPlace")+'</span>\
                </div>\
                <div class="card-footer-row">\
                    <span class="card-location-label">To :</span>\
                    <span class="card-location">'+record.get("toPlace")+' </span>\
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
            tap        : 'fireBtnEvents',
            delegate   : 'button.incomingBtn'
        });
        this.element.on({
            scope      : this,
            tap        : 'fireBtnEvents',
            delegate   : 'button.outgoingBtn'
        });
        this.callParent(arguments);

    },
    fireBtnEvents: function(e){
        var incomingButton=this.down('#incomingCmp');
        var outgoingButton=this.down('#outgoingCmp');
          if (e.target.className.toLowerCase().indexOf("incomingbtn") > -1){
                this.fireEvent('myIncomingButtonTap',this);
          }
          else if (e.target.className.toLowerCase().indexOf("outgoingbtn") > -1){
                this.fireEvent('myOutgoingButtonTap',this);
          }
    }
});