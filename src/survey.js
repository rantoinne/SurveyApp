import React, { Component } from 'react';

var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyD9hSEJkXZ_SSyb880qNIkRCwPx7O5G884",
    authDomain: "survey-1719.firebaseapp.com",
    databaseURL: "https://survey-1719.firebaseio.com",
    projectId: "survey-1719",
    storageBucket: "survey-1719.appspot.com",
    messagingSenderId: "466197990846"
};
firebase.initializeApp(config);

/*-------------------------*/

class Survey extends Component{

onSubmit(event){
  var studentName = this.refs.name.value;
  this.setState({studentName: studentName}, function(){
    console.log(this.state);
  });
}

answerSelect(event){
 var answers = this.state.answers;
 if(event.target.name === 'answer1')
 {
   answers.answer1 = event.target.value;
 }
 else if(event.target.name === 'answer2')
 {
   answers.answer2 = event.target.value;
 }
 else if(event.target.name === 'answer3')
 {
   answers.answer3 = event.target.value;
 }
this.setState({answers:answers}, function(){
   console.log(this.state);
});
}


submitted(){

firebase.database().ref('Survey/'+this.state.uid).set({
  studentName: this.state.studentName,
  answers: this.state.answers
});
this.setState({isSubmitted: true});
}

constructor(props){
  super(props);

  this.state = {
    uid: uuid.v1(),
    studentName: '',
    answers: {
      answer1:'',
      answer2:'',
      answer3:''
    },
    isSubmitted: false
  };
  this.onSubmit = this.onSubmit.bind(this);
  this.answerSelect = this.answerSelect.bind(this);
  this.submitted = this.submitted.bind(this);
}

  render(){
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div>
        <h4>Enter your name in the field</h4>
        <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="Enter your name" ref="name"/>
        </form>
      </div>;
      questions ='';
    }

    else if(this.state.studentName !== '' && this.state.isSubmitted === false){

      studentName = <div>Hello <strong>{this.state.studentName}</strong>, Please answer the following: </div>;
      questions = <div>
        <form onSubmit={this.submitted}>
        <div className="card">
        <label>What kind of courses you like :</label><br />
        <input type="radio" value="Technology" name="answer1" onChange={this.answerSelect} />Technology
        <input type="radio" value="Design" name="answer2" onChange={this.answerSelect} />Design
        <input type="radio" value="Marketting" name="answer3" onChange={this.answerSelect} />Marketting
        </div>
        <br />
        <hr />

        <div className="card">
        <label>What is your current occupation :</label><br />
        <input type="radio" value="Student" name="answer1" onChange={this.answerSelect} />Student
        <input type="radio" value="In-Job" name="answer2" onChange={this.answerSelect} />In-Job
        <input type="radio" value="Looking-Job" name="answer3" onChange={this.answerSelect} />Looking-Job
        </div>

        <br />
        <hr />
        <div className="card">
        <label>Is learning online helpful :</label><br />
        <input type="radio" value="Maybe" name="answer1" onChange={this.answerSelect} />Maybe
        <input type="radio" value="Yes" name="answer2" onChange={this.answerSelect} />Yes
        <input type="radio" value="No" name="answer3" onChange={this.answerSelect} />No
        </div>
        <input type="submit" className="feedback-button" value="submit" />
        </form>
      </div>
     }

     else if(this.state.isSubmitted === true ){
      studentName = <div> Thanks <strong>{this.state.studentName}</strong></div>;
     }

    return(
      <div>
      <h2>
      {studentName}
      <hr id="high"/>
      <br />
      {questions}
      </h2>
      </div>

    );
  }
}

export default Survey;
