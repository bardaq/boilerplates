import moduleAlias from "module-alias";
import dotenv from "dotenv";
import commandLineArgs from "command-line-args";

moduleAlias.addAliases({
  "@": __dirname,
});

moduleAlias();

const options = commandLineArgs([
  {
    name: "env",
    alias: "e",
    defaultValue: "development",
    type: String,
  },
]);

const configRes = dotenv.config({
  path: `./env/${options.env}.env`,
});

if (configRes.error) throw configRes.error;
