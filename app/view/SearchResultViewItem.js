Ext.define('Racloop.view.SearchResultViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.searchResultViewItem',
    xtype: 'searchResultViewItem',

    config: {
        padding: 10,
        layout: {
            type: 'hbox'
        },
        align: 'center',
        pack: 'center',
        cls: 'journeyItem',
        items: [
            {
                xtype: 'component',
                flex: 2,
                html: 'name',
                itemId: 'textCmp',
                itemCls: 'dataItem'
            }
        ]
    },

    updateRecord: function (record) {
        // Provide an implementation to update this container's child items
        var recordData = "";
        var me = this;
        var html = '';
        var drivingText = '';
        if (record != null) {
            recordData = record.get("matchedJourney");
            var date = new Date(recordData.dateOfJourney);
            var dateString = Ext.Date.format(date, 'j M, Y, g:i a');
            var legend = "";
            var legendText = "";
            var buttonHtml = "";
            var labelHtml = "";
            var day = Ext.Date.format(date, 'd');
            var month = Ext.Date.format(date, 'F');
            var time = Ext.Date.format(date, 'g:i A');
            var imgSrc = '';
            var cardControl = '';
            if (recordData.isDriver) {
                legend = "C";
                legendText = "Car Owner";
                buttonHtml = '<button class="racloop-btn racloop-btn-primary confirmSearchRequestButton"><span class="requestRideCls"></span> Request</</button>';
            }
            else {
                legend = "P";
                legendText = "Passenger";
                buttonHtml = '<button class="racloop-btn racloop-btn-primary confirmSearchRequestButton"><span class="askToJoinCls"></span> Invite</</button>';
            }
            if (record.get("workflow") != null) {
                if (record.get("workflow").state.toLowerCase().indexOf("new") > -1) {
                    buttonHtml = '<button class="racloop-btn racloop-btn-warning cancelSearchRequestButton">Cancel</button>';
                    labelHtml = '<span class="card-label card-label-green">' + record.get("workflow").state + '</span>';

                    cardControl = '<span class="card-label card-label-green">' + record.get("workflow").state + '</span>\
                                <span class="card-control">\
                                <button class="racloop-btn racloop-btn-warning cancelSearchRequestButton">Cancel</button>\
                                </span>';
                }
                else if (record.get("workflow").state.toLowerCase().indexOf("cancelled") > -1) {
                    buttonHtml = "";
                    labelHtml = '<span class="card-label card-button-red">' + record.get("workflow").state + '</span>';

                    cardControl = '<span class="card-label card-button-red">' + record.get("workflow").state + '</span>';
                } else if (record.get("workflow").state.toLowerCase().indexOf("accepted") > -1) {
                    buttonHtml = "";
                    labelHtml = '<span class="card-label card-label-blue">' + record.get("workflow").state + '</span>';

                    cardControl = '<span class="card-label card-label-blue">' + record.get("workflow").state + '</span>';
                } else if (record.get("workflow").state.toLowerCase().indexOf("rejected") > -1) {
                    buttonHtml = "";
                    labelHtml = '<span class="card-label card-button-red">' + record.get("workflow").state + '</span>';

                    cardControl = '<span class="card-label card-button-red">' + record.get("workflow").state + '</span>';
                }

//                else {
//                    if (recordData.isDriver) {
//                        // me.down('button[action="Request"]').setText("Request");
//                        legend = "C";
//                        legendText = "Car Owner";
//                        drivingText = "Car Owner";
//                        cardControl = '<span class="card-label card-label-green">' + record.get("workflow").state + '</span>\
//                                <span class="card-control">\
//                                <button class="racloop-btn racloop-btn-primary confirmSearchRequestButton"><span class="requestRideCls"></span> Request a Ride</</button>\
//                                </span>';
//                    } else {
//                        // me.down('button[action="Request"]').setText("Ask for Drive");
//                        legend = "P";
//                        legendText = "Passenger";
//                        drivingText = "Passenger";
//                        cardControl = '<span class="card-label card-label-green">' + record.get("workflow").state + '</span>\
//                                <span class="card-control">\
//                                <button class="racloop-btn racloop-btn-primary confirmSearchRequestButton"><span class="askToJoinCls"></span> Ask to Join</button>\
//                                </span>';
//                    }
//                }
            } else {
//                if (recordData.isDriver) {
//                    // me.down('button[action="Request"]').setText("Request");
//                    legend = "C";
//                    legendText = "Car Owner";
//                    drivingText = "Car Owner";
//                    cardControl = '<span class="card-control">\
//                                <button class="racloop-btn racloop-btn-primary confirmSearchRequestButton"><span class="requestRideCls"></span> Request Ride</button>\
//                                </span>';
//                } else {
//                    // me.down('button[action="Request"]').setText("Offer a Ride");
//                    legend = "P";
//                    legendText = "Passenger";
//                    drivingText = "Passenger";
//                    drivingText = "Ride Seeker";
//                    cardControl = '<span class="card-control">\
//                                <button class="racloop-btn racloop-btn-primary confirmSearchRequestButton"><span class="askToJoinCls"></span> Ask to Join</button>\
//                                </span>';
//                }
            }
            cardControl = labelHtml + '<div><span class="card-control">' + buttonHtml + '</span></div>';
            if (recordData.photoUrl != null) {
                // me.down('#imgCmp').setHtml('<img style="height: 60px; width: 60px; margin-right:10px;" src="' + recordData.photoUrl + '" />');
                imgSrc = recordData.photoUrl;
            }
            else {
                // me.down('#textCmp').setHtml('<div class="content"><b>Name</b><div class="affiliation">' + Ext.Date.format(date, 'd/m/Y g:i A') + '</div></div>');
                imgSrc = "http://www.gravatar.com/avatar/00000000000000000000000000000000?v=2&s=128";
            }
            // me.down('#textCmp').setHtml('<div class="searchcontent"><div class="content"><div class="name"><strong>' + recordData.name + '</strong></div><div class="journeyDate">' + Ext.Date.format(new Date(recordData.dateOfJourney), 'd/m/Y g:i A') + '</div></div></div>');
            // me.down('#locCmp').setHtml('<div class="searchcontent"><div class="content"><div class="name"><strong>From : </strong><i>' + recordData.fromPlace + '</i></div><div class="name"><strong>To :</strong> <i>' + recordData.toPlace + '</i></div></div></div>');
            html = '<div class="card">\
                        <div class="card-info">\
                            <div class="image">\
                                <img src="' + imgSrc + '" alt="profile image" style="width:60px;"> </img>\
                            </div>\
                            <div class="card-date">\
                                <div class="card-day">' + legend + '</div>\
                                <div class="card-month">' + legendText + '</div>\
                            </div>\
                            <div class="card-main">\
                                <div class="card-name">\
                                    <h3>' + recordData.name + '</h3>\
                                </div>\
                                <div>\
                                    <span class="card-time"> <span class="calendarCls"></span>  ' + dateString + '</span>\
                                    ' + cardControl + '\
                                </div>\
                                <div>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="card-footer">\
                            <div class="card-footer-row">\
                                <span class="card-location-label">From :</span>\
                                <span class="card-location"> &nbsp;<span class="fromCls"> </span>' + recordData.fromPlace + '</span>\
                            </div>\
                            <div class="card-footer-row">\
                                <span class="card-location-label">To :</span>\
                                <span class="card-location"> &nbsp;<span class="toCls"> </span>' + recordData.toPlace + '</span>\
                            </div>\
                        </div>\
                    </div>';
            me.down('#textCmp').setHtml(html);
        }
        me.callParent(arguments);
    },
    initialize: function () {
        this.element.on({
            scope: this,
            tap: 'confirmSearchRequestButtonTapFired',
            delegate: 'button.confirmSearchRequestButton'
        });
        this.element.on({
            scope: this,
            tap: 'cancelSearchRequestButtonTapFired',
            delegate: 'button.cancelSearchRequestButton'
        });

        this.callParent(arguments);

    },
    confirmSearchRequestButtonTapFired: function(e) {
        this.fireEvent('confirmSearchRequestButtonTap', this);
    },
    cancelSearchRequestButtonTapFired: function(e) {
        this.fireEvent('cancelSearchRequestButtonTap', this);
    },
    fireBtnEvents: function (e) {
        var cancelButton = this.down('#CancelButton');
        var requestButton = this.down('#RequestButton');
        if (e.target.className.toLowerCase().indexOf("cancel") > -1) {
            this.fireEvent('myCancelButtonTap', this);
            // cancelButton.fireEvent('tap',cancelButton);
        }
        else if (e.target.className.toLowerCase().indexOf("request") > -1) {
            this.fireEvent('myRequestButtonTap', this);
            // requestButton.fireEvent('tap',requestButton);
        }
    }
});