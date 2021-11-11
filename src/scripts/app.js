import { createGUI } from "./helpers.js";

const body = document.body;

const supportedMethods = ["", "get", "post", "put", "patch", "delete"];

body.appendChild(createGUI(supportedMethods));
