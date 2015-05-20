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
            userName = record.get("name");
            if (record.get("isDriver")){
                drivingText="Driving";
            }
            var date = new Date(record.get("dateOfJourney"));
            var day = Ext.Date.format(date, 'd');
            var month = Ext.Date.format(date, 'F');
            var time = Ext.Date.format(date, 'g:i A');
            /*
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
                                    <button class="racloop-btn racloop-btn-danger reject"><span class="rejectCls"></span> Reject</button>\
                                </span>\
                            </div>\
                            <div>\
                            </div>\
                        </div>';
// <button class="card-button card-button-blue call">Call</button>\

            }
            else if(record.get("workflow").state.toLowerCase().indexOf("rejected") > -1){
                // state='<div class="name"><b>Status</b></div><div class="name">' + record.get("workflow").state + '</div>'     
                // me.down('button[action="Reject"]').hide();
                cardMain='<div class="card-main">\
                            <div class="card-name">\
                                <h3>'+userName+'</h3>\
                            </div>\
                            <div>\
                                <span class="card-time">'+time+' </span>\
                                <span class="card-label card-label-gray">'+drivingText+'</span>\
                                <span class="card-label card-label-red">Rejected</span>\
                            </div>\
                            <div>\
                            </div>\
                        </div>';

            }
            else {
                // state='<div class="name"><b>Status</b></div><div class="name">' + record.get("workflow").state + '</div>'
                cardMain='<div class="card-main">\
                            <div class="card-name">\
                                <h3>'+userName+'</h3>\
                            </div>\
                            <div>\
                                <span class="card-time">'+time+' </span>\
                                <span class="card-label card-label-gray">'+drivingText+'</span>\
                                <span class="card-label card-label-green">New</span>\
                                <span class="card-control">\
                                    <button class="racloop-btn racloop-btn-primary accept"><span class="acceptCls"></span> Accept</button>\
                                    <button class="racloop-btn racloop-btn-danger reject"><span class="rejectCls"></span> Reject</button>\
                                </span>\
                            </div>\
                            <div>\
                            </div>\
                        </div>';
            }

            */
            // me.down('#statusCmp').setHtml(state);

            if(record.get("otherUser")!=null){
                // me.down('#imgCmp').setHtml('<img style="height: 60px; width: 60px; margin-right: 10px;" src="' + record.get("otherUser").photoUrl + '" />');
                // me.down('#textCmp').setHtml('<div class="content"><b>Name</b><div class="name">' + record.get("otherUser").fullName + '</div><div class="affiliation">' + Ext.Date.format(date, 'd/m/Y g:i A') + '</div></div>');
                imgSrc=record.get("photoUrl");
             }
             else {
                 // me.down('#textCmp').setHtml('<div class="content"><b>Name</b><div class="affiliation">' + Ext.Date.format(date, 'd/m/Y g:i A') + '</div></div>');   
                 imgSrc="http://www.gravatar.com/avatar/00000000000000000000000000000000?v=2&s=128";
             }

            // me.down('#locCmp').setHtml('</div></div><div class="journeycontent"><b>Route</b><div class="name">From :' + record.get("workflow").requestedFromPlace + '</div><div class="name">To :' + record.get("workflow").requestedToPlace + '</div>');
            html='<div class="card">\
                <div class="card-info">\
                    <div class="image">\
                        <img src="'+imgSrc+'" alt="profile image" style="width:60px;"> </img>\
                    </div>\
                    <div class="card-date">\
                        <div class="card-day">'+day+'</div>\
                        <div class="card-month">'+month+'</div>\
                    </div>'+cardMain+'\
                </div>\
                <div class="card-footer">\
                    <div class="card-footer-row">\
                        <span class="card-location-label">From :</span>\
                        <span class="card-location">'+record.get("from")+'</span>\
                    </div>\
                    <div class="card-footer-row">\
                        <span class="card-location-label">To :</span>\
                        <span class="card-location">'+record.get("to")+'</span>\
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
            delegate   : 'button.accept'
        });
        this.element.on({
            scope      : this,
            tap        : 'fireBtnEvents',
            delegate   : 'button.reject'
        });
        //  this.element.on({
        //     scope      : this,
        //     tap        : 'fireBtnEvents',
        //     delegate   : 'button.call'
        // });         
        this.callParent(arguments);

    },
    fireBtnEvents: function(e){
        var acceptButton=this.down('#acceptCmp');
        var rejectButton=this.down('#rejectCmp');
          if (e.target.className.toLowerCase().indexOf("accept") > -1){
                this.fireEvent('myAcceptButtonTap',this);
          }
          else if (e.target.className.toLowerCase().indexOf("reject") > -1){
                this.fireEvent('myRejectButtonTap',this);
          }
    }
});