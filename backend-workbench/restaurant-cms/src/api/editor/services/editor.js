'use strict';

/**
 * editor service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::editor.editor');
