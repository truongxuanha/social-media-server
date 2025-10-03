import moduleAlias from "module-alias";

moduleAlias.addAliases({
  "@": __dirname + "/../..",
  "@shared": __dirname + "/../..",
  "@application": __dirname + "/../../application",
  "@domain": __dirname + "/../../domain",
  "@infrastructure": __dirname + "/../../infrastructure",
  "@interfaces": __dirname + "/../../interfaces",
  "@services": __dirname + "/../../services",
});

export default moduleAlias;
