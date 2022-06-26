const basketPath = "#basketBtn"
const accountPath = "#account-menu-btn"

const basketItemCard = "basketItemCard";
const plusBtn = "increaseBtn";
const minusBtn = "decreaseBtn";
const removeBtn = "removeBtn";

const loginBtn = "#root > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1tyumyi-MuiContainer-root > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column.css-7fqh9c-MuiGrid-root > button.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ln3sm5-MuiButtonBase-root-MuiButton-root"

describe("Basket", () => {


    beforeEach(() => cy.visit("/"))

    it('render correctly - empty', function () {
        cy.visit("/basket")
        cy.get("h4").should("have.text", "Koszyk")
    });

    it('render correctly - with items', function () {
        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click().click()

        cy.visit("/basket")

        cy.get("h5").should("not.exist")
        cy.get(`div.${basketItemCard}`).should("have.length", 1)

        cy.get("h6").should("have.text", "Do zapłaty:")
        cy.contains("button", "Zapłać").should("exist")

    });


    it('add item', function () {
        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click().click()
        cy.get("span.MuiBadge-badge").should("have.text", 1).click()
        cy.get("h5")
            .should("not.exist")

    });

    it('multiple add same item', function () {
        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click().click()
        cy.get("span.MuiBadge-badge").should("have.text", 1).click()
        cy.get("div.basketItemCard").find("input").should("have.value", 2)

    });

    it('add items in basket', function () {
        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click().click()
        cy.get(basketPath).click()
        cy.get("div.basketItemCard")
            .find("button#increaseBtn")
            .should("exist")
            .click()
            .click()

        cy.get("div.basketItemCard").find("input").should("have.value", 4)
    });

    it('remove items in basket', function () {
        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click().click()
        cy.get(basketPath).click()
        cy.get("div.basketItemCard")
            .find("button#decreaseBtn")
            .should("exist")
            .click()

        cy.get("div.basketItemCard").find("input").should("have.value", 1)
    });

    it('remove item by decreasing', function () {
        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click().click()
        cy.get(basketPath).click()
        cy.get("div.basketItemCard")
            .find("button#decreaseBtn")
            .should("exist")
            .click()
            .click()

        cy.get("div.basketItemCard").should("have.length", 0)
    });

    it('remove item', function () {
        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click().click()
        cy.get(basketPath).click()
        cy.get(`div.${basketItemCard}`).should("have.length", 1)

        cy.get(`button.${removeBtn}`).click()

        cy.get(`div.${basketItemCard}`).should("have.length", 0)
    });

    it('items in basket after refresh', function () {
        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click().click()
        cy.get(basketPath).click()
        cy.get(`div.${basketItemCard}`).should("have.length", 1)
        cy.visit("/").reload()
        cy.get("span.MuiBadge-badge").should("have.text", 1).click()
        cy.get(`div.${basketItemCard}`).should("have.length", 1)
    });

    it('items after log in', function () {
        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click().click()
        cy.get(basketPath).click()
        cy.get(`div.${basketItemCard}`).should("have.length", 1)
        cy.contains("button", "Zaloguj").click()
        cy.get("input").eq(0).type("occupied@email.pl")
        cy.get("input").eq(1).type("123456789")
        cy.get(loginBtn).last().click()
        cy.get(basketPath).click()
        cy.get(`div.${basketItemCard}`).should("have.length", 1)
    });

    it('items after log off', function () {
        cy.contains("button", "Zaloguj").click()
        cy.get("input").eq(0).type("occupied@email.pl")
        cy.get("input").eq(1).type("123456789")
        cy.get(loginBtn).last().click()


        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click()
        cy.get(basketPath).click()
        cy.get(`div.${basketItemCard}`).should("have.length", 1)

        cy.get(accountPath).click()
        cy.contains("li", "Wyloguj się").click()

        cy.get(basketPath).click()
        cy.get(`div.${basketItemCard}`).should("have.length", 1)
    });

    it('pay button when logged in', function () {
        cy.contains("button", "Zaloguj").click()
        cy.get("input").eq(0).type("occupied@email.pl")
        cy.get("input").eq(1).type("123456789")
        cy.get(loginBtn).click()

        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click()
        cy.get(basketPath).click()
        cy.contains("button", "Zapłać").click()
        cy.url().should("eq", "http://localhost:3000/payment")
    });

    it('pay button when logged off', function () {
        cy.get("div.productCard")
            .first()
            .click()

        cy.contains("button", "Dodaj do koszyka").click()
        cy.get(basketPath).click()
        cy.contains("button", "Zapłać").click()
        cy.url().should("contain", "http://localhost:3000/signIn")
        cy.location().should(loc => {
            expect(loc.search).contains("redirectPayment=true")
        })
    });
})
