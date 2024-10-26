import '../../node_modules/cypress-xpath'





describe('Tests lab 3', function() {

    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            
            if (err.message.includes('Unexpected token \':\'')) {
                return false; 
            }
            return true;
        });
        cy.visit('https://www.bnventadebienes.com/properties/search');
    });
   
    
   /*
    *  PRUEBA 1:
    *       Nombre: Búsqueda de propiedades por provincia
    *       Objetivo: Se busca validar que la seleccionar alguna provincia en el 
    *   formulario, se muestren las diferentes propiedades que existen para
    *   dicha provincia.
    *       Datos de prueba:
    *               - Heredia
    *       Resultado esperado: Se debe desplegar el listado de todas las propiedades
    *   que tienen como ubicación la provincia seleccionada.
    * 
    */
    it('Busqueda de propiedades por provincia', () => {
        cy.xpath('//*[@id="ProvinceId"]').select('Heredia');
        cy.xpath('//*[@id="property-search"]/form/div/div[2]/div[2]/button').click();

        cy.get('div.property-preview.property-item').each(($el) => {
            cy.wrap($el).contains('Heredia').should('exist');
        });
    });

    /*
    *  PRUEBA 2:
    *       Nombre: Búsqueda de propiedades con descuento
    *       Objetivo: Se busca validar que la seleccionar el filtro de descuentos, 
    *   se despliegue las propiedades que cuentan con descuento
    *       Datos de prueba: Ninguno
    *       Resultado esperado: Se debe desplegar el listado de todas las propiedades
    *   que cuentan con un descuento en sus precios.
    */
    it('Busqueda por propiedades con descuento', () => {
        cy.xpath('//*[@id="MustBeDiscounted"]').check();
        cy.xpath('//*[@id="property-search"]/form/div/div[2]/div[2]/button').click();

        cy.get('div.property-preview.property-item').each(($el) => {
            cy.wrap($el).contains('Descuento:').should('exist');
        });
    });

    /*
    *  PRUEBA 3:
    *       Nombre: Búsqueda de propiedades por tipo de propiedad
    *       Objetivo: Se busca validar que cuando se selecciona un tipo de 
    *   propiedad en el formulario, se muestren los resultados de propiedades
    *   de dicho tipo.
    *       Datos de prueba:
    *               - Terrenos
    *       Resultado esperado: Se debe desplegar el listado de todas las propiedades
    *   que pertenencen a el tipo de propiedad seleccionado.
    */
    it('Busqueda de propiedades por tipo de propiedad', () => {
        cy.xpath('//*[@id="PropertyTypeId"]').select('Terrenos');
        cy.xpath('//*[@id="property-search"]/form/div/div[2]/div[2]/button').click();

        cy.get('div.property-preview.property-item').each(($el) => {
            cy.wrap($el).contains('Terrenos').should('exist');
        });
    });

    /*
    *  PRUEBA 4:
    *       Nombre: Busqueda de propiedad por codigo cuando es un codigo erroneo
    *       Objetivo: Se busca validar que cuando se ingresa un código de propeudad
    *   que no existe, se desbliega un mensaje informando que no hay resultado.
    *       Datos de prueba:
    *               - CodigoDePrueba
    *       Resultado esperado: Se debe desplegar un mensaje en el formulario que diga
    *   'Lo sentimos, pero no hay propiedades que cumplan con los criterios de búsqueda
    *   ingresados'. Lo que indicaría que no existe ninguna propiedad con ese código
    */
    it('Busqueda de propiedad por codigo cuando es un codigo erroneo', () => {
        cy.xpath('//*[@id="ExdebtorCode"]').type('CodigoDePrueba');
        cy.xpath('//*[@id="property-search"]/form/div/div[2]/div[2]/button').click();

        cy.contains('Lo sentimos, pero no hay propiedades que cumplan con los criterios de búsqueda ingresados.');
    });

    afterEach(function() {
        cy.reload();
    });
});
   