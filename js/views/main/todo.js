define(
	['Backbone'],

	function( Backbone ) {
		var TodoView = Backbone.View.extend({
			className : 'todo',
			tagName: "div",

			initialize : function() {
				this.template = _.template( $('#todo-template').html() );
				this.model.bind( 'change:completed', this.changed, this );
			},

			events : {
				'click .mark-completed' : 'markCompleted',
				'click .delete-todo' : 'delete'
			},

			delete : function() {
				this.model.destroy();
			},

			markCompleted : function( e ) {
				console.log( "Model", this.model );
				this.model.toggleCompleted();
			},

			changed : function( e ) {
				switch( e.attributes.completed ) {
					case true :
						this.$el.css('background', '#c2c2c2' );
						this.$('.todo-content').append('<p class="status">{ Completed }</p>');
						this.$('.todo-actions .mark-completed').attr('title','Unmark task as completed');
						break;
					case false :
						this.$el.css('background', '#fff' );
						this.$('.todo-content p.status').remove();
						this.$('.todo-actions .mark-completed').attr('title','Mark task as completed');
						break;
				}
			},

			render : function() {
				$(this.el).html( this.template({
					todo : this.model.attributes
				}));

				// Run changed to set the correct styling.
				this.changed( this.model );
				return this;
			}
		});
	
		return TodoView;
	}
);