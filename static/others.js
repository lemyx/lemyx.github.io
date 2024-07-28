function manipulate(callback, selector) {
    const divList = Array.from(document.querySelectorAll(selector));
    callback(divList)
  }
  
  function callbackDepracated(items) {
    let _toc = document.querySelector("#table-of-contents");
    for (let item of items) {
      if (_toc.contains(item)) {
        let p = item.closest('li');
        p.style.textDecoration = "line-through";
      } else {
        let p = item.closest('div');
        p.style.textDecoration = "line-through";
      }
    }
  }
  
  manipulate(callbackDepracated, ".tag .outdated");