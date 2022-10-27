$(document).ready(function() {
    $("#nuevaE").validetta({

        //bubblePosition: 'bottom',
        //bubbleGapTop: 10,
        // bubbleGapLeft: -5,
        display: 'inline',
        errorTemplateClass: 'validetta-inline',

        onValid: function(e) {
            e.preventDefault();
            $('#alert').empty()
                .append('');
            var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
            var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
            var Aedif = new Array("Vivienda Familiar", "Vivienda Adosada", "Vivienda Multifamiliar", "Vivienda Residencial", "Oficinas y Locales", "Comercial", "administrativo", "Estacionamientos", "Pública concurrencia", "Docencia", "Salud", "Industrial");
            var AreaPB, NumeroNiv, AreaNiv, NumSot, AreaSot, Edif1, Edif2, Edif3, Edif4, Edif5, Edif6, Edif7, Edif8, Edif9, Edif10, Edif11, Edif12;
            // var AreaTot, Factura1, Factor2, Factor3, Tab1, Tab2, Tab3, Tab4, Tab5, Tabulador1, Tabulador2, Tabulador3, Tabulador4, Tabulador5, ResTabulador1 = 0;
            var Textop = "",
                Textoim = "";
            var ImporteTotal = 0,
                Importe1, Importe2, Importe3, Importe4, Importe5;
            var Proyecto = new Array(),
                ResTabulador = new Array(),
                Importe = new Array();
            var valueEdif = [5206.38, 12432.12, 11576.7, 20241.45, 16263.76, 14119.76, 22000, 6206.63, 13162.54, 6908.8, 25000, 5269.43];
            var edificacion = document.getElementsByName("edificacion");
            var proyectos = document.getElementsByName("acheckbox[]");
            var accesibilidad = document.getElementsByName("accesibilidad");
            var topografia = document.getElementsByName("topografia");
            var ubicacion = document.getElementsByName("ubicacion");
            boxresult = document.getElementById("boxresult");
            contenido = document.getElementById("contentbox");
            contentAl = document.getElementById("contentalert");
            botonM = document.getElementById("contentB");

            boxresult.style.display = 'block';
            botonM.style.display = 'block';

            contenido.innerHTML = "";
            contentAl.innerHTML = "";

            for (var i = 0; i < proyectos.length; i++) { // son varios
                if (proyectos[i].checked == true) {
                    Proyecto.push(proyectos[i].value);
                }
            }
            for (var i = 0; i < accesibilidad.length; i++) {
                if (accesibilidad[i].checked == true) {
                    Accesibildad = accesibilidad[i].value;
                }
            }

            for (var i = 0; i < topografia.length; i++) {
                if (topografia[i].checked == true) {
                    Topografia = topografia[i].value;
                }
            }

            for (var i = 0; i < ubicacion.length; i++) {
                if (ubicacion[i].checked == true) {
                    Ubicacion = ubicacion[i].value;
                }
            }

            Direccion = document.getElementById("dirUb").value;
            Ciudad = document.getElementById("jmr_contacto_municipio").value;
            Estado = document.getElementById("jmr_contacto_estado").value;
            CP = document.getElementById("dirCp").value;

            AreaPB = parseInt(document.getElementById("areaPb").value, 10);
            NumeroNiv = parseInt(document.getElementById("numNiv").value, 10);
            AreaNiv = parseInt(document.getElementById("areaNp").value, 10);

            NumSot = document.getElementById("Nsot").checked ? parseInt(document.getElementById("Nnums").value, 10) : parseInt(0, 10);
            AreaSot = document.getElementById("Nsot").checked ? parseInt(document.getElementById("Nareas").value, 10) : parseInt(0, 10);

            Nombre = document.getElementById("nombreCom").value;
            Telefono = document.getElementById("numTel").value;
            Correo = document.getElementById("email").value;

            AreaTot = AreaPB + (AreaNiv * NumeroNiv) + (AreaSot * NumSot);
            // factores de reduccion
            Factor2 = 0.7;
            Factor3 = 0.9;

            for (let index = 0; index < Proyecto.length; index++) {
                switch (Proyecto[index]) {
                    case "Arquitectura":
                        ResTabulador.push(TabuladorFac1(AreaTot, -0.162, 23.41));
                        //alert(ResTabulador);
                        break;

                    case "Estructura":
                        ResTabulador.push(TabuladorFac1(AreaTot, -0.163, 4.2727));
                        //alert(ResTabulador);
                        break;
                    case "Instalalación hidráulica":
                        ResTabulador.push(TabuladorFac1(AreaTot, -0.15, 3.5992));
                        //alert(ResTabulador);
                        break;
                    case "Instalación sanitaria":
                        ResTabulador.push(TabuladorFac1(AreaTot, -0.152, 5.1894));
                        //alert(ResTabulador);
                        break;
                    case "Instalación eléctrica":
                        ResTabulador.push(TabuladorFac1(AreaTot, -0.164, 4.775));
                        //alert(ResTabulador);
                        break;

                }

            }
            for (var i = 0; i < edificacion.length; i++) {
                if (edificacion[i].checked == true) {
                    Edificacion = Aedif[edificacion[i].value];
                    for (let index = 0; index < Proyecto.length; index++) {
                        aux = ResTabulador[index].toFixed(5);
                        Importe.push(ImporteFac23(valueEdif[i], AreaTot, aux));
                    }
                    break;
                }

            }
            for (let index = 0; index < Importe.length; index++) {

                ImporteTotal += Importe[index];
            }

            var f = new Date();
            Fecha = "<div class='col s6 m6 l6 right-align'><p> " + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + "</p></div></div>";
            Titulo = "<div class='row'><div class= 'col s6 m6 l6'><h5 class='titulo'>" + "COTIZADOR ARQUITECTURA Y ESTRUCTURA" + "</h5></div>";
            //contentbox.innerHTML += Titulo;


            if (Proyecto.length == 1) {
                Texto = "<div class='s12'>" + "<p>Por este conducto, presentamos a su consideración, nuestra propuesta para la elaboración del proyecto " + Proyecto[0] + " de tipo " + Edificacion + "en" + Ciudad + ", con un área total de " + AreaTot + " m2." + "</p></div>";
                Texto2 = "<div class='12'><b>" + "El importe de la presente propuesta es de $" + ImporteTotal.toFixed(2) + ", sin incluir el I. V. A." + "</b></div>";

                contentbox.innerHTML += Titulo + Fecha + Texto + Texto2;

            } else {
                Texto = "<div class='s12'>" + "Por este conducto, presentamos a su consideración, nuestra propuesta para la elaboración de los proyectos " + "</div>";
                for (let index = 0; index < Proyecto.length; index++) {
                    Textop += "<div class='s12'>" + Proyecto[index] + "</div>";

                    Textoim += "<div class='s12'>" + "     -El importe del proyecto de " + Proyecto[index] + " es de $" + Importe[index].toFixed(2) + ", sin incluir el I. V. A." + "</div>";

                }
                textoR = "<div class='s12'>" + "De tipo " + Edificacion + " en " + Ciudad + " Edo. de " + Estado + ", con un área total de " + AreaTot + " m<sup>2</sup>." + "</div>";
                Texto2 = "<div class='s12'><b>" + "El importe de la presente propuesta es de $" + ImporteTotal.toFixed(2) + ", sin incluir el I. V. A." + "</b></div>";
                contentbox.innerHTML += Titulo + Fecha + Texto + Textop + textoR + Textoim + Texto2; //+ Textop + Texto2 + textoR;
            }

            textoAlert = "<h4>COTIZADOR ARQUITECTURA Y ESTRUCTURA</h4>" + "<p>Hola " + Nombre + " se envira un EMAIL a " + Correo + " en formato PDF con la cotizacion de manera desglosada</p>";
            textoAlert1 = "<p>Si el correo electronico es correcto presione enviar, de lo contrario presione cancelar y proporcione el correo electronio correcto</p>"
            contentAl.innerHTML += textoAlert + textoAlert1;
            document.getElementById("testnose").onclick = function() { myFunction(botonM) };
            document.getElementById("testpdf").onclick = function() { testsub() };

            //alert(edif);
            /* $.alert({
                 title: "<h4>Cotizador BIM</h4>",
                 content: "<h5>Hola " + Nombre + "<br>Se enviara un email a " + ema + "<br> confirmando la cotizacion <br>por edificacion nueva" + "</h5>",
                 icon: "fas fa-cogs fa-2x",
                 type: "green",
                 theme: "supervan"
             });*/

        },
        onError: function(event) {
            $('#alert').empty()
                .append('<div class="alert alert-danger">Algunos Campos estan vacios verificar.</div>');


        },
        realTime: true
    });
    /*
    $("#exisE").validetta({
        //bubblePosition: 'bottom',
        //bubbleGapTop: 10,
        // bubbleGapLeft: -5,
        display: 'inline',
        errorTemplateClass: 'validetta-inline',

        onValid: function(e) {
            e.preventDefault();

            var Nombre = $('#EnombreCom').val();
            var ema = $('#Eemail').val();

            //alert(edif);
            $.alert({
                title: "<h4>Cotizador BIM</h4>",
                content: "<h5>Hola " + Nombre + "<br>Se enviara un email a " + ema + "<br> confirmando la cotizacion <br>por edificacion existente" + "</h5>",
                icon: "fas fa-cogs fa-2x",
                type: "green",
                theme: "supervan"

            });

        },
        onError: function(event) {
            $('#alert').empty()
                .append('<div class="alert alert-danger">Algunos Campos estan vacios verificar.</div>');

        },
        realTime: true
    });*/
});

function TabuladorFac1(Area, exp, con) {
    Tab1 = Math.pow(Area, exp);
    TabuladorSub1 = (con * Tab1) / 100;
    Tabulador1 = TabuladorSub1.toFixed(5);
    ResTabulador1 = Tabulador1 * 0.5;
    return ResTabulador1;
}

function ImporteFac23(edif, areat, ResT) {
    return edif * areat * ResT * 0.7 * 0.9;
}

function myFunction(test12) {

    botonM.style.display = 'none';

}

function testsub() {
    document.getElementById("nuevaE").submit();
}