

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

 require('./bootstrap');

 /**
  * Next, we will create a fresh React component instance and attach it to
  * the page. Then, you may begin adding components to this application
  * or customize the JavaScript scaffolding to fit your unique needs.
  */
 
 require('./components/Example');
 require('./components/comments/CommentGroup');
 
 require('medium-editor/dist/css/medium-editor.min.css');
 require('medium-editor/dist/css/themes/default.css');
 import MediumEditor from 'medium-editor';
 var editor = new MediumEditor('.editable', {
   toolbar: {
     static: true
   }
 });