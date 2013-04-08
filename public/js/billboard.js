var sendHeight = $("#send").height()
  , winHeight = $(window).height() - sendHeight;

// メッセージの表示エリア
$("#logs").height(winHeight);
$(window).on("resize", function() {
	winHeight = $(window).height() - sendHeight;
	$("#logs").height(winHeight);
});

// web socket
var socket = io.connect('/');

// データ表示
socket.on('message', function(msg) {
	var color = "#" + Math.round(Math.random() * 255).toString(16) + Math.round(Math.random() * 255).toString(16) + Math.round(Math.random() * 255).toString(16);
	var value = msg.value.replace(/(\n|\r)/g, "<br />");
	var fontSize = "36px";
	switch (msg.size) {
		case "big" :
			fontSize = "42px";
			break;
		case "small" :
			fontSize = "24px";
			break;
		case "medium" :
		default :
			break;
	}
	var $log  = $("<li>").html(value).prependTo("#logs")
		.css({
      "font-size": fontSize,
			"color": (msg.color == "random") ? color : msg.color
		});
		switch (msg.pos) {
			case "ue" :
				$log.addClass("ue")
					.css({
						"top"   : Math.round(Math.random() * 30) + "%",
						"right" : Math.round(Math.random() * 100) + "%"
					});
				break;
			case "shita" :
				$log.addClass("shita")
					.css({
						"bottom" : Math.round(Math.random() * 30) + "%",
						"right"  : Math.round(Math.random() * 100) + "%"
					});
				break;
			case "naka" :
			default :
				$log.addClass("naka")
					.css({
						"top": Math.round(Math.random() * 95) + "%"
					});
				break;
		}
});

// データ送信
$('#send').submit(function() {
	if ( $("#message").val() ) {
		socket.emit("message", {
			"pos" : $("#pos").val(),
			"size" : $("#size").val(),
			"color" : $("#color").val(),
			"value" : $("#message").val()
		});
	}
	return false;
});
