Ext.define('Racloop.util.Utility', {

	singleton: true,

	// This function helps us to control transitions between pages
	showActiveItem: function(parentPanel, childPanel, direction, activeItem){
		
		if(parentPanel && childPanel){
			parentPanel.animateActiveItem(childPanel, {
				type: 'slide', 
				direction: direction,
				listeners: {
					animationend: function(){
						if(activeItem){
							//Having unused components lying around the place can slow
							//down our application. If an activeItem is supplies to this
							//function we destroy it after the animation has finished.
							activeItem.destroy();
						}
					}
				}
			});
		}

        if(!Ext.Viewport.getMenus().left.isHidden())
        {
            Ext.Viewport.hideMenu('left');
        }
        
		return this;
	}

});