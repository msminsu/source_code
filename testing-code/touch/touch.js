$(document).ready(function() {


	var tstart,tend;

	$(document).on('touchstart', function(e) {
		// e.preventDefault();	//	이벤트취소
		var event = e.originalEvent;
		var touch = event.touches[0]|| event.changedTouches[0];
		$("#msg").html("터치가 시작되었어요.");
			tstart =touch.pageX;
		//e.preventDefault();	//	이벤트취소

	});

	$(document).on('touchmove', function(e) {
		var event = e.originalEvent;
		var touch = event.touches[0]|| event.changedTouches[0];
		tend = touch.pageX;

		$('#msg').html('touch 이벤트 중입니다.'); 
		$('#msg').append('<div>' + event.touches[0].pageX + ',' +
				event.touches[0].pageY + '</div>');
		//e.preventDefault();
	});

	$(document).on('touchend', function(e) {
	
		var distance = tstart -tend;

			if(distance > 20 || distance < -20 ){
				console.log(distance);
			}else{
				console.log('move');
			}
		/* if( 0 > value){
            console.log('오른쪽,prev')
		}else{
			console.log('왼쪽 ,next')
		}
 */
		$("#msg").append("<div>터치이벤트가 종료되었어요</div>"); 

	});

});

