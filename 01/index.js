function tree(jsonObj, prefix = "", isFirst = true, isLast = true) {
  console.log(
    prefix + (isFirst ? "├── " : isLast ? "└── " : "├── ") + jsonObj.name
  );
  if (jsonObj.items) {
    const lastIndex = jsonObj.items.length - 1;
    jsonObj.items.forEach((item, index) => {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      tree(item, newPrefix, index === 0 && isFirst, index === lastIndex);
    });
  }
}
tree({
  name: 1,
  items: [
    {
      name: 2,
      items: [{ name: 3 }, { name: 4 }],
    },
    {
      name: 5,
      items: [{ name: 6 }],
    },
  ],
});
