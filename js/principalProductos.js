$(document).ready(function () {
    $("#altaVehiculo").click(function() {
        if ($('#altaVehiculos').length == 0) {
            // $("#formularios >*:not(#form)").hide();
            $("#formularios").load("formularios/altaVehiculos.html", function() {
                $.getScript("js/altaVehiculos.js");
            });
        } else {
            $('#altaVehiculos').parent().show();
        }
    });

    $("#altaRopa").click(function() {
        if ($('#altaRopas').length == 0) {
            $("#formularios").load("formularios/altaRopas.html", function() {
                $.getScript("js/altaRopas.js");
            });
        } else {
            $("#altaRopas").parent().show();
        }
    });

    $("#altaElectronica").click(function() {
        if ($("#altaElectronicas").length == 0) {
            $("#formularios").load("formularios/altaElectronicas.html", function() {
                $.getScript("js/altaElectronicas.js");
            });
        } else {
            $("#altaElectronicas").parent().show();
        }
    });

    $("#altaOtro").click(function() {
        if ($("#altaOtros").length == 0) {
            $("#formularios").load("formularios/altaOtros.html", function() {
                $.getScript("js/altaOtros.js");
            });
        } else {
            $("#altaOtros").parent().show();
        }
    });

    $("#modificarVehiculos").click(function() {
        if ($("#divfrmModificarVehiculo").length == 0) {
            $("#formularios").load("formularios/modVehiculos.html", function() {
                $.getScript("js/modVehiculos.js");
            })
        } else {
            $("#divfrmModificarVehiculo").parent().show();
        }
    });

    $("#modificarRopa").click(function() {
        if ($("#divfrmModificarRopa").length == 0) {
            $("#formularios").load("formularios/modRopas.html", function() {
                $.getScript("js/modRopas.js");
            })
        } else {
            $("#divfrmModificarRopa").parent().show();
        }
    });

    $("#modificarElectronica").click(function() {
        if ($("#divfrmModificarElectronica").length == 0) {
            $("#formularios").load("formularios/modElectronicas.html", function() {
                $.getScript("js/modElectronicas.js");
            })
        } else {
            $("#divfrmModificarElectronica").parent().show();
        }
    });

    $("#modificarOtros").click(function() {
        if ($("#divfrmModificarOtro").length == 0) {
            $("#formularios").load("formularios/modOtros.html", function() {
                $.getScript("js/modOtros.js");
            })
        } else {
            $("#divfrmModificarOtro").parent().show();
        }
    });

    $("#eliminarVehiculos").click(function() {
        if ($('#divfrmEliminarVehiculo').length == 0) {
            $("#formularios").load("formularios/eliminarVehiculos.html", function() {
                $.getScript("js/eliminarVehiculos.js");
            });
        } else {
            $('#divfrmEliminarVehiculo').show();
        }
    });

    $("#eliminarRopa").click(function() {
        if ($('#divfrmEliminarRopa').length == 0) {
            $("#formularios").load("formularios/eliminarRopas.html", function() {
                $.getScript("js/eliminarRopas.js");
            });
        } else {
            $('#divfrmEliminarRopa').show();
        }
    });

    $("#eliminarElectronica").click(function() {
        if ($('#divfrmEliminarElectronica').length == 0) {
            $("#formularios").load("formularios/eliminarElectronicas.html", function() {
                $.getScript("js/eliminarElectronicas.js");
            });
        } else {
            $('#divfrmEliminarElectronica').show();
        }
    });

    $("#eliminarOtros").click(function() {
        if ($('#divfrmEliminarOtro').length == 0) {
            $("#formularios").load("formularios/eliminarOtros.html", function() {
                $.getScript("js/eliminarOtros.js");
            });
        } else {
            $('#divfrmEliminarOtro').show();
        }
    });

    $("#tablaVehiculos").click(function() {
        $.getScript("js/misVehiculos.js");
    });

    $("#tablaRopa").click(function() {
        $.getScript("js/misRopas.js");
    });

    $("#tablaElectronica").click(function() {
        $.getScript("js/misElectronicas.js");
    });

    $("#tablaOtros").click(function() {
        $.getScript("js/misOtros.js");
    });

    $("#comprarVehiculos").click(function() {
        if ($("#filtrarVehiculos").length == 0) {
            $("#formularios").load("formularios/filtrarVehiculos.html", function() {
                $.getScript("js/comprarVehiculos.js");
            });
        } else {
            $("#filtrarVehiculos").show();
        }
    });

    $("#comprarRopa").click(function() {
        if ($("#filtrarRopas").length == 0) {
            $("#formularios").load("formularios/filtrarRopas.html", function() {
                $.getScript("js/comprarRopas.js");
            })
        } else {
            $("#filtrarRopas").show();
        }
    });

    $("#comprarElectronica").click(function() {
        if ($("#filtrarElectronicas").length == 0) {
            $("#formularios").load("formularios/filtrarElectronicas.html", function() {
                $.getScript("js/comprarElectronicas.js");
            });
        } else {
            $("#filtrarElectronicas").show();
        }
    });

    $("#comprarOtros").click(function() {
        if ($("#filtrarOtros").length == 0) {
            $("#formularios").load("formularios/filtrarOtros.html", function() {
                $.getScript("js/comprarOtros.js");
            });
        } else {
            $("#filtrarOtros").show();
        }
    });
});