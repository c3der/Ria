define(
	[
		'Backbone', 
		'views/main/todo'
	],

	function( Backbone, TodoView )  {
		var categoryView = Backbone.View.extend({
			className : 'category',

			events : {
				'click .delete-category' : 'delete'
			},

			initialize : function() {
			},

			delete : function() {
				this.model.destroy();
			},

			render : function() {
				this.$el.append( '<h2 class="categoryTitle">'+this.model.attributes.label+'</h2>' );
				this.$el.append('<img src="img/remove.png" alt="remove" class="delete-category" title="remove '+this.model.attributes.label+'" />');
				if(this.model.attributes.task){
					var taskCount = this.model.attributes.task.models.length;
					for( var i = 0; i < taskCount; i++ ) {
						var todoView = new TodoView( { model : this.model.attributes.task.models[i] } );
						this.$el.append( todoView.render().$el );
					}
				}
				return this;
			}
		});

		return categoryView;
	}
);