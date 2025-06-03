const buttons = document.querySelectorAll('.slider-button');

const dropdown_difficulty = document.getElementById('difficultyDropdown');
const dropdown_category = document.getElementById('categoryDropdown');
const selected_difficulty = dropdown_difficulty.querySelector('.select-selected-difficulty');
const selected_category = dropdown_category.querySelector('.select-selected-category');
const items_difficulty = dropdown_difficulty.querySelector('.select-items');
const items_category = dropdown_category.querySelector('.select-items');
const hiddenInput_difficulty = document.getElementById('difficultyInput');
const hiddenInput_category = document.getElementById('categoryInput');

function previewImagem() {
    const input = document.getElementById('imagem');
    const preview = document.getElementById('preview');

    const file = input.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      }

      reader.readAsDataURL(file);
    } else {
      preview.src = "#";
      preview.style.display = 'none';
    }
  }

// Toggle dropdown open/close
selected_difficulty.addEventListener('click', () => {
  items_difficulty.classList.toggle('select-hide');
});
selected_category.addEventListener('click', () => {
  items_category.classList.toggle('select-hide');
});

// Select option and update hidden input + displayed text
items_difficulty.querySelectorAll('div').forEach(option => {
option.addEventListener('click', (e) => {
  e.stopPropagation();
  selected_difficulty.textContent = option.textContent;
  selected_difficulty.dataset.value = option.dataset.value;
  hiddenInput_difficulty.value = option.dataset.value;
  items_difficulty.classList.add('select-hide');
});
});
items_category.querySelectorAll('div').forEach(option => {
option.addEventListener('click', (e) => {
  e.stopPropagation();
  selected_category.textContent = option.textContent;
  selected_category.dataset.value = option.dataset.value;
  hiddenInput_category.value = option.dataset.value;
  items_category.classList.add('select-hide');
});
});

// Close dropdown if clicking outside
document.addEventListener('click', (e) => {
  if (!dropdown_difficulty.contains(e.target)) {
    items_difficulty.classList.add('select-hide');
  }
});
document.addEventListener('click', (e) => {
  if (!dropdown_category.contains(e.target)) {
    items_category.classList.add('select-hide');
  }
});

// ETC
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

function goToPage(pageNumber) {
      const slider = document.getElementById('slider');
      slider.style.transform = `translateX(-${pageNumber * 100}vw)`;
    }