import { getData, sendData } from "./methods.js";

const createHtmlTag = ({
  tagName,
  tagId,
  tagClass,
  tagText,
  tagAttr,
  tagEvent,
}) => {
  const node = document.createElement(tagName);
  if (tagId !== undefined) {
    node.id = tagId;
  }

  if (tagClass !== undefined) {
    if (Array.isArray(tagClass)) {
      tagClass.forEach((element) => {
        node.classList.add(element);
      });
    } else {
      node.classList.add(tagClass);
    }
  }

  if (tagText !== undefined) {
    const nodeText = document.createTextNode(tagText);
    node.appendChild(nodeText);
  }

  if (tagAttr !== undefined) {
    if (Array.isArray(tagAttr)) {
      tagAttr.forEach((attr) => {
        node.setAttribute(attr.key, attr.value);
      });
    } else {
      node.setAttribute(tagAttr.key, tagAttr.value);
    }
  }

  if (tagEvent !== undefined) {
    node.addEventListener(tagEvent.type, tagEvent.cb);
  }

  return node;
};

const sendRequest = (url, method, body, resultTag) => {
  switch (method) {
    case "GET":
      getData(url).then(
        (r) => (resultTag.innerText = JSON.stringify(r, null, 2))
      );
      break;
    case "POST":
      sendData(url, body.value).then(
        (r) => (resultTag.innerText = JSON.stringify(r, null, 2))
      );
      break;
  }
};

export const createGUI = (supportedMethods) => {
  const wrapper = document.createElement("div");

  const select = createHtmlTag({
    tagName: "select",
    tagId: "method",
    tagAttr: { key: "name", value: "methods" },
  });

  supportedMethods.forEach((method) => {
    const option = createHtmlTag({
      tagName: "option",
      tagText: method.toUpperCase(),
      tagAtt: { key: "value", value: method },
    });

    select.appendChild(option);
  });

  const input = createHtmlTag({
    tagName: "input",
    tagId: "endpoint",
    tagAttr: [
      { key: "type", value: "text" },
      { key: "value", value: "http://localhost:3000/posts" },
    ],
  });

  const button = createHtmlTag({
    tagName: "button",
    tagId: "send",
    tagText: "send",
    tagEvent: {
      type: "click",
      cb: () => {
        sendRequest(input.value, select.value, textArea, result);
      },
    },
  });

  const textArea = createHtmlTag({ tagName: "textarea", tagClass: "data" });

  const result = createHtmlTag({ tagName: "pre" });

  wrapper.appendChild(select);
  wrapper.appendChild(input);
  wrapper.appendChild(button);
  wrapper.appendChild(textArea);
  wrapper.appendChild(result);

  return wrapper;
};
