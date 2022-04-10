const updateBtn = document.querySelector('#update-btn')
function editElement(self) {
  let input = self.parentNode.parentNode.querySelector('input')
  if (input.readOnly) {
    input.readOnly = false
    input.style.outline = "solid"
  }
  input.select()
  if (updateBtn.disabled) {
    updateBtn.disabled = false
    input.required = true;
  }
}
