class CadastroForm extends HTMLElement {
  constructor() {
    super();
    this.fields = [];
  }

  connectedCallback() {
    this.loadFields();
    this.render();
    this.setupEvents();
  }

  // 🔹 Lê o atributo "fields"
  loadFields() {
    const fieldsAttr = this.getAttribute("fields");
    if (fieldsAttr) {
      try {
        this.fields = JSON.parse(fieldsAttr);
      } catch (e) {
        console.error("Erro ao ler os campos:", e);
        this.fields = [];
        this.innerHTML = "<p style='color:red'>Erro ao carregar o formulário.</p>";
      }
    }
  }

  // 🔹 Monta o formulário
  render() {
    this.innerHTML = "";
    const form = document.createElement("form");

    this.fields.forEach(field => {
      form.appendChild(this.createField(field));
    });

    form.appendChild(this.createSubmitButton());
    this.appendChild(form);
    this.form = form;
  }

  // 🔹 Cria cada campo (label + input + erro)
  createField(field) {
    const wrapper = document.createElement("div");

    const label = document.createElement("label");
    const elementId = field.id || field.name;
    label.textContent = field.label;
    label.setAttribute("for", elementId);

    const input = this.buildInput(field, elementId);

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    // Mensagem de erro
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    wrapper.appendChild(errorSpan);

    return wrapper;
  }

  // 🔹 Decide o tipo de input
  buildInput(field, elementId) {
    let input;

    switch (field.type) {
      case "textarea":
        input = document.createElement("textarea");
        input.name = field.name;
        input.id = elementId;
        break;

      case "select":
        input = document.createElement("select");
        input.name = field.name;
        input.id = elementId;
        (field.options || []).forEach(opt => {
          const option = document.createElement("option");
          option.value = opt.value;
          option.textContent = opt.label;
          input.appendChild(option);
        });
        break;

      case "radio":
      case "checkbox":
        input = document.createElement("div");
        input.classList.add("group-field");
        (field.options || []).forEach(opt => {
          const wrapper = document.createElement("div");

          const inputItem = document.createElement("input");
          inputItem.type = field.type;
          inputItem.name = field.name;
          inputItem.value = opt.value;
          inputItem.id = `${elementId}-${opt.value}`;

          const lbl = document.createElement("label");
          lbl.setAttribute("for", inputItem.id);
          lbl.textContent = opt.label;

          wrapper.appendChild(inputItem);
          wrapper.appendChild(lbl);
          input.appendChild(wrapper);
        });
        break;

      case "file":
        input = document.createElement("input");
        input.type = "file";
        input.name = field.name;
        input.id = elementId;
        if (field.multiple) input.multiple = true;
        break;

      default:
        input = document.createElement("input");
        input.type = field.type || "text";
        input.name = field.name;
        input.id = elementId;
    }

    if (field.placeholder && input.tagName !== "DIV") input.placeholder = field.placeholder;
    if (field.required && input.tagName !== "DIV") input.required = true;

    return input;
  }

  // 🔹 Cria o botão de envio
  createSubmitButton() {
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Enviar";
    return button;
  }

  // 🔹 Eventos
  setupEvents() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  // 🔹 Validação campo a campo
  validateField(field, inputEl, errorSpan) {
    let valid = true;
    errorSpan.textContent = "";

    if (field.type === "checkbox") {
      const checked = this.form.querySelectorAll(`[name="${field.name}"]:checked`);
      if (field.required && checked.length === 0) {
        errorSpan.textContent = `Selecione pelo menos uma opção em ${field.label}`;
        valid = false;
      }
    } else if (field.type === "radio") {
      const checked = this.form.querySelector(`[name="${field.name}"]:checked`);
      if (field.required && !checked) {
        errorSpan.textContent = `Selecione uma opção em ${field.label}`;
        valid = false;
      }
    } else if (field.type === "file") {
      if (field.required && (!inputEl.files || inputEl.files.length === 0)) {
        errorSpan.textContent = `${field.label} é obrigatório`;
        valid = false;
      }
    } else {
      if (field.required && !inputEl.value.trim()) {
        errorSpan.textContent = `${field.label} é obrigatório`;
        valid = false;
      }
      if (field.type === "email" && inputEl.value) {
        const re = /\S+@\S+\.\S+/;
        if (!re.test(inputEl.value)) {
          errorSpan.textContent = "Email inválido";
          valid = false;
        }
      }
      if (field.type === "number" && inputEl.value && isNaN(inputEl.value)) {
        errorSpan.textContent = `${field.label} deve ser numérico`;
        valid = false;
      }
    }

    return valid;
  }

  // 🔹 Valida o formulário inteiro
  validateForm() {
    let ok = true;

    this.fields.forEach(field => {
      let inputEl;
      if (field.type === "radio" || field.type === "checkbox") {
        inputEl = this.form.querySelector(`[name="${field.name}"]`);
      } else {
        inputEl = this.form.querySelector(`[name="${field.name}"]`);
      }
      const wrapper = inputEl ? inputEl.closest("div") : null;
      const errorSpan = wrapper ? wrapper.querySelector(".error-message") : null;

      if (!this.validateField(field, inputEl, errorSpan)) {
        ok = false;
      }
    });

    return ok;
  }

  // 🔹 Submit
  handleSubmit(event) {
    event.preventDefault();
    if (!this.validateForm()) return;

    const data = {};
    this.fields.forEach(field => {
      if (field.type === "checkbox") {
        const checkboxes = this.form.querySelectorAll(`[name="${field.name}"]:checked`);
        data[field.name] = Array.from(checkboxes).map(cb => cb.value);
      } else if (field.type === "radio") {
        const radio = this.form.querySelector(`[name="${field.name}"]:checked`);
        data[field.name] = radio ? radio.value : "";
      } else if (field.type === "file") {
        const input = this.form.querySelector(`[name="${field.name}"]`);
        data[field.name] = input.files ? Array.from(input.files).map(f => f.name) : [];
      } else {
        const input = this.form.querySelector(`[name="${field.name}"]`);
        data[field.name] = input ? input.value : "";
      }
    });

    this.dispatchEvent(new CustomEvent("formSubmit", { detail: data, bubbles: true, composed: true }));
  }
}

customElements.define("cadastro-form", CadastroForm);
