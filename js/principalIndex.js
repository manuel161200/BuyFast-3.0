$(document).ready(function () {
    $("#registro").click(function() {
        if ($('#form').length == 0) {
            // $("#formularios >*:not(#form)").hide();
            $("#formularios").load("formularios/altaUsuarios.html", function() {
                $.getScript("js/altaUsuarios.js");
            });
        } else {
            $('#form').parent().show();
        }
    });
    $("#login").click(function() {
        if ($('#loginUsuarios').length == 0) {
            $("#formularios >*:not(#loginUsuarios)").hide();
            $("#formularios").load("formularios/loginUsuarios.html", function() {
                $.getScript("js/loginUsuarios.js");
            });
        } else {
            $('#loginUsuarios').parent().show();
        }
    });
});