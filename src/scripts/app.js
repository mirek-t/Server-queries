import { createGUI } from "./helpers.js";

const body = document.body;

const supportedMethods = ["get", "post"];

body.appendChild(createGUI(supportedMethods));
