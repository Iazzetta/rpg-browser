class Modal {
    constructor() {}

    static async open(modal_type, callback = false) {
        Modal.closeModal();
        const r = await fetch(`/modal/${modal_type}`);
        const response = await r.text();
        document.body.insertAdjacentHTML("beforeend", response);

        document.querySelector('.modal__close').addEventListener('click', () => {
            Modal.closeModal();
        })

        if (callback) {
            callback();
        }
    }

    static closeModal() {
        try {
            document.querySelector('.modal').remove();
        } catch(e){}
    }

}