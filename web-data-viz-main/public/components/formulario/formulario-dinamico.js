class CadastroForm extends HTMLElement {
  constructor() {
    super();
    this.fields = [];
    this.form = document.createElement("form");
  }

  connectedCallback() {
    const fieldsAttr = this.getAttribute("fields");
    if (fieldsAttr) {
      try {
        this.fields = JSON.parse(fieldsAttr);
      } catch (e) {
        console.error("Erro ao ler os campos do componente:", e);
      }
    }

    this.renderForm();

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        const data = {};
        this.fields.forEach(field => {
          const input = this.form.querySelector(`[name="${field.name}"]`);

          // Captura especial para checkbox e radio
          if (field.type === "checkbox") {
            const checkboxes = this.form.querySelectorAll(`[name="${field.name}"]:checked`);
            data[field.name] = Array.from(checkboxes).map(cb => cb.value);
          } else if (field.type === "radio") {
            const radio = this.form.querySelector(`[name="${field.name}"]:checked`);
            data[field.name] = radio ? radio.value : "";
          } else if (field.type === "file") {
            data[field.name] = input.files ? Array.from(input.files).map(f => f.name) : [];
          } else {
            data[field.name] = input.value;
          }
        });

        this.dispatchEvent(new CustomEvent("formSubmit", {
          detail: data
        }));
      }
    });

    this.appendChild(this.form);
  }

  renderForm() {
    this.form.innerHTML = "";

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      const div = document.createElement("div");

      const label = document.createElement("label");
      label.textContent = field.label;
      div.appendChild(label);

      let input;

      if (field.type === "textarea") {
        input = document.createElement("textarea");
        input.name = field.name;

      } else if (field.type === "select") {
        input = document.createElement("select");
        input.name = field.name;
        if (Array.isArray(field.options)) {
          field.options.forEach(opt => {
            const option = document.createElement("option");
            option.value = opt.value;
            option.textContent = opt.label;
            input.appendChild(option);
          });
        }

      } else if (field.type === "radio") {
        if (Array.isArray(field.options)) {
          field.options.forEach(opt => {
            const wrapper = document.createElement("div");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = field.name;
            radio.value = opt.value;

            const lbl = document.createElement("label");
            lbl.textContent = opt.label;

            wrapper.appendChild(radio);
            wrapper.appendChild(lbl);
            div.appendChild(wrapper);
          });
        }

      } else if (field.type === "checkbox") {
        if (Array.isArray(field.options)) {
          field.options.forEach(opt => {
            const wrapper = document.createElement("div");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = field.name;
            checkbox.value = opt.value;

            const lbl = document.createElement("label");
            lbl.textContent = opt.label;

            wrapper.appendChild(checkbox);
            wrapper.appendChild(lbl);
            div.appendChild(wrapper);
          });
        }

      } else if (field.type === "file") {
        input = document.createElement("input");
        input.type = "file";
        input.name = field.name;
        if (field.multiple) input.multiple = true;

      } else {
        input = document.createElement("input");
        input.type = field.type || "text";
        input.name = field.name;

        // Máscaras
        if (field.mask === "cpf") {
          input.addEventListener("input", () => {
            input.value = input.value
              .replace(/\D/g, "")
              .replace(/(\d{3})(\d)/, "$1.$2")
              .replace(/(\d{3})(\d)/, "$1.$2")
              .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
          });
        }

        if (field.mask === "cnpj") {
          input.addEventListener("input", () => {
            input.value = input.value
              .replace(/\D/g, "")
              .replace(/^(\d{2})(\d)/, "$1.$2")
              .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
              .replace(/\.(\d{3})(\d)/, ".$1/$2")
              .replace(/(\d{4})(\d)/, "$1-$2");
          });
        }

        if (field.mask === "telefone") {
          input.addEventListener("input", () => {
            input.value = input.value
              .replace(/\D/g, "")
              .replace(/^(\d{2})(\d)/g, "($1) $2")
              .replace(/(\d{5})(\d)/, "$1-$2");
          });
        }
      }

      // Adiciona input no div (exceto radio/checkbox que já foram)
      if (input) {
        if (field.placeholder) input.placeholder = field.placeholder;
        if (field.required) input.required = true;
        div.appendChild(input);
      }

      // Mensagem de erro
      const errorSpan = document.createElement("span");
      errorSpan.className = "error-message";
      div.appendChild(errorSpan);

      this.form.appendChild(div);
    }

    const btn = document.createElement("button");
    btn.type = "submit";
    btn.textContent = "Cadastrar";
    this.form.appendChild(btn);
  }

  validateForm() {
    let isValid = true;
    const spans = this.form.querySelectorAll(".error-message");
    spans.forEach(span => span.textContent = "");

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      const inputs = this.form.querySelectorAll(`[name="${field.name}"]`);
      const firstInput = inputs[0];
      const errorSpan = firstInput.parentElement.querySelector(".error-message");

      if (field.required) {
        if (field.type === "radio") {
          const checked = this.form.querySelector(`[name="${field.name}"]:checked`);
          if (!checked) {
            errorSpan.textContent = `Selecione uma opção em ${field.label}.`;
            isValid = false;
          }
        } else if (field.type === "checkbox") {
          const checked = this.form.querySelectorAll(`[name="${field.name}"]:checked`);
          if (checked.length === 0) {
            errorSpan.textContent = `Selecione pelo menos uma opção em ${field.label}.`;
            isValid = false;
          }
        } else if (!firstInput.value.trim()) {
          errorSpan.textContent = `${field.label} é obrigatório.`;
          isValid = false;
        }
      }

      if (field.type === "email" && firstInput.value) {
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(firstInput.value)) {
          errorSpan.textContent = "Email inválido.";
          isValid = false;
        }
      }

      if (field.type === "number" && firstInput.value) {
        if (isNaN(firstInput.value)) {
          errorSpan.textContent = `${field.label} deve ser um número.`;
          isValid = false;
        }
      }
    }

    return isValid;
  }
}

customElements.define("cadastro-form", CadastroForm);

