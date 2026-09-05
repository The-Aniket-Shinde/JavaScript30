let inputs = document.querySelectorAll('.box input');

function update(e) {
    let input = e.target;
    let unit = input.dataset.unit || '';

    if (input.type === 'file') {
        let file = input.files[0];

        if (!file) return;

        let imageurl = URL.createObjectURL(file);

        document.documentElement.style.setProperty(`--${e.target.name}`,`url("${imageurl}")`);

        return;
    }

    document.documentElement.style.setProperty(`--${input.name}`,input.value + unit);
}

inputs.forEach( (input) => {
    input.addEventListener('change',update);
});