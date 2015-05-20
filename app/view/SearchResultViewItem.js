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
            //recordData = record.get("data");
            var dateOfJourney = new Date(record.get("dateOfJourney"));
            //var dateOfJourney = Ext.Date.add(dateUnadjusted, Ext.Date.MINUTE, dateUnadjusted.getTimezoneOffset());
            var dateString = Ext.Date.format(dateOfJourney, 'j M, Y, g:i a');
            var legend = "";
            var legendText = "";
            var buttonHtml = "";
            var labelHtml = "";
            var imgSrc = '';
            var cardControl = '';
            if (record.get("isDriver")) {
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
            } else {

            }
            cardControl = labelHtml + '<div><span class="card-control">' + buttonHtml + '</span></div>';
            if (record.get("photoUrl") != null) {
                imgSrc = record.get("photoUrl");
            }
            else {
                imgSrc = "http://www.gravatar.com/avatar/00000000000000000000000000000000?v=2&s=128&d=mm";
            }
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
                                    <h3>' + record.get("name") + '</h3>\
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
                                <span class="card-location"> &nbsp;<span class="fromCls"> </span>' + record.get("from") + '</span>\
                            </div>\
                            <div class="card-footer-row">\
                                <span class="card-location-label">To :</span>\
                                <span class="card-location"> &nbsp;<span class="toCls"> </span>' + record.get("to") + '</span>\
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