
const T_SHIRTS_NUMBER = 15;
const BLOUSES_NUMBER = 10;
const TROUSERS_NUMBER = 12;
const ACCESSORIES_NUMBER = 19;


describe("Landing Page", () => {
    before(() => {
        cy.visit("/")
    });

    it('should render categories', function () {
        cy.get("div#categories-box > button").should("have.length", 4)
        cy.contains("button", "Shopp").should("exist")
    });

    it('should render random products', async function () {
        cy.get("div.productCard")
            .should("have.length", 20)
            .first()
            .find("div.MuiTypography-subtitle1")
            .should("have.length", 1)

        // const els = await cy.get("div.MuiTypography-subtitle1")
        // const text = els[0].querySelector("div.MuiTypography-subtitle1").textContent
        // console.log(text)
        // cy.visit("http://localhost:3000")
        //
        // cy.get("div.MuiTypography-subtitle1")
        //     .should("not.have.text", text)
    });

    it('should render logged navbar', function () {
        cy.contains("button", "Zaloguj").click()
        cy.get("input")
            .eq(0)
            .type("occupied@email.pl")
        cy.get("input")
            .eq(1)
            .type("123456789")
        cy.get("#root > div.MuiContainer-root.MuiContainer-maxWidthLg.css-1tyumyi-MuiContainer-root > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column.css-7fqh9c-MuiGrid-root > button.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ln3sm5-MuiButtonBase-root-MuiButton-root")
            .eq(0)
            .click()
            .then(p => console.log(p.text()))

        cy.wait(2000)

        cy.url().should("eq", "http://localhost:3000/")
        cy.contains("button", "Zaloguj").should("not.exist")
        cy.getCookie("auth-token").should("exist")
    });

    it('navbar hides', function () {
        cy.visit("/")
        cy.scrollTo(0, 1500)
        cy.get("header").should("have.css", "visibility", "hidden")
    });

    it('navbar shows', function () {
        cy.scrollTo(0, 1400)
        cy.get("header").should("not.have.css", "visibility", "hidden")
    });

    it('scroll up button is not visible', function () {
        cy.visit("/")
        cy.get("#root > div.MuiBox-root.css-mgur8").should("have.css", "visibility", "hidden")
    });

    it('scroll up button is visible', function () {
        cy.scrollTo(0, 2000)
        cy.get("#root > div.MuiBox-root.css-mgur8").should("not.have.css", "visibility", "hidden")
    });

    it("move site to start", () => {
        cy.get("#root > div.MuiBox-root.css-mgur8").click()
        cy.get("header").should("not.have.css", "visibility", "hidden")
    });

    it('all tshirts', function () {
        cy.visit("/")
        cy.contains("button", "T-shirty").click()
        cy.contains("a", "Wszystko w kategorii T-shirty").should("exist").click()
        cy.get("div.productCard").should("have.length.gte", T_SHIRTS_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=T_SHIRTS")
        })
    });

    it('t-shirts', function () {
        cy.contains("button", "T-shirty").click()
        cy.contains("a", "Z krótkim rękawem").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", T_SHIRTS_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=T_SHIRTS")
            expect(loc.search).contains("subcategory=T_SHIRT")
        })
    });

    it('longsleeve', function () {
        cy.contains("button", "T-shirty").click()
        cy.contains("a", "Z długim rękawem").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", T_SHIRTS_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=T_SHIRTS")
            expect(loc.search).contains("subcategory=LONG_SLEEVE")
        })
    });

    it('polo', function () {
        cy.contains("button", "T-shirty").click()
        cy.contains("a", "Polo").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", T_SHIRTS_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=T_SHIRTS")
            expect(loc.search).contains("subcategory=POLO")
        })
    });

    it('all blouses', function () {
        cy.contains("button", "Bluzy").click()
        cy.contains("a", "Wszystko w kategorii Bluzy").should("exist").click()
        cy.get("div.productCard").should("have.length.gte", BLOUSES_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=SWEATSHIRTS")
        })
    });

    it('hoodies', function () {
        cy.contains("button", "Bluzy").click()
        cy.contains("a", "Z kapturem").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", BLOUSES_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=SWEATSHIRTS")
            expect(loc.search).contains("subcategory=HOODIE")
        })
    });

    it('crawnnecks', function () {
        cy.contains("button", "Bluzy").click()
        cy.contains("a", "Bez kaptura").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", BLOUSES_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=SWEATSHIRTS")
            expect(loc.search).contains("subcategory=CRAWNECK")
        })
    });

    it('all trousers', function () {
        cy.contains("button", "Spodnie").click()
        cy.contains("a", "Wszystko w kategorii Spodnie").should("exist").click()
        cy.get("div.productCard").should("have.length.gte", TROUSERS_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=TROUSERS")
        })
    });

    it('chinosy', function () {
        cy.contains("button", "Spodnie").click()
        cy.contains("a", "Chinosy").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", TROUSERS_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=TROUSERS")
            expect(loc.search).contains("subcategory=CHINOS")
        })
    });

    it('jeans', function () {
        cy.contains("button", "Spodnie").click()
        cy.contains("a", "Jeansy").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", TROUSERS_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=TROUSERS")
            expect(loc.search).contains("subcategory=JEANS")
        })
    });

    it('elegant', function () {
        cy.contains("button", "Spodnie").click()
        cy.contains("a", "Elegancki").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", TROUSERS_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=TROUSERS")
            expect(loc.search).contains("subcategory=ELEGANT")
        })
    });

    it('all accessories', function () {
        cy.contains("button", "Akcesoria").click()
        cy.contains("a", "Wszystko w kategorii Akcesoria").should("exist").click()
        cy.get("div.productCard").should("have.length.gte", ACCESSORIES_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=ACCESSORIES")
        })
    });

    it('hats', function () {
        cy.contains("button", "Akcesoria").click()
        cy.contains("a", "Czapki").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", ACCESSORIES_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=ACCESSORIES")
            expect(loc.search).contains("subcategory=HATS")
        })
    });

    it('watches', function () {
        cy.contains("button", "Akcesoria").click()
        cy.contains("a", "Zegarki").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", ACCESSORIES_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=ACCESSORIES")
            expect(loc.search).contains("subcategory=WATCHES")
        })
    });

    it('stripes', function () {
        cy.contains("button", "Akcesoria").click()
        cy.contains("a", "Paski").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", ACCESSORIES_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=ACCESSORIES")
            expect(loc.search).contains("subcategory=STRIPES")
        })
    });

    it('backpacks', function () {
        cy.contains("button", "Akcesoria").click()
        cy.contains("a", "Plecaki").should("exist").click()
        cy.get("div.productCard").should("have.length.lt", ACCESSORIES_NUMBER)
        cy.location().should(loc => {
            expect(loc.search).contains("category=ACCESSORIES")
            expect(loc.search).contains("subcategory=BACKPACKS")
        })
    });



})
