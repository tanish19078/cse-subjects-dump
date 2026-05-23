let cart = [];

function addItem(name, price, quantity) {
    const existing = cart.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        existing.quantity += quantity;
        return `"${existing.name}" quantity increased to ${existing.quantity}`;
    } else {
        cart.push({ name, price, quantity });
        return `"${name}" added to cart`;
    }
}

function removeItem(name) {
    const index = cart.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
    if (index === -1) {
        return { success: false, message: `"${name}" not found in cart` };
    }
    const removed = cart.splice(index, 1)[0];
    return { success: true, message: `"${removed.name}" removed from cart` };
}

function updateQuantity(name, quantity) {
    const item = cart.find(i => i.name.toLowerCase() === name.toLowerCase());
    if (!item) return `"${name}" not found in cart`;
    
    if (quantity <= 0) {
        removeItem(name);
        return `"${item.name}" removed (quantity set to 0)`;
    }
    
    item.quantity = quantity;
    return `"${item.name}" quantity updated to ${quantity}`;
}

function searchItem(name) {
    const item = cart.find(i => i.name.toLowerCase() === name.toLowerCase());
    return item ? { found: true, item } : { found: false };
}

function viewCart() {
    if (cart.length === 0) return [];
    return cart.map((item, i) => ({
        index: i + 1,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
    }));
}

function getTotal() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = 0;
    if (subtotal > 100) {
        discount = subtotal * 0.10;
    }
    const finalTotal = subtotal - discount;
    return { subtotal, discount, finalTotal };
}

function toast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = message;
    container.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function updateStats() {
    const { finalTotal } = getTotal();
    const uniqueItems = cart.length;
    const totalQty = cart.reduce((s, i) => s + i.quantity, 0);

    document.getElementById('stat-items').textContent = uniqueItems;
    document.getElementById('stat-qty').textContent = totalQty;
    document.getElementById('stat-total').textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
}

function renderCartUI() {
    const display = document.getElementById('cart-display');
    const items = viewCart();

    if (items.length === 0) {
        display.innerHTML = `
            <div class="empty-state" style="text-align:center; padding:40px; color:var(--text-muted);">
                <p>Current shopping cart is empty.</p>
            </div>`;
        document.getElementById('bill-summary').classList.remove('show');
        updateStats();
        return;
    }

    let html = `
    <table class="cart-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Product Information</th>
                <th>Quantity</th>
                <th>Total Value</th>
                <th></th>
            </tr>
        </thead>
        <tbody>`;

    items.forEach(item => {
        html += `
        <tr>
            <td style="color:var(--text-muted); font-size: 0.8rem; font-weight: 700;">${item.index}</td>
            <td>
                <div class="item-info-row">
                    <span class="item-primary-name">${item.name}</span>
                    <span class="item-secondary-info">₹${item.price.toLocaleString('en-IN')} unit price</span>
                </div>
            </td>
            <td>
                <div class="qty-stack">
                    <button class="qty-toggle" onclick="changeQty('${item.name}', ${item.quantity - 1})">−</button>
                    <span class="qty-count">${item.quantity}</span>
                    <button class="qty-toggle" onclick="changeQty('${item.name}', ${item.quantity + 1})">+</button>
                </div>
            </td>
            <td style="font-weight:700; color:var(--success)">₹${item.subtotal.toLocaleString('en-IN')}</td>
            <td>
                <button class="btn btn-icon-sm" onclick="handleRemoveItem('${item.name}')">Remove</button>
            </td>
        </tr>`;
    });

    html += `</tbody></table>`;
    display.innerHTML = html;
    updateStats();
}

function handleAddItem() {
    const nameInput = document.getElementById('add-name');
    const priceInput = document.getElementById('add-price');
    const qtyInput = document.getElementById('add-qty');

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const qty = parseInt(qtyInput.value) || 1;

    if (!name || isNaN(price) || price <= 0 || qty <= 0) {
        return toast("Please enter valid product details.", "error");
    }

    const msg = addItem(name, price, qty);
    toast(msg);
    
    nameInput.value = ''; priceInput.value = ''; qtyInput.value = '1';
    nameInput.focus();
    renderCartUI();
}

function handleRemoveItem(name) {
    const result = removeItem(name);
    toast(result.message, result.success ? 'success' : 'error');
    renderCartUI();
}

function changeQty(name, newQty) {
    const msg = updateQuantity(name, newQty);
    toast(msg, 'info');
    renderCartUI();
}

