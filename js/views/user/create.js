define([
		'jQuery',
		'Underscore',
		'Backbone',
		'models/UserModel'
	],
	
	function( $, _, Backbone, UserModel ) {
		var createUserView = Backbone.View.extend({
			el : $('#create-user'),

			initialize : function( userCollection ) {
				this.template = _.template( $( '#create-user-template' ).html() );
				this.userCollection = userCollection;

				this.userCollection.on( 'add', this.addUser, this );
			},

			addUser : function( userModel ) {
				userModel.save();
			},

			events : {
				'click #submit-create-user-form' : 'submitCreateUserForm'
			},

			render : function() {
				$(this.el).html( this.template );
			},

			submitCreateUserForm : function( e ) {
				var username = this.$('#input-username').val();

				try {
					var model = new UserModel( { name : username } );
					this.userCollection.add( model );
					
					this.trigger('userAdded', model );

				} catch( error ) {
					console.log( "Error : ", error );
				}
			}

		});

		return createUserView;
	}	
);