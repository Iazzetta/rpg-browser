class Modal {
    constructor() {}

    static async open(modal_type) {
        Modal.closeModal();
        const r = await fetch(`/modal/${modal_type}`);
        const response = await r.text();
        document.body.insertAdjacentHTML("beforeend", response);

        document.querySelector('.modal__close').addEventListener('click', () => {
            Modal.closeModal();
        })
    }

    static closeModal() {
        try {
            document.querySelector('.modal').remove();
        } catch(e){}
    }

}