console.log("Hello World");

const simple = new SimpleMDE({
  element: document.getElementById("content"),
  forceSync: true,
  autosave: {
    enabled: true,
    uniqueId: "MyUniqueID",
    delay: 1000,
  },
  previewRender: function (plainText, preview) {
    // Async method
    setTimeout(function () {
      const markedHtml = marked.parse(plainText);
      preview.innerHTML = markedHtml;
      console.log(markedHtml);
    }, 250);

    return "Loading...";
  },
  renderingConfig: {
    singleLineBreaks: false,
    codeSyntaxHighlighting: true,
  },
});

const contnet = document.getElementById("content");

simple.codemirror.on("change", () => {
  contnet.value = simple.value();
});
