define(
	[
		'Backbone',
		'views/main/category'
	],

	function( Backbone, CategoryView ) {
		var CategoryCollectionView = Backbone.View.extend({
			tagName : "div",
			className : 'todo-wrapper',

			initialize : function() {
				this.collection.bind( 'all', this.render, this );
			},

			render : function() {
				this.$el.empty();
				for( var i = 0; i < this.collection.length; i++ ) {
					var categoryView = new CategoryView( { model : this.collection.at( i ) } );
					this.$el.append(categoryView.render().$el);
				}

				return this;
			}
		});
		return CategoryCollectionView;
	}
);