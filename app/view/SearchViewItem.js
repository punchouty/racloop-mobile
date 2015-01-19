
Ext.define('Racloop.view.SearchViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.SearchDataItem',

    config: {
        padding: 10,
        layout: {
            type: 'hbox'
        },
        align: 'center',
        pack:'center',
        cls : 'journeyItem',
        items: [
        // {
        //     xtype: 'component',
        //     html: '<img style="height: 60px; width: 60px; margin-right:10px;" src="http://www.gravatar.com/avatar/00000000000000000000000000000000?v=2&s=128" />',
        //     itemId: 'imgCmp'
        // }, 
        {
            xtype: 'component',
            flex: 2,
            html: 'name',
            itemId: 'textCmp',
            itemCls: 'dataItem'
        },
        //  {
        //     xtype: 'component',
        //     flex: 4,
        //     html: 'name',
        //     itemId: 'locCmp',
        //     itemCls: 'dataItem'
        // },
        //  {
        //     xtype: 'button',
        //     text: 'Request',
        //     ui: 'action',
        //     action: 'Request',
        //     itemId: 'RequestButton',
        //     itemCls: 'dataItem',
        //     hidden:true
        // },{
        //     xtype: 'button',
        //     text: "Cancel", // this is working as title of buttons are different
        //     itemId: 'CancelButton',
        //     itemCls: 'dataItem',
        //     action: 'CancelRequest',
        //     ui: 'action',
        //     hidden: true
        // }
        ]
    },

    updateRecord: function(record) {
        // Provide an implementation to update this container's child items
       var recordData="";
        var me = this;
        var html='';
        var drivingText = '';
        if (record != null) {
            recordData =record.get("matchedJourney");
            var date=new Date(recordData.dateOfJourney);
            var day=Ext.Date.format(date, 'd');
            var month=Ext.Date.format(date, 'F');
            var time=Ext.Date.format(date, 'g:i A');
            var imgSrc='';
            var cardControl='';
            //me.down('button').setText(record.get('button'));
            if(record.get("workflow")!=null){
                // alert("----"+record.get("workflow").state);
                if (record.get("workflow").state.toLowerCase().indexOf("new") > -1 ){
                    // me.down('button[action="Request"]').setText("Requested");
                    // me.down('button[action="Request"]').disable();
                    // me.down('button[action="CancelRequest"]').setHidden(false);
                   cardControl= '<span class="card-label card-label-green">'+record.get("workflow").state+'</span>\
                                <span class="card-control">\
                                <button class="card-button card-button-red cancel">Cancel</button>\
                                </span>';
                }
                else if (record.get("workflow").state.toLowerCase().indexOf("cancelled") > -1) {
                  cardControl= '<span class="card-label card-button-red">'+record.get("workflow").state+'</span>';
                    // me.down('button[action="Request"]').setText("Cancelled");
                    // me.down('button[action="Request"]').disable();
                }else if (record.get("workflow").state.toLowerCase().indexOf("accepted") > -1) {
                   cardControl= '<span class="card-label card-label-blue">'+record.get("workflow").state+'</span>';
                    // me.down('button[action="Request"]').setText("Accepted");
                    // me.down('button[action="Request"]').disable();
                }else if (record.get("workflow").state.toLowerCase().indexOf("rejected") > -1) {
                 cardControl= '<span class="card-label card-button-red">'+record.get("workflow").state+'</span>';
                    // me.down('button[action="Request"]').setText("Rejected");
                    // me.down('button[action="Request"]').disable();
                }

                else {
                    if (recordData.isDriver) {
                        // me.down('button[action="Request"]').setText("Request");
                        drivingText="Driving";
                        cardControl= '<span class="card-label card-label-green">'+record.get("workflow").state+'</span>\
                                <span class="card-control">\
                                <button class="card-button card-label-blue request">Ask for Driver</button>\
                                </span>';
                    } else {
                        // me.down('button[action="Request"]').setText("Ask for Drive");
                        drivingText="Need Lift";
                        cardControl= '<span class="card-label card-label-green">'+record.get("workflow").state+'</span>\
                                <span class="card-control">\
                                <button class="card-button card-label-blue request">Request a Ride</button>\
                                </span>';
                    }
                }
            }else {
                if (recordData.isDriver) {
                    // me.down('button[action="Request"]').setText("Request");
                    drivingText="Driving";
                    cardControl= '<span class="card-control">\
                                <button class="card-button card-label-blue request">Need a Lift</button>\
                                </span>';
                } else {
                    // me.down('button[action="Request"]').setText("Offer a Ride");
                    drivingText="Need Lift";
                    cardControl= '<span class="card-control">\
                                <button class="card-button card-label-blue request">Request a Ride</button>\
                                </span>';
                }
            }
            if (recordData.photoUrl!=null){
                // me.down('#imgCmp').setHtml('<img style="height: 60px; width: 60px; margin-right:10px;" src="' + recordData.photoUrl + '" />');
                imgSrc=recordData.photoUrl;
             }
           else {
                 // me.down('#textCmp').setHtml('<div class="content"><b>Name</b><div class="affiliation">' + Ext.Date.format(date, 'd/m/Y g:i A') + '</div></div>');   
                imgSrc="http://www.gravatar.com/avatar/00000000000000000000000000000000?v=2&s=128";
            }
            // me.down('#textCmp').setHtml('<div class="searchcontent"><div class="content"><div class="name"><strong>' + recordData.name + '</strong></div><div class="journeyDate">' + Ext.Date.format(new Date(recordData.dateOfJourney), 'd/m/Y g:i A') + '</div></div></div>');
            // me.down('#locCmp').setHtml('<div class="searchcontent"><div class="content"><div class="name"><strong>From : </strong><i>' + recordData.fromPlace + '</i></div><div class="name"><strong>To :</strong> <i>' + recordData.toPlace + '</i></div></div></div>');
            html='<div class="card">\
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
                            <h3>'+recordData.name+'</h3>\
                        </div>\
                        <div>\
                            <span class="card-time">'+time+'</span>\
                            <span class="card-label card-label-gray">'+drivingText+'</span>\
                            '+cardControl+'\
                        </div>\
                        <div>\
                        </div>\
                    </div>\
                </div>\
                <div class="card-footer">\
                    <div class="card-footer-row">\
                        <span class="card-location-label">From :</span>\
                        <span class="card-location">'+recordData.fromPlace+'</span>\
                    </div>\
                    <div class="card-footer-row">\
                        <span class="card-location-label">To :</span>\
                        <span class="card-location">'+recordData.toPlace+'</span>\
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
            delegate   : 'button.cancel'
        });
        this.element.on({
            scope      : this,           
            tap        : 'fireBtnEvents',
            delegate   : 'button.request'
        });
         
        this.callParent(arguments);

    },
    fireBtnEvents: function(e){
        var cancelButton=this.down('#CancelButton');
        var requestButton=this.down('#RequestButton');
          if (e.target.className.toLowerCase().indexOf("cancel") > -1){
            this.fireEvent('myCancelButtonTap', this);
                // cancelButton.fireEvent('tap',cancelButton);
          }
          else if (e.target.className.toLowerCase().indexOf("request") > -1){
            this.fireEvent('myRequestButtonTap', this);
                // requestButton.fireEvent('tap',requestButton);
          }
      }
});