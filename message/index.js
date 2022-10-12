const { hash } = window.location;
const input = document.querySelector("#message-input");
const linkInput = document.querySelector("#link-input");
const inputMessage = document.querySelector("#input-message");
let encrypted;
const message = atob(hash.slice(1));
if (message) {
  document.querySelector("#input-form").classList.add("hide");
  document.querySelector("#output-form").classList.add("hide");
  document.querySelector("#message-form").classList.remove("hide");
  document.querySelector("h1").innerText = message;
}
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.querySelector("#input-form").classList.add("hide");
  document.querySelector("#output-form").classList.remove("hide");

  encrypted = btoa(input.value);

  linkInput.value = `${window.location}#${encrypted}`;

  linkInput.select();
});
document.querySelector("#go-to-link").addEventListener("click", function () {
  document.querySelector("#input-form").classList.add("hide");
  document.querySelector("#output-form").classList.add("hide");
  document.querySelector("#message-form").classList.remove("hide");
  document.querySelector("h1").innerText = atob(encrypted);
  location.href = linkInput.value;
});
