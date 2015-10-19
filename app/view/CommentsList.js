Ext.define('Racloop.view.CommentsList', {
    extend: 'Ext.List',
    xtype: 'commentsList',

    config: {
        items: [
        ],
        store: 'userCommentsStore',
        itemTpl: [
                    '<div class="card">',
                        '<div class="card-info">',
                            '<div class="image">',
                                '<img src="{photoUrl}" alt="profile image" style="width:60px;"> </img>',
                            '</div>',
                            '<div class="card-main">',
                                '<div class="card-name">',
                                    '<h3>{user}</h3>',
                                '</div>',
                             '</div>',
                        '</div>',
                        '<div class="card-footer">',
                            '<div class="card-footer-row">',
                                '<div class="content">{content}</div>',
                            '</div>',
                        '</div>',
                    '</div>'
           // '<div class="comment"><div class="content">{content}</div></div>'
        ]
    },


    initialize: function() {
        this.callParent(arguments);
    }
});