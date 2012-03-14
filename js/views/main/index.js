define(
	[	
		'jQuery',
		'Underscore',
		'Backbone',
		'models/TaskModel',
		'lib/backbone/backbone.localStorage',
		'models/CategoryModel'
	],

	function( $, _, Backbone, TaskModel, CategoryModel ) {
		var mainIndexView = Backbone.View.extend({
			
			initialize : function( categoryCollection, taskCollection, userCollection ) {
				this.template = _.template( $( '#create-task-template' ).html() );
				this.categoryCollection = categoryCollection;
				this.taskCollection = taskCollection;
				this.userCollection = userCollection;

				this.taskCollection.bind( 'add', this.addOne, this );
				this.categoryCollection.bind( 'add', this.render, this );
			},

			events : {
			    'click #clear-completed' : 'clearCompleted',
				'click #submit-task-form' : 'submitForm',
				'keypress .task-content' : 'addOnEnter',
				'click #create-category' : 'createCategory',
			},

			addOne : function( taskModel ) {
				taskModel.save();

				// Reset the text-input-field.
				$('.task-content').val('')
			},

			addCategory : function( categoryModel ) {
				categoryModel.save();

				// Reset the text-input-field.
				$('#category-content').val('');
			},
			
			clearCompleted : function () {
			    var length = this.taskCollection.length;
			    var removeArr = Array();
			    for (var i = 0; i  < length; i++) {
				    if (this.taskCollection.models[i].attributes.completed) {
				        removeArr.push(this.taskCollection.models[i]);
				    }
				};
				
				length = removeArr.length;
				for (var i = 0; i < length; i++) {
                    removeArr[i].destroy();
				};
			},

			addOnEnter : function( e ) {
				if ( e.keyCode == 13) {
					this.submitForm( e );
					return false;
				}
			},

			render : function() {
				this.$el.html( this.template({
					category : this.categoryCollection.models
				}));

				return this;
			},

			submitForm : function( e ) {
				// Get the needed values for a task.
				var taskContent = this.$('.task-content').val();
				var taskCategoryId = this.$('.task-category').val();
				var category = this.categoryCollection.get( taskCategoryId );
				var user = this.userCollection.at( 0 );
				
				var taskModel =	new TaskModel({
					content : taskContent,
					time : ( new Date() ).getTime(),
					completed : false,
					user : user,
					category : category
				});
                    
                if(taskModel.isValid()) {
                	$('#validationText').css('visibility', 'hidden');
                    this.taskCollection.add(taskModel);
                }
                else
                {
                    category.get("task").remove(taskModel);
                    $('#validationText').css('visibility', 'visible');
                }
					   
			},

			createCategory : function( e ) {
				
				var labelInput = this.$('#category-content').val();

				try {
					this.categoryCollection.create( { label :labelInput } );
				} catch( error ) {
					console.log('Could not create category');
				}
			}
		});

		return mainIndexView;
	}
);