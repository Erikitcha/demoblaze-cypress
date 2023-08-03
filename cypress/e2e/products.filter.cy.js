describe("Filter API", () => {
  beforeEach(() => {
    cy.visit("https://demoblaze.com/#");
  });

  context("Phone Filter", () => {
    let filteredNames;

    it("Apply phone category", () => {
      cy.blazeRequest("bycat", {
        cat: "phone",
      }).then((response) => {
        filteredNames = response.body.Items.map((product) => product.title);

        for (const product of response.body.Items) {
          expect(product.cat).to.eq("phone");
        }
      });
    });

    beforeEach(() => {
      cy.get("[onclick=\"byCat('phone')\"]").click();
      cy.wrap(filteredNames).as("filteredNames");
    });

    it("Was filter applied in page", () => {
      const phoneFilterCtx = {
        filteredNames: [],
        allProductsName: [],
      };

      cy.get("@filteredNames").then((filteredNames) => {
        phoneFilterCtx.filteredNames = filteredNames;

        cy.retrieveProducts(".card.h-100").then((products) => {
          const productNames = products.map((product) => product.productName);
          phoneFilterCtx.allProductsName = productNames;
        });
      });

      expect(phoneFilterCtx.filteredNames).to.deep.equal(phoneFilterCtx.allProductsName);
    });
  });
});