function handleSearchItem() {
    const nameInput = document.getElementById('search-name');
    const name = nameInput.value.trim();
    if (!name) return toast("Enter product name to search.", "error");

    const result = searchItem(name);
    const resultBox = document.getElementById('search-result');

    resultBox.style.display = 'block';
    if (result.found) {
        resultBox.className = 'found';
        const i = result.item;
        resultBox.innerHTML = `Found Product: ${i.name} - Unit Price: ₹${i.price.toLocaleString('en-IN')} - Total Qty: ${i.quantity}`;
    } else {
        resultBox.className = 'not-found';
        resultBox.innerHTML = `Product Match Failure: Could not find "${name}" in inventory.`;
    }
}

function handleShowBill() {
    if (cart.length === 0) return toast("Cannot calculate bill for empty cart.", "error");

    const { subtotal, discount, finalTotal } = getTotal();
    const summaryEl = document.getElementById('bill-summary');
    
    summaryEl.classList.add('show');
    let html = `<div class="bill-row"><span>Inventory Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>`;

    if (discount > 0) {
        html += `<div class="bill-row"><span>Order Discount <span class="discount-bubble">10% APPLIED</span></span><span style="color:var(--danger)">−₹${discount.toLocaleString('en-IN')}</span></div>`;
    }

    html += `<div class="bill-row final-total"><span>Final Settlement</span><span>₹${finalTotal.toLocaleString('en-IN')}</span></div>`;
    summaryEl.innerHTML = html;
}

function handleClearCart() {
    if (cart.length === 0) return;
    if (confirm("Reset current shopping inventory?")) {
        cart = [];
        toast("Inventory cleared", "info");
        renderCartUI();
    }
}

function launchPromptMenu() {
    let choice;
    do {
        choice = prompt(
            "SHOPPING CART MANAGEMENT SYSTEM\n" +
            "1. Add Item\n" +
            "2. Remove Item\n" +
            "3. Update Quantity\n" +
            "4. Search Item\n" +
            "5. View Cart\n" +
            "6. Total Bill\n" +
            "7. Exit\n\n" +
            "Response Required (1-7):"
        );

        if (choice === null) break;

        switch (choice) {
            case '1':
                let n = prompt("Enter product name:");
                if (!n) break;
                let p = parseFloat(prompt("Enter price:"));
                let q = parseInt(prompt("Enter quantity:"));
                if (!isNaN(p) && !isNaN(q)) {
                    alert("System Response: " + addItem(n, p, q));
                    renderCartUI();
                } else {
                    alert("Error: Numeric input required for price/quantity.");
                }
                break;
            case '2':
                let r = prompt("Enter product name for removal:");
                if (r) {
                    let res = removeItem(r);
                    alert("System Response: " + res.message);
                    renderCartUI();
                }
                break;
            case '3':
                let uN = prompt("Enter name to update quantity:");
                if (!uN) break;
                let uQ = parseInt(prompt("Enter new integer quantity:"));
                if (!isNaN(uQ)) {
                    alert("System Response: " + updateQuantity(uN, uQ));
                    renderCartUI();
                }
                break;
            case '4':
                let s = prompt("Search keyword:");
                if (s) {
                    let res = searchItem(s);
                    if (res.found) {
                        alert(`Result: ${res.item.name} | Unit Price: ₹${res.item.price} | Total Qty: ${res.item.quantity}`);
                    } else {
                        alert("Result: Match Failure");
                    }
                }
                break;
            case '5':
                let items = viewCart();
                if (items.length === 0) {
                    alert("Current inventory is empty.");
                } else {
                    let out = items.map(i => `${i.index}. ${i.name} - Unit: ₹${i.price} x Qty: ${i.quantity} = Total: ₹${i.subtotal}`).join("\n");
                    alert("ACTIVE CART SUMMARY:\n" + out);
                }
                break;
            case '6':
                let b = getTotal();
                alert(`SETTLEMENT REPORT\nSubtotal: ₹${b.subtotal}\nDiscount: ₹${b.discount}\nFinal: ₹${b.finalTotal}`);
                handleShowBill();
                break;
        }
    } while (choice !== '7');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const activeId = document.activeElement.id;
        if (['add-name', 'add-price', 'add-qty'].includes(activeId)) handleAddItem();
        if (activeId === 'search-name') handleSearchItem();
    }
});

window.onload = renderCartUI;
