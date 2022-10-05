const createAutoComplete = function ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) {
  root.innerHTML = `
<label><b>Search for an item</b></label>
<input class="input"/>
<div class="dropdown">
 <div class="dropdown-menu">
  <div class="dropdown-content results">
  </div>
 </div>
</div>
`;

  const input = root.querySelector("input");
  const dropDown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async function (e) {
    const items = await fetchData(e.data);
    if (!items.length) {
      dropDown.classList.remove("is-active");
      return;
    }
    resultsWrapper.innerHTML = "";
    dropDown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      option.addEventListener("click", function (e) {
        dropDown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      resultsWrapper.appendChild(option);
    }
  };
  input.addEventListener(`input`, debounce(onInput, 500));
  window.addEventListener("click", function (e) {
    if (!root.contains(e.target)) {
      dropDown.classList.remove("is-active");
    }
  });
};
