import { createApp } from "https://mavue.mavo.io/mavue.js";

globalThis.app = createApp(
  {
    data: {
      expenses: [],
      name: "",
      currencyfrom: [
        { name: "USD", desc: "Dollar" },
        { name: "EUR", desc: "Euro" },
        { name: "PWD", desc: "Pound sterling" },
      ],
      convertfrom: "USD",
      convertto: "EUR",
      amount: "",

      newtitle: "",
      new_neo_paid: "",
      new_trinity_paid: "",
      new_amount: "",
      new_date: "",

      payer: "",
      payee: "",
    },

    methods: {
      AddExpense() {
        alert(this.payee);
        alert(this.payer);
        // alert(this.newtitle);
        // this.newtitle
        if (this.expenses.payer === "neo") {
          this.new_neo_paid = this.new_amount;
        } else if (this.expenses.payer === "trinity") {
          this.new_trinity_paid = this.new_amount;
        }
        //
        this.expenses.push({
          title: this.newtitle,
          neo_paid: this.new_neo_paid,
          trinity_paid: this.new_trinity_paid,
          date: this.new_date,
        });
        this.expenses.save();
      },
    },

    computed: {
      total_balance() {
        let total = 0;

        for (let expense of this.expenses) {
          let trinity_paid = expense.trinity_paid ?? 0;
          let neo_paid = expense.neo_paid ?? 0;
          let trinity_paid_for_neo = expense.trinity_paid_for_neo ?? 0;
          let neo_paid_for_trinity = expense.neo_paid_for_trinity ?? 0;

          total +=
            (trinity_paid - neo_paid) / 2 +
            trinity_paid_for_neo -
            neo_paid_for_trinity;
        }

        return total;
      },

      finalamount: function () {
        var to = this.convertto;
        var from = this.convertfrom;
        var final;
        switch (from) {
          case "USD":
            if (to == "EUR") {
              final = this.amount * 0.5;
            }
            if (to == "PWD") {
              final = this.amount * 0.8;
            }
            if (to == "USD") {
              final = this.amount;
            }
            break;
          case "PWD":
            if (to == "EUR") {
              final = this.amount * 1.1;
            }
            if (to == "PWD") {
              final = this.amount;
            }
            if (to == "USD") {
              final = this.amount * 1.3;
            }
            break;
          case "EUR":
            if (to == "EUR") {
              final = this.amount;
            }
            if (to == "PWD") {
              final = this.amount * 0.9;
            }
            if (to == "USD") {
              final = this.amount * 1.1;
            }
            break;
        }
        return final;
      },
    },
  },
  "#app"
);
