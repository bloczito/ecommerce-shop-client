
describe("Register page", () => {

    it('should landing page render correctly', function () {
        cy.visit("/")
        cy.contains("button", "Zaloguj").should("exist")
    });

    it('should register page render correctly', function () {
        cy.visit("/")
        cy.contains("button", "Zaloguj").should("exist").click()
        cy.get("a[href='/signUp']").should("exist").click()
        cy.get("input")
            .should("have.length", 7)
            .first()
            .should("have.attr", "type", "email")

        cy.contains("button", "Zarejestruj").should("exist")
        cy.get("a[href='/signIn']").should("exist")
    });

    it('empty form', function () {
        cy.visit("/signUp")
        cy.contains("button", "Zarejestruj").click()

        cy.contains("p", "Musisz podać email")
            .should("exist")
            .should("have.class", "Mui-error")

        cy.contains("p", "Musisz podać hasło")
            .should("exist")
            .should("have.class", "Mui-error")

        cy.contains("p", "Musisz potwierdzić hasło")
            .should("exist")
            .should("have.class", "Mui-error")
    });

    it('wrong email', function () {
        cy.visit("/signUp")
        cy.get("input").eq(0).type("asd")
        cy.contains("button", "Zarejestruj").click()
        cy.contains("p", "Podaj prawidłowy adres email").should("exist")
    });

    it('correct email', function () {
        cy.visit("/signUp")
        cy.get("input").eq(0).type("test@email.com")
        cy.contains("button", "Zarejestruj").click()
        cy.contains("p", "Podaj prawidłowy adres email").should("not.exist")
    });

    it('too short password', function () {
        cy.visit("/signUp")
        cy.get("input").eq(1).type("123")
        cy.contains("button", "Zarejestruj").click()
        cy.contains("p", "Hasło powinno posiadać minimum 8 znaków").should("exist")
    });

    it('too long password', function () {
        cy.visit("/signUp")
        cy.get("input")
            .eq(1)
            .type("0123456789012345678901234567890")
            .should("have.value", "012345678901234567890123")
            .invoke("val")
            .should("have.length", 24)
        cy.contains("button", "Zarejestruj").click()
        cy.contains("p", "Hasło powinno posiadać minimum 8 znaków").should("not.exist")
    });

    it('correct password', function () {
        cy.visit("/signUp")
        cy.get("input")
            .eq(1)
            .type("0123456789012")
        cy.contains("button", "Zarejestruj").click()
        cy.get("p.Mui-error").should("have.length", 2)
    });

    it('wrong confirm pwd', function () {
        cy.visit("/signUp")
        cy.get("input")
            .eq(1)
            .type("0123456789")

        cy.get("input")
            .eq(2)
            .type("01234567890")

        cy.contains("button", "Zarejestruj").click()
        cy.contains("p", "Hasła muszą być takie same").should("exist")
    });

    it('correct confirm pwd', function () {
        cy.visit("/signUp")
        cy.get("input")
            .eq(1)
            .type("0123456789")

        cy.get("input")
            .eq(2)
            .type("0123456789")

        cy.contains("button", "Zarejestruj").click()
        cy.contains("p", "Hasła muszą być takie same").should("not.exist")
        cy.get("p.Mui-error").should("have.length", 1)
    });

    it('occupied email', function () {
        cy.visit("/signUp")
        cy.get("input")
            .eq(0)
            .type("occupied@email.pl")

        cy.contains("button", "Zarejestruj").click()
        cy.contains("p", "Podany adres email jest zajęty").should("exist")
    });

    it('minimal data', function () {
        cy.visit("/signUp")

        cy.get("input")
            .eq(0)
            .type("minimal@email.pl")

        cy.get("input")
            .eq(1)
            .type("123456789")

        cy.get("input")
            .eq(2)
            .type("123456789")

        cy.contains("button", "Zarejestruj").click()

        cy.wait(2000)
        cy.url().should("be.equal", "http://localhost:3000/signIn")
    });

})
