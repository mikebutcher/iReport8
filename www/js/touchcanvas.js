(function() {
    var canvas = null,
        context = null;
    
    function resetCanvas() {
        canvas = document.getElementById("simple");

        // set the canvas height to the window height and width
        //canvas.width = window.innerWidth -1 ;
        //canvas.height = window.innerHeight -1;
		//canvas.height = window.innerHeight +1;
		
        // get a reference to our drawing context
        context = canvas.getContext("2d");
    } // resetContext
    
    $(window).bind("resize", resetCanvas).bind("reorient", resetCanvas);

    $(document).ready(function() {
    
   	
    	window.scrollTo(0, 1);
        resetCanvas();
        
        document.body.addEventListener("touchstart", function(evt) {
            context.beginPath();
            context.moveTo(evt.touches[0].pageX, evt.touches[0].pageY);
            
            //evt.preventDefault();
        }, false);
        
        document.body.addEventListener("touchmove", function(evt) {
            context.lineTo(evt.touches[0].pageX, evt.touches[0].pageY);
            //added width
            context.lineWidth =5;
            context.stroke();
        }, false);
        
        document.body.addEventListener("touchend", function(evt) {
        }, false);
    });
})();
