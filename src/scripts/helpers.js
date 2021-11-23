import {
  getData,
  sendData,
  putData,
  patchData,
  deleteData,
} from "./methods.js";

const createHtmlTag = ({
  tagName = "div",
  tagId,
  tagClass,
  tagText,
  tagAttr,
  tagEvent,
}) => {
  const node = document.createElement(tagName);
  //<div></div>
  if (tagId !== undefined) {
    node.id = tagId;
    //<div id='tagId'></div>
  }

  if (tagClass !== undefined) {
    if (Array.isArray(tagClass)) {
      tagClass.forEach((element) => {
        node.classList.add(element);
      });
      //<div class="class1 class2"></div>
    } else {
      node.classList.add(tagClass);
      //<div class="class1"></div>
    }
  }

  if (tagText !== undefined) {
    const nodeText = document.createTextNode(tagText);
    node.appendChild(nodeText);
    //<div>nodeText</div>
  }

  if (tagAttr !== undefined) {
    if (Array.isArray(tagAttr)) {
      tagAttr.forEach((attr) => {
        node.setAttribute(attr.key, attr.value);
      });
      //<div data-bdd="element" value="text"></div>
    } else {
      node.setAttribute(tagAttr.key, tagAttr.value);
      //<div data-bdd="element"></div>
    }
  }

  if (tagEvent !== undefined) {
    node.addEventListener(tagEvent.type, tagEvent.cb);
  }

  return node;
  //<div id="tagId" class="class1" value="text">nodeText</div>
};

const showResults = (r, resultTag) =>
  (resultTag.innerText = JSON.stringify(r, null, 2));

const sendRequest = (url, method, body, resultTag) => {
  switch (method) {
    case "GET":
      getData(url).then((r) => showResults(r, resultTag));
      break;
    case "POST":
      sendData(url, body).then((r) => showResults(r, resultTag));
      break;
    case "PUT":
      putData(url, body).then((r) => showResults(r, resultTag));
      break;
    case "PATCH":
      patchData(url, body).then((r) => showResults(r, resultTag));
      break;
    case "DELETE":
      deleteData(url, body).then((r) => showResults(r, resultTag));
      break;
    default:
      resultTag.innerText = "Choose correct method.";
  }
};

const handleButtonRow = (event) => {
  const row = event.target.parentElement;
  row.parentElement.appendChild(createBodyRow());
  event.target.innerText = "Remove Row";
  event.target.removeEventListener("click", handleButtonRow);
  event.target.addEventListener("click", () => {
    row.remove();
  });
};

const serializedData = () => {
  const inputsArr = [...document.querySelectorAll(".requestBody input")];
  const inputsVal = inputsArr.map((item) => item.value);

  const data = {};
  inputsVal.forEach((val, idx, arr) => {
    if (idx % 2 === 0) {
      data[val] = arr[idx + 1];
    }
  });
  return JSON.stringify(data);
};

const createBodyRow = () => {
  const rowTag = createHtmlTag({ tagClass: "requestBody" });
  const keyInputTag = createHtmlTag({ tagName: "input" });
  const valueInputTag = createHtmlTag({ tagName: "input" });
  const buttonTag = createHtmlTag({
    tagName: "button",
    tagId: "add",
    tagText: "Add Row",
    tagEvent: { type: "click", cb: handleButtonRow },
  });
  rowTag.appendChild(keyInputTag);
  rowTag.appendChild(valueInputTag);
  rowTag.appendChild(buttonTag);
  return rowTag;
};

export const createGUI = (supportedMethods) => {
  const wrapper = document.createElement("div");

  const select = createHtmlTag({
    tagName: "select",
    tagId: "method",
    tagAttr: { key: "name", value: "methods" },
  });
  //<select id="method" name="methods"></select>

  supportedMethods.forEach((method) => {
    const option = createHtmlTag({
      tagName: "option",
      tagText: method.toUpperCase(),
      tagAtt: { key: "value", value: method },
    });
    //<option value="get">GET</option>

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
  //<input id="endpoint" type="text" value="http://localhost:3000/posts">

  const button = createHtmlTag({
    tagName: "button",
    tagId: "send",
    tagText: "Send",
    tagEvent: {
      type: "click",
      cb: () => {
        sendRequest(input.value, select.value, serializedData(), result);
      },
    },
  });
  //<button id="send">send</button>

  // const textArea = createHtmlTag({ tagName: "textarea", tagClass: "data" });
  //<textarea class="data"></textarea>

  const result = createHtmlTag({ tagName: "pre" });
  //<pre></pre>
  wrapper.appendChild(select);
  wrapper.appendChild(input);
  wrapper.appendChild(button);
  // wrapper.appendChild(textArea);
  wrapper.appendChild(result);
  wrapper.appendChild(createBodyRow());

  return wrapper;
};
