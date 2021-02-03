class Entity {
    constructor(nombreEntidad, listaAtributos)
    {
        this.nombreEntidad = nombreEntidad;
        this.listaAtributos = listaAtributos;
    }
    toString()
    {
        console.log(`Nombre de la clase: ${this.nombreEntidad}`);
        this.listaAtributos.forEach(element => {
            element.toString();
        });
    }

    crearHfile()
    {
        document.write(`------- Archivo .h copiar todo lo que está debajo--------------------<br><br>`);
        document.write(`#ifndef ${minimalizeFirst(this.nombreEntidad)}_H_INCLUDED<br>`);
        document.write(`#define ${minimalizeFirst(this.nombreEntidad)}_H_INCLUDED<br><br>`);

        this.crearTypedef();
        this.crearHFileFirmas();

        document.write(`<br><br>------- Fin del archivo .h -----------------------<br/>`);
    }

    crearTypedef()
    {

    document.write("typedef struct<br>");
    document.write("{<br>");
    this.listaAtributos.forEach(element => {
        if(element.tipoAtributo == "char*")
        {
            document.write(`&nbsp;&nbsp;&nbsp;&nbsp;char ${element.nombre}[128];<br>`);            
        }
        else
        {
            document.write(`&nbsp;&nbsp;&nbsp;&nbsp;${element.tipoAtributo} ${element.nombre};<br>`);
        }

        
    });
    document.write(`}${this.nombreEntidad};<br>`);

    }
    crearHFileFirmas()
    {
        let nameUpper = capitalize(this.nombreEntidad);
        let nameLower = minimalizeFirst(this.nombreEntidad);
        let contador = 0; 
        // Employee* employee_new();
        document.write("<br>");
        document.write(`${nameUpper}* ${nameLower}_new();<br>`);
        // Employee* employee_newParametros(params);
        document.write(`${nameUpper}* ${nameLower}_newParametros(`);
        this.listaAtributos.forEach(element => {
            document.write(`${element.tipoAtributo} ${element.nombre}`);
            contador++;
            if(contador < this.listaAtributos.length)
            {
                document.write(`, `);
            }
        }); 
        document.write(");<br>")
        // Employee* delete();
        document.write(`${nameUpper}* delete();<br><br>`);
        // GettersySetters

        this.crearHfileGettersySetters();
        // validaciones
        this.crearHfileIsValid();
        // Otras funciones
        this.crearHfileOthersFunctions();

        document.write(`<br>#endif // ${nameLower}_H_INCLUDED`);

    }

    crearHfileGettersySetters()
    {
        let nameUpper = capitalize(this.nombreEntidad);
        let nameLower = minimalizeFirst(this.nombreEntidad);

        document.write(`// Getters y Setters<br><br>`);

        this.listaAtributos.forEach(element => {
            
            document.write(`int ${nameLower}_set${capitalize(element.nombre)}(${nameUpper} this, ${element.tipoAtributo} ${this.nombreEntidad});<br>`);
            document.write(`${element.tipoAtributo} ${nameLower}_get${capitalize(element.nombre)}(${nameUpper}* this);<br>`);
    
        });
        
        document.write(`<br>`);

    }

    crearHfileIsValid()
    {       
        //int isValidId(int id);

        document.write(`// Validaciones<br><br>`);

        this.listaAtributos.forEach(element => {
            

            document.write(`int isValid${capitalize(element.nombre)}(${element.tipoAtributo} ${element.nombre});<br>`);

    
        });
        document.write("<br>");
    }

    crearHfileOthersFunctions()
    {

        /*
        int employee_printOneEmployee(Employee* this);
        int employee_compareByName(void* employee1, void* employee2);
        int employee_compareById(void* employee1, void* employee2);
        int employee_compareByHours(void* employee1, void* employee2);
        int employee_compareBySalary(void* employee1, void* employee2);
        int employee_filterBySalary(void* employee);
        int employee_countEmployees(void* employee);
        */
        
       let nameUpper = capitalize(this.nombreEntidad);
       let nameLower = minimalizeFirst(this.nombreEntidad);

       document.write(`// Otras funciones<br/><br>`);
       document.write(`int ${nameLower}_printOne${nameUpper}(${nameUpper}* this);<br>`);
       document.write(`int ${nameLower}_count${nameUpper}s(void* ${nameLower});<br>`);

       this.listaAtributos.forEach(element => {
            
        document.write(`int ${nameLower}_compareBy${capitalize(element.nombre)}(void* ${nameLower}1, void* ${nameLower}2);<br>`);

    });
    }

    crearCfile()
    {
        document.write("--------Comienzo archivo .c (copiar todo lo que está debajo)----------------<br>");
        this.crearCfileHeader();
        let contador = 0;
        let nameUpper = capitalize(this.nombreEntidad);
        let nameLower = minimalizeFirst(this.nombreEntidad);
        let tabString = "&nbsp;&nbsp;&nbsp;&nbsp;";
        
        // Entity* entity_new(void);
        document.write(
        `${nameUpper}* ${nameLower}_new(void)<br>
        {<br>
            ${tabString}return (${nameUpper}*)malloc(sizeof(${nameUpper}));<br>   
        }<br>`    
        );
        //Entity* entity_newParametros(params);
        /*
                Employee* this = employee_new();
        if(this != NULL)
        {
                if(!(employee_setId(this, atoi(id)))
                        && !(employee_setNombre(this, nombre))
                        && !(employee_setHorasTrabajadas(this, atoi(horasTrabajadas)))
                        && !(employee_setSueldo(this, atof (sueldo))))
                {
                        return this;
                }
        }
        employee_delete(this);
        return NULL;
        */
        document.write(`${nameUpper}* ${nameLower}_newParametros(`);
        this.listaAtributos.forEach(element => {
            document.write(`${element.tipoAtributo} ${element.nombre}`);
            contador++;
            if(contador < this.listaAtributos.length)
            {
                document.write(`, `);
            }
        });
        document.write(`)<br>{<br>
            ${tabString}${nameUpper}* this = ${nameLower}_new();<br>
            ${tabString}if(this != NULL)<br>
            ${tabString}{
            ${tabString}${tabString}if(!`);
        this.listaAtributos.forEach(element => {
        switch(element.tipoAtributo)
        {
            case "int":
                document.write(`${nameLower}_set${capitalize(element.nombre)}(this, atoi(${element.nombre})))<br>`);
            case "float":
        }
        });
        



    }

    crearCfileHeader()
    {

        document.write(`#include <stdio.h><br>#include <stdlib.h>#include <string.h><br>#include "${capitalize(this.nombreEntidad)}"<br><br>`);
          
    }

}

