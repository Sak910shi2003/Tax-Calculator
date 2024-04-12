document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const error = document.getElementById('error');
    const modal = document.getElementById('resultModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const finalTax = document.getElementById('finalTax');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const income = parseFloat(form.elements['income'].value);
        const extraIncome = parseFloat(form.elements['extraIncome'].value) || 0;
        const deductions = parseFloat(form.elements['deductions'].value) || 0;
        const age = form.elements['age'].value;

        if (isNaN(income) || isNaN(extraIncome) || isNaN(deductions)) {
            error.textContent = 'Please enter valid numbers.';
            error.style.display = 'block';
            return;
        }

        let tax = 0;
        if (income + extraIncome - deductions > 800000) {
            switch (age) {
                case '<40':
                    tax = 0.3 * (income + extraIncome - deductions - 800000);
                    break;
                case '>=40 & <60':
                    tax = 0.4 * (income + extraIncome - deductions - 800000);
                    break;
                case '>=60':
                    tax = 0.1 * (income + extraIncome - deductions - 800000);
                    break;
            }
        }

        modal.style.display = 'block';
        finalTax.textContent = `Tax: ₹${tax.toFixed(2)}`;
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});
