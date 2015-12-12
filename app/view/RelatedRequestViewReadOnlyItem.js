Ext.define('Racloop.view.RelatedRequestViewReadOnlyItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.relatedRequestViewReadOnlyItem',
    xtype : 'relatedRequestViewReadOnlyItem',
    config: {
        padding: 10,
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'component',
            flex: 1,
            html: 'Name',
            itemId: 'textCmp'
        }]
    },

    updateRecord: function(record) {
        // Provide an implementation to update this container's child items
        var me = this;
        var userName = "";
        var imgSrc = "";
        var html = "";
        var drivingText="Need Lift";
        var cardMain = "";
        if (record != null) {
            var myStatus = record.get("myStatus");
            var myPairId = record.get("myPairId");
            userName = record.get("name");
            if (record.get("isDriver")){
                drivingText="Provider";
            }
            else {
                drivingText="Seeker";
            }
            var date = new Date(record.get("dateOfJourney"));
            var day = Ext.Date.format(date, 'd');
            var month = Ext.Date.format(date, 'F');
            var time = Ext.Date.format(date, 'g:i A');
            var dateString = Ext.Date.format(date, 'j M, Y, g:i a');
            if(record.get("photoUrl")!=null){
                imgSrc=record.get("photoUrl");
             }
             else {
                 imgSrc="http://www.gravatar.com/avatar/00000000000000000000000000000000?v=2&s=128&d=mm";
             }
            var statusMarkup = '';
            var buttonMarkup = '';
            html=
                '<div class="card">\
                    <div class="card-info">\
                        <div class="image">\
                            <img src="'+imgSrc+'" alt="profile image" style="width:60px;"> </img>\
                        </div>\
                        <div class="card-date">\
                            <div class="card-day">'+day+'</div>\
                            <div class="card-month">'+month+'</div>\
                        </div>\
                        <div class="card-main">\
                            <div class="card-name">\
                                <h3>' + record.get("name") + '</h3>\
                            </div>\
                            <div>\
                                <span class="card-time"> <span class="calendarCls"></span>  ' + dateString + '</span>\
                            </div>\
                            <div>\
                                <span class="card-time">  ' + statusMarkup + '</span>\
                            </div>\
                        </div>\
                    </div>\
                    \
                    <div class="card-footer">\
                        <div class="card-footer-row">\
                            <span class="card-location-label">From :</span>\
                            <span class="card-location"> &nbsp;<span class="fromCls"> </span> '+record.get("from")+'</span>\
                        </div>\
                        <div class="card-footer-row">\
                            <span class="card-location-label">To :</span>\
                            <span class="card-location"> &nbsp;<span class="toCls"> </span> '+record.get("to")+'</span>\
                        </div>\
                        <div>\
                            <span class="card-control">\
                                ' + buttonMarkup + '\
                            </span>\
                        </div>\
                    </div>\
                </div>';
            me.down('#textCmp').setHtml(html);
        }
        me.callParent(arguments);
    }
});