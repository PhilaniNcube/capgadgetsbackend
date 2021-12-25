"use strict";
const { sanitizeEntity, parseMultipartData } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // get logged in users orders
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] }
      ]);
    }

    const data = await strapi.services.order.find({ user: user.id });

    if (!data) {
      return ctx.notFound();
    }

    return sanitizeEntity(data, { model: strapi.models.order });
  },

  async myOrder(ctx) {
    const { id } = ctx.params;

    const [orders] = await strapi.services.order.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id
    });

    if (!orders) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    const entity = await strapi.services.order.find({ id });
    return sanitizeEntity(entity, { model: strapi.models.order });
  }
};
