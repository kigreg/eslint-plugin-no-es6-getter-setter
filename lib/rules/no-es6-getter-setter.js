"use strict";

module.exports = {
    meta: {
        docs: {
            description: "disallow es6/javascript getter/setter",
            category: "ECMAScript 6"
        },
        schema: []
    },
    create(context) {
        return {
            ObjectExpression(node) {
                node.properties
                    .filter(p => p.kind === "get")
                    .forEach(p => context.report({
                        loc: {
                            start: p.loc.start,
                            end: p.key.loc.end
                        },
                        message: "Getters not allowed.",
                    }));

                node.properties
                    .filter(p => p.kind === "set")
                    .forEach(p => context.report({
                        loc: {
                            start: p.loc.start,
                            end: p.key.loc.end
                        },
                        message: "Setters not allowed."
                    }))
            },

            ClassBody(node) {
                node.body
                    .filter(b => b.kind === "get")
                    .forEach(b => context.report({
                        loc: {
                            start: b.loc.start,
                            end: b.key.loc.end
                        },
                        message: "Getters not allowed."
                    }));

                node.body
                    .filter(b => b.kind === "set")
                    .forEach(b => context.report({
                        loc: {
                            start: b.loc.start,
                            end: b.key.loc.end
                        },
                        message: "Setters not allowed."
                    }))
            }
        };
    }
};
