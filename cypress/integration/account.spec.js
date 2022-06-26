const logInBtnPath = "#root > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1tyumyi-MuiContainer-root > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column.css-7fqh9c-MuiGrid-root > button.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ln3sm5-MuiButtonBase-root-MuiButton-root"
const accountBtn = "#account-menu-btn"

describe("account", () => {

    it('render correctly', function () {
        cy.visit("/signIn")
        cy.get("input").eq(0).type("test@test.pl")
        cy.get("input").eq(1).type("0123456789")
        cy.get(logInBtnPath).last().click()
        cy.get(accountBtn).click()
        cy.contains("li", "Konto").click()
        cy.get("input").should("have.length", 4)
        cy.contains("button", "Zapisz").should("exist")
    });

    it('change data', function () {
        cy.visit("/signIn")
        cy.get("input").eq(0).type("test@test.pl")
        cy.get("input").eq(1).type("0123456789")
        cy.get(logInBtnPath).last().click()
        cy.get(accountBtn).click()
        cy.contains("li", "Konto").click()

        cy.get("input").eq(0).should("have.value", "Test")
        cy.get("input").eq(1).should("have.value", "Test")
        cy.get("input").eq(2).should("have.value", "testowa 11")
        cy.get("input").eq(3).should("have.value", "00-000")

        cy.get("input").eq(0).clear().type("Test 2")
        cy.get("input").eq(1).clear().type("Test 2")
        cy.get("input").eq(2).clear().type("testowa 12")
        cy.get("input").eq(3).clear().type("11-111")

        cy.contains("button", "Zapisz").click()
        cy.reload()

        cy.get("input").eq(0).should("have.value", "Test 2")
        cy.get("input").eq(1).should("have.value", "Test 2")
        cy.get("input").eq(2).should("have.value", "testowa 12")
        cy.get("input").eq(3).should("have.value", "11-111")
    });
})
