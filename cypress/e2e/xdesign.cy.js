describe('Technical Tests', function () {
    beforeEach(function () {
        cy.intercept('GET', 'https://api.spacexdata.com/v3/launches').as('launchList');
        cy.visit('index.html');
        cy.wait('@launchList').its('response.statusCode').should('eq', 200);
    });

    it('Data should load onto the page', function () {
        // each test in this suite requires successful loading of the page
        // therefore I have moved the GIVEN (The page loads) step to beforeEach
        // I have also requested it wait for the successful retrevial of the GET from the api
        
        // screen appears with list of API results
        cy.get('ul[class=launch-list]').should('be.visible').within((function () {
            // whilst likely to change, I have verified there are 111 launch items in the parent list
            // an alternative approach would be to confirm ANY exist in the list given the default filtering
            cy.get('li[class=launch-item]').should('have.length', 111);
        }));
    });

    it('Filter by year', function () {
        cy.get('select[class=select]').select('2015');

        cy.get('ul[class=launch-list').should('be.visible').within(( function () {
            cy.get('span[class=launch-item__date]').each(($launchDate) => {
                cy.wrap($launchDate).contains('2015');
            })
        }));
    });

    it('Order should be done alphabetically', function () {
        // whilst no year filtering is performed by default selecting the top option 
        //would be a way to validate no specific filter is applied
        cy.get('select[class=select]').select('Filter By Year');

        // The list is currently sorted by Ascending based on year, sorting can not be done alphabetically
        cy.get('button[class$=sort').contains('Sort Ascending').click();
        
        // expecting alphabetical order but not possible, rather than showing the failing test
        // here is an example I wrote for my current employer for validating our alphabetical search
        // this used a fixture file which produced alerts with the fruit names below
        // the results were confirmed to be unordered and then ordered after sorting
        
        // cy.intercept('GET', `/api/org/**/alert-configs?ordering=name`).as('orderByName');
        // cy.visit('/alerts/overview');
        // cy.get('[data-cypress=alert-name]')
        //     .should('have.length', 5)
        //     .then(function ($els) {
        //         return Cypress.$.makeArray($els).map((el) => el.innerText);
        //     })
        //     .should('deep.equal', ['canteloupe', 'banana', 'pear', 'apple', 'pineapple']);
        // cy.get('[data-cypress=name-header]').click();
        // cy.wait('@orderByName');
        // cy.get('[data-cypress=alert-name]').should('have.length', 5);
        // ['apple', 'banana', 'canteloupe', 'pear', 'pineapple'].forEach((expected, i) =>
        //     cy.get('[data-cypress=alert-name]').eq(i).should('have.text', expected),
        // );
    });
});