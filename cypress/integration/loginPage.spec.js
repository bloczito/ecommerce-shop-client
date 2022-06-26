
const logInBtnPath = "#root > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1tyumyi-MuiContainer-root > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column.css-7fqh9c-MuiGrid-root > button.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ln3sm5-MuiButtonBase-root-MuiButton-root"

const clearForm = () => {
    cy.get("input").eq(0)?.clear()
    cy.get("input").eq(1)?.clear()
}

describe( "SignIn Page", () => {
    before(() => {
        cy.visit("/signIn")
    })

    it('render correct', function () {
        cy.get("input").should("have.length", 2)
        cy.get(logInBtnPath).should("exist")
        cy.contains("a", "Zarejestruj się").should("exist")

        cy.contains("div", "Zaloguj przez Google").should("exist")
        cy.contains("div", "Zaloguj przez GitHub").should("exist")
    });

    it('no data form', function () {
        cy.get(logInBtnPath).click()
        cy.contains("p", "Musisz podać email").should("exist").should("have.class", "Mui-error")
        cy.contains("p", "Musisz podać hasło").should("exist").should("have.class", "Mui-error")
    });

    it('wrong email', function () {
        clearForm()
        cy.get("input").eq(0).type("asd")
        cy.get(logInBtnPath).click()
        cy.contains("p", "Podaj prawidłowy adres email").should("exist").should("have.class", "Mui-error")
    });

    it('correct email', function () {
        clearForm()
        cy.get("input").eq(0).clear().type("asd@asd.com")
        cy.get(logInBtnPath).click()
        cy.contains("p", "Podaj prawidłowy adres email").should("not.exist")
        cy.get("p.Mui-error").should("have.length", 1)
        cy.get("input").eq(0).clear()
    });


    it('too short pwd', function () {
        clearForm()
        cy.get("input").eq(1).type("asd")
        cy.get(logInBtnPath).click()
        cy.contains("p", "Hasło powinno zawierać pomiędzy 8 a 24 znaki").should("exist").should("have.class", "Mui-error")
    });

    it('too long pwd', function () {
        clearForm()
        cy.get("input")
            .eq(1)
            .type("012345678901234567890123456789")
            .should("have.value", "012345678901234567890123")
            .invoke("val")
            .should("have.length", 24)

        cy.get(logInBtnPath).click()
        cy.get("p.Mui-error").should("have.length", 1)
    });

    it('correct pwd', function () {
        clearForm()
        cy.get("input")
            .eq(1)
            .type("0123456789")
            .should("have.value", "0123456789")
            .invoke("val")
            .should("have.length", 10)
    });

    it('wrong data', function () {
        clearForm()
        cy.get("input").eq(0).type("wrong@email.pl")
        cy.get("input").eq(1).type("0123456789")
        cy.get(logInBtnPath).click()
        cy.contains("div", "Nieprawidłowy email lub hasło")
    });

    it('correct data', function () {
        clearForm()
        cy.get("input").eq(0).type("occupied@email.pl")
        cy.get("input").eq(1).type("123456789")
        cy.get(logInBtnPath).click()
        cy.url().should("eq", "http://localhost:3000/")
        cy.getCookie("auth-token").should("exist")
    });

})
