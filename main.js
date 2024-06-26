function blueprintForm() {
  window.addEventListener("load", () => {
    const iframe = document.getElementById("blueprint-form");

    if (!iframe) {
      console.error("Iframe with id 'blueprint-form' not found.");
      return;
    }

    let defaultHeight = parseInt(iframe.height.replace("px", "")) || 0;

    function handleMessages(event) {
      if (!event || !event.data) return;

      switch (event.data.type) {
        case "BLUEPRINT_FORM_REDIRECT":
          if (event.data.url) {
            window.location.href = event.data.url;
          }
          break;

        case "BLUEPRINT_FORM_GET_URL_PARAMS":
          const params = Object.fromEntries(new URLSearchParams(window.location.search));
          event.source.postMessage({ type: "URL_PARAMS", params: params }, event.origin);
          break;

        case "BLUEPRINT_FORM_HEIGHT":
          console.log("Received iframe height:", event.data.height);
          updateIframeHeight(event.data.height);
          break;

        default:
          break;
      }
    }

    function updateIframeHeight(height) {
      if (height && height > defaultHeight) {
        iframe.height = `${height}px`;
      } else {
        iframe.height = `${defaultHeight}px`;
      }
    }

    window.addEventListener("message", handleMessages);
  });
}

blueprintForm();