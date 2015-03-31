
Ext.define('Racloop.view.OutgoingRequestViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.outgoingRequestViewItem',
    xtype : 'outgoingRequestViewItem',

    config: {
        padding: 10,
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'component',
            flex: 1,
            html: 'name',
            itemId: 'textCmp'
        }]
    },

    updateRecord: function(record) {
        // Provide an implementation to update this container's child items
          var me = this;
          var html='';
          var userName="";
          var imgSrc="";
          var drivingText="Need Lift";
          var cardControl='';
        if (record != null) {
            var dateUnadjusted = new Date(record.get("workflow").requestedDateTime);
            var dateOfJourney = Ext.Date.add(dateUnadjusted, Ext.Date.MINUTE, dateUnadjusted.getTimezoneOffset());
            var day=Ext.Date.format(dateOfJourney, 'd');
            var month=Ext.Date.format(dateOfJourney, 'F');
            var time=Ext.Date.format(dateOfJourney, 'g:i A');
            userName=record.get("workflow").matchingUser;
            if (record.get("workflow").isRequesterDriving){
                drivingText="Driving";
            }
            if (record.get("workflow").state.toLowerCase().indexOf("accepted") > -1){
                mobile=record.get("otherUser").mobile;
                // state='<div class="name"><b>Status</b></div><div class="name">Accepted</div><div class="name">'+mobile+'</div>';
                // me.down('button[action="Accept"]').hide();
                cardMain='<div class="card-main">\
                            <div class="card-name">\
                                <h3>'+userName+'</h3>\
                            </div>\
                            <div>\
                                <span class="card-time">'+time+' </span>\
                                <span class="card-label card-label-gray">'+drivingText+'</span>\
                                <span class="card-label card-label-blue">Accepted</span>\
                                \
                                <span class="card-control">\
                                    <span class="card-mobile">'+mobile+'</span>\
                                    <a href="tel:'+mobile+'"  class="card-button card-button-blue" >Call </a>\
                                    <button class="racloop-btn racloop-btn-danger cancel"><span class="cancelCls"></span>  Cancel</button>\
                                </span>\
                            </div>\
                            <div>\
                            </div>\
                        </div>';
// <button class="card-button card-button-blue call">Call</button>\

            }
            else if(record.get("workflow").state.toLowerCase().indexOf("cancelled") > -1){
                // state='<div class="name"><b>Status</b></div><div class="name">' + record.get("workflow").state + '</div>'     
                // me.down('button[action="Reject"]').hide();
                cardMain='<div class="card-main">\
                            <div class="card-name">\
                                <h3>'+userName+'</h3>\
                            </div>\
                            <div>\
                                <span class="card-time">'+time+' </span>\
                                <span class="card-label card-label-gray">'+drivingText+'</span>\
                                <span class="card-label card-label-red">'+record.get("workflow").state+'</span>\
                            </div>\
                            <div>\
                            </div>\
                        </div>';

            }
            
            else {
                // cardControl='<span class="card-label card-label-red">'+record.get("workflow").state+'</span>';
                 cardMain='<div class="card-main">\
                            <div class="card-name">\
                                <h3>'+userName+'</h3>\
                            </div>\
                            <div>\
                                <span class="card-time">'+time+' </span>\
                                <span class="card-label card-label-gray">'+drivingText+'</span>\
                                <span class="card-label card-label-blue">'+record.get("workflow").state+'</span>\
                                  <span class="card-control">\
                                    <button class="racloop-btn racloop-btn-danger cancel"><span class="cancelCls"></span>  Cancel</button>\
                                </span>\
                            </div>\
                            <div>\
                            </div>\
                        </div>';
            }
            // me.down('#statusCmp').setHtml('<div class="name"><b>Status</b></div><div class="name">' + record.get("workflow").state + '</div>');
            if(record.get("otherUser")!=null){
                imgSrc=record.get("otherUser").photoUrl;
                // me.down('#imgCmp').setHtml('<img style="height: 60px; width: 60px; margin-right: 10px;" src="' + record.get("otherUser").photoUrl + '" />');
                // me.down('#textCmp').setHtml('<div class="content"><b>Name</b><div class="name">' + record.get("otherUser").fullName + '</div><div class="affiliation">' + Ext.Date.format(date, 'd/m/Y g:i A') + '</div></div>');
            }
            else {
                 imgSrc="http://www.gravatar.com/avatar/00000000000000000000000000000000?v=2&s=128&d=mm";
              // me.down('#textCmp').setHtml('<div class="content"><b>Name</b><div class="affiliation">' + Ext.Date.format(date, 'd/m/Y g:i A') + '</div></div>');   
            }
            // me.down('#locCmp').setHtml('</div></div><div class="journeycontent"><b>Route</b><div class="name">From :' + record.get("workflow").requestedFromPlace + '</div><div class="name">To :' + record.get("workflow").requestedToPlace + '</div>');
           // console.log('----------');
           // console.debug(record.get("otherUser"));
           //  if (record.get("otherUser").fullName!=null){
           //      userName=record.get("otherUser").fullName;
           //  }
           html='<div class="card">\
                <div class="card-info">\
                    <div class="image">\
                        <img src="'+imgSrc+'" alt="profile image" style="width:60px;"> </img>\
                    </div>\
                    <div class="card-date">\
                        <div class="card-day">'+day+'</div>\
                        <div class="card-month">'+month+'</div>\
                    </div>\
                    '+cardMain+'\
                </div>\
                <div class="card-footer">\
                    <div class="card-footer-row">\
                        <span class="card-location-label">From :</span>\
                        <span class="card-location">'+record.get("workflow").requestedFromPlace+'</span>\
                    </div>\
                    <div class="card-footer-row">\
                        <span class="card-location-label">To :</span>\
                        <span class="card-location">'+record.get("workflow").requestedToPlace+'</span>\
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
         
        this.callParent(arguments);

    },
    fireBtnEvents: function(e){
        var cancelButton=this.down('#cancelCmp');
          if (e.target.className.toLowerCase().indexOf("cancel") > -1){
                this.fireEvent('myCancelButtonTap',this);
          }
      }
});