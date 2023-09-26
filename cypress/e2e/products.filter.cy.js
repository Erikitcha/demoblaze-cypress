describe("Filter API", () => {
  
  beforeEach(() => {
    cy.visit("/");
  });

  context("Laptop Filter", () => {
    beforeEach(() => {
      cy.get("[onclick=\"byCat('notebook')\"]").click();
      cy.hookProductFilterName("notebookFilter", "notebook");
    });

    it("Apply laptop category", () => {
      cy.searchProductsByCat("notebook").then((products) => {
        products.items.forEach((product) =>
          expect(product.cat).to.eq("notebook")
        );
      });
    });

    it("Was laptop filter applied in page", () => {
      cy.productFilterContext("@notebookFilter").then((notebookCtx) => {
        expect(notebookCtx.filteredNames).to.deep.equal(
          notebookCtx.allProductsName
        );
      });
    });
  });

  context("Phone Filter", () => {
    beforeEach(() => {
      cy.get("[onclick=\"byCat('phone')\"]").click();
      cy.hookProductFilterName("phoneFilter", "phone");
    });

    it("Apply phone category", () => {
      cy.searchProductsByCat("phone").then((products) => {
        products.items.forEach((product) =>
          expect(product.cat).to.eq("phone")
        );
      });
    });

    it("Was phone filter applied in page", () => {
      cy.productFilterContext("@phoneFilter").then((phoneCtx) => {
        expect(phoneCtx.filteredNames).to.deep.equal(phoneCtx.allProductsName);
      });
    });
  });

  context("Monitors Filter", () => {
    beforeEach(() => {
      cy.get("[onclick=\"byCat('monitor')\"]").click();
      cy.hookProductFilterName("monitorFilter", "monitor");
    });

    it("Apply monitor category", () => {
      cy.searchProductsByCat("monitor").then((products) => {
        products.items.forEach((product) =>
          expect(product.cat).to.eq("monitor")
        );
      });
    });

    it("Was filter applied in page", () => {
      cy.productFilterContext("@monitorFilter").then((phoneCtx) => {
        expect(phoneCtx.filteredNames).to.deep.equal(phoneCtx.allProductsName);
      });
    });
  });
});