class LineaAtributo {
    constructor(nombre,tipoAtributo)
    {
        this.nombre=nombre;
        this.tipoAtributo= tipoAtributo
    }
    toString()
    {
        console.log(`Nombre del atributo: ${this.nombre}, y es del tipo: ${this.tipoAtributo}`);
    }


}

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

function minimalizeFirst(word) {
    return word[0].toLowerCase() + word.slice(1);
  }





function cargarFormulario()
{
    document.getElementById("entitynameinput").value= "Employee";
    document.getElementById("atr1").value = "nombre";
    document.getElementById("tipo1").value="char*";
    document.getElementById("atr2").value = "apellido";
    document.getElementById("tipo2").value="char*";
    document.getElementById("atr3").value = "salario";
    document.getElementById("tipo3").value="float";
    document.getElementById("atr4").value = "horasTrabajadas";
    document.getElementById("tipo4").value="int";
}


function mostrar(){


    var arrayAtributos=[];
    
        
    var linea1 = new LineaAtributo(document.getElementById('atr1').value,document.getElementById('tipo1').value);
    var linea2 = new LineaAtributo(document.getElementById('atr2').value,document.getElementById('tipo2').value);
    var linea3 = new LineaAtributo(document.getElementById('atr3').value,document.getElementById('tipo3').value);
    var linea4 = new LineaAtributo(document.getElementById('atr4').value,document.getElementById('tipo4').value);
    
    arrayAtributos.push(linea1,linea2,linea3,linea4);
    
    
    var entidad = new Entity(document.getElementById('entitynameinput').value,arrayAtributos);
    
    entidad.crearHfile();
    document.write("<br><br>");
    entidad.crearCfile();

    }