const addBtn = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function populateList(arr = [], listEl) {
  listEl.innerHTML = arr
    .map(
      (item, i) => `
    <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''}/>
      <label for="item${i}">${item.text}</label>
    </li>
    `,
    )
    .join('');
}

function toggleDone(e) {
  // ! research .matches further !
  if (!e.target.matches('input')) return;
  const el = e.target;
  items[el.dataset.index].done = !items[el.dataset.index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function addItem(e) {
  const text = this.querySelector('[name=item]').value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  e.preventDefault();
  // this = form el, has reset method instead of manually clearing input
  this.reset();
}

addBtn.addEventListener('submit', addItem);
// li's not necessarily present on dom load, delegating
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);
