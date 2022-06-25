const logInBtnPath = "#root > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1tyumyi-MuiContainer-root > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column.css-7fqh9c-MuiGrid-root > button.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ln3sm5-MuiButtonBase-root-MuiButton-root"
const stripeCard = "input#Field-numberInput"
const stripeDate = "input#Field-expiryInput"
const stripeCvc = "input#Field-cvcInput"

describe("Payment", () => {


    // it('account data form', function () {
    //     cy.visit("/signIn");
    //     cy.get("input").eq(0).type("payment@email.pl");
    //     cy.get("input").eq(1).type("0123456789");
    //     cy.get(logInBtnPath).last().click();
    //     cy.wait(2000)
    //     cy.visit("/products/11");
    //     cy.contains("button", "Dodaj do koszyka").click().click()
    //     cy.visit("/basket");
    //     cy.contains("button", "Zapłać").click()
    //
    //     cy.get("input[name='name']").should("have.value", "Jan Kowalski")
    //     cy.get("input[name='email']").should("have.value", "payment@email.pl")
    //     cy.get("input[name='city']").should("have.value", "Kraków")
    //     cy.get("input[name='street']").should("have.value", "kwiatowa 8")
    //     cy.get("input[name='postcode']").should("have.value", "00-000")
    //
    // });

    // it('overview', function () {
    //     cy.visit("/signIn");
    //     cy.get("input").eq(0).type("payment@email.pl");
    //     cy.get("input").eq(1).type("0123456789");
    //     cy.get(logInBtnPath).last().click();
    //     cy.wait(2000)
    //     cy.visit("/products/11");
    //     cy.contains("button", "Dodaj do koszyka").click().click()
    //     cy.visit("/basket");
    //     cy.contains("button", "Zapłać").click()
    //
    //     cy.get("input[name='street']").clear().type("kwiatowa 9")
    //     cy.get("input[name='postcode']").clear().type("11-111")
    //     cy.contains("button", "Dalej").click()
    //
    //     cy.get("#root > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1oqqzyl-MuiContainer-root > div.MuiBox-root.css-0 > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-4.css-gj1fbr-MuiGrid-root > p:nth-child(6)")
    //         .should("have.html", "kwiatowa 9 <br>11-111, Kraków <br>")
    // });

    it('payment', function () {
        cy.visit("/signIn");
        cy.get("input").eq(0).type("payment@email.pl");
        cy.get("input").eq(1).type("0123456789");
        cy.get(logInBtnPath).last().click();
        cy.wait(2000)
        cy.visit("/products/11");
        cy.contains("button", "Dodaj do koszyka").click().click()
        cy.visit("/basket");
        cy.contains("button", "Zapłać").click()

        cy.get("input[name='street']").clear().type("kwiatowa 9")
        cy.get("input[name='postcode']").clear().type("11-111")
        cy.contains("button", "Dalej").click().click()
        cy.wait(5000)

        cy.getWithinIframe(stripeCard).type('4242424242424242')
        cy.getWithinIframe(stripeDate).type('1234')
        cy.getWithinIframe(stripeCvc).type('123')

        // cy.contains("button", "Dalej").click()
        // cy.wait(2000)
        // cy.get("#card-element").within(() => {
        // })
        // cy.fillElementsInput("cardNumber", "4242424242424242")
        // cy.get("iframe").find(stripeCard).type("4242424242424242")
        // cy.get("input").eq(1).type("1224")
        // cy.get("input").eq(2).type("123")
    });


})
