Ext.define('Racloop.view.RelatedRequestViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.relatedRequestViewItem',
    xtype : 'relatedRequestViewItem',
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
            console.dir(record);

            var myStatus = record.get("myStatus");
            var myPairId = record.get("myPairId");
            userName = record.get("name");
            if (record.get("isDriver")){
                drivingText="Driving";
            }
            var date = new Date(record.get("dateOfJourney"));
            var day = Ext.Date.format(date, 'd');
            var month = Ext.Date.format(date, 'F');
            var time = Ext.Date.format(date, 'g:i A');
            var dateString = Ext.Date.format(date, 'j M, Y, g:i a');
            if(record.get("otherUser")!=null){
                imgSrc=record.get("photoUrl");
             }
             else {
                 imgSrc="http://www.gravatar.com/avatar/00000000000000000000000000000000?v=2&s=128";
             }
            var statusMarkup = '<span class="card-label card-label-blue">Active</span>';
            var buttonMarkup = '<button  class="racloop-btn racloop-btn-danger rejectButton"><span class="deleteCls"></span> Reject </button>  ' +
                '<button  class="racloop-btn racloop-btn-danger cancelButton"><span class="deleteCls"></span> Cancel </button>  '+
                '<button  class="racloop-btn racloop-btn-info acceptButton"><span class="acceptCls"></span> Accept </button>  '+
                '<button  class="racloop-btn racloop-btn-success callButton"><span class="mobileCls"></span> Call </button>';

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
                                <span class="card-time">  ' + statusMarkup + '</span>\
                            </div>\
                        </div>\
                    </div>\
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
    },
    initialize: function () {
        this.element.on({
            scope      : this,           
            tap        : 'rejectButtonTapFired',
            delegate   : 'button.rejectButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'acceptButtonTapFired',
            delegate   : 'button.acceptButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'cancelButtonTapFired',
            delegate   : 'button.cancelButton'
        });
          this.element.on({
             scope      : this,
             tap        : 'callButtonTapFired',
             delegate   : 'button.callButton'
         });
        this.callParent(arguments);

    },
    rejectButtonTapFired: function(e) {
        this.fireEvent('rejectButtonTap', this);
    },
    acceptButtonTapFired: function(e) {
        this.fireEvent('acceptButtonTap', this);
    },
    cancelButtonTapFired: function(e) {
        this.fireEvent('cancelButtonTap', this);
    },
    callButtonTapFired: function(e) {
        this.fireEvent('callButtonTap', this);
    }
});