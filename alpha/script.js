function blueprintForm() {
  window.addEventListener("load", () => {
    window.addEventListener("message", function (event) {
      if (event.data.type === "BLUEPRINT_FORM_REDIRECT") {
        if (event.data.url) {
          window.location.href = event.data.url
        }
      }
    })

    window.addEventListener("message", function (event) {
      if (event.data.type === "BLUEPRINT_FORM_GET_URL_PARAMS") {
        // Get URL parameters and send them back to the iframe
        var params = Object.fromEntries(new URLSearchParams(window.location.search))
        event.source.postMessage({ type: "URL_PARAMS", params: params }, event.origin)
      }
    })

    var iframe = document.getElementById("blueprint-form")
    // get default height of iframe, in number without px
    var defaultHeight = iframe.height
    defaultHeight = parseInt(defaultHeight.replace("px", ""))

    function updateIframeHeight(height) {
      if (!iframe) {
        return
      }

      if (height) {
        // check if iframe height is greater than default height
        if (height > defaultHeight) {
          iframe.height = height
        } else {
          iframe.height = defaultHeight
        }
      }
    }

    window.addEventListener("message", function (event) {
      if (event.data.type === "BLUEPRINT_FORM_HEIGHT") {
        console.log("Received iframe height:", event.data.height)
        updateIframeHeight(event.data.height)
      }
    })
  })
}

blueprintForm()
