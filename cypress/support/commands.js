Cypress.Commands.add(
  "isInMenu",
  (menuTitleSelector, menuNameSelector, closeButtonSelector) => {
    cy.get(menuTitleSelector).contains(menuNameSelector);
    cy.get(closeButtonSelector).click();
  }
);

Cypress.Commands.add(
  "fillAndSubmit",
  (registrationData, submitButtonSelector) => {
    Object.entries(registrationData).forEach(([selector, value]) => {
      cy.get(selector).type(value);
    });

    cy.get(submitButtonSelector).click();
  }
);

Cypress.Commands.add("blazeRequest", (endpoint, data) => {
  cy.request("POST", `${cy.config("apiUrl")}${endpoint}`, data).then(
    (response) => cy.wrap({ content: response })
  );
});

Cypress.Commands.add("retrieveProducts", (elementSelector) => {
  return cy.get(elementSelector).then((products) => {
    const productList = [];

    products.each((_, product) => {
      const productName = Cypress.$(product).find(".card-title").text();
      const productDesc = Cypress.$(product).find(".card-text").text();
      const productPrice = parseInt(Cypress.$(product).find("h5").text());

      const productData = {
        productName: productName,
        productDesc: productDesc,
        productPrice: productPrice,

        selector: product,
      };

      productList.push(productData);
    });

    cy.wrap({ products: productList });
  });
});

Cypress.Commands.add("searchProductsByCat", (category) => {
  cy.blazeRequest("bycat", {
    cat: category,
  }).then((response) => {
    cy.wrap({
      items: response.content.body.Items,
      title: response.content.body.Items.map((product) => product.title),
    });
  });
});

Cypress.Commands.add("hookProductFilterName", (name, category) => {
  cy.searchProductsByCat(category).then((products) =>
    cy.wrap(products.title).as(name)
  );
});

Cypress.Commands.add("productFilterContext", (filterName) => {
  cy.get(filterName).then((filteredNames) => {
    cy.retrieveProducts(".card.h-100").then((response) => {
      const names = response.products.map((product) => product.productName);

      cy.wrap({
        filteredNames: filteredNames,
        allProductsName: names,
      });
    });
  });
});
