Ext.define('Racloop.store.Comments', {
    extend: 'Ext.data.Store',


    requires: 'Ext.DateExtras',


    config: {
        autoLoad: true,
        model: 'Racloop.model.Comment',
        storeId: 'userCommentsStore',
        proxy: {
          type: 'ajax',
          url:  Config.url.RACLOOP_USER_COMMENTS,
          headers: {
                'Content-Type': 'application/json'
          },
          withCredentials: true,
          useDefaultXhrHeader: false,
          reader: {
            type: 'json',
            rootProperty: 'comments'
          }
        },
        sorters: [


        ]
    }
})