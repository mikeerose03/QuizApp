(function(){
	angular
		.module("turtleFacts")
		.controller("resultsCtrl", resultsController);

	resultsController.$inject = ['quizMetrics', 'DataService'];

	function resultsController(quizMetrics, DataService){
		var vm = this;

		vm.quizMetrics = quizMetrics;
		vm.DataService = DataService;
		vm.activeQuestion = 0;
		vm.getAnswerClass=getAnswerClass;
		vm.setActiveQuestion = setActiveQuestion;
		vm.calculatePerc = calculatePerc;
		vm.reset=reset;

		function getAnswerClass(index){
			if(index===quizMetrics.correctAnswers[vm.activeQuestion]){
				return "bg-success";
			} else if(index === DataService.quizQuestions[vm.activeQuestion].selected){
				return "bg-danger";
			}
		}

		function setActiveQuestion(index){
			vm.activeQuestion = index;
		}

		function calculatePerc(){
			return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
		}

		function reset(){
			quizMetrics.changeState("results", false);
			quizMetrics.numCorrect = 0;

			for(var i = 0; i < DataService.quizQuestions.length; i++){
				var data = DataService.quizQuestions[i];
				data.selected = null;
				data.correct = null;
			}
		}
	}
})